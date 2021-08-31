# Bitbucket OpenAPI Plugin

A plugin for Bitbucket Data-Center or Server to render OpenAPI (aka Swagger) files from the Bitbucket file viewer of the portal. Files named as `[swagger | openapi].[yaml | json]` will be rendered in a Swagger-UI viewer instead of simply showing the YAML or JSON source.

# Prerequisites for Building and Deploying
* Requires Java11. This is a fact.
* Install the [Bitbucket SDK](https://developer.atlassian.com/server/framework/atlassian-sdk/install-the-atlassian-sdk-on-a-linux-or-mac-system/)

## Testing Locally
```shell
cd openAPIViewer
atlas-run
```

## Debugging
Run `atlas-run` from within the project directory. Then browse to http://localhost:7990. Login credentials are `admin:admin`.

This plugin deploys as a browser-side script. Using the developer tools in your browser, search for `org.dsggregory.bitbucket.server.bitbucket-openapi-plugin` to set breakpoints.

### Utils
* https://<your Bitbucket Server instance>/projects?web.panels
* atlas-run
* atlas-clean

## Build and Deploy
* atlas-build

## Import Plugin to Bitbucket Server

## References:
* https://developer.atlassian.com/server/bitbucket/how-tos/cluster-safe-plugins/
* https://github.com/christiangalsterer/bitbucket-asciidoc-plugin
* https://github.com/deevodavis71/bitbucket-server-example-plugins/tree/master/plugin-decorators
* [BitBucket plugin SDK](https://developer.atlassian.com/server/framework/atlassian-sdk/install-the-atlassian-sdk-on-a-linux-or-mac-system/)
* https://tech.willhaben.at/a-simple-guide-to-creating-a-bitbucket-plugin-2929bfacb6c6
* https://developer.atlassian.com/server/framework/atlassian-sdk/install-the-atlassian-sdk-on-a-linux-or-mac-system/
* https://developer.atlassian.com/server/framework/atlassian-sdk/plugin-modules/
* https://developer.atlassian.com/server/bitbucket/reference/plugin-module-types/plugin-modules/
* https://developer.atlassian.com/server/bitbucket/reference/plugin-decorators/?utm_source=%2Fbitbucket%2Fserver%2Fdocs%2Flatest%2Freference%2Fplugin-decorators.html&utm_medium=301
* https://docs.atlassian.com/bitbucket-server/docs/7.9.0/reference/javascript/feature_files_file-handlers.js.html
