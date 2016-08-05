//var s = document.createElement('script');
//s.src = chrome.extension.getURL('script.js');
//s.onload = function() {
//    this.parentNode.removeChild(this);
//};
//(document.head || document.documentElement).appendChild(s);



// Chrome extension 'content scripts' run in a sandboxed 'isolated world'
// (http://code.google.com/chrome/extensions/content_scripts.html#execution-environment).
// However, there are ways to get out and execute js code in the page
// context.  Google searching revealed the following ways:

////////////////////////////////////////////////////////////////////////////////
// http://blog.afterthedeadline.com/2010/05/14/how-to-jump-through-hoops-and-make-a-chrome-extension/
// it looks like jQuery must be loaded by the content-script
jQuery('body').append('<script type="text/javascript">(function(l) {
var res = document.createElement('SCRIPT');
res.type = 'text/javascript';
res.src = l;
document.getElementsByTagName('head')[0].appendChild(res);
})('+chrome.extension.getURL("script-to-inject.js");</script>');
// I'm not sure why ';</script>' is in the function args!


// here is the previous snippet without jquery and with proper removal
// of the injected script tag.
// Note, this is untested and the author of the previous blog post
// claims it doesn't work.
function inject_page_script (script_file) {
    // script_file lives in the extension
    script = document.createElement('script');
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", chrome.extension.getURL(script_file));
    document.documentElement.appendChild(script);
    document.documentElement.removeChild(script);
}

////////////////////////////////////////////////////////////////////////////////
// or https://gist.github.com/545223 (Johan Sundström) which should also work in the
// sandbox mozilla sticks greasemonkey in

function run_in_page_scope (func) {
    if ('undefined' == typeof __RUNS_IN_PAGE_SCOPE__) { // unsandbox, please!
        var src = arguments.callee.caller.toString(),
            script = document.createElement('script');
        script.setAttribute("type", "application/javascript");
        script.innerHTML = "const __RUNS_IN_PAGE_SCOPE__ = true;\n(" + src + ')();';
        document.documentElement.appendChild(script);
        document.documentElement.removeChild(script);
    } else { // already unsandboxed
        func();
    }
}

////////////////////////////////////////////////////////////////////////////////
// or the 'official' method:
// described here http://code.google.com/p/chromium/issues/detail?id=52946
// and sort of here http://code.google.com/chrome/extensions/content_scripts.html#host-page-communication
// using dom injection and event listeners + firing events to trigger
// js execution in the page context


////////////////////////////////////////////////////////////////////////////////
// or http://matthew.mceachen.us/blog/sandbox-telegrams-or-how-your-chrome-extension-can-interact-with-page-content-scripts-1123.html