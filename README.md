# Portfolio Jekyll Site

This is a personal portfolio website built with [Jekyll](https://jekyllrb.com/).

## Prerequisites

- [chruby](https://github.com/postmodern/chruby) for Ruby version management
- [ruby-install](https://github.com/postmodern/ruby-install) to install Ruby versions
- [Bundler](https://bundler.io/) for managing Ruby gems
- [Jekyll](https://jekyllrb.com/) (installed via Bundler)

## Setup Instructions

### 1. Install Ruby (if needed)
If you don't have the required Ruby version, install it using `ruby-install`:

```sh
ruby-install ruby 3.1.2
```

Replace `3.1.2` with the version specified in your project (see `.ruby-version` if present).

### 2. Select Ruby Version with chruby
Use `chruby` to switch to the correct Ruby version:

```sh
chruby 3.1.2
```

If you have a `.ruby-version` file in the project directory, chruby will automatically switch when you `cd` into the directory (if your shell is configured accordingly).

### 3. Install Dependencies

```sh
gem install bundler
bundle install
```

### 4. Serve the Site Locally

```sh
bundle exec jekyll serve --livereload
```

Visit [http://localhost:4000](http://localhost:4000) to view your site.

## Hot-Reloading (Live Reload)

Jekyll supports hot-reloading out of the box. When you run the local server with the `--livereload` flag, your browser will automatically refresh whenever you make changes to your site's files (including HTML, CSS, and Markdown).

- **To enable hot-reloading:**
  ```sh
  bundle exec jekyll serve --livereload
  ```
- If you omit `--livereload`, Jekyll will still rebuild the site on changes, but your browser may not refresh automatically.

If you don't see changes reflected, try clearing your browser cache or restarting the server.

## Additional Commands

- **Build the site:**
  ```sh
  bundle exec jekyll build
  ```
- **Clean generated files:**
  ```sh
  bundle exec jekyll clean
  ```

## Troubleshooting
- Ensure you are using the correct Ruby version with `chruby`.
- If you encounter gem issues, try `bundle update` or reinstalling gems.

## Resources
- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [chruby Documentation](https://github.com/postmodern/chruby)
