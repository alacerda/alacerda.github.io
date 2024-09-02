require 'jekyll/renderer'

module Jekyll
  # Renders a Document
  #
  # @see jekyll-4.0.0/lib/jekyll/renderer.rb
  class Renderer
    # We redefine this method because it's the last place where we see
    # the Document content before it's placed inside the layouts.  We
    # could use a post render hook but it's too late to make
    # modifications to the content.
    alias place_in_layouts_orig place_in_layouts

    # Encrypts the content before it's placed into the layout tree
    def place_in_layouts(content, payload, info)
      if encrypt?
        crypto = Crypto.new(site: site, post: document)
        crypto.encrypt! && crypto.valid?
      end

      place_in_layouts_orig document.content, payload, info
    end

    private

    def encrypt?
      return false if not document.data.key?('cypt_password')
      return false if document.data['cypt_password'] == false
      return false if document.data['cypt_password'] == 'false'
      return false if document.content.chomp.empty?
      true
    end
  end
end
