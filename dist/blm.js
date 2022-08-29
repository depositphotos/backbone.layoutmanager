!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var r in n)("object"==typeof exports?exports:e)[r]=n[r]}}(window,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){(function(t){function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}
/*!
 * backbone.layoutmanager.js v1.0.0
 * Copyright 2016, Tim Branyen (@tbranyen)
 * backbone.layoutmanager.js may be freely distributed under the MIT license.
 */
var r=function e(){var t=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.promise=new Promise(function(e,n){t.reject=n,t.resolve=e})};e.exports=function(e,i){var o=e.$,a="object"===(void 0===t?"undefined":n(t))?t:window,s=e.View,c=Array.prototype.concat,u=Array.prototype.splice,l=String.prototype.trim?i.bind(String.prototype.trim.call,String.prototype.trim):o.trim,f=e.View.extend({_render:function(){var e=this,t=e.__manager__,n=e.beforeRender;return new Promise(function(r,i){if(e.hasRendered&&e._removeViews(),t.callback=function(){delete t.isAsync,delete t.callback,e.trigger("beforeRender",e),e._viewRender(t).render().then(function(){return r()})},n){var o=n.call(e,e);if(o&&o.then&&(t.isAsync=!0,o.then(function(){t.callback(),r()},r)),!1===o)return void r()}t.isAsync||t.callback()})},_applyTemplate:function(e,t){var n=e;i.isString(n)&&(t.noel?(n=o.parseHTML(n,!0),this.$el.slice(1).remove(),this.$el.replaceWith(n),this.setElement(n,!1)):this.html(this.$el,n))},_viewRender:function(e){var t,n=this,r=function(r,i){return new Promise(function(o){var a;e.callback=function(t){delete e.isAsync,delete e.callback,n._applyTemplate(t,e),o()},f.cache(t,i),i&&(a=n.renderTemplate.call(n,i,r)),e.isAsync||(n._applyTemplate(a,e),o())})};return{render:function(){var o=n.serialize,a=n.template;return i.isFunction(o)&&(o=o.call(n)),new Promise(function(i,s){e.callback=function(t){delete e.isAsync,delete e.callback,r(o,t).then(function(){return i(n)})},"string"==typeof a&&(t=n.prefix+a);var c=f.cache(t);c?r(o,c).then(function(){return i(n)}):("string"==typeof a?c=n.fetchTemplate.call(n,n.prefix+a):"function"==typeof a?c=a:null!=a&&(c=n.fetchTemplate.call(n,a)),e.isAsync||r(o,c).then(function(){return i(n)}))})}}},constructor:function(t){this.manage=!0,i.extend(this,t);for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];e.View.apply(this,[t].concat(r))},async:function(){var e=this.__manager__;return e.isAsync=!0,e.callback},promise:function(){return this.__manager__.renderDeferred},renderViews:function(e){var t=this,n=t.__manager__,r=e,o=(r=r&&i.isArray(r)?i.chain(r):t.getViews(r)).map(function(e){return e.render().promise()});return n.renderDeferred=new Promise(function(e){return Promise.all(o).then(function(){return e(t)})}),t},insertView:function(e,t){return t?this.setView(e,t,!0):this.setView(e,!0)},insertViews:function(e){return i.isArray(e)?this.setViews({"":e}):(i.each(e,function(t,n){e[n]=i.isArray(t)?t:[t]}),this.setViews(e))},getView:function(e,t){var n=null!=e?e:t;return this.getViews(n).first().value()},getViews:function(e){var t;return"string"==typeof e?(e=this.sections[e]||e,t=this.views[e]||[],i.chain([].concat(t))):(t=i.chain(this.views).map(function(e){return i.isArray(e)?e:[e]},this).flatten(),"object"===n(e)?t.where(e):"function"==typeof e?t.filter(e):t)},removeView:function(e){var t=this.getViews(e).each(function(e){e.remove()});return t.value(),t},setView:function(e,t,n){"string"!=typeof e&&(n=t,t=e,e="");var r=t.__manager__;if(!r)throw new Error("The argument associated with selector '".concat(e,"' is defined and a View.  Set `manage` property to true for Backbone.View instances."));r.parent=this;var i=this.sections[e]||e;return r.selector=i,n?(this.views[i]=c.call([],this.views[e]||[],t),this.__manager__.insert=!0):(this.getView(e)!==t&&this.removeView(e),this.views[i]=t),t},setViews:function(e){var t=this;return i.each(e,function(e,n){i.isArray(e)?i.each(e,function(e){return t.insertView(n,e)}):t.setView(n,e)}),this},render:function(){var e=this,t=e.__manager__,n=t.parent,o=n&&n.__manager__,s=new r;function c(){function r(){var n=a.console,r=e.afterRender;r&&r.call(e,e),e.trigger("afterRender",e),t.noel&&e.$el.length>1&&i.isFunction(n.error)&&(n.error("{ el: false } with multiple top level elements is not supported in view: ".concat(e.name)),i.isFunction(n.trace)&&n.trace())}return i.each(e.views,function(t,n){i.isArray(t)&&e.htmlBatch(e,t,n)}),n&&!t.insertedViaFragment&&(e.contains(n.el,e.el)||n.partial(n.$el,e.$el,o,t)),e.delegateEvents(),e.hasRendered=!0,t.renderInProgress=!1,delete t.triggeredByRAF,t.queue&&t.queue.length?t.queue.shift()():delete t.queue,o&&(o.renderInProgress||o.queue)?n.once("afterRender",r):r(),s.resolve(e)}return e._registerWithRAF(function(){e._render().then(function(){if(!i.keys(e.views).length)return c();var t=i.map(e.views,function(e){var t=i.isArray(e);return t&&e.length?i.map(e,function(e){return e.__manager__.insertedViaFragment=!0,e.render().promise()}):t?Promise.resolve(e):e.render().promise()});return Promise.all(i.flatten(t)).then(c),null})},s),t.renderInProgress=!0,t.renderDeferred=s.promise,e},remove:function(){return f._removeView(this,!0),this._remove.apply(this,arguments)},_registerWithRAF:function(e,t){var n=t.promise,r=t.resolve,i=this,o=i.__manager__,a=o.parent&&o.parent.__manager__;function s(){o.rafID=null,o.triggeredByRAF=!0,e()}this.useRAF?(o.deferreds||(o.deferreds=[]),o.deferreds.push(r),n.then(function(){for(var e=0;e<o.deferreds.length;e++)o.deferreds[e].call(i,i);o.deferreds.length=0}),this._cancelQueuedRAFRender(),a&&a.triggeredByRAF?s():o.rafID=i.requestAnimationFrame(s)):o.queue?o.queue.push(e):(o.queue=[],e())},_cancelQueuedRAFRender:function(){var e=this.__manager__;null!=e.rafID&&this.cancelAnimationFrame(e.rafID)}},{_cache:{},_removeViews:function(e,t){"boolean"==typeof e&&(t=e,e=this),(e=e||this).getViews().each(function(e){(e.hasRendered||t)&&f._removeView(e,t)}).value()},_removeView:function(e,t){var n,r=e.__manager__,o=r.parent&&r.parent.__manager__;if(!("boolean"==typeof e.keep?e.keep:e.options.keep)&&o&&!0===o.insert||t){if(f.cleanViews(e),e._removeViews(!0),e.$el.remove(),e._cancelQueuedRAFRender(),!r.parent)return;if(n=r.parent.views[r.selector],i.isArray(n))return i.each(i.clone(n),function(e,t){e&&e.__manager__===r&&u.call(n,t,1)}),void(i.isEmpty(n)&&r.parent.trigger("empty",r.selector));delete r.parent.views[r.selector],r.parent.trigger("empty",r.selector)}},cache:function(e,t){return e in this._cache&&null==t?this._cache[e]:null!=e&&null!=t?(this._cache[e]=t,t):null},cleanViews:function(t){i.each(c.call([],t),function(t){t.trigger("cleanup",t),t.unbind(),t.model instanceof e.Model&&t.model.off(null,null,t),t.collection instanceof e.Collection&&t.collection.off(null,null,t),t.stopListening(),i.isFunction(t.cleanup)&&t.cleanup()})},configure:function(t){i.extend(f.prototype,t),t.manage&&(e.View.prototype.manage=!0),!1===t.el&&(e.View.prototype.el=!1),!0===t.suppressWarnings&&(e.View.prototype.suppressWarnings=!0),!1===t.useRAF&&(e.View.prototype.useRAF=!1),t._&&(i=t._)},setupView:function(t,n){n=i.extend({},n),i.each(c.call([],t),function(t){if(!t.__manager__){var r,o=f.prototype;i.defaults(t,{views:{},sections:{},__manager__:{},_removeViews:f._removeViews,_removeView:f._removeView},f.prototype),t.options=n,i.extend(t,n),t._remove=e.View.prototype.remove,t.render=f.prototype.render,t.remove!==o.remove&&(t._remove=t.remove,t.remove=o.remove);var a=n.views||t.views;i.keys(a).length&&(r=a,t.views={},i.each(r,function(e,n){"function"==typeof e&&(r[n]=e.call(t,t))}),t.setViews(r))}})}});f.VERSION="2.0.0",e.View.prototype.constructor=function(e){var t;("el"in(e=e||{})?!1===e.el:!1===this.el)&&(t=!0),(e.manage||this.manage)&&f.setupView(this,e),this.__manager__&&(this.__manager__.noel=t,this.__manager__.suppressWarnings=e.suppressWarnings);for(var n=arguments.length,r=new Array(n>1?n-1:0),i=1;i<n;i++)r[i-1]=arguments[i];s.apply(this,[e].concat(r))},e.View=e.View.prototype.constructor,e.View.extend=s.extend,e.View.prototype=s.prototype;var p={prefix:"",useRAF:!0,fetchTemplate:function(e){return i.template(o(e).html())},renderTemplate:function(e,t){return l(e.call(this,t))},serialize:function(){return this.model?i.clone(this.model.attributes):{}},partial:function(e,t,n,r){var i;r.selector&&(e=n.noel&&(i=e.filter(r.selector)).length?i:e.find(r.selector)),n.insert?this.insert(e,t):this.html(e,t)},html:function(e,t){e.empty().append(t)},htmlBatch:function(e,t,n){var r=e.__manager__,a={selector:n},s=i.reduce(t,function(t,n){var r=("boolean"==typeof n.keep?n.keep:n.options.keep)&&o.contains(e.el,n.el);return n.el&&!r&&t.push(n.el),t},[]);return this.partial(e.$el,o(s),r,a)},insert:function(e,t){e.append(t)},contains:function(e,t){return o.contains(e,t)},requestAnimationFrame:function(){for(var e=0,t=["ms","moz","webkit","o"],n=a.requestAnimationFrame,r=0;r<t.length&&!a.requestAnimationFrame;++r)n=a["".concat(t[r],"RequestAnimationFrame")];return n||(n=function(t){var n=(new Date).getTime(),r=Math.max(0,16-(n-e)),i=a.setTimeout(function(){t(n+r)},r);return e=n+r,i}),i.bind(n,a)}(),cancelAnimationFrame:function(){for(var e=["ms","moz","webkit","o"],t=a.cancelAnimationFrame,n=0;n<e.length&&!a.cancelAnimationFrame;++n)t=a["".concat(e[n],"CancelAnimationFrame")]||a["".concat(e[n],"CancelRequestAnimationFrame")];return t||(t=function(e){clearTimeout(e)}),i.bind(t,a)}()};return i.extend(f.prototype,p),e.Layout=f,f}}).call(this,n(1))},function(e,t){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(n=window)}e.exports=n}])});