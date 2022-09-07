!function(e,n){if("object"==typeof exports&&"object"==typeof module)module.exports=n();else if("function"==typeof define&&define.amd)define([],n);else{var t=n();for(var r in t)("object"==typeof exports?exports:e)[r]=t[r]}}(window,function(){return function(e){var n={};function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var i in e)t.d(r,i,function(n){return e[n]}.bind(null,i));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=0)}([function(e,n,t){(function(n){function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}
/*!
 * backbone.layoutmanager.js v1.0.0
 * Copyright 2016, Tim Branyen (@tbranyen)
 * backbone.layoutmanager.js may be freely distributed under the MIT license.
 */
var r=function e(){var n=this;!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e),this.promise=new Promise(function(e,t){n.reject=t,n.resolve=e})};e.exports=function(e,i){var o=e.$,a="object"===(void 0===n?"undefined":t(n))?n:window,s=e.View,c=Array.prototype.concat,u=Array.prototype.splice,l=String.prototype.trim?i.bind(String.prototype.trim.call,String.prototype.trim):o.trim,f=e.View.extend({_render:function(){var e=this,n=e.__manager__,t=e.beforeRender;return new Promise(function(r,i){if(e.hasRendered&&e._removeViews(),n.callback=function(){delete n.isAsync,delete n.callback,e.trigger("beforeRender",e),e._viewRender(n).render().then(function(){return r()})},t){var o=t.call(e,e);if(o&&o.then&&(n.isAsync=!0,o.then(function(){n.callback(),r()},r)),!1===o)return void r()}n.isAsync||n.callback()})},_applyTemplate:function(e,n){var t=e;i.isString(t)&&(n.noel?(t=o.parseHTML(t,!0),this.$el.slice(1).remove(),this.$el.replaceWith(t),this.setElement(t,!1)):this.html(this.$el,t))},_viewRender:function(e){var n,t=this,r=function(r,i){return new Promise(function(o){var a;e.callback=function(n){delete e.isAsync,delete e.callback,t._applyTemplate(n,e),o()},f.cache(n,i),i&&(a=t.renderTemplate.call(t,i,r)),e.isAsync||(t._applyTemplate(a,e),o())})};return{render:function(){var o=t.serialize,a=t.template;return i.isFunction(o)&&(o=o.call(t)),new Promise(function(i,s){e.callback=function(n){delete e.isAsync,delete e.callback,r(o,n).then(function(){return i(t)})},"string"==typeof a&&(n=t.prefix+a);var c=f.cache(n);c?r(o,c).then(function(){return i(t)}):("string"==typeof a?c=t.fetchTemplate.call(t,t.prefix+a):"function"==typeof a?c=a:null!=a&&(c=t.fetchTemplate.call(t,a)),e.isAsync||r(o,c).then(function(){return i(t)}))})}}},constructor:function(n){this.manage=!0,i.extend(this,n);for(var t=arguments.length,r=new Array(t>1?t-1:0),o=1;o<t;o++)r[o-1]=arguments[o];e.View.apply(this,[n].concat(r))},async:function(){var e=this.__manager__;return e.isAsync=!0,e.callback},promise:function(){return this.__manager__.renderDeferred},renderViews:function(e){var n=this,t=n.__manager__,r=e,o=(r=r&&i.isArray(r)?i.chain(r):n.getViews(r)).map(function(e){return e.render().promise()});return t.renderDeferred=new Promise(function(e){return Promise.all(o).then(function(){return e(n)})}),n},insertView:function(e,n){return n?this.setView(e,n,!0):this.setView(e,!0)},insertViews:function(e){return i.isArray(e)?this.setViews({"":e}):(i.each(e,function(n,t){e[t]=i.isArray(n)?n:[n]}),this.setViews(e))},getView:function(e,n){var t=null!=e?e:n;return this.getViews(t).first().value()},getViews:function(e){var n;return"string"==typeof e?(e=this.sections[e]||e,n=this.views[e]||[],i.chain([].concat(n))):(n=i.chain(this.views).map(function(e){return i.isArray(e)?e:[e]},this).flatten(),"object"===t(e)?n.where(e):"function"==typeof e?n.filter(e):n)},removeView:function(e){var n=this.getViews(e).each(function(e){e.remove()});return n.value(),n},setView:function(e,n,t){"string"!=typeof e&&(t=n,n=e,e="");var r=n.__manager__;if(!r)throw new Error("The argument associated with selector '".concat(e,"' is defined and a View.  Set `manage` property to true for Backbone.View instances."));r.parent=this;var i=this.sections[e]||e;return r.selector=i,t?(this.views[i]=c.call([],this.views[e]||[],n),this.__manager__.insert=!0):(this.getView(e)!==n&&this.removeView(e),this.views[i]=n),n},setViews:function(e){var n=this;return i.each(e,function(e,t){i.isArray(e)?i.each(e,function(e){return n.insertView(t,e)}):n.setView(t,e)}),this},render:function(){var e=this,n=e.__manager__,t=n.parent,o=t&&t.__manager__,s=new r;function c(){function r(){var t=a.console,r=e.afterRender;r&&r.call(e,e),e.trigger("afterRender",e),n.noel&&e.$el.length>1&&i.isFunction(t.error)&&(t.error("{ el: false } with multiple top level elements is not supported in view: ".concat(function(e){for(var n=[],t=e.__manager__&&e.__manager__.parent;t;)n.push(t.name),t=t.__manager__&&t.__manager__.parent;return n.filter(Boolean).reverse()}(e).join(" > "))),i.isFunction(t.trace)&&t.trace())}return i.each(e.views,function(n,t){i.isArray(n)&&e.htmlBatch(e,n,t)}),t&&!n.insertedViaFragment&&(e.contains(t.el,e.el)||t.partial(t.$el,e.$el,o,n)),e.delegateEvents(),e.hasRendered=!0,n.renderInProgress=!1,delete n.triggeredByRAF,n.queue&&n.queue.length?n.queue.shift()():delete n.queue,o&&(o.renderInProgress||o.queue)?t.once("afterRender",r):r(),s.resolve(e)}return e._registerWithRAF(function(){e._render().then(function(){if(!i.keys(e.views).length)return c();var n=i.map(e.views,function(e){var n=i.isArray(e);return n&&e.length?i.map(e,function(e){return e.__manager__.insertedViaFragment=!0,e.render().promise()}):n?Promise.resolve(e):e.render().promise()});return Promise.all(i.flatten(n)).then(c),null})},s),n.renderInProgress=!0,n.renderDeferred=s.promise,e},remove:function(){return f._removeView(this,!0),this._remove.apply(this,arguments)},_registerWithRAF:function(e,n){var t=n.promise,r=n.resolve,i=this,o=i.__manager__,a=o.parent&&o.parent.__manager__;function s(){o.rafID=null,o.triggeredByRAF=!0,e()}this.useRAF?(o.deferreds||(o.deferreds=[]),o.deferreds.push(r),t.then(function(){for(var e=0;e<o.deferreds.length;e++)o.deferreds[e].call(i,i);o.deferreds.length=0}),this._cancelQueuedRAFRender(),a&&a.triggeredByRAF?s():o.rafID=i.requestAnimationFrame(s)):o.queue?o.queue.push(e):(o.queue=[],e())},_cancelQueuedRAFRender:function(){var e=this.__manager__;null!=e.rafID&&this.cancelAnimationFrame(e.rafID)}},{_cache:{},_removeViews:function(e,n){"boolean"==typeof e&&(n=e,e=this),(e=e||this).getViews().each(function(e){(e.hasRendered||n)&&f._removeView(e,n)}).value()},_removeView:function(e,n){var t,r=e.__manager__,o=r.parent&&r.parent.__manager__;if(!("boolean"==typeof e.keep?e.keep:e.options.keep)&&o&&!0===o.insert||n){if(f.cleanViews(e),e._removeViews(!0),e.$el.remove(),e._cancelQueuedRAFRender(),!r.parent)return;if(t=r.parent.views[r.selector],i.isArray(t))return i.each(i.clone(t),function(e,n){e&&e.__manager__===r&&u.call(t,n,1)}),void(i.isEmpty(t)&&r.parent.trigger("empty",r.selector));delete r.parent.views[r.selector],r.parent.trigger("empty",r.selector)}},cache:function(e,n){return e in this._cache&&null==n?this._cache[e]:null!=e&&null!=n?(this._cache[e]=n,n):null},cleanViews:function(n){i.each(c.call([],n),function(n){n.trigger("cleanup",n),n.unbind(),n.model instanceof e.Model&&n.model.off(null,null,n),n.collection instanceof e.Collection&&n.collection.off(null,null,n),n.stopListening(),i.isFunction(n.cleanup)&&n.cleanup()})},configure:function(n){i.extend(f.prototype,n),n.manage&&(e.View.prototype.manage=!0),!1===n.el&&(e.View.prototype.el=!1),!0===n.suppressWarnings&&(e.View.prototype.suppressWarnings=!0),!1===n.useRAF&&(e.View.prototype.useRAF=!1),n._&&(i=n._)},setupView:function(n,t){t=i.extend({},t),i.each(c.call([],n),function(n){if(!n.__manager__){var r,o=f.prototype;i.defaults(n,{views:{},sections:{},__manager__:{},_removeViews:f._removeViews,_removeView:f._removeView},f.prototype),n.options=t,i.extend(n,t),n._remove=e.View.prototype.remove,n.render=f.prototype.render,n.remove!==o.remove&&(n._remove=n.remove,n.remove=o.remove);var a=t.views||n.views;i.keys(a).length&&(r=a,n.views={},i.each(r,function(e,t){"function"==typeof e&&(r[t]=e.call(n,n))}),n.setViews(r))}})}});f.VERSION="2.0.0",e.View.prototype.constructor=function(e){var n;("el"in(e=e||{})?!1===e.el:!1===this.el)&&(n=!0),(e.manage||this.manage)&&f.setupView(this,e),this.__manager__&&(this.__manager__.noel=n,this.__manager__.suppressWarnings=e.suppressWarnings);for(var t=arguments.length,r=new Array(t>1?t-1:0),i=1;i<t;i++)r[i-1]=arguments[i];s.apply(this,[e].concat(r))},e.View=e.View.prototype.constructor,e.View.extend=s.extend,e.View.prototype=s.prototype;var p={prefix:"",useRAF:!0,fetchTemplate:function(e){return i.template(o(e).html())},renderTemplate:function(e,n){return l(e.call(this,n))},serialize:function(){return this.model?i.clone(this.model.attributes):{}},partial:function(e,n,t,r){var i;r.selector&&(e=t.noel&&(i=e.filter(r.selector)).length?i:e.find(r.selector)),t.insert?this.insert(e,n):this.html(e,n)},html:function(e,n){e.empty().append(n)},htmlBatch:function(e,n,t){var r=e.__manager__,a={selector:t},s=i.reduce(n,function(n,t){var r=("boolean"==typeof t.keep?t.keep:t.options.keep)&&o.contains(e.el,t.el);return t.el&&!r&&n.push(t.el),n},[]);return this.partial(e.$el,o(s),r,a)},insert:function(e,n){e.append(n)},contains:function(e,n){return o.contains(e,n)},requestAnimationFrame:function(){for(var e=0,n=["ms","moz","webkit","o"],t=a.requestAnimationFrame,r=0;r<n.length&&!a.requestAnimationFrame;++r)t=a["".concat(n[r],"RequestAnimationFrame")];return t||(t=function(n){var t=(new Date).getTime(),r=Math.max(0,16-(t-e)),i=a.setTimeout(function(){n(t+r)},r);return e=t+r,i}),i.bind(t,a)}(),cancelAnimationFrame:function(){for(var e=["ms","moz","webkit","o"],n=a.cancelAnimationFrame,t=0;t<e.length&&!a.cancelAnimationFrame;++t)n=a["".concat(e[t],"CancelAnimationFrame")]||a["".concat(e[t],"CancelRequestAnimationFrame")];return n||(n=function(e){clearTimeout(e)}),i.bind(n,a)}()};return i.extend(f.prototype,p),e.Layout=f,f}}).call(this,t(1))},function(e,n){var t;t=function(){return this}();try{t=t||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(t=window)}e.exports=t}])});