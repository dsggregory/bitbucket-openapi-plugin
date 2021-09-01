define('asciidoc/asciidoc-renderer', [
    'jquery',
    'underscore',
    'lib/asciidoctor',
    'lib/swagger'
], function(
    $,
    _,
    Opal,
    Swagger
) {
 function AsciiDocRenderer($container) {
        this.$container = $container;
        this.width = this.$container.innerWidth();
        this.height = this._calculateHeight();

         _.bindAll(this, '_onWindowResize', 'render');
        $(window).on('resize', this._onWindowResize);
    }

    AsciiDocRenderer.prototype._onWindowResize = function() {
        this.height = this._calculateHeight();
        this.width = this.$container.innerWidth();
    };

    AsciiDocRenderer.prototype._calculateAspectRatio = function() {
        return this.width / this.height;
    };

    AsciiDocRenderer.prototype._calculateHeight = function() {
        var windowHeightRatio = 0.6;
        return $(window).height() * windowHeightRatio;
    };

    AsciiDocRenderer.prototype.render = function(asciiDocRawUrl, commitHash) {
        var ui = Swagger.SwaggerUIBundle({
            spec: content,
            dom_id: '#swagger-ui',
            deepLinking: true,
            presets: [
                SwaggerUIBundle.presets.apis,
                SwaggerUIStandalonePreset
            ],
            plugins: [
                SwaggerUIBundle.plugins.DownloadUrl
            ],
            layout: "StandaloneLayout"
        });
        this.$container.html(ui);
    };

    AsciiDocRenderer.prototype.destroy = function() {
        $(window).off('resize', this._onWindowResize);
    };

    return AsciiDocRenderer;
});