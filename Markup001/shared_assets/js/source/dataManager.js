$(function () {
    window.DataManager = new dataManager();

    function dataManager() {

        // root data object - gets populated by loading data from the server
        var rootObject = {
            assetIndexes: {}
        };

        function buildUrl(path, isPost) {
            if (path.startsWith("/")) {
                path = path.substring(1);
            }

            if(AppConfig.useDummyData)
                return localURL() + path;

            return AppConfig.liveUrl + path;
        }

        ///
        /// Load a json object from the server and append it to the rootObject
        ///
        function loadJSON(path, args) {
            var request = issueRequest(path, 'json', args, false);
            request.done(function (result) {
                $.extend(rootObject, result);
            });
            return request;
        }

        ///
        /// Load asset content from the server and return result to the initiating request
        ///
        function loadAsset(path, type, args) {
            var request = issueRequest(path, type, args, false);
            request.done(function (result) {
               return result
            });
            return request;
        }

        ///
        /// Submit data to the server
        ///
        function post(path, args) {
            var request = issueRequest(path, 'json', args, true);
            request.done(function (result) {
                $.extend(rootObject, result);
            });
            return request;
        }

        ///
        /// Issue a request to the server
        ///
        function issueRequest(path, type, args, isPost) {
            
            var url = buildUrl(path, isPost);
            var method = isPost ? 'POST' : 'GET';

            var request = $.ajax({
                method: method,
                crossDomain: true,
                url: url,
                data: args,
                dataType: type,
                async: true 
            });

            request.fail(function (result) {
                var message = {
                    header: "Procesing Request Error",
                    body: "<div style='width:400px;'>error requesting (" + method + ") " + url + "</div>",
                    footer: "<button class='close'>OK</button>",
                    modal: true
                }
                Modal.showModal(message);
            });

            return request;
        }

        ///
        /// Return the local URL minus any page name or parameters
        ///
        function localURL() { 
            var pathWORes   = location.pathname.substring(0, location.pathname.lastIndexOf("/")+1);
            var protoWDom   = location.href.substr(0, location.href.indexOf("/", 8));
            return protoWDom + pathWORes;
        };


        //
        // public accessors
        //
        $.extend(this, {
            // functions
            "loadJSON": loadJSON,
            "loadAsset": loadAsset,
            "post": post,

            // get/set props
            "getRootObject": function () { return rootObject; },
            //"getCoreObject": function () { return rootObject.core; },
            //"setCoreIndexes": function (coreAssetIndexes) { $.extend(rootObject.core, coreAssetIndexes); },
            "getAssetObject": function() { return rootObject.assetIndexes; },
            "setAssetIndexes": function (assetIndexes) { $.extend(rootObject.assetIndexes, assetIndexes); },
            "getCoreObject": function () { return rootObject.core; },
            "getTestObject": function () { return rootObject.test; },
        });
    }

});
