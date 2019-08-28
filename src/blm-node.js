const $ = require('cheerio');
const fs = require('fs');
const deffered = require('underscore.deferred');

module.exports = (Backbone, _) => {
    // Add cheerio hooks
    Backbone.View.prototype._createElement = function (tagName) {
        const tag = `<${tagName}></${tagName}>`;
        return $.load(tag).root()[0].children[0];
    };

    // This is to avoid unwanted errors thrown when using
    // `Backbone.View#setElement`.
    $.prototype.unbind = function () { return this; };
    $.prototype.off = function () { return this; };

    // Since jQuery is not being used and LayoutManager depends on a Promise
    // implementation close to jQuery, we use `underscore.deferred` here which
    // matches jQuery's Deferred API exactly.  This is mixed into Cheerio to make
    // it more seamless.
    _.extend($, deffered);

    // Get Backbone and _ into the global scope.
    _.defaults(global, { Backbone, _ });

    // Set the Backbone DOM library to be Cheerio.
    Backbone.$ = $;

    // Include the LayoutManager source, without eval.
    require('./blm')(Backbone, _); // eslint-disable-line global-require

    // Configure LayoutManager with some very useful defaults for Node.js
    // environments.  This allows the end user to simply consume instead of
    // fighting with the desirable configuration.
    Backbone.Layout.configure({
        // Sensible default for Node.js is to load templates from the filesystem.
        // This is similar to how we default to script tags in browser-land.
        fetchTemplate(template) {
        // Automatically add the `.html` extension.
            template = `${template}.html`;

            // Put this fetch into `async` mode to work better in the Node environment.
            const done = this.async();

            // By default read in the file from the filesystem relative to the code
            // being executed.
            fs.readFile(template, (err, contents) => {
                // Ensure the contents are a String.
                contents = String(contents);

                // Any errors should be reported.
                if (err) {
                    // eslint-disable-next-line no-console
                    console.error(`Unable to load file ${template} : ${err}`);
                    done(null);
                    return;
                }

                // Pass the template contents back up.
                done(_.template(contents));
            });
        },
        // In Node, we likely want templates to render as quickly as possible - using
        // requestAnimationFrame doesn't make much sense in a Node context.
        useRAF: false,
    });

    return Backbone.Layout;
};
