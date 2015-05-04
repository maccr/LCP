$(function() {

    window.PageManager = new pageManager();

    // load initial page
    function pageManager() {

        ///
        /// loads a view template and inserts it into the main body wrapper
        /// this will put the current page in the history stack before loading the nex one
        ///
        function loadQuestion(questionNumber) {
            // retreive the question details
            var _rootObject = DataManager.getRootObject();
            var _question = _rootObject.test.questions[questionNumber - 1];

            // check if the question has already been loaded
            if ($('#content #' + _question.questionID).html() == undefined) {

                // this function will probably need to change to call a valid API method !!!!!!!!
                DataManager.loadHTML("/" + _question.questionID).done(function(result) {

                    // hide current content
                    hideCurrentContent();

                    // clear the page pre-existing init handlers
                    PageManager.onPageInit.clear();

                    // append the result to the content div
                    $('#content').append(result);

                    // set the current question id
                    DataManager.setCurrentQuestion(questionNumber);

                    // execute any new page handlers - this is where the onPageInit gets called
                    PageManager.onPageInit.notify();

                    // Normally you would do some fade-in transition or something of new content
                    // by call the showCurrentContent, however in this app the above code
                    // just displays the content straight away !!

                })

            } else {

                // hide current content
                hideCurrentContent();

                // set the current question id
                DataManager.setCurrentQuestion(questionNumber);

                // show new current content
                showCurrentContent();
            }
        }


        ///
        /// hide the current content
        ///
        function hideCurrentContent() {
            // get the current question id
            var _currentQuestion = DataManager.getCurrentQuestion();

            // if no current question then hide whatever content is visible
            if (_currentQuestion < 1) {

                // just hide all visible content - apply here whatever transition you want !!
                $('#content').children().hide();

            } else {

                // hide specific question content - apply here whatever transition you want !!
                $('#content #Q' + _currentQuestion).hide();
            }
        }


        ///
        /// show the current content
        ///
        function showCurrentContent() {
                // get the current question id
                var _currentQuestion = DataManager.getCurrentQuestion();

                // show specific question content - apply here whatever transition you want !!
                $('#content #Q' + _currentQuestion).show();
            }

        ///
        /// ** NAV **  ( http://www.codeproject.com/Articles/311758/Building-Menu-from-JSON )
        ///
        //As a first step, we will create a function that builds the hierarchical structure. 
        //The builddata function below iterates through the data and creates the source object. 
        //The sub items of each item are added to its “items” member. The item’s text is stored in a “label” member.
        
        /*var builddata = function() {
            var _rootObject = DataManager.getRootObject();
            var source = [];
            var items = [];
            // build hierarchical source.
            for (i = 0; i < data.length; i++) {
                var item = data[i];
                var label = item["text"];
                var parentid = item["parentid"];
                var id = item["id"];

                if (items[parentid]) {
                    var item = {
                        parentid: parentid,
                        label: label,
                        item: item
                    };
                    if (!items[parentid].items) {
                        items[parentid].items = [];
                    }
                    items[parentid].items[items[parentid].items.length] = item;
                    items[id] = item;
                } else {
                    items[id] = {
                        parentid: parentid,
                        label: label,
                        item: item
                    };
                    source[id] = items[id];
                }
            }
            return source;
        }
        var source = builddata();*/
        //The next step is to create a recursive function that traverses the source object and 
        //dynamically appends UL and LI elements.

        /*var buildUL = function (parent, items) {
            $.each(items, function () {
                if (this.label) {
                    // create LI element and append it to the parent element.
                    var li = $("<li>" + this.label + "</li>");
                    li.appendTo(parent);
                    // if there are sub items, call the buildUL function.
                    if (this.items && this.items.length > 0) {
                        var ul = $("<ul></ul>");
                        ul.appendTo(li);
                        buildUL(ul, this.items);
                    }
                }
            });
        }
        var ul = $("<ul></ul>");
        ul.appendTo("#jqxMenu");
        buildUL(ul, source);*/

        //After that, we use the script below to create the Menu:
        /*$("#jqxMenu").jqxMenu({ width: '600', height: '30px'});*/

        //Finally, we add a DIV element with id=’jqxMenu’ to the document’s body:

        /*<div id='jqxMenu'>
        </div>*/



        //
        // public accessors
        //
        $.extend(this, {
            // functions
            "loadQuestion": loadQuestion,
            "hideCurrentContent": hideCurrentContent,
            "showCurrentContent": showCurrentContent,

            // events
            "onPageInit": new customEvent()
        });
    }
});
