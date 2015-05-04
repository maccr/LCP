$(function () {
    window.PageManager = new pageManager();

    function pageManager() {

        function systemNotification(message) {
            

            /*
             *
             *   DUMMY Function - needs some form of modal  <-- todo
             *
             */


            alert(message + '\n\ntemp message, needs some form of modal  <-- todo');

        }



        //
        // public accessors
        //
        $.extend(this, {
            // functions
            "systemNotification": systemNotification,

            // events
            "onPageInit": new customEvent()
        });
    }

});
