$(function () {

    window.Modal = new modal();

    function modal() {

        ///
        /// show modal passing optional parameters
        ///
        function showModal(options) {
        	// set default values
            options = $.extend({
                header: "Error !", 
                body: "An error occured.",
                footer: "",
                modal: false
            }, options);

            // hide any other modal first
            hideModal();

            // build modal window
            var modal = "<div id='modal'>";            
            		modal += "<div id='modal-frame'>";
            			modal += "<div id='modal-inner'>";
							modal += "<header>";
                        		modal +=  "<div class='header'>" + options.header + "</div>";
                    		modal +=  "</header>";
                    		modal +=  "<div>" + options.body + "</div>";
                    		if (options.footer != ""){
                    		modal +=  "<footer>";
                        		modal +=  options.footer;
                    		modal +=  "</footer>";
                    		}
            			modal += "</div>";
            		modal += "</div>";
            	modal += "</div>";                   

            // add modal to body
            var elem = $(modal);
            $('body').prepend(elem);
            //$("html").css("overflow", "hidden");

            // call any OnInit notifications 
            Modal.onModalInit.notify();
            Modal.onModalInit.clear();

            // position modal
            centerModal();
            adjustWidth();
            $(window).on("resize", Modal.centerModal);

            // apply click methods
            elem.find(".close").click(hideModal);
            elem.click(function (e) {
                if(!options.modal && $(e.target).is("#modal"))
                    hideModal();
            });            
        }

        ///
        /// adjusts the y postion of the modal dialog to match it's height so that it stays centered vertically
        ///
        function centerModal() {
            var margin = -$("#modal-inner").height() / 2;
            $("#modal-frame").css("margin-top", margin + "px")
        }

        function adjustWidth() {
            $("#modal-frame").width(9999);
            var w = $("#modal-inner").width();
            $("#modal-frame").width(w);
        }

        ///
        /// hide the modal and remove from the body
        ///
        function hideModal() {
            $("#modal").hide();
            //$("html").css("overflow", "");
            Modal.onModalHide.notify();
            Modal.onModalHide.clear();
            $("#modal").remove();
        }

        // public accessors
        $.extend(this, {
            // functions
            "showModal": showModal,
            "centerModal": centerModal,
            "adjustWidth": adjustWidth,
            "hideModal": hideModal,

            // events
            "onModalInit": new customEvent(),
            "onModalHide": new customEvent()
        });
    }
});