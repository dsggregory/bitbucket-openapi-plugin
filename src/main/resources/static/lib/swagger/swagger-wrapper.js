/**
 * Just an amd wrapper for asciidoctor.js
 */

define('lib/swagger', function() {
    require("./lib/swagger-ui-bundle.js")
    require("./lib/swagger-ui-standalone-preset.js")
    return Swagger;
});
