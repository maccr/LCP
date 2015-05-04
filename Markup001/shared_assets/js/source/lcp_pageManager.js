$(function () {
    window.PageManager = new pageManager();

    function pageManager() {



        //
        // public accessors
        //
        $.extend(this, {
            // functions

            // events
            "onPageInit": new customEvent()
        });
    }

});
