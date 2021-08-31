define('asciidoc/asciidoc-handler', [
    'jquery'
], function(
    $
) {
    "use strict";
    var asciiDocViewResourceKey = 'org.dsggregory.bitbucket.server.bitbucket-openapi-plugin:asciidoc-view';

    /**
     * Extract the extension from file name
     * @param {Object} filePath - the file path object
     * @returns {string} extension of file
     */
    function getFileExtension(filePath) {
        if (filePath.extension) {
            return filePath.extension;
        }
        var splitName = filePath.name.split('.');
        return splitName[splitName.length - 1];
    }

    /**
     * Extract the base filename from path
     * @param {Object} filePath - the file path object
     * @returns {string} extension of file
     */
    function getBasename(filePath) {
        var x = filePath.name.lastIndexOf('/');
        if (x == -1)
            return filePath.name

        return filePath.substr(x+1)
    }

    /**
     * @returns Raw url for file
     */
    function getRawUrl(fileChange) {
        var projectKey = fileChange.repository.project.key;
        var repoSlug = fileChange.repository.slug;
        var path = fileChange.path.components.join('/');
        var commitHash = getCommitHash(fileChange);

        return AJS.contextPath() + AJS.format('/projects/{0}/repos/{1}/browse/{2}?at={3}&raw',
            projectKey, repoSlug, path, encodeURIComponent(commitHash));
    }

    /**
     * @returns commit hash for file
     */
    function getCommitHash(fileChange) {
        return fileChange.commitRange.untilRevision.id;
    }

    // Register a file-handler for asciidoc files
    return function(options) {
        var fileChange = options.fileChange;

        console.log("in asciidoc-handler fileChange", fileChange)
        // Check if openAPI file
        var bn = getBasename(fileChange.path);
        var isOpenAPI = false;
        if (bn.match('^swagger\.yaml$|^swagger\.json$|^openapi\.yaml$|^openapi\.json$'))
            isOpenAPI = true;

        console.log("basename", bn, "isOpenAPI", isOpenAPI)

        if (isOpenAPI && options.contentMode === 'diff') {
            // Not supported
        } else if (isOpenAPI && options.contentMode === 'source') {

            // Asynchronously load asciidoc-view web-resources (js/css/soy)
            var deferred = new $.Deferred();

            WRM.require('wr!' + asciiDocViewResourceKey).done(function() {
                // When web-resources successfully loaded, create a AsciiDocView
                var AsciiDocView = require('asciidoc/asciidoc-view');
                var fileUrl = getRawUrl(fileChange);
                var commitHash = getCommitHash(fileChange);
                var view = new AsciiDocView(options.$container, fileUrl, commitHash);

                deferred.resolve(view);
            }).fail(function() {
                console.log('error while asynchronously loading asciidoc-view resources');
                return deferred.reject();
            });

            return deferred;
        }

        return false;
    }
});


require('bitbucket/feature/files/file-handlers').register({
    weight: 900,
    handle: function(options) {
        return require('asciidoc/asciidoc-handler').apply(this, arguments);
    }
});

