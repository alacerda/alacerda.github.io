build:
	bundle exec jekyll build

deploy:
	make build
	cp -prav _site/* ../alacerda.github.io/

run:
	make build
	bundle exec jekyll serve

notes:
	bundle init
	gem install --user-install bundler jekyll
	sudo bundle add jekyll --version "~>4.2"
	bundle config set --local path 'vendor/bundle'
	bundle install
	sudo bundle add webrick
	bundle install
	sudo bundle update
