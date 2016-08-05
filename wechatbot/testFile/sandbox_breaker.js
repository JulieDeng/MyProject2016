// This block of code injects our source in the content scope and then calls the
// passed callback there. The whole script runs in both GM and page content, but
// since we have no other code that does anything, the Greasemonkey sandbox does
// nothing at all when it has spawned the page script, which gets to use jQuery.
// (jQuery unfortunately degrades much when run in Mozilla's javascript sandbox)
(function(run_me_in_page_scope) {
    if ('undefined' == typeof __RUNS_IN_PAGE_SCOPE__) { // unsandbox, please!
        var src = arguments.callee.caller.toString(),
            script = document.createElement('script');
        script.setAttribute("type", "application/javascript");
        script.innerHTML = "const __RUNS_IN_PAGE_SCOPE__ = true;\n(" + src + ')();';
        document.documentElement.appendChild(script);
        document.documentElement.removeChild(script);
    } else { // unsandboxed -- here we go!
        run_me_in_page_scope();
    }
})(init); // replace this with your preferred init function

function init() {
    // this only runs in the context of the page, without Mozilla sandbox gotchas!
}