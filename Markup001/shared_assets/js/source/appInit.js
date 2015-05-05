$(function () {
    window.Initialisation = new initialisation();

    function initialisation() {

        ///
        /// Initalise the assesment by loading the test json
        ///
        function init() {
            var test = AppConfig.testPaper;
            DataManager.loadJSON('/test_assets/' + test + '/' + test + '.json')
                .done(function(){

                    // load assets
                    DataManager.setAssetIndexes({ assetIndex: 0, fileIndex: 0 });
                    loadAssets('core');
                })
                .fail(function(){

                    // stop everything and notify user
                    var message = {
                        header: "Initialisation Failure",
                        body: "<div style='width:400px;'>Unable to initialise " + test + ".json</div>",
                        footer: "<button class='close'>OK</button>",
                        modal: true
                    }
                    Modal.showModal(message);
                });
        }

        ///
        /// Load all assets
        ///
        function loadAssets(assetType){
            var assetObject, asset, assetIndex, itemIndex;
            if(assetType == 'core')
                assetObject = DataManager.getCoreObject();
            else
                assetObject = DataManager.getTestObject();
            asset = DataManager.getAssetObject();
            assetIndex = asset.assetIndex;
            fileIndex = asset.fileIndex;


            // loop through each asset type
            if(assetObject.assets[assetIndex]!=undefined){
                if(assetObject.assets[assetIndex].files!=undefined) {
                    if(assetObject.assets[assetIndex].files[asset.fileIndex]!=undefined){

                        // load asset file based on type
                        switch(assetObject.assets[assetIndex].type){
                            case 'audio':
                                console.log('Still need to do something for:' + assetObject.assets[assetIndex].files[asset.fileIndex].name);
                                DataManager.setAssetIndexes({ assetIndex: assetIndex, fileIndex: ++fileIndex });
                                loadAssets(assetType);
                            break;
                            case 'css':
                                setLoadingStatus(assetType+'-css', assetType+' CSS', asset.fileIndex+1, assetObject.assets[assetIndex].files.length);
                                DataManager.loadAsset(assetObject.rootpath+'/css/' + assetObject.assets[assetIndex].files[asset.fileIndex].name, 'text')
                                    .done(function(result){

                                        // append result to the header
                                        $("head").append("<style>" + result + "</style>");

                                        // load next asset
                                        DataManager.setAssetIndexes({ assetIndex: assetIndex, fileIndex: ++fileIndex });
                                        loadAssets(assetType);
                                    })
                                    .fail(function(){

                                        // stop everything and notify user
                                        var message = {
                                            header: "Asset Load Failure",
                                            body: "<div style='width:400px;'>Unable to load style sheet (" + assetObject.assets[assetIndex].files[asset.fileIndex].name + ").</div>",
                                            footer: "<button class='close'>OK</button>",
                                            modal: true
                                        }
                                        Modal.showModal(message);
                                    })
                                break;
                            case 'js':
                                setLoadingStatus(assetType+'-js', assetType+' Script', asset.fileIndex+1, assetObject.assets[assetIndex].files.length);
                                DataManager.loadAsset(assetObject.rootpath+'/js/' + assetObject.assets[assetIndex].files[asset.fileIndex].name, 'text')
                                    .done(function(result){

                                        // append result to the header
                                        $('<script>')
                                            .attr('type', 'text/javascript')
                                            .text(result)
                                            .appendTo('body');

                                        // load next asset
                                        DataManager.setAssetIndexes({ assetIndex: assetIndex, fileIndex: ++fileIndex });
                                        loadAssets(assetType);
                                    })
                                    .fail(function(){

                                        // stop everything and notify user
                                        var message = {
                                            header: "Asset Load Failure",
                                            body: "<div style='width:400px;'>Unable to load script (" + assetObject.assets[assetIndex].files[asset.fileIndex].name + ").</div>",
                                            footer: "<button class='close'>OK</button>",
                                            modal: true
                                        }
                                        Modal.showModal(message);
                                    })
                            break;
                            case 'images':
                                setLoadingStatus(assetType+'-img', assetType+' Images', asset.fileIndex+1, assetObject.assets[assetIndex].files.length);
                                $.cacheImage(assetObject.assets[assetIndex].files[asset.fileIndex].path, {
                                    load : function (e) { 

                                        // load next asset
                                        DataManager.setAssetIndexes({ assetIndex: assetIndex, fileIndex: ++fileIndex });
                                        loadAssets(assetType);
                                    },
                                    error : function (e) { 

                                        // stop everything and notify user
                                        var message = {
                                            header: "Asset Load Failure",
                                            body: "<div style='width:400px;'>Unable to load image (" + this.src + ").</div>",
                                            footer: "<button class='close'>OK</button>",
                                            modal: true
                                        }
                                        Modal.showModal(message);
                                    }
                                });
                            break;
                            case 'html':
                                setLoadingStatus(assetType+'-html', assetType+' HTML', asset.fileIndex+1, assetObject.assets[assetIndex].files.length);
                                DataManager.loadAsset(assetObject.rootpath +'/'+ assetObject.assets[assetIndex].files[asset.fileIndex].name, 'html')
                                    .done(function(result){
                                        
                                        // clear the page pre-existing onPageInit handlers
                                        PageManager.onPageInit.clear();

                                        // append result to the page
                                        var data = $(result);
                                        if(data.is('section'))
                                            data.closest('section').addClass('lean-slider-slide');
                                        if(assetType == 'core') 
                                            $('.slider:first').append(data);
                                        else
                                            $('#questions .slider').append(data);

                                        // execute any new page onPageInit handlers
                                        PageManager.onPageInit.notify();

                                        // load next asset
                                        DataManager.setAssetIndexes({ assetIndex: assetIndex, fileIndex: ++fileIndex });
                                        loadAssets(assetType);
                                    })
                                    .fail(function(){

                                        // stop everything and notify user
                                        var message = {
                                            header: "Asset Load Failure",
                                            body: "<div style='width:400px;'>Unable to load html (" + assetObject.assets[assetIndex].files[asset.fileIndex].name + ").</div>",
                                            footer: "<button class='close'>OK</button>",
                                            modal: true
                                        }
                                        Modal.showModal(message);
                                    })
                            break;
                        }
                    } else {

                        // no more files for the current type
                        DataManager.setAssetIndexes({ assetIndex: ++assetIndex, fileIndex: 0 });
                        loadAssets(assetType);
                    }
                }
            } else {

                console.log(assetType + ' assets loaded');
                if(assetType == 'core') {
                    DataManager.setAssetIndexes({ assetIndex: 0, fileIndex: 0 });
                    loadAssets('test');
                }
                else
                    processAssets();
            }     
        }

        ///
        /// Process asset pages compiling any additional code & place holders
        ///
        function processAssets (){

            // main slide control
            var mainSlideControl = $('#mainSlider').leanSlider({
                afterLoad: function(currentSlide){
                    console.log('assets processed');
                }
            });

            // main slide navigation
            $('section .mainControllerNext').click(function(e){
                e.preventDefault();
                mainSlideControl.next(); 
            }); 

            // question slide control
            var questionSlideControl = $('#questionSlider').leanSlider();
   
            // question slide navigation
            $('#questions .questionControllerPrev').click(function(e){
                e.preventDefault();
                questionSlideControl.prev(); 
            }); 
            $('#questions .questionControllerNext').click(function(e){
                e.preventDefault();
                questionSlideControl.next(); 
            }); 

            // apply nav control to place holders
            $('section code.navigation').each(function(){
                $(this).replaceWith($('#assetNav').html());
            });

            // show the next screen
            mainSlideControl.next();  
        }

        ///
        /// Loading status
        ///
        function setLoadingStatus(type, label, currentItem, totalItems){
            var status = $('#preloader .loadStatus div[data-type="' + type + '"]');
            if(status.html() == undefined){
                // no label - create entity and append to page
                status = '<div data-type="' + type +'">';
                status += '<div class="label">' + label + '</div>';
                status += '<div class="counter">' + currentItem + ' of ' + totalItems + '</div>';
                status += '</div>';
                $('#preloader .loadStatus').append(status);

            } else {
                // label exists - update the values
                status.children('.counter').html(currentItem + ' of ' + totalItems);
            }
        }


        init();


        //
        // public accessors
        //
        $.extend(this, {
            // functions
            "init": init
        });
    }

});
