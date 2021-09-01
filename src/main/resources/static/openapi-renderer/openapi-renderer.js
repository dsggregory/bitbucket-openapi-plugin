define('openapi/openapi-renderer', [
    'jquery',
    'underscore',
    'lib/swagger'
], function(
    $,
    _,
    Swagger
) {
 function OpenAPIRenderer($container) {
        this.$container = $container;
        this.width = this.$container.innerWidth();
        this.height = this._calculateHeight();

         _.bindAll(this, '_onWindowResize', 'render');
        $(window).on('resize', this._onWindowResize);
    }

    OpenAPIRenderer.prototype._onWindowResize = function() {
        this.height = this._calculateHeight();
        this.width = this.$container.innerWidth();
    };

    OpenAPIRenderer.prototype._calculateAspectRatio = function() {
        return this.width / this.height;
    };

    OpenAPIRenderer.prototype._calculateHeight = function() {
        var windowHeightRatio = 0.6;
        return $(window).height() * windowHeightRatio;
    };

    OpenAPIRenderer.prototype.render = function(asciiDocRawUrl, commitHash) {
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

        /***
        var content;
        $.ajax({
            url : asciiDocRawUrl,
            async:false,
            success : function(data){
                content = data;
            },
            error: function (xhr, status, errorMessage) {
            }
        });

        try {
            var attributes =  Opal.hash({'source-highlighter': 'highlightjs', 'stylesheet': 'idea.css', 'linkcss!': '', 'copycss!': '', 'showtitle': '', 'stem!': '', 'env-bitbucket': '', 'env': 'bitbucket'});
            var options = Opal.hash({'to_file': false, 'safe': 'secure', 'attributes': attributes});
            var html = Opal.Asciidoctor.$convert(content, options);
            this.$container.html(html);
        } catch (e) {
            return;
        }
         */
    };

    OpenAPIRenderer.prototype.destroy = function() {
        $(window).off('resize', this._onWindowResize);
    };

    return OpenAPIRenderer;
});