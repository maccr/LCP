$(function () {

    var host = "www.somewebsite.com";  // <-- this is the url of the API to return data

    window.AppConfig = {
        apiUrl: "http://" + host + "/api/",
        useDummyData: true, // <-- set to true to load from local files instead of from the API - for dev purposes
    }

});