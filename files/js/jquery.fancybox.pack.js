/*!
 * fancyBox - jQuery Plugin
 * version: 3.0.0 Beta 1 (Tue, 29 Jan 2013)
 * @requires jQuery v1.7 or later
 *
 * Examples at http://fancyapps.com/fancybox/
 * License: www.fancyapps.com/fancybox/#license
 *
 * Copyright 2013 Janis Skarnelis - janis@fancyapps.com
 *
 */

(function(e, t, n, r) { "use strict"; var i = n(e),
        s = n(t),
        o = n("html"); var u = n.fancybox = function() { u.open.apply(this, arguments) }; var a = u.isTouch = t.createTouch !== r || e.ontouchstart !== r; var f = function(e) { return e && e.hasOwnProperty && e instanceof n }; var l = function(e) { return e && n.type(e) === "string" }; var c = function(e) { return l(e) && e.indexOf("%") > 0 }; var h = function(e, t) { var n = parseFloat(e, 10) || 0; if (t && c(e)) { n = u.getViewport()[t] / 100 * n } return Math.ceil(n) }; var p = function(e, t) { return h(e, t) + "px" }; var d = Date.now || function() { return +(new Date) }; var v = function(e) { var t = l(e) ? n(e) : e; if (t && t.length) { t.removeClass("fancybox-wrap").stop(true).trigger("onReset").hide().unbind(); try { t.find("iframe").unbind().attr("src", a ? "" : "//about:blank");
                setTimeout(function() { t.empty().remove(); if (u.lock && !u.coming && !u.current) { var e, r;
                        n(".fancybox-margin").removeClass("fancybox-margin");
                        e = i.scrollTop();
                        r = i.scrollLeft();
                        o.removeClass("fancybox-lock");
                        u.lock.remove();
                        u.lock = null;
                        i.scrollTop(e).scrollLeft(r) } }, 150) } catch (r) {} } };
    n.extend(u, { version: "3.0.0", defaults: { theme: "default", padding: 15, margin: [30, 55, 30, 55], loop: true, arrows: true, closeBtn: true, expander: !a, caption: { type: "outside" }, overlay: { closeClick: true, speedIn: 0, speedOut: 250, showEarly: true, css: {} }, helpers: {}, width: 800, height: 450, minWidth: 100, minHeight: 100, maxWidth: 99999, maxHeight: 99999, aspectRatio: false, fitToView: true, autoHeight: true, autoWidth: true, autoResize: true, autoCenter: !a, topRatio: .5, leftRatio: .5, openEffect: "elastic", openSpeed: 350, openEasing: "easeOutQuad", closeEffect: "elastic", closeSpeed: 350, closeEasing: "easeOutQuad", nextEffect: "elastic", nextSpeed: 350, nextEasing: "easeOutQuad", prevEffect: "elastic", prevSpeed: 350, prevEasing: "easeOutQuad", autoPlay: false, playSpeed: 3e3, onCancel: n.noop, beforeLoad: n.noop, afterLoad: n.noop, beforeShow: n.noop, afterShow: n.noop, beforeClose: n.noop, afterClose: n.noop, ajax: { dataType: "html", headers: { "X-fancyBox": true } }, iframe: { scrolling: "auto", preload: true }, swf: { wmode: "transparent", allowfullscreen: "true", allowscriptaccess: "always" }, keys: { next: { 13: "left", 34: "up", 39: "left", 40: "up" }, prev: { 8: "right", 33: "down", 37: "right", 38: "down" }, close: [27], play: [32], toggle: [70] }, direction: { next: "left", prev: "right" }, tpl: { wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-inner"></div></div>', iframe: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen allowtransparency="true"></iframe>', error: '<p class="fancybox-error">{{ERROR}}</p>', closeBtn: '<a title="{{CLOSE}}" class="fancybox-close" href="javascript:;"></a>', next: '<a title="{{NEXT}}" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>', prev: '<a title="{{PREV}}" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>' }, locale: "en", locales: { en: { CLOSE: "Close", NEXT: "Next", PREV: "Previous", ERROR: "The requested content cannot be loaded. <br/> Please try again later.", EXPAND: "Display actual size", SHRINK: "Fit to the viewport", PLAY_START: "Start slideshow", PLAY_STOP: "Pause slideshow" }, de: { CLOSE: "Schliessen", NEXT: "Vorwärts", PREV: "Zurück", ERROR: "Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es später nochmal.", EXPAND: "", SHRINK: "", PLAY_START: "", PLAY_STOP: "" } }, index: 0, content: null, href: null, wrapCSS: "", modal: false, locked: true, preload: 3, mouseWheel: true, scrolling: "auto", scrollOutside: true }, current: null, coming: null, group: [], index: 0, isActive: false, isOpen: false, isOpened: false, isMaximized: false, player: { timer: null, isActive: false }, ajaxLoad: null, imgPreload: null, helpers: {}, open: function(e, t) { if (!e) { return } if (false === u.close(true)) { return } if (!n.isPlainObject(t)) { t = {} } u.opts = n.extend(true, {}, u.defaults, t);
            u.populate(e); if (u.group.length) { u._start(u.opts.index) } }, populate: function(e) { var t = []; if (!n.isArray(e)) { e = [e] } n.each(e, function(i, s) { var o = n.extend(true, {}, u.opts),
                    c, h, p, d, v; if (n.isPlainObject(s)) { c = s } else if (l(s)) { c = { href: s } } else if (f(s) || n.type(s) === "object" && s.nodeType) { h = n(s);
                    c = n(h).get(0); if (!c.href) { c = { href: s } } c = n.extend({ href: h.data("fancybox-href") || h.attr("href") || c.href, title: h.data("fancybox-title") || h.attr("title") || c.title, type: h.data("fancybox-type"), element: h }, h.data("fancybox-options")) } else { return } if (!c.type && (c.content || c.href)) { c.type = c.content ? "html" : u.guessType(h, c.href) } p = c.type || u.opts.type; if (p === "image" || p === "swf") { o.autoWidth = o.autoHeight = false;
                    o.scrolling = "visible" } if (p === "image") { o.aspectRatio = true } if (p === "iframe") { o.autoWidth = false;
                    o.scrolling = a ? "scroll" : "visible" } if (e.length < 2) { o.margin = 30 } c = n.extend(true, {}, o, c);
                d = c.margin;
                v = c.padding; if (n.type(d) === "number") { c.margin = [d, d, d, d] } if (n.type(v) === "number") { c.padding = [v, v, v, v] } if (c.modal) { n.extend(true, c, { closeBtn: false, closeClick: false, nextClick: false, arrows: false, mouseWheel: false, keys: null, overlay: { closeClick: false } }) } if (c.autoSize !== r) { c.autoWidth = c.autoHeight = !!c.autoSize } if (c.width === "auto") { c.autoWidth = true } if (c.height === "auto") { c.autoHeight = true } t.push(c) });
            u.group = u.group.concat(t) }, cancel: function() { var e = u.coming; if (!e || false === u.trigger("onCancel")) { return } u.hideLoading(); if (u.ajaxLoad) { u.ajaxLoad.abort() } if (u.imgPreload) { u.imgPreload.onload = u.imgPreload.onerror = null } if (e.wrap) { v(e.wrap) } u.ajaxLoad = u.imgPreload = u.coming = null; if (!u.current) { u._afterZoomOut(e) } }, close: function(e) { if (e && n.type(e) === "object") { e.preventDefault() } u.cancel(); if (!u.isActive || u.coming || false === u.trigger("beforeClose")) { return } u.unbind();
            u.isClosing = true; if (u.lock) { u.lock.css("overflow", "hidden") } if (!u.isOpen || e === true) { u._afterZoomOut() } else { u.isOpen = u.isOpened = false;
                u.transitions.close() } }, prev: function(e) { var t = u.current; if (t) { u.jumpto(t.index - 1, l(e) ? e : t.direction.prev) } }, next: function(e) { var t = u.current; if (t) { u.jumpto(t.index + 1, l(e) ? e : t.direction.next) } }, jumpto: function(e, t) { var n = u.current; if (!(u.coming && u.coming.index === e)) { u.cancel(); if (n.index == e) { t = null } else if (!t) { t = n.direction[e > n.index ? "next" : "prev"] } u.direction = t;
                u._start(e) } } });
    n.extend(u, { guessType: function(e, t) { var n = e && e.prop("class") ? e.prop("class").match(/fancybox\.(\w+)/) : 0,
                r = false; if (n) { return n[1] } if (l(t)) { if (t.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp)((\?|#).*)?$)/i)) { r = "image" } else if (t.match(/\.(swf)((\?|#).*)?$/i)) { r = "swf" } else if (t.charAt(0) === "#") { r = "inline" } } else if (l(e)) { r = "html" } return r }, trigger: function(e, t) { var r, i = t || u.coming || u.current; if (!i) { return } if (n.isFunction(i[e])) { r = i[e].apply(i, Array.prototype.slice.call(arguments, 1)) } if (r === false || e === "afterClose" && u.isActive) { return false } if (i.helpers) { n.each(i.helpers, function(t, r) { var s = u.helpers[t],
                        o; if (r && s && n.isFunction(s[e])) { o = n.extend(true, {}, s.defaults, r);
                        s.opts = o;
                        s[e](o, i) } }) } n.event.trigger(e) }, reposition: function(e, t) { var n = t || u.current,
                r = n && n.wrap,
                i; if (u.isOpen && r) { i = u._getPosition(n); if (e === false || e && e.type === "scroll") { r.stop(true).animate(i, 200).css("overflow", "visible") } else { r.css(i) } } }, update: function(e) { var t = e && e.type,
                r = d(),
                i = u.current,
                s; if (!i || !u.isOpen) { return } if (t === "scroll") { if (u.wrap.outerHeight(true) > u.getViewport().h) { return } if (u.didUpdate) { clearTimeout(u.didUpdate) } u.didUpdate = setTimeout(function() { u.reposition(e);
                    u.didUpdate = null }, 50); return } if (u.lock) { u.lock.css("overflow", "hidden") } u._setDimension();
            u.reposition(e); if (u.lock) { u.lock.css("overflow", "auto") } if (i.caption.type === "float") { s = u.getViewport().w - (u.wrap.outerWidth(true) - u.inner.width());
                i.caption.wrap.css("width", s).css("marginLeft", (s * .5 - u.inner.width() * .5) * -1) } if (i.expander) { if (i.canShrink) { n(".fancybox-expand").show().attr("title", i.locales[i.locale].SHRINK) } else if (i.canExpand) { n(".fancybox-expand").show().attr("title", i.locales[i.locale].EXPAND) } else { n(".fancybox-expand").hide() } } u.trigger("onUpdate") }, toggle: function(e) { var t = u.current; if (t && u.isOpen) { u.current.fitToView = n.type(e) === "boolean" ? e : !u.current.fitToView;
                u.update(true) } }, hideLoading: function() { n("#fancybox-loading").remove() }, showLoading: function() { var e, t;
            u.hideLoading();
            e = n('<div id="fancybox-loading"></div>').click(u.cancel).appendTo("body"); if (!u.defaults.fixed) { t = u.getViewport();
                e.css({ position: "absolute", top: t.h * .5 + t.y, left: t.w * .5 + t.x }) } }, getViewport: function() { var t; if (u.lock) { t = { x: u.lock.scrollLeft(), y: u.lock.scrollTop(), w: u.lock[0].clientWidth, h: u.lock[0].clientHeight } } else { t = { x: i.scrollLeft(), y: i.scrollTop(), w: a && e.innerWidth ? e.innerWidth : i.width(), h: a && e.innerHeight ? e.innerHeight : i.height() } } return t }, unbind: function() { if (f(u.wrap)) { u.wrap.unbind(".fb") } if (f(u.inner)) { u.inner.unbind(".fb") } s.unbind(".fb");
            i.unbind(".fb") }, rebind: function() { var e = u.current,
                t;
            u.unbind(); if (!e || !u.isOpen) { return } i.bind("orientationchange.fb" + (a ? "" : " resize.fb") + (e.autoCenter && !e.locked ? " scroll.fb" : ""), u.update);
            t = e.keys; if (t) { s.bind("keydown.fb", function(i) { var s = i.which || i.keyCode,
                        o = i.target || i.srcElement; if (s === 27 && u.coming) { return false } if (!i.ctrlKey && !i.altKey && !i.shiftKey && !i.metaKey && !(o && (o.type || n(o).is("[contenteditable]")))) { n.each(t, function(t, o) { if (o[s] !== r) { i.preventDefault(); if (e.group.length > 1) { u[t](o[s]) } return false } if (n.inArray(s, o) > -1) { i.preventDefault(); if (t === "play") { u.slideshow.toggle() } else { u[t]() } return false } }) } }) } u.lastScroll = d(); if (e.mouseWheel && u.group.length > 1) { u.wrap.bind("DOMMouseScroll.fb mousewheel.fb MozMousePixelScroll.fb", function(e) { var t = e.originalEvent,
                        n = t.target || 0,
                        r = t.wheelDelta || t.detail || 0,
                        i = t.wheelDeltaX || 0,
                        s = t.wheelDeltaY || 0,
                        o = d(); if (n && n.style && !(n.style.overflow && n.style.overflow === "hidden") && (n.clientWidth && n.scrollWidth > n.clientWidth || n.clientHeight && n.scrollHeight > n.clientHeight)) { return } if (r === 0 || u.current && u.current.canShrink) { return } t.stopPropagation(); if (u.lastScroll && o - u.lastScroll < 80) { u.lastScroll = o; return } u.lastScroll = o; if (t.axis) { if (t.axis === t.HORIZONTAL_AXIS) { i = r * -1 } else if (t.axis === t.VERTICAL_AXIS) { s = r * -1 } } if (i === 0) { if (s > 0) { u.prev("down") } else { u.next("up") } } else { if (i > 0) { u.prev("right") } else { u.next("left") } } }) } u.touch.init() }, rebuild: function() { var e = u.current;
            e.wrap.find(".fancybox-nav, .fancybox-close, .fancybox-expand").remove(); if (e.arrows && u.group.length > 1) { if (e.loop || e.index > 0) { n(u._translate(e.tpl.prev)).appendTo(u.inner).bind("click.fb", u.prev) } if (e.loop || e.index < u.group.length - 1) { n(u._translate(e.tpl.next)).appendTo(u.inner).bind("click.fb", u.next) } } if (e.closeBtn) { n(u._translate(e.tpl.closeBtn)).appendTo(u.wrap).bind("click.fb", u.close) } if (e.expander && e.type === "image") { n('<a title="Expand image" class="fancybox-expand" href="javascript:;"></a>').appendTo(u.inner).bind("click.fb", u.toggle); if (!e.canShrink && !e.canExpand) {} } }, _start: function(e) { var t, r; if (u.opts.loop) { if (e < 0) { e = u.group.length + e % u.group.length } e = e % u.group.length } t = u.group[e]; if (!t) { return false } t = n.extend(true, {}, u.opts, t);
            t.group = u.group;
            t.index = e;
            u.coming = t; if (false === u.trigger("beforeLoad")) { u.coming = null; return } u.isActive = true;
            u._build();
            s.bind("keydown.loading", function(e) { if ((e.which || e.keyCode) === 27) { s.unbind(".loading");
                    e.preventDefault();
                    u.cancel() } }); if (t.overlay && t.overlay.showEarly) { u.overlay.open(t.overlay) } r = t.type; if (r === "image") { u._loadImage() } else if (r === "ajax") { u._loadAjax() } else if (r === "iframe") { u._loadIframe() } else if (r === "inline") { u._loadInline() } else if (r === "html" || r === "swf") { u._afterLoad() } else { u._error() } }, _build: function() { var e = u.coming,
                t = e.caption.type,
                r, a, f, l;
            e.wrap = r = n('<div class="fancybox-wrap"></div>').appendTo(e.parent || "body").addClass("fancybox-" + e.theme);
            e.inner = a = n('<div class="fancybox-inner"></div>').appendTo(r);
            e[t === "outside" || t === "float" ? "inner" : "wrap"].addClass("fancybox-skin fancybox-" + e.theme + "-skin"); if (e.locked && e.overlay && u.defaults.fixed) { if (!u.lock) { u.lock = n('<div id="fancybox-lock"></div>').appendTo(r.parent()) } u.lock.unbind().append(r); if (e.overlay.closeClick) { u.lock.click(function(e) { if (n(e.target).is(u.lock)) { u.close() } }) } if (s.height() > i.height() || o.css("overflow-y") === "scroll") { n("*:visible").filter(function() { return n(this).css("position") === "fixed" && !n(this).hasClass("fancybox-overlay") && n(this).attr("id") !== "fancybox-lock" }).addClass("fancybox-margin");
                    o.addClass("fancybox-margin") } f = i.scrollTop();
                l = i.scrollLeft();
                o.addClass("fancybox-lock");
                i.scrollTop(f).scrollLeft(l) } u.trigger("onReady") }, _error: function(e) { if (!u.coming) { return } n.extend(u.coming, { type: "html", autoWidth: true, autoHeight: true, closeBtn: true, minWidth: 0, minHeight: 0, padding: [15, 15, 15, 15], scrolling: "visible", hasError: e, content: u._translate(u.coming.tpl.error) });
            u._afterLoad() }, _loadImage: function() { var e = u.imgPreload = new Image;
            e.onload = function() { this.onload = this.onerror = null;
                n.extend(u.coming, { width: this.width, height: this.height, content: n(this).addClass("fancybox-image") });
                u._afterLoad() };
            e.onerror = function() { this.onload = this.onerror = null;
                u._error("image") };
            e.src = u.coming.href; if (e.complete !== true || e.width < 1) { u.showLoading() } }, _loadAjax: function() { var e = u.coming,
                t = e.href,
                r, i;
            r = t.split(/\s+/, 2);
            t = r.shift();
            i = r.shift();
            u.showLoading();
            u.ajaxLoad = n.ajax(n.extend({}, e.ajax, { url: e.href, error: function(e, t) { if (u.coming && t !== "abort") { u._error("ajax", e) } else { u.hideLoading() } }, success: function(t, r) { if (r === "success") { if (i) { t = n("<div>").html(t).find(i) } e.content = t;
                        u._afterLoad() } } })) }, _loadIframe: function() { var e = u.coming,
                t;
            e.content = t = n(e.tpl.iframe.replace(/\{rnd\}/g, (new Date).getTime())).attr("scrolling", a ? "auto" : e.iframe.scrolling); if (e.iframe.preload) { u.showLoading();
                u._setDimension(e);
                e.wrap.addClass("fancybox-tmp");
                t.one("load.fb", function() { if (e.iframe.preload) { n(this).data("ready", 1);
                        n(this).bind("load.fb", u.update);
                        u._afterLoad() } }) } t.attr("src", e.href).appendTo(e.inner); if (!e.iframe.preload) { u._afterLoad() } else if (t.data("ready") !== 1) { u.showLoading() } }, _loadInline: function() { var e = u.coming,
                t = e.href;
            e.content = n(l(t) ? t.replace(/.*(?=#[^\s]+$)/, "") : t); if (e.content.length) { u._afterLoad() } else { u._error() } }, _preloadImages: function() { var e = u.group,
                t = u.current,
                n = e.length,
                r = t.preload ? Math.min(t.preload, n - 1) : 0,
                i, s; for (s = 1; s <= r; s += 1) { i = e[(t.index + s) % n]; if (i && i.type === "image" && i.href) {
                    (new Image).src = i.href } } }, _afterLoad: function() { var e = u.coming,
                t = u.current;
            s.unbind(".loading"); if (!e || u.isActive === false || false === u.trigger("afterLoad", e, t)) { u.hideLoading(); if (e && e.wrap) { v(e.wrap) } if (!t) { u._afterZoomOut(e) } u.coming = null; return } n.extend(u, { wrap: e.wrap.addClass("fancybox-type-" + e.type + " fancybox-" + (a ? "mobile" : "desktop") + " fancybox-" + e.theme + "-" + (a ? "mobile" : "desktop") + " " + e.wrapCSS), inner: e.inner, current: e, previous: t });
            u._prepare();
            u.trigger("beforeShow", e, t);
            u.isOpen = false;
            u.coming = null;
            u._setDimension();
            u.hideLoading(); if (e.overlay && !u.overlay.el) { u.overlay.open(e.overlay) } u.transitions.open() }, _prepare: function() { var e = u.current,
                t = e.content || "",
                r = e.wrap,
                i = e.inner,
                s = e.margin,
                o = e.padding,
                a = e.href,
                c = e.type,
                h = e.scrolling,
                d = e.caption,
                v = e.title,
                m = d.type,
                g = "fancybox-placeholder",
                y = "fancybox-display",
                b; if (c !== "iframe" && f(t) && t.length) { if (!t.data(g)) { t.data(y, t.css("display")).data(g, n('<div class="' + g + '"></div>').insertAfter(t).hide()) } t = t.show().detach();
                e.wrap.bind("onReset", function() { if (n(this).find(t).length) { t.css("display", t.data(y)).replaceAll(t.data(g)).data(g, false).data(y, false) } }) } if (c === "swf") { t = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + a + '"></param>';
                b = "";
                n.each(e.swf, function(e, n) { t += '<param name="' + e + '" value="' + n + '"></param>';
                    b += " " + e + '="' + n + '"' });
                t += '<embed src="' + a + '" type="application/x-shockwave-flash" width="100%" height="100%"' + b + "></embed></object>" } if (!(f(t) && t.parent().is(e.inner))) { e.inner.append(t);
                e.content = e.inner.children(":last") } n.each(["Top", "Right", "Bottom", "Left"], function(e, t) { if (s[e]) { r.css("margin" + t, p(s[e])) } if (o[e]) { if (!(t === "Bottom" && m === "outside")) { r.css("padding" + t, p(o[e])) } if (m === "outside" || m === "float") { i.css("border" + t + "Width", p(o[e])); if (t === "Top" || t === "Left") { i.css("margin" + t, p(o[e] * -1)) } } } }); if (n.isFunction(v)) { v = v.call(e.element, e) } if (l(v) && n.trim(v) !== "") { e.caption.wrap = n('<div class="fancybox-title fancybox-title-' + m + '-wrap">' + v + "</div>").appendTo(e[m === "over" ? "inner" : "wrap"]); if (m === "float") { e.caption.wrap.width(u.getViewport().w - (u.wrap.outerWidth(true) - u.inner.width())).wrapInner("<div></div>") } } }, _setDimension: function(e) { var t = u.getViewport(),
                n = e || u.current,
                r = n.wrap,
                i = n.inner,
                s = n.width,
                o = n.height,
                a = n.minWidth,
                l = n.minHeight,
                d = n.maxWidth,
                v = n.maxHeight,
                m = n.margin,
                g = n.scrollOutside ? n.scrollbarWidth : 0,
                m = n.margin,
                y = n.padding,
                b = n.scrolling,
                w = 1,
                E, S, x, T, N, C, k, L, A, O, M, _, D, P, H;
            b = b.split(",");
            E = b[0];
            S = b[1] || E;
            n.inner.css("overflow-x", E === "yes" ? "scroll" : E === "no" ? "hidden" : E).css("overflow-y", S === "yes" ? "scroll" : S === "no" ? "hidden" : S);
            T = m[1] + m[3] + y[1] + y[3];
            x = m[0] + m[2] + y[0] + y[2];
            a = h(c(a) ? h(a, "w") - T : a);
            d = h(c(d) ? h(d, "w") - T : d);
            l = h(c(l) ? h(l, "h") - x : l);
            v = h(c(v) ? h(v, "h") - x : v);
            N = h(c(s) ? h(s, "w") - T : s);
            C = h(c(o) ? h(o, "h") - x : o); if (n.fitToView) { d = Math.min(d, h("100%", "w") - T);
                v = Math.min(v, h("100%", "h") - x) } O = t.w;
            M = t.h; if (n.type === "iframe") { L = n.content;
                r.removeClass("fancybox-tmp"); if ((n.autoWidth || n.autoHeight) && L && L.data("ready") === 1) { try { if (L[0].contentWindow && L[0].contentWindow.document.location) { A = L.contents().find("body");
                            i.addClass("fancybox-tmp");
                            i.width(screen.width - T).height(99999); if (g) { A.css("overflow-x", "hidden") } if (n.autoWidth) { N = A.outerWidth(true) } if (n.autoHeight) { C = A.outerHeight(true) } i.removeClass("fancybox-tmp") } } catch (B) {} } } else if ((n.autoWidth || n.autoHeight) && !(n.type === "image" || n.type === "swf")) { i.addClass("fancybox-tmp"); if (n.autoWidth) { i.width("auto") } else { i.width(d) } if (n.autoHeight) { i.height("auto") } else { i.height(v) } if (n.autoWidth) { N = i[0].scrollWidth || i.width() } if (n.autoHeight) { C = i[0].scrollHeight || i.height() } i.removeClass("fancybox-tmp") } s = N;
            o = C;
            k = N / C; if (!n.autoResize) { r.css({ width: p(s), height: "auto" });
                i.css({ width: p(s), height: p(o) }); return } if (n.aspectRatio) { if (s > d) { s = d;
                    o = s / k } if (o > v) { o = v;
                    s = o * k } if (s < a) { s = a;
                    o = s / k } if (o < l) { o = l;
                    s = o * k } } else { s = Math.max(a, Math.min(s, d)); if (n.autoHeight && n.type !== "iframe") { i.width(s);
                    C = o = i[0].scrollHeight } o = Math.max(l, Math.min(o, v)) } r.css({ width: p(s), height: "auto" });
            i.css({ width: p(s), height: p(o) });
            _ = h(r.outerWidth(true));
            D = h(r.outerHeight(true)); if (n.fitToView) { if (n.aspectRatio) { while ((_ > O || D > M) && s > a && o > l) { if (w++ > 30) { break } o = Math.max(l, Math.min(v, o - 10));
                        s = h(o * k); if (s < a) { s = a;
                            o = h(s / k) } if (s > d) { s = d;
                            o = h(s / k) } r.css({ width: p(s) });
                        i.css({ width: p(s), height: p(o) });
                        _ = h(r.outerWidth(true));
                        D = h(r.outerHeight(true)) } } else { s = Math.max(a, Math.min(s, s - (_ - O)));
                    o = Math.max(l, Math.min(o, o - (D - M))) } } if (g && E === "auto" && (o < i[0].scrollHeight || f(n.content) && n.content[0] && o < n.content[0].offsetHeight) && s + T + g < d) { s += g } r.css({ width: s });
            i.css({ width: p(s), height: p(o) });
            _ = h(r.outerWidth(true));
            D = h(r.outerHeight(true));
            P = (_ > O || D > M) && s > a && o > l;
            H = (_ < O || D < M) && (n.aspectRatio ? s < d && o < v && s < N && o < C : (s < d || o < v) && (s < N || o < C));
            n.canShrink = P;
            n.canExpand = H; if (!L && n.autoHeight && o > l && o < v && !H) { i.height("auto") } }, _getPosition: function(e) { var t = e || u.current,
                n = t.wrap,
                r = u.getViewport(),
                i = {},
                s = r.y,
                o = r.x;
            i = { top: p(Math.max(s, s + (r.h - n.outerHeight(true)) * t.topRatio)), left: p(Math.max(o, o + (r.w - n.outerWidth(true)) * t.leftRatio)), width: p(n.width()), height: p(n.height()) }; return i }, _afterZoomIn: function() { var e = u.current; if (!e) { return } if (u.lock) { u.lock.css("overflow", "auto") } u.isOpen = u.isOpened = true;
            u.rebuild();
            u.rebind(); if (e.caption && e.caption.wrap) { e.caption.wrap.show().css({ visibility: "visible", opacity: 0, left: 0 }).animate({ opacity: 1 }, "fast") } u.update();
            u.wrap.css("overflow", "visible").addClass("fancybox-open").focus();
            u[u.wrap.hasClass("fancybox-skin") ? "wrap" : "inner"].addClass("fancybox-" + e.theme + "-skin-open"); if (e.caption && e.caption.wrap) { e.caption.wrap.show().css("left", 0).animate({ opacity: 1 }, "fast") } if (e.margin[2] > 0) { n('<div class="fancybox-spacer"></div>').css("height", p(e.margin[2] - 2)).appendTo(u.wrap) } u.trigger("afterShow");
            u._preloadImages(); if (e.autoPlay && !u.slideshow.isActive) { u.slideshow.start() } }, _afterZoomOut: function(e) { var t = function() { v(".fancybox-wrap") };
            u.hideLoading();
            e = e || u.current; if (e && e.wrap) { e.wrap.hide() } n.extend(u, { group: [], opts: {}, coming: null, current: null, isActive: false, isOpened: false, isOpen: false, isClosing: false, wrap: null, skin: null, inner: null });
            u.trigger("afterClose", e); if (!u.coming && !u.current) { if (e.overlay) { u.overlay.close(e.overlay, t) } else { t() } } }, _translate: function(e) { var t = u.coming || u.current,
                n = t.locales[t.locale]; return e.replace(/\{\{(\w+)\}\}/g, function(e, t) { var i = n[t]; if (i === r) { return e } return i }) } });
    u.transitions = { _getOrig: function(e) { var t = e || u.current,
                n = t.wrap,
                r = t.element,
                s = t.orig,
                o = u.getViewport(),
                a = {},
                l = 50,
                c = 50; if (!s && r && r.is(":visible")) { s = r.find("img:first:visible"); if (!s.length) { s = r } } if (!s && t.group[0].element) { s = t.group[0].element.find("img:visible:first") } if (f(s) && s.is(":visible")) { a = s.offset(); if (s.is("img")) { l = s.outerWidth();
                    c = s.outerHeight() } if (u.lock) { a.top -= i.scrollTop();
                    a.left -= i.scrollLeft() } } else { a.top = o.y + (o.h - c) * t.topRatio;
                a.left = o.x + (o.w - l) * t.leftRatio } a = { top: p(a.top - (n.outerHeight(true) - n.height()) * .5), left: p(a.left - (n.outerWidth(true) - n.width()) * .5), width: p(l), height: p(c) }; return a }, _getCenter: function(e) { var t = e || u.current,
                n = t.wrap,
                r = u.getViewport(),
                i = {},
                s = r.y,
                o = r.x;
            i = { top: p(Math.max(s, s + (r.h - n.outerHeight(true)) * t.topRatio)), left: p(Math.max(o, o + (r.w - n.outerWidth(true)) * t.leftRatio)), width: p(n.width()), height: p(n.height()) }; return i }, _prepare: function(e, t) { var n = e || u.current,
                r = n.wrap,
                i = n.inner;
            r.height(r.height());
            i.css({ width: i.width() * 100 / r.width() + "%", height: Math.floor(i.height() * 100 / r.height() * 100) / 100 + "%" }); if (t === true) { r.find(".fancybox-title, .fancybox-spacer, .fancybox-close, .fancybox-nav").remove() } i.css("overflow", "hidden") }, fade: function(e, t) { var r = this._getCenter(e),
                i = { opacity: 0 }; return t === "open" || t === "changeIn" ? [n.extend(r, i), { opacity: 1 }] : [{}, i] }, drop: function(e, t) { var r = n.extend(this._getCenter(e), { opacity: 1 }),
                i = n.extend({}, r, { opacity: 0, top: p(Math.max(u.getViewport().y - e.margin[0], h(r.top) - 200)) }); return t === "open" || t === "changeIn" ? [i, r] : [{}, i] }, elastic: function(e, t) { var r = e.wrap,
                i = e.margin,
                s = u.getViewport(),
                o = u.direction,
                a = this._getCenter(e),
                f = n.extend({}, a),
                l = n.extend({}, a),
                c, p, d; if (t === "open") { f = this._getOrig(e) } else if (t === "close") { f = {};
                l = this._getOrig(e) } else if (o) { c = o === "up" || o === "down" ? "top" : "left";
                p = o === "up" || o === "left" ? 200 : -200; if (t === "changeIn") { d = h(f[c]) + p; if (o === "left") { d = Math.min(d, s.x + s.w - i[3] - r.outerWidth() - 1) } else if (o === "right") { d = Math.max(d, s.x - i[1]) } else if (o === "up") { d = Math.min(d, s.y + s.h - i[0] - r.outerHeight() - 1) } else { d = Math.max(d, s.y - i[2]) } f[c] = d } else { d = h(r.css(c)) - p;
                    f = {}; if (o === "left") { d = Math.max(d, s.x - i[3]) } else if (o === "right") { d = Math.min(d, s.x + s.w - i[1] - r.outerWidth() - 1) } else if (o === "up") { d = Math.max(d, s.y - i[0]) } else { d = Math.min(d, s.y + s.h - i[2] - r.outerHeight() - 1) } l[c] = d } } if (t === "open" || t === "changeIn") { f.opacity = 0;
                l.opacity = 1 } else { l.opacity = 0 } return [f, l] }, open: function() { var e = u.current,
                t = u.previous,
                r = u.direction,
                i, s, o, a, f; if (t) { t.wrap.stop(true).removeClass("fancybox-opened") } if (u.isOpened) { i = e.nextEffect, o = e.nextSpeed;
                a = e.nextEasing;
                f = "changeIn" } else { i = e.openEffect;
                o = e.openSpeed;
                a = e.openEasing;
                f = "open" } if (i === "none") { u._afterZoomIn() } else { s = this[i](e, f); if (i === "elastic") { this._prepare(e) } e.wrap.css(s[0]);
                e.wrap.animate(s[1], o, a, u._afterZoomIn) } if (t) { if (!u.isOpened || t.prevEffect === "none") { v(n(".fancybox-wrap").not(e.wrap)) } else { t.wrap.stop(true).removeClass("fancybox-opened");
                    s = this[t.prevEffect](t, "changeOut");
                    this._prepare(t, true);
                    t.wrap.animate(s[1], t.prevSpeed, t.prevEasing, function() { v(t.wrap) }) } } }, close: function() { var e = u.current,
                t = e.wrap.stop(true).removeClass("fancybox-opened"),
                n = e.closeEffect,
                r; if (n === "none") { return u._afterZoomOut() } this._prepare(e, true);
            r = this[n](e, "close");
            t.addClass("fancybox-animating").animate(r[1], e.closeSpeed, e.closeEasing, u._afterZoomOut) } };
    u.slideshow = { _clear: function() { if (this._timer) { clearTimeout(this._timer) } }, _set: function() { this._clear(); if (u.current && this.isActive) { this._timer = setTimeout(u.next, this._speed) } }, _timer: null, _speed: null, isActive: false, start: function(e) { var t = u.current; if (t && (t.loop || t.index < t.group.length - 1)) { this.stop();
                this.isActive = true;
                this._speed = e || t.playSpeed;
                s.bind({ "beforeLoad.player": n.proxy(this._clear, this), "onUpdate.player": n.proxy(this._set, this), "onCancel.player beforeClose.player": n.proxy(this.stop, this) });
                this._set();
                u.trigger("onPlayStart") } }, stop: function() { this._clear();
            s.unbind(".player");
            this.isActive = false;
            this._timer = this._speed = null;
            u.trigger("onPlayEnd") }, toggle: function() { if (this.isActive) { this.stop() } else { this.start.apply(this, arguments) } } };
    u.overlay = { el: null, theme: "", open: function(e) { var t = this,
                r = this.el,
                s = u.defaults.fixed,
                o, a;
            e = n.extend({}, u.defaults.overlay, e); if (r) { r.stop(true).removeAttr("style").unbind(".overlay") } else { r = n('<div class="fancybox-overlay' + (s ? " fancybox-overlay-fixed" : "") + '"></div>').appendTo(e.parent || "body") } if (e.closeClick) { r.bind("click.overlay", function(e) { if (u.lastTouch && d() - u.lastTouch < 300) { return false } if (u.isActive) { u.close() } else { t.close() } return false }) } a = e.theme || (u.coming ? u.coming.theme : "default"); if (a !== this.theme) { r.removeClass("fancybox-" + this.theme + "-overlay") } this.theme = a;
            r.addClass("fancybox-" + a + "-overlay").css(e.css);
            o = r.css("opacity"); if (!this.el && o < 1 && e.speedIn) { r.css({ opacity: 0, filter: "alpha(opacity=0)" }).fadeTo(e.speedIn, o) } this.el = r; if (!s) { i.bind("resize.overlay", n.proxy(this.update, this));
                this.update() } }, close: function(e, t) { e = n.extend({}, u.defaults.overlay, e); if (this.el) { this.el.stop(true).fadeOut(e.speedOut, function() { i.unbind("resize.overlay");
                    n(".fancybox-overlay").remove();
                    u.overlay.el = null; if (n.isFunction(t)) { t() } }) } }, update: function() { this.el.css({ width: "100%", height: "100%" });
            this.el.width(s.width()).height(s.height()) } };
    u.touch = { startX: 0, wrapX: 0, dx: 0, isMoving: false, _start: function(e) { var t = u.current,
                r = e.originalEvent.touches ? e.originalEvent.touches[0] : e,
                i = d(); if (!u.isOpen || u.wrap.is(":animated") || !(n(e.target).is(u.inner) || n(e.target).parent().is(u.inner))) { return } if (u.lastTouch && i - u.lastTouch < 300) { e.preventDefault();
                u.lastTouch = i;
                this._cancel(true);
                u.toggle(); return false } u.lastTouch = i; if (u.wrap && u.wrap.outerWidth() > u.getViewport().w) { return } e.preventDefault(); if (r && u.wrap && u.wrap.outerWidth() < u.getViewport().w) { this.startX = r.pageX;
                this.wrapX = u.wrap.position().left;
                this.isMoving = true;
                u.inner.bind("touchmove.fb", n.proxy(this._move, this)).one("touchend.fb touchcancel.fb", n.proxy(this._cancel, this)) } }, _move: function(e) { var t = e.originalEvent.touches ? e.originalEvent.touches[0] : e,
                n = this.startX - t.pageX; if (!this.isMoving || !u.isOpen) { return } this.dx = n; if (u.current.wrap.outerWidth(true) <= i.width()) { if (Math.abs(n) >= 50) { e.preventDefault();
                    this.last = 0;
                    this._cancel(true); if (n > 0) { u.next("left") } else { u.prev("right") } } else if (Math.abs(n) > 3) { e.preventDefault();
                    this.last = 0;
                    u.wrap.css("left", this.wrapX - n) } } }, _clear: function() { this.startX = this.wrapX = this.dx = 0;
            this.isMoving = false }, _cancel: function(e) { if (u.inner) { u.inner.unbind("touchmove.fb") } if (u.isOpen && Math.abs(this.dx) > 3) { u.reposition(false) } this._clear() }, init: function() { var e = this; if (u.inner && u.touch) { this._cancel(true);
                u.inner.bind("touchstart.fb", n.proxy(this._start, this)) } } }; if (!n.easing.easeOutQuad) { n.easing.easeOutQuad = function(e, t, n, r, i) { return -r * (t /= i) * (t - 2) + n } } s.ready(function() { var t, s, a, f; if (n.scrollbarWidth === r) { n.scrollbarWidth = function() { var e = n('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),
                    t = e.children(),
                    r = t.innerWidth() - t.height(99).innerWidth();
                e.remove(); return r } } if (n.support.fixedPosition === r) { n.support.fixedPosition = function() { var e = n('<div style="position:fixed;top:20px;padding:0;margin:0;border:0;"></div>').appendTo("body"),
                    t = e.css("position") === "fixed" && (e[0].offsetTop > 18 && e[0].offsetTop < 22 || e[0].offsetTop === 15);
                e.remove(); return t }() } n.extend(u.defaults, { scrollbarWidth: n.scrollbarWidth(), fixed: n.support.fixedPosition, parent: n("body") });
        a = i.scrollTop();
        f = i.scrollLeft();
        t = n(e).width();
        o.addClass("fancybox-lock-test");
        s = n(e).width();
        o.removeClass("fancybox-lock-test");
        i.scrollTop(a).scrollLeft(f);
        u.lockMargin = s - t;
        n("<style type='text/css'>.fancybox-margin{margin-right:" + u.lockMargin + "px;}</style>").appendTo("head"); if (n("script[src*='jquery.fancybox.js']").attr("src").match(/autorun/)) { n("a[href$='.jpg'],a[href$='.png'],a[href$='.gif'],.fancybox").attr("data-fancybox-group", "gallery").fancybox() } });
    n.fn.fancybox = function(e) { var t = this,
            r = this.length ? this.selector : false,
            i = r && r.indexOf("()") < 0 && !(e && e.live === false); var o = function(s) { var o = i ? n(r) : t,
                a = n(this).blur(),
                f = e.groupAttr || "data-fancybox-group",
                l = a.attr(f),
                c = this.rel; if (!l && c && c !== "nofollow") { f = "rel";
                l = c } if (l) { a = o.filter("[" + f + '="' + l + '"]');
                e.index = a.index(this) } if (a.length) { s.preventDefault();
                u.open(a.get(), e) } };
        e = e || {}; if (i) { s.undelegate(r, "click.fb-start").delegate(r + ":not('.fancybox-close,.fancybox-nav,.fancybox-wrap')", "click.fb-start", o) } else { t.unbind("click.fb-start").bind("click.fb-start", o) } return this } })(window, document, jQuery)