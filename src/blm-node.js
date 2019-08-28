const $ = require('cheerio');
const fs = require('fs');

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

    _.defaults(global, { Backbone, _ });

    Backbone.$ = $;
    require('./blm')(Backbone, _); // eslint-disable-line global-require

    Backbone.Layout.configure({
        fetchTemplate(template) {
            template = `${template}.html`;
            const done = this.async();
            fs.readFile(template, (err, contents) => {
                contents = String(contents);
                if (err) {
                    // TODO need rewrite
                    // eslint-disable-next-line no-console
                    console.error(`Unable to load file ${template} : ${err}`);
                    done(null);
                    return;
                }

                done(_.template(contents));
            });
        },
        useRAF: false,
    });

    return Backbone.Layout;
};
