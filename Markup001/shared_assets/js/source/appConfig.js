$(function () {

    var host = "www.somewebsite.com";	// <-- this is the url of the API to return data

    var testPaper = "test01";			// <-- this is the version of teh test to load

    window.AppConfig = {
        liveUrl: "http://" + host + "/",
        testPaper: testPaper,
        useDummyData: true, // <-- set to true to load from local files instead of from the LIVE server - for dev purposes
    }

});