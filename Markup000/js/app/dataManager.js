$(function () {
    window.DataManager = new dataManager();

    function dataManager() {

        // root data object - gets populated by loading data from the api
        var rootObject = {
            "currentQuestion": 0
        };


        ///
        /// Construct the URL for loading data
        ///
        function buildApiUrl(path, isPost, type) {
            if (path.startsWith("/")) {
                path = path.substring(1);
            }

            if (!isPost && AppConfig.useDummyData) {
                return "/localData/" + path + "." + type;
            }

            return window.AppConfig.apiUrl + path;
        }


        ///
        /// Load HTML content from the API and append it to the content div
        ///
        function loadHTML(path, args) {
            var request = authRequest(path, args, false, 'html');
            request.done(function (result) {
               return result
            });
            return request;
        }


        ///
        /// Load a json object from the API and append it to the rootObject
        ///
        function loadJSON(path, args) {
            var request = authRequest(path, args, false, 'json');
            request.done(function (result) {
                $.extend(rootObject, result);               
            });
            return request;
        }


        ///
        /// post a json object to the API and append the result to the rootObject
        ///
        function postJSON(path, args) {
            var request = authRequest(path, args, true, 'json');
            request.done(function (result) {
                $.extend(rootObject, result);
            });
            return request;
        }


        ///
        /// Make a call to the API
        ///
        function authRequest(path, args, isPost, type) {

            var url = buildApiUrl(path, isPost, type);
            var method = isPost ? 'POST' : 'GET';
            var postArgs = $.postify(args);
            var request = $.ajax({
                method: method,
                crossDomain: true,
                url: url,
                data: postArgs,
                dataType: type
            });

            request.fail(function (result) {
                console.log("error requesting (" + method + ") " + url);
            });

            return request;
        }


        //
        // public accessors
        //
        $.extend(this, {
            // functions
            "loadHTML": loadHTML,
            "loadJSON": loadJSON,
            "postJSON": postJSON,
            "buildApiUrl": buildApiUrl,

            // get/set props
            "getRootObject": function () { return rootObject; },
            "getCurrentQuestion": function () { return rootObject.currentQuestion; },
            "setCurrentQuestion": function (questionNo) { rootObject.currentQuestion = questionNo; }
        });
    }

});
