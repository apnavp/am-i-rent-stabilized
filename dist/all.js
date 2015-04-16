!function(){"use strict";var a=["html","json","jsonp","script"],b=["connect","delete","get","head","options","patch","post","put","trace"],c=function f(){var a={},b={},c={url:function(a){return h.call(this,"url",a,d.string)},sync:function(a){return h.call(this,"sync",a,d.bool)},cache:function(a){return h.call(this,"cache",a,d.bool)},type:function(a){return h.call(this,"type",a,d.type)},header:function(b,c){return a.headers=a.headers||{},d.string(b),"undefined"!=typeof c?(d.string(c),a.headers[b]=c,this):a.headers[b]},auth:function(b,c){return d.string(b),d.string(c),a.auth={user:b,passwd:c},this},method:function(a){return h.call(this,"method",a,d.method)},queryString:function(a){return h.call(this,"queryString",a,d.queryString)},data:function(a){return h.call(this,"data",a,d.plainObject)},body:function(a){return h.call(this,"body",a,null,function(a){if("object"==typeof a){if(!(a instanceof FormData)){try{a=JSON.stringify(a)}catch(b){throw new TypeError("Unable to stringify body's content : "+b.name)}this.header("Content-Type","application/json")}}else a+="";return a})},into:function(a){return h.call(this,"into",a,d.selector,function(a){return"string"==typeof a?document.querySelectorAll(a):a instanceof HTMLElement?[a]:void 0})},jsonPaddingName:function(a){return h.call(this,"jsonPaddingName",a,d.string)},jsonPadding:function(a){return h.call(this,"jsonPadding",a,d.func)},on:function(a,c){return"function"==typeof c&&(b[a]=b[a]||[],b[a].push(c)),this},off:function(a){return b[a]=[],this},trigger:function(a,c){var d=this,e=function(a,c){b[a]instanceof Array&&b[a].forEach(function(a){a.call(d,c)})};if("undefined"!=typeof a){a+="";var f=/^([0-9])([0-9x])([0-9x])$/i,g=a.match(f);g&&g.length>3?Object.keys(b).forEach(function(a){var b=a.match(f);!(b&&b.length>3&&g[1]===b[1])||"x"!==b[2]&&g[2]!==b[2]||"x"!==b[3]&&g[3]!==b[3]||e(a,c)}):b[a]&&e(a,c)}return this},go:function(){var b=a.type||(a.into?"html":"json"),c=j();return"function"==typeof g[b]?g[b].call(this,c):void 0}},g={json:function(a){var b=this;g._xhr.call(this,a,function(a){if(a)try{a=JSON.parse(a)}catch(c){return b.trigger("error",c),null}return a})},html:function(b){g._xhr.call(this,b,function(b){return a.into&&a.into.length&&[].forEach.call(a.into,function(a){a.innerHTML=b}),b})},_xhr:function(b,c){var d,e,f,g,h=this,j=a.method||"get",k=a.sync!==!0,l=new XMLHttpRequest,m=a.data,n=a.body,o=(a.headers||{},this.header("Content-Type"));if(!o&&m&&i()&&(this.header("Content-Type","application/x-www-form-urlencoded;charset=utf-8"),o=this.header("Content-Type")),m&&i())if("string"!=typeof n&&(n=""),o.indexOf("json")>-1)try{n=JSON.stringify(m)}catch(p){throw new TypeError("Unable to stringify body's content : "+p.name)}else{f=o&&o.indexOf("x-www-form-urlencoded")>1;for(d in m)n+=f?encodeURIComponent(d)+"="+encodeURIComponent(m[d])+"&":d+"="+m[d]+"\n\r"}g=[j,b,k],a.auth&&(g.push(a.auth.user),g.push(a.auth.passwd)),l.open.apply(l,g);for(e in a.headers)l.setRequestHeader(e,a.headers[e]);l.onprogress=function(a){a.lengthComputable&&h.trigger("progress",a.loaded/a.total)},l.onload=function(){var a=l.responseText;this.status>=200&&this.status<300&&("function"==typeof c&&(a=c(a)),h.trigger("success",a)),h.trigger(this.status,a),h.trigger("end",a)},l.onerror=function(a){h.trigger("error",a,arguments)},l.send(n)},jsonp:function(b){var c,d=this,g=document.querySelector("head"),h=a.sync!==!0,i=a.jsonPaddingName||"callback",j=a.jsonPadding||"_padd"+(new Date).getTime()+Math.floor(1e4*Math.random()),k={};if(f[j])throw new Error("Padding "+j+"  already exists. It must be unique.");/^ajajsonp_/.test(j)||(j="ajajsonp_"+j),window[j]=function(a){d.trigger("success",a),g.removeChild(c),window[j]=void 0},k[i]=j,b=e(b,k),c=document.createElement("script"),c.async=h,c.src=b,c.onerror=function(){d.trigger("error",arguments),g.removeChild(c),window[j]=void 0},g.appendChild(c)},script:function(b){var c,d=this,e=document.querySelector("head")||document.querySelector("body"),f=a.sync!==!0;if(!e)throw new Error("Ok, wait a second, you want to load a script, but you don't have at least a head or body tag...");c=document.createElement("script"),c.async=f,c.src=b,c.onerror=function(){d.trigger("error",arguments),e.removeChild(c)},c.onload=function(){d.trigger("success",arguments)},e.appendChild(c)}},h=function(b,c,e,f){if("undefined"!=typeof c){if("function"==typeof e)try{c=e.call(d,c)}catch(g){throw new TypeError("Failed to set "+b+" : "+g.message)}return a[b]="function"==typeof f?f.call(this,c):c,this}return"undefined"===a[b]?null:a[b]},i=function(){return["delete","patch","post","put"].indexOf(a.method)>-1},j=function(){var b=a.url,c="undefined"!=typeof a.cache?!!a.cache:!0,d=a.queryString||"",f=a.data;return c===!1&&(d+="&ajabuster="+(new Date).getTime()),b=e(b,d),f&&!i()&&(b=e(b,f)),b};return c},d={bool:function(a){return!!a},string:function(a){if("string"!=typeof a)throw new TypeError("a string is expected, but "+a+" ["+typeof a+"] given");return a},plainObject:function(a){if("object"!=typeof a||a.constructor!==Object)throw new TypeError("an object is expected, but "+a+"  ["+typeof a+"] given");return a},type:function(b){if(b=this.string(b),a.indexOf(b.toLowerCase())<0)throw new TypeError("a type in ["+a.join(", ")+"] is expected, but "+b+" given");return b.toLowerCase()},method:function(a){if(a=this.string(a),b.indexOf(a.toLowerCase())<0)throw new TypeError("a method in ["+b.join(", ")+"] is expected, but "+a+" given");return a.toLowerCase()},queryString:function(a){var b={};return"string"==typeof a?a.replace("?","").split("&").forEach(function(a){var c=a.split("=");2===c.length&&(b[decodeURIComponent(c[0])]=decodeURIComponent(c[1]))}):b=a,this.plainObject(b)},selector:function(a){if("string"!=typeof a&&!(a instanceof HTMLElement))throw new TypeError("a selector or an HTMLElement is expected, "+a+" ["+typeof a+"] given");return a},func:function(a){if(a=this.string(a),!/^([a-zA-Z_])([a-zA-Z0-9_\-])+$/.test(a))throw new TypeError("a valid function name is expected, "+a+" ["+typeof a+"] given");return a}},e=function(a,b){var c;if(a=a||"",b)if(-1===a.indexOf("?")&&(a+="?"),"string"==typeof b)a+=b;else if("object"==typeof b)for(c in b)a+="&"+encodeURIComponent(c)+"="+encodeURIComponent(b[c]);return a};"function"==typeof define&&define.amd?define([],function(){return c}):"object"==typeof exports?module.exports=c:window.aja=window.aja||c}();
(function(w,d){var atc_url="//addtocalendar.com/atc/",atc_version="1.5",b=d.documentElement;if(!Array.indexOf){Array.prototype.indexOf=function(e){for(var t=0,n=this.length;t<n;t++){if(this[t]==e){return t}}return-1}}if(!Array.prototype.map){Array.prototype.map=function(e){var t=[];for(var n=0,r=this.length;n<r;n++){t.push(e(this[n]))}return t}}var isArray=function(e){return Object.prototype.toString.call(e)==="[object Array]"};var isFunc=function(e){return Object.prototype.toString.call(e)==="[object Function]"};var ready=function(e,t){function u(){if(!n){if(!t.body)return setTimeout(u,13);n=true;if(i){var e,r=0;while(e=i[r++])e.call(null);i=null}}}function a(){if(r)return;r=true;if(t.readyState==="complete")return u();if(t.addEventListener){t.addEventListener("DOMContentLoaded",s,false);e.addEventListener("load",u,false)}else{if(t.attachEvent){t.attachEvent("onreadystatechange",s);e.attachEvent("onload",u);var n=false;try{n=e.frameElement==null}catch(i){}if(b.doScroll&&n)f()}else{o=e.onload;e.onload=function(e){o(e);u()}}}}function f(){if(n)return;try{b.doScroll("left")}catch(e){setTimeout(f,1);return}u()}var n=false,r=false,i=[],s,o;if(t.addEventListener){s=function(){t.removeEventListener("DOMContentLoaded",s,false);u()}}else{if(t.attachEvent){s=function(){if(t.readyState==="complete"){t.detachEvent("onreadystatechange",s);u()}}}}return function(e){a();if(n){e.call(null)}else{i.push(e)}}}(w,d);if(w.addtocalendar&&typeof w.addtocalendar.start=="function")return;if(!w.addtocalendar)w.addtocalendar={};addtocalendar.languages={de:"In den Kalender",en:"Add to Calendar",es:"Añadir al Calendario",fr:"Ajouter au calendrier",hi:"कैलेंडर में जोड़ें","in":"Tambahkan ke Kalender",ja:"カレンダーに追加",ko:"캘린더에 추가",pt:"Adicionar ao calendário",ru:"Добавить в календарь",uk:"Додати в календар",zh:"添加到日历"};addtocalendar.calendar_urls={};addtocalendar.loadSettings=function(element){var settings={language:"auto","show-list-on":"click",calendars:["iCalendar","Google Calendar","Outlook","Outlook Online","Yahoo! Calendar"],secure:"auto","on-button-click":function(){},"on-calendar-click":function(){}};for(var option in settings){var pname="data-"+option;var eattr=element.getAttribute(pname);if(eattr!=null){if(isArray(settings[option])){settings[option]=eattr.replace(/\s*,\s*/g,",").replace(/^\s+|\s+$/g,"").split(",");continue}if(isFunc(settings[option])){var fn=window[eattr];if(isFunc(fn)){settings[option]=fn}else{settings[option]=eval("(function(mouseEvent){"+eattr+"})")}continue}settings[option]=element.getAttribute(pname)}}return settings};addtocalendar.load=function(){ready(function(){var e={iCalendar:"ical","Google Calendar":"google",Outlook:"outlook","Outlook Online":"outlookonline","Yahoo! Calendar":"yahoo"};var t=-(new Date).getTimezoneOffset().toString();var n=addtocalendar.languages;var r=document.getElementsByTagName("*");for(var i=0;i<r.length;i++){var s=r[i].className;if(s.split(" ").indexOf("addtocalendar")!=-1){var o=addtocalendar.loadSettings(r[i]);var u=o["calendars"].length==1;var a="http:";if(o["secure"]=="auto"){a=location.protocol=="https:"?"https:":"http:"}else if(o["secure"]=="true"){a="https:"}var f=a+atc_url;var l=r[i].id;var c=n["en"];if(o["language"]=="auto"){var h="no_lang";if(typeof navigator.language==="string"){h=navigator.language.substr(0,2)}else if(typeof navigator.browserLanguage==="string"){h=navigator.browserLanguage.substr(0,2)}if(n.hasOwnProperty(h)){c=n[h]}}else if(n.hasOwnProperty(o["language"])){c=n[o["language"]]}var p=["utz="+t,"uln="+navigator.language,"vjs="+atc_version];var d=r[i].getElementsByTagName("var");var v=-1;for(var m=0;m<d.length;m++){var g=d[m].className.replace("atc_","");var y=d[m].innerHTML;if(g=="event"){v++;continue}if(g==d[m].className){if(g=="atc-body"){c=y}continue}if(v==-1){continue}p.push("e["+v+"]["+g+"]"+"="+encodeURIComponent(y))}var b=l==""?"":l+"_link";var w=document.createElement("ul");w.className="atcb-list";var E="";var S="";for(var x in o["calendars"]){if(!e.hasOwnProperty(o["calendars"][x])){continue}var T=e[o["calendars"][x]];var N=l==""?"":'id="'+l+"_"+T+'_link"';var C=f+T+"?"+p.join("&");if(u){S=C}else{E+='<li class="atcb-item"><a '+N+' class="atcb-item-link" href="'+C+'" target="_blank">'+o["calendars"][x]+"</a></li>"}}w.innerHTML=E;if(r[i].getElementsByClassName("atcb-link")[0]==undefined){var k=document.createElement("a");k.className="atcb-link";k.innerHTML=c;k.id=b;k.tabIndex="-1";if(u){k.href=S;k.target="_blank"}r[i].appendChild(k);if(!u){r[i].appendChild(w)}}else{var k=r[i].getElementsByClassName("atcb-link")[0];if(!u){k.parentNode.appendChild(w)}k.tabIndex="-1";if(k.id==""){k.id=b}if(u){k.href=S;k.target="_blank"}}r[i].getElementsByClassName("atcb-link")[0].addEventListener("click",o["on-button-click"],false);var L=r[i].getElementsByClassName("atcb-item-link");for(var m=0;m<L.length;m++){L[m].addEventListener("click",o["on-calendar-click"],false)}}}})};addtocalendar.load()})(window,document)

