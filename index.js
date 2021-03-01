
// return look function that takes file path and returns array of contributors
const gitlog = require("gitlog").default;

function generateLookup(userOptions = {}){
    try {
        // set the options
        var options = {
            repo: __dirname,
            number: 200,
            fields: ["authorName", "authorEmail"],
            execOptions: { maxBuffer: 1000 * 1024 },
        };

        options.repo = userOptions.repo || options.repo;
        options.number = userOptions.commits || options.number;

        // Synchronous get history for entire repo
        const commits = gitlog(options);

        // populate contributor maps filename -> [useremail]
        contributors = {};
        commits.map(function (item, index, array) {

            // add to file -> contributor map
            for (let file of item.files) {
                let fileExists = file in contributors;
                if (!fileExists) {
                    // key file does not exist, create  new
                    contributors[file] = [{ authorName: item.authorName, authorEmail: item.authorEmail }];
                }
                else if (!contributors[file].some(element => item.authorEmail === element.authorEmail)) {
                    // contributor does not exist, add new contributor
                    contributors[file].push({ authorName: item.authorName, authorEmail: item.authorEmail });
                }
            }
        });

        // generate function to look up file in and return contributors
        lookup = function (filePath) {
            result = [];
            shortFilePath = filePath.slice(2); // get rid of the "./"
            let fileExists = shortFilePath in contributors;
            if (fileExists) {
                return contributors[shortFilePath];
            } else {
                return [];
            }
        };

        return lookup;
    }
    catch (err) {
        console.log(`\x1b[31mContributors plugin: ${err}\x1b[0m`);
        return function (filepath) { return "[]"; };
    }
    
}

// define the plug as filter
module.exports = (eleventyConfig, userOptions) => {
    eleventyConfig.addFilter('getContributors', generateLookup(userOptions));
}

