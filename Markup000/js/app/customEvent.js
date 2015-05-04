function customEvent() {
    var subscriptions = {};

    // attach a new event handler
    this.subscribe = function (f) {
        var key = generateKey(f);
        subscriptions[key] = f;
    };

    // remove an existing handler
    this.unsubscribe = function (f) {
        var key = generateKey(f);
        subscriptions[key] = null;
    };

    // remove all handlers
    this.clear = function () {
        subscriptions = {};
    };

    // notify all handlers (fire this event)
    this.notify = function (arg) {
        for (var key in subscriptions) {
            if (subscriptions[key])
                subscriptions[key](arg);
        }
    };

    function generateKey(f) {
        // convert function to a string and replace extra white spaces characters so we can compare functions
        var key = f.toString().replace(/\s+/g, ' ').trim();
        return key;
    }
}