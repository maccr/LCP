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

                    // load core assets
                    DataManager.setCoreIndexes({ assetIndex: 0, fileIndex: 0 });
                    loadCoreAssets();
                })
                .fail(function(){

                    // stop everything and notify user
                    PageManager.systemNotification('failed to initialise, need to do something here ???');
                });
        }

        ///
        /// Load all core assets
        ///
        function loadCoreAssets(){
            var core = DataManager.getCoreObject();
            var assetIndex = core.assetIndex;
            var fileIndex = core.fileIndex;

            // loop through each asset type
            if(core.assets[assetIndex]!=undefined){
                if(core.assets[assetIndex].files!=undefined) {
                    if(core.assets[assetIndex].files[core.fileIndex]!=undefined){

                        // load asset file based on type
                        switch(core.assets[assetIndex].type){
                            case 'audio':
                            case 'css':
                            case 'js':
                                console.log('Still need to do something for:' + core.assets[assetIndex].files[core.fileIndex].name);
                                DataManager.setCoreIndexes({ assetIndex: assetIndex, fileIndex: ++fileIndex });
                                loadCoreAssets();
                            break;
                            case 'images':
                                setLoadingStatus('core-img', 'Core Images', core.fileIndex+1, core.assets[assetIndex].files.length);
                                $.cacheImage(core.assets[assetIndex].files[core.fileIndex].path, {
                                    load : function (e) { 

                                        // load next asset
                                        DataManager.setCoreIndexes({ assetIndex: assetIndex, fileIndex: ++fileIndex });
                                        loadCoreAssets();
                                    },
                                    error : function (e) { 

                                        // stop everything and notify user
                                        PageManager.systemNotification('failed to load core image (' + this.src +').');
                                    }
                                });
                            break;
                            case 'html':
                                setLoadingStatus('core-html', 'Core HTML', core.fileIndex+1, core.assets[assetIndex].files.length);
                                DataManager.loadAsset('/shared_assets/' + core.assets[assetIndex].files[core.fileIndex].name, 'html')
                                    .done(function(result){
                                        
                                        // clear the page pre-existing onPageInit handlers
                                        PageManager.onPageInit.clear();

                                        // append result to the page
                                        $('body').append(result);

                                        // execute any new page onPageInit handlers
                                        PageManager.onPageInit.notify();

                                        // load next asset
                                        DataManager.setCoreIndexes({ assetIndex: assetIndex, fileIndex: ++fileIndex });
                                        loadCoreAssets();
                                    })
                                    .fail(function(){

                                        // stop everything and notify user
                                        PageManager.systemNotification('failed to load core asset (' + fcore.assets[assetIndex].files[core.fileIndex].name +').');
                                    })
                            break;
                        }
                    } else {

                        // no more files for the current type
                        DataManager.setCoreIndexes({ assetIndex: ++assetIndex, fileIndex: 0 });
                        loadCoreAssets();
                    }
                }
            } else {

                console.log('All Core Assets Loaded');
            }     
        }


        function processCoreAssets (){
            $('section ')
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