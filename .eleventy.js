const contributors = require('./index.js');

module.exports = function(eleventyConfig) {
    eleventyConfig.addPlugin(contributors, { repo: __dirname});
}