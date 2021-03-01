# Git Contributors for Eleventy

A git contributors plugin for [Eleventy](https://www.11ty.io/) static site generator.  The plugin returns a array of Git contributors for a page.

## Install the Plugin

Install in project directory by running:

```shell
npm install --savedev eleventy-plugin-contributors
```

In your Eleventy config file (defaults to `.eleventy.js`) include the plugin :

```js
const getContributors = require('eleventy-plugin-contributors');

module.exports = function(eleventyConfig) {
    eleventyConfig.addPlugin(getContributors);
}
```

### Configuration Options

The `contributor`plugin can be customised via the following options:

```js
const getContributors = require('eleventy-plugin-contributors');

module.exports = function(eleventyConfig) {
    eleventyConfig.addPlugin(contributors, {
        commits: 200, // the maxmium number of commits to include
        repo: __dirname // location of the repo
    });
}
```

## Using the Plugin

Now you can use the `getContributors` filter in your templates, to return an array of contributor records for a given file containing  the `git` settings for `authorName` and `authorEmail`.

For example the following Nujucks markup will list the contributors for the current page:

```html
{% set contributions = page.inputPath | getContributors -%}

{% for contributor in contributions -%}
-   {{contributor.authorName}} {{ contributor.authorEmail}}
{% endfor %}
```

## License

MIT.
