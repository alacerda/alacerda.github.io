require 'fileutils'
require 'openssl'
require 'json'

module Jekyll

  # The Crypto class encrypts the contents of a given Jekyll::Document
  # using a password defined in the metadata or globally on the
  # Jekyll::Site configuration.
  Crypto = Struct.new(:site, :post, keyword_init: true) do
    ITERATIONS = 20_000.freeze

    # Initializes AES-GCM-256 on encryption mode
    #
    # @return [OpenSSL::Cipher::AES]
    def cipher
      @cipher ||= OpenSSL::Cipher::AES.new(256, :GCM).encrypt
    end

    # Derive a stronger key from the password using PBKDF2
    #
    # @return [String]
    def derived_key
      @derived_key ||= OpenSSL::KDF.pbkdf2_hmac(password.to_s,
                                                salt: salt,
                                                iterations: iterations,
                                                length: hash.digest_length,
                                                hash: hash)
    end

    # Encrypts and replaces the rendered content of a Document.
    #
    # @return [String]
    def encrypt!
      cipher.key = derived_key

      # Make these available to any theme that understands Jekyll::Crypto
      post.data['iv'] = iv.bytes
      post.data['salt'] = salt.bytes
      post.data['iterations'] = iterations
      post.data['data'] = auth_data

      # The content is replaced by an HTML representation of the
      # encryption parameters so Jekyll::Crypto can transparently
      # encrypt any theme.
      post.content = to_html
    end

    def plain_content
      @plain_content ||= post.content.dup
    end

    # Tries to decrypt to prove everything went well
    def valid?
      decipher = OpenSSL::Cipher::AES.new(256, :GCM).decrypt

      decipher.key = derived_key
      decipher.iv = iv
      decipher.auth_tag = auth_tag
      decipher.auth_data = auth_data

      # This will throw an OpenSSL::Cipher::CipherError exception is
      # something goes wrong in the implementation.
      decipher.update(cipher_text) + decipher.final
    end

    # Encrypt the rendered content
    def cipher_text
      @cipher_text ||= cipher.update(plain_content) + cipher.final
    end

    # Return the authentication tag, this ensures encrypted content
    # hasn't been tampered with.
    def auth_tag
      @auth_tag ||= cipher.auth_tag(16)
    end

    # The salt is a random 16 bytes (128 bits) long String
    #
    # @return [String] salt
    def salt
      @salt ||= OpenSSL::Random.random_bytes(16)
    end

    # Obtains the password for this Document or the global password for
    # the site.  If any of them is missing an exception is thrown.
    #
    # This is private information and is not made available as Document
    # metadata.
    #
    # @return [String] password
    def password
      @password ||= post.data['cypt_password'] ||
          site.config['cypt_password'] ||
          raise(ArgumentError, 'Password missing, see jekyll-crypto documentation.')
    end

    # The amount of iterations for key derivation
    #
    # @return [Integer] iterations
    def iterations
      @iterations ||= post.data['iterations'] ||
          site.config['iterations'] ||
          ITERATIONS
    end

    # Hashing function for key derivation
    #
    # @return [OpenSSL::Digest::SHA256] hash
    def hash
      @hash ||= OpenSSL::Digest::SHA256.new
    end

    # The Initialization Vector for encryption
    #
    # @return [String] IV
    def iv
      @iv ||= cipher.random_iv
    end

    # Random authentication data
    #
    # @return [String] A random string
    def auth_data
      @auth_data ||= cipher.auth_data = OpenSSL::Random.random_bytes(16)
    end

    # Dumps the encrypted content as HTML
    #
    # The cipher text for JS is a concatenation of encrypted text and a
    # 16 bytes (128 bits) authentication tag that can later be decrypted
    # by
    # [SubtleCrypto](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/decrypt).
    #
    # @return [String] Encrypted content with parameters
    def to_html
      @_preview = Liquid::Template.parse(File.new(post.data['cypt_preview_inc']).read)
      post.data['preview_parsed'] = @_preview.render(JSON.parse(post.data['cypt_preview_inc_params'] || '{}'))
      assigns = {
          'iterations' => iterations,
          'iv' => JSON.dump(iv.bytes),
          'salt' => JSON.dump(salt.bytes),
          'auth_data' => JSON.dump(auth_data.bytes),
          'cipher_text' => JSON.dump(cipher_text.bytes.concat(auth_tag.bytes)),
          'preview' => post.data['preview_parsed']
      }
      @_template = Liquid::Template.parse(File.new(post.data['cypt_layout_inc']).read)
      @to_html ||= @_template.render(assigns)
    end
  end
end