/* Modernizr 2.8.3 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-borderradius-generatedcontent-csstransitions-shiv-mq-teststyles-testprop-testallprops-domprefixes-load
 */
;window.Modernizr=function(a,b,c){function z(a){i.cssText=a}function A(a,b){return z(prefixes.join(a+";")+(b||""))}function B(a,b){return typeof a===b}function C(a,b){return!!~(""+a).indexOf(b)}function D(a,b){for(var d in a){var e=a[d];if(!C(e,"-")&&i[e]!==c)return b=="pfx"?e:!0}return!1}function E(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:B(f,"function")?f.bind(d||b):f}return!1}function F(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+n.join(d+" ")+d).split(" ");return B(b,"string")||B(b,"undefined")?D(e,b):(e=(a+" "+o.join(d+" ")+d).split(" "),E(e,b,c))}var d="2.8.3",e={},f=b.documentElement,g="modernizr",h=b.createElement(g),i=h.style,j,k=":)",l={}.toString,m="Webkit Moz O ms",n=m.split(" "),o=m.toLowerCase().split(" "),p={},q={},r={},s=[],t=s.slice,u,v=function(a,c,d,e){var h,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:g+(d+1),l.appendChild(j);return h=["&#173;",'<style id="s',g,'">',a,"</style>"].join(""),l.id=g,(m?l:n).innerHTML+=h,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=f.style.overflow,f.style.overflow="hidden",f.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),f.style.overflow=k),!!i},w=function(b){var c=a.matchMedia||a.msMatchMedia;if(c)return c(b)&&c(b).matches||!1;var d;return v("@media "+b+" { #"+g+" { position: absolute; } }",function(b){d=(a.getComputedStyle?getComputedStyle(b,null):b.currentStyle)["position"]=="absolute"}),d},x={}.hasOwnProperty,y;!B(x,"undefined")&&!B(x.call,"undefined")?y=function(a,b){return x.call(a,b)}:y=function(a,b){return b in a&&B(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=t.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(t.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(t.call(arguments)))};return e}),p.borderradius=function(){return F("borderRadius")},p.csstransitions=function(){return F("transition")},p.generatedcontent=function(){var a;return v(["#",g,"{font:0/0 a}#",g,':after{content:"',k,'";visibility:hidden;font:3px/1 a}'].join(""),function(b){a=b.offsetHeight>=3}),a};for(var G in p)y(p,G)&&(u=G.toLowerCase(),e[u]=p[G](),s.push((e[u]?"":"no-")+u));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)y(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof enableClasses!="undefined"&&enableClasses&&(f.className+=" "+(b?"":"no-")+a),e[a]=b}return e},z(""),h=j=null,function(a,b){function l(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function m(){var a=s.elements;return typeof a=="string"?a.split(" "):a}function n(a){var b=j[a[h]];return b||(b={},i++,a[h]=i,j[i]=b),b}function o(a,c,d){c||(c=b);if(k)return c.createElement(a);d||(d=n(c));var g;return d.cache[a]?g=d.cache[a].cloneNode():f.test(a)?g=(d.cache[a]=d.createElem(a)).cloneNode():g=d.createElem(a),g.canHaveChildren&&!e.test(a)&&!g.tagUrn?d.frag.appendChild(g):g}function p(a,c){a||(a=b);if(k)return a.createDocumentFragment();c=c||n(a);var d=c.frag.cloneNode(),e=0,f=m(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function q(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return s.shivMethods?o(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+m().join().replace(/[\w\-]+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(s,b.frag)}function r(a){a||(a=b);var c=n(a);return s.shivCSS&&!g&&!c.hasCSS&&(c.hasCSS=!!l(a,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),k||q(a,c),a}var c="3.7.0",d=a.html5||{},e=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,f=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,g,h="_html5shiv",i=0,j={},k;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",g="hidden"in a,k=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){g=!0,k=!0}})();var s={elements:d.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:c,shivCSS:d.shivCSS!==!1,supportsUnknownElements:k,shivMethods:d.shivMethods!==!1,type:"default",shivDocument:r,createElement:o,createDocumentFragment:p};a.html5=s,r(b)}(this,b),e._version=d,e._domPrefixes=o,e._cssomPrefixes=n,e.mq=w,e.testProp=function(a){return D([a])},e.testAllProps=F,e.testStyles=v,e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};
// https://developer.mozilla.org/en-US/docs/Web/Events/wheel
(function(window,document) {

    var prefix = "", _addEventListener, onwheel, support;

    // detect event model
    if ( window.addEventListener ) {
        _addEventListener = "addEventListener";
    } else {
        _addEventListener = "attachEvent";
        prefix = "on";
    }

    // detect available wheel event
    support = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
              document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
              "DOMMouseScroll"; // let's assume that remaining browsers are older Firefox

    window.addWheelListener = function( elem, callback, useCapture ) {
        _addWheelListener( elem, support, callback, useCapture );

        // handle MozMousePixelScroll in older Firefox
        if( support == "DOMMouseScroll" ) {
            _addWheelListener( elem, "MozMousePixelScroll", callback, useCapture );
        }
    };

    function _addWheelListener( elem, eventName, callback, useCapture ) {
        elem[ _addEventListener ]( prefix + eventName, support == "wheel" ? callback : function( originalEvent ) {
            !originalEvent && ( originalEvent = window.event );

            // create a normalized event object
            var event = {
                // keep a ref to the original event object
                originalEvent: originalEvent,
                target: originalEvent.target || originalEvent.srcElement,
                type: "wheel",
                deltaMode: originalEvent.type == "MozMousePixelScroll" ? 0 : 1,
                deltaX: 0,
                deltaZ: 0,
                preventDefault: function() {
                    originalEvent.preventDefault ?
                        originalEvent.preventDefault() :
                        originalEvent.returnValue = false;
                }
            };
            
            // calculate deltaY (and deltaX) according to the event
            if ( support == "mousewheel" ) {
                event.deltaY = - 1/40 * originalEvent.wheelDelta;
                // Webkit also support wheelDeltaX
                originalEvent.wheelDeltaX && ( event.deltaX = - 1/40 * originalEvent.wheelDeltaX );
            } else {
                event.deltaY = originalEvent.detail;
            }

            // it's time to fire the callback
            return callback( event );

        }, useCapture || false );
    }

})(window,document);
var app = app || {};

app.events = (function(w, d, $) {

    var publish = function (name, o) {
       
       // console.log("EVENT [" + name + "]", o);
        $(document).trigger(name, [o]);
    
    };

    var subscribe = function (name, callback) {
        
        $(document).on(name, function(event, o){            
            callback(o);
        });

    };

    return {
        publish : publish,
        subscribe : subscribe
    }; 

})(window, document, jQuery);
var app = app || {};

app.s = (function(w,d) {
  // storing the app's state

  var state = {
    formFilled : false, // has the user filled out the address form?    
    currentSlide : null,
    isAnimating : false,
    pageHeight : null,
    yesNoState : false
  };

  app.events.subscribe('state-change', function(updates){
    // console.log('state change detected! ', updates);
    
    if (updates.isAnimating !== undefined) state.isAnimating = updates.isAnimating;
    if (updates.formFilled !== undefined) state.formFilled = updates.formFilled;    
    if (updates.currentSlide !== undefined) state.currentSlide = updates.currentSlide;
    if (updates.pageHeight !== undefined) state.pageHeight = updates.pageHeight; 
    if (updates.yesNoState !== undefined) state.yesNoState = updates.yesNoState;
    
    // console.log('state: ', state);

    app.events.publish('state-updated', state);
  });

  return {
    state : state
  };

})(window, document);

var app = app || {};

app.el = (function(w,d,$) {
  // references to DOM elements
  var el =  {
      navGoNext : d.querySelectorAll('.go-next'),
      navGoFirst : d.querySelectorAll('.go-first'),
      navGoFour : d.querySelectorAll('.go-step4'),
      burgerIcon : d.querySelector('.burger'),
      navBar : d.querySelector('.main-nav'),
      mainNavList : d.querySelector('.main-nav ul'),
      progressCircles : d.querySelectorAll('.margin-circles li'),
      slidesContainer : d.querySelector('.slides-container'),
      slides : d.querySelectorAll('.slide'),
      slide4 : d.querySelector('#slide-8'),
      dd : null,
      addressInput : d.querySelector('.address-input'),
      boroSelect : d.querySelector('.user-data.borough-select'),
      boroDropDown : d.getElementById('boroughs'),
      boroDropDownItems : d.querySelectorAll('#boroughs li a'),
      selectBoro : d.getElementsByName('borough'),
      search : d.querySelector('.search'),
      valErrors : d.querySelectorAll('.validation-error'),
      valErrorAddress : d.getElementById('error-address'),
      valErrorBoro : d.getElementById('error-boro'),
      valErrorNF : d.getElementById('error-not-found'),
      yes : d.querySelectorAll('.yes'),
      no : d.querySelectorAll('.no'),
      yesNoState : false,
      map : d.getElementById('map'),
      mapMessage : d.querySelector('.map-message'),
      mailTo : d.getElementById('mail-to'),
      lightBox : d.getElementById('rent-history'),
      addToCalendar : d.getElementById('atc_text_link'),
      addToCalendarLink : d.querySelector('#atc_text_link_link.atcb-link'),
      fbShare : d.querySelector('.fb-share-button'),    
      learnMore : d.querySelector('.button.learn-more')
  };

  // drop down class
  //  code reference: http://tympanus.net/codrops/2012/10/04/custom-drop-down-list-styling/
  function DropDown(el) {
    this.dd = el;
    this.placeholder = this.dd.children('span');
    this.opts = this.dd.find('ul.drop-down > li');
    this.val = undefined;    
    this.index = -1;
    this.initEvents();
  }  

  // dropdown
  DropDown.prototype = {
    initEvents : function() {
      var obj = this;

      // console.log('initEvents this: ', this);

      obj.dd.on('click', function(e){
        e.preventDefault();
        // $(this).toggleClass('active');
        app.f.toggleClass(this, 'active');
        return false;
      });

      obj.opts.on('click',function(e){
        e.preventDefault();
        var opt = $(this);
        obj.val = opt.text();
        // obj.data = opt.children('span').text();
        obj.index = opt.index();
        obj.placeholder.text('Borough: ' + obj.val);        
        // console.log('obj: ', obj);  
      });
    },

    getValue : function() {
      return this.val;
    },

    getIndex : function() {
      return this.index;
    }
  };

  el.dd = new DropDown( $('.user-data.borough-select') );  

  return {
    el : el
  };

})(window, document, jQuery);
var app = app || {};

app.f = (function(w,d) {
  
  var el = app.el.el;
  var state = app.s;

  app.events.subscribe('state-updated', function(updatedState){
    state = updatedState;
  });

  // key codes for up / down arrows for navigation
  var keyCodes = {
    UP : 38,
    DOWN : 40
  };  

  return {
    addEventListenerList : function (list, event, fn) {
      var i=0, len=list.length;
      for (i; i< len; i++) {
          list[i].addEventListener(event, fn, false);
      }
    },

    onKeyDown : function (event){
      var pressedKey = event.keyCode;
      if (pressedKey === keyCodes.UP) {
        app.f.goToPrevSlide();
        event.preventDefault();
      } 
      else if (pressedKey === keyCodes.DOWN) {
        app.f.goToNextSlide();
        event.preventDefault();
      }
    },

    onMouseWheel : function(event) {
      var delta = event / 30 || -event;    
      if (delta < -1) {
        app.f.goToNextSlide();
      }
      else if (delta > 1) {
        app.f.goToPrevSlide();
      } 
    },

    getSlideIndex : function(slide){
        var index;
        for (var i=0; i < el.slides.length; i++) { 
          if (el.slides[i] === slide) { 
            index = i; 
          }        
        }
        return index;
    },

    goToSlide : function(slide){
      if (!state.isAnimating && slide) {

        app.events.publish('state-change', {
          isAnimating : true,
          currentSlide : slide
        });

        var index = app.f.getSlideIndex(slide);                  
        TweenLite.to(el.slidesContainer, 1, {scrollTo: {y: state.pageHeight * index}, onComplete: app.f.onSlideChangeEnd});
      }
    },

    goToPrevSlide : function(callback){          
      var previous = app.f.getSlideIndex(state.currentSlide) -1;
      console.log('go previous slide', previous);
      if (previous >=0) {      
        app.f.goToSlide(el.slides[previous]);       
        if (callback && typeof callback === "function") { 
          callback();
          // console.log('goToPrevSlide callback called.');
        }
      }    
    },

    goToNextSlide: function(callback) {
      // console.log('local slide state: ', state);
      var index = app.f.getSlideIndex(state.currentSlide);
      var next = el.slides[index + 1];
      // console.log('go to next slide', state);
      // console.log('formFilled: ', state.formFilled, ' index: ', index);
      if (next && ( index === 0 || (index >= 1 && state.formFilled === true ) ) ) {      
        app.f.goToSlide(next);
        if (callback && typeof callback === "function") { 
          callback(); 
          // console.log('goToNextSlide callback called.');
        }  
      }      
    },

    goToFirstSlide : function() {
      // reset everything to defaults
      if (state.currentSlide) {
        el.addressInput.value = '';
        app.f.resetSearchResultMsg();      
        app.f.hideFormValidationErrors();
        app.f.resetBoroValue();
        app.map.resetMap();
        app.f.addClass(el.yes, 'hidden');
        app.f.removeClass(el.no, 'hidden');      
        app.f.goToSlide(el.slides[0]);
        app.events.publish('state-change', {
          formFilled : false
        });
      }
    },

    onSlideChangeEnd : function(){
      app.events.publish('state-change', {
        isAnimating : false
      });      
      app.f.updateProgCircles(state.currentSlide);
    },

    updateProgCircles : function (slide) {
      var s = app.f.getSlideIndex(slide),
            i = 0,
            l = el.progressCircles.length;
      
      for (i; i<l; i++) {
        var circle = el.progressCircles[i];
        if (s===i) {
          circle.style.backgroundImage = 'url(assets/png/oval_25_filled.png)';
          // circle.style.backgroundSize = '25px';
          circle.style.backgroundRepeat = 'no-repeat';        
        } else {
          circle.style.background = 'url(assets/png/oval_25_blank.png)';
          // circle.style.backgroundSize = '25px';
          circle.style.backgroundRepeat = 'no-repeat';               
        }
      }
    },

    /*
    ** jQuery-esque helper functions
     */

     // resize window
    onResize : function() {
      // console.log('onResize called');
      var newPageHeight = w.innerHeight;
      var slide = state.currentSlide;
      var index = app.f.getSlideIndex(slide);
      if (state.pageHeight !== newPageHeight) {
        app.events.publish('state-change', { pageHeight : newPageHeight });
        //This can be done via CSS only, but fails into some old browsers, so I prefer to set height via JS
        TweenLite.set([el.slidesContainer, el.slides], {height: state.pageHeight + "px"});
        //The current slide should be always on the top
        TweenLite.set(el.slidesContainer, {scrollTo: {y: state.pageHeight * index}});
      }
    },

    // iterate over node lists
    iterateNodeList : function(list,fn) {
      if (list && list.length) {
        var i=0, len=list.length;
        for (i; i<len; i++) {
          return fn(list[i], i);
        }
      }
      if (list && !list.length) {
        return fn(list);
      }
    },

    indexOf : function(array, item) {
      for (var i = 0; i < array.length; i++) {
        if (array[i] === item)
          return i;
      }
      return -1;
    },  
    
    hasClass : function(el, className) {
      return app.f.iterateNodeList(el, function(el){
        if (el.classList) {
          return el.classList.contains(className);
        } else {
          return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
        }        
      });
    },

    addClass : function(el, className) {
      app.f.iterateNodeList(el, function(el) {
        if (el.classList) {
          el.classList.add(className);
        } else {
          el.className += ' ' + className;
        }
      });
    },

    toggleClass : function(el, className) {
      app.f.iterateNodeList(el, function(el){
        if (el.classList) {
          el.classList.toggle(className);
        } else {
          var classes = el.className.split(' ');
          var existingIndex = classes.indexOf(className);
          if (existingIndex >=0) {
            classes.splice(existingIndex, 1);
          } else {
            classes.push(className);
            el.className = classes.join(' ');
          }
        }
      });
    },

    removeClass : function(el, className) {
      app.f.iterateNodeList(el, function(el){
        if (el.classList) {
          el.classList.remove(className);
        }
        else {
          el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
      });
    }  ,  

    // reset the yes / no message above map on slide 4
    resetSearchResultMsg : function() {
      if (el.yesNoState === true) {
        app.f.toggleClass(el.yes, 'hidden');
        app.f.toggleClass(el.no, 'hidden');
        el.yesNoState = false;
      }
    },

    // hide all validation errors
    hideFormValidationErrors : function() {
      var i=0, len=el.valErrors.length;
      for (i; i<len; i++) {
        if (app.f.hasClass(el.valErrors[i], 'vis-hidden')===false){
          app.f.addClass(el.valErrors[i], 'vis-hidden');
        }   
      }    
    },

    resetBoroValue : function() {
      el.dd.val = undefined;
      el.dd.placeholder.text('Select a Borough');
    },

    addToCalendar : function() {
      var curDate = new Date(),
            startDate,
            endDate;
      startDate = new Date(curDate);
      startDate.setDate(startDate.getDate() + 7);
      endDate = new Date(curDate);
      endDate.setDate(startDate.getDate() + 1);
      el.addToCalendar.innerHTML = 
          '<var class="atc_event">' +
              '<var class="atc_date_start">' + startDate + '</var>' +
              '<var class="atc_date_end">' + endDate + '</var>' +
              '<var class="atc_timezone">America/New_York</var>' +
              '<var class="atc_title">Check mail for my rent history</var>' +
              '<var class="atc_description">See if your rent history arrived in the mail, then go back to http://amirentstabilzed.com!</var>' +
              '<var class="atc_location">my house</var>'+
          '</var>';   
      // init the add to calendar library
      w.addtocalendar.load();
      // change the text of the link to be more descriptive
      var atcLink = d.querySelector('#atc_text_link_link.atcb-link');
      atcLink.innerHTML = "Click here to create a calendar reminder.";
      atcLink.tabindex = "-1";
    }
  };

})(window, document);
var app = app || {};

app.l = (function(w,d) {
  /*
  * Event listeners
  */
  var el = app.el.el;
  var f = app.f;
  var state = app.s; // create state object
  var a = app.a; // create address searching object

  app.events.subscribe('state-updated', function(updatedState){
    state = updatedState;
  });

  // resize window height
  w.onresize = f.onResize;

  // use mouse wheel to scroll
  addWheelListener( w, function(e) { 
    f.onMouseWheel(e.deltaY); 
    e.preventDefault(); 
  });

  // up / down key navigation
  w.onkeydown = f.onKeyDown;

  // go back
  // addEventListenerList(el.navGoPrev, 'click', goToPrevSlide);

  // go forward
  f.addEventListenerList(el.navGoNext, 'click', f.goToNextSlide);

  // go to inspect rent-history
  f.addEventListenerList(el.navGoFour, 'click', function(e){
    e.preventDefault();
    
    app.events.publish('state-change', {
      formFilled : true
    });
    
    f.hideFormValidationErrors();
    f.goToSlide(el.slides[6]);
  });

  // hamburger icon
  el.burgerIcon.addEventListener('click', function(e) {
    e.preventDefault();
    f.toggleClass(el.burgerIcon, 'open');
    f.toggleClass(el.mainNavList, 'responsive');
  });

  // if dropdown is visible & user clicks outside of it collapse it
  el.slidesContainer.addEventListener('click', function(e){
    if (f.hasClass(el.boroSelect, 'active')) {
      f.removeClass(el.boroSelect, 'active');
    }    
  });

  // search button for address
  el.search.addEventListener('click', function(e){
    e.preventDefault();
    var streetAddress = el.addressInput.value,
          boro = el.dd.val;    
    _gaq.push(['_trackEvent', 'Address Entered', 'Search', streetAddress + ', ' + boro ]);
    app.a.checkAddressInput(streetAddress, boro);
  });

  // start over
  f.addEventListenerList(el.navGoFirst, 'click', f.goToFirstSlide);

  // hide address error message if it's displayed and user enters text
  el.addressInput.addEventListener("blur", function(e){
    if (el.addressInput.value !== "" && f.hasClass(el.valErrorAddress, 'vis-hidden') !== true) {
      f.addClass(el.valErrorAddress, 'vis-hidden');
    }
  });

  // hide boro error message if it's displayed and user clicks a button
  f.addEventListenerList(el.boroDropDownItems, 'click', function(e){
    if (f.hasClass(el.valErrorBoro, 'vis-hidden') !== true && el.dd.getValue !== undefined) {
      f.addClass(el.valErrorBoro, 'vis-hidden');
    }
  });

  el.lightBox.addEventListener('click', function(e) {
    e.preventDefault();    
    f.goToSlide(el.slides[6]);
    w.location.hash = '';
  });  

})(window, document);
var app = app || {};

app.a = (function(w,d) {
  /*
  ** User address related functions
   */

   var el = app.el.el;
   var f = app.f;
   var state = app.s;

   return {
     // form validation for when user enters address and selects boro
    checkAddressInput : function(address, borough) {        
      if (address !== "" && borough !== undefined) {  
        app.events.publish('state-change', {
          formFilled : true
        });
        
        f.goToNextSlide();
        var parsed_address = app.a.parseAddressInput(address);      
        // delay API calls so user sees loading gif
        setTimeout(function(){        
          app.map.geoclient(parsed_address[0], parsed_address[1], borough); 
        }, 1000);              

      } else if (address === "" && borough === undefined) {      
        if (f.hasClass(el.valErrorAddress, 'vis-hidden')===true && f.hasClass(el.valErrorBoro, 'vis-hidden')===true){
          f.toggleClass(el.valErrorAddress, 'vis-hidden');
          f.toggleClass(el.valErrorBoro, 'vis-hidden');
        }

      } else if (borough === undefined) {
        // alert('Please select your borough.');
        if (f.hasClass(el.valErrorBoro, 'vis-hidden')===true) {
          f.toggleClass(el.valErrorBoro, 'vis-hidden');
        }

      } else if (address === '') {
        // alert('Please enter your house number and street.');
        if (f.hasClass(el.valErrorAddress, 'vis-hidden')===true) {
          f.toggleClass(el.valErrorAddress, 'vis-hidden');
        }

      } else {
        f.goToPrevSlide();
      } 
    },

    // separate the building number and street name from the address input
    parseAddressInput : function(input) {
      var input_split = input.split(' '),
            len = input_split.length,
            num = input_split[0],
            input_last = input_split.splice(1, len),
            street = input_last.join(' ');
      return [num, street];
    },

    // create the mailto content for requesting rent history from dhcr
    createMailTo : function() {
      var email = "rentinfo@nyshcr.org",
            subject = "request for rent history",
            body = "Hello, \n\n" +
                        "I, YOUR NAME HERE, am currently renting " + 
                        "YOUR ADDRESS, APARTMENT NUMBER, BOROUGH, ZIPCODE" +
                        " and would like to request the rent history for this apartment." +
                        " Any information you can provide me would be greatly appreciated. \n\n" +
                        "thank you,\n\n" +
                        "- YOUR NAME HERE",
            msg = 'mailto:' + encodeURIComponent(email) +
                       '?subject=' + encodeURIComponent(subject) +
                       '&body=' + encodeURIComponent(body); 
      el.mailTo.setAttribute('href', msg);
    }   
  };

})(window, document);
// map & cartodb stuff
var app = app || {};

app.map = (function(d,w,a){
   var el = {}, // to store DOM element references from app.ui
      f = {},  // to store DOM manipulation and UI functions from app.ui
      state = app.s,
      addressMarker, // leaflet marker to locate user's address on map
      sqlURL = "https://chenrick.cartodb.com/api/v2/sql?q=", //cartodb SQL API reference
      geoclientResult = {}; // to store properties from NYC Geoclient API result

  app.events.subscribe('state-updated', function(updatedState){
    state = updatedState;
  });

  function getJSON(url, type, callback) {
    a().url(url)
        .type(type)
        .on('success', function(data){
          callback(data);
        })
        .on('error', function(err){
          callback('error');
        })
        .go();
  }

  // grab property data from nyc geo-client api
  var geoclient = function(num, name, boro) {
    // create URL to pass to geoclient api
    var id = '9cd0a15f',
          appID = 'app_id=' + id + '&',
          key = '54dc84bcaca9ff4877da771750033275',
          appKey = 'app_key=' + key,
          stNum = 'houseNumber='+ num + '&',
          nameEncoded = name.replace(' ', '+'),
          stName = 'street=' + nameEncoded + '&',
          borough = 'borough=' + boro + '&',
          url = 'https://api.cityofnewyork.us/geoclient/v1/address.json?',
          urlConcat = url + stNum + stName + borough + appID + appKey;

      getJSON(urlConcat, 'jsonp', checkResult);      
  };

  // see if the geolient result has a bbl
  var checkResult = function(data) {
    if (typeof data === "object" && data.address.bbl !== undefined ) {
      var d = data.address;    
      geoclientResult =  {
        bbl : d.bbl,
        lon : d.longitudeInternalLabel,
        lat : d.latitudeInternalLabel,
        hNo : d.houseNumber,
        sName : d.streetName1In,
        bCode : d.boroughCode1In,
        bUSPS : d.uspsPreferredCityName,
        zip : d.zipCode,
        cd: d.communityDistrict,
        bin : d.giBuildingIdentificationNumber1
      };      
      var bbl = d.bbl;
      var gcr_stringify = JSON.stringify(geoclientResult);
      _gaq.push(['_trackEvent', 'Geoclient Success', 'Result', gcr_stringify]);
      getCDBdata(bbl);
      showMarker(data);

    } else {      

      el.addressInput.value='';
      f.resetBoroValue();      
      if (f.hasClass(el.valErrorNF, 'vis-hidden')===true) {
        f.toggleClass(el.valErrorNF, 'vis-hidden');
      }
      if (f.hasClass(el.valErrorBoro, 'vis-hidden')===false) {
        f.addClass(el.valErrorBoro, 'vis-hidden');
      }
      if (f.hasClass(el.valErrorAddress, 'vis-hidden')===false) {
        f.addClass(el.valErrorAddress, 'vis-hidden');
      }
      
      app.events.publish('state-change', { formFilled : false });
      app.f.goToPrevSlide(); 
    }     
  };

 // check the bbl number against the cartodb data
  var getCDBdata = function(bbl) {
    // sql to pass cartodb's sql api
    var sql = "SELECT bbl FROM all_nyc_likely_rent_stabl_merged " +
                  "WHERE bbl = " + bbl;
    getJSON(sqlURL + sql, 'json', checkData);
  };

  // if the results of the CDB SQL query have a row then show yes else display no
  var checkData = function(data) {   
    console.log('cdb data: ', data); 
    if (data.rows.length > 0 && state.yesNoState === false) {
      console.log('bbl match!');
      var bbl_match = JSON.stringify(data.rows[0].bbl);
      _gaq.push(['_trackEvent', 'CDB', 'Match', bbl_match]);
      app.f.toggleClass(el.yes, 'hidden');
      app.f.toggleClass(el.no, 'hidden');
      app.events.publish('state-change', { yesNoState : true });
    } 
    f.goToNextSlide();
    // console.log('checkData goToNextSlide called');
  };

  var showMarker = function(data) {
    // console.log('showMarker data: ', data);
    var x = data.address.longitudeInternalLabel,
          y = data.address.latitudeInternalLabel,
          latlng = [y, x],
          address = data.address.houseNumber + ' ' + 
                          data.address.firstStreetNameNormalized + '<br>' +
                          data.address.uspsPreferredCityName + ', NY ' +
                          data.address.zipCode;
    // console.log('x: ', x, ' y: ', y, ' latlng: ', latlng);
    // remove geocoded marker if one already exists
    if (addressMarker) { 
      el.map.removeLayer(addressMarker);
    }
    // add a marker and pan and zoom the el.map to it
    addressMarker = new L.marker(latlng).addTo(el.map);
    addressMarker.on('popupopen', function(e){
      // console.log('marker pop up open: ', e);
      el.map.setView(latlng, 17);  
    }); 
    addressMarker.bindPopup("<b>" + address + "</b>" ).openPopup();   
  };

  // set up the leaflet / cartodb map
  var initMap = function() {
    el.map = new L.Map('map', {
      center : [40.7127, -74.0059],
      zoom : 12,
      dragging : false,
      touchZoom : false,
      doubleClickZoom : false,
      scrollWheelZoom : false,
      zoomControl : false,
      keyboard : false
    });

    var basemap = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',{
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
    });

    el.map.addLayer(basemap);

    cartodb.createLayer(el.map, {
      user_name : 'chenrick',
      legends: false,
      cartodb_logo: false,
      type: 'cartodb',
      sublayers: [{
        sql : 'SELECT the_geom, the_geom_webmercator, cartodb_id FROM all_nyc_likely_rent_stabl_merged',
        cartocss : "#all_map_pluto_rent_stabl_reg_2014v1 {" +
                          "polygon-fill: #FF6600;" +
                          "polygon-opacity: 0.6;" +
                          "line-color: #000;" +
                          "line-width: 0.7;" +
                          "line-opacity: 0.5;" +
                        "}"
      }]
    })
    .addTo(el.map)
    .done(function(layer){
      // console.log(layer);
      basemap.bringToBack();
    });    
  }; // end initMap()

  var resetMap = function() {
    if (addressMarker) {
      el.map.removeLayer(addressMarker);
    }
    el.map.setView([40.7127, -74.0059], 12);
  };

  function init() {
    el = app.el.el;
    f = app.f;
    state = app.s;
    initMap();
  }

  return   {
    init : init,
    geoclient : geoclient,
    resetMap : resetMap
  };

})(document, window, aja);
var app = app || {};

app.init = (function(w,d){
  
  function init(){
    var el = app.el.el;
    var f = app.f;
    var a = app.a;
    var state = app.s;

    app.events.publish('state-change', {
      pageHeight : w.innerHeight,
      currentSlide : el.slides[0]
    });

    f.goToSlide(el.currentSlide);
    a.createMailTo();
    f.addToCalendar();
    app.map.init();
  }
  
  return {
    init : init
  };

})(window, document);