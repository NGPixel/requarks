"use strict";
module.exports = {
    RQ: require('request'),
    data: {},
    init: function () {
    },
    _formatUrl: function (suffix) {
        return 'https://' + AppConfig.data.service_domain + '/api/' + suffix;
    },
    getStore: function (sQuery) {
        var self = this;
        var deferred = Q.defer();
        self.RQ.post({
            url: self._formatUrl('core/statics'),
            withCredentials: false,
            body: { statics: sQuery },
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                deferred.resolve(body);
            }
            else {
                deferred.reject(error);
            }
        });
        return deferred.promise;
    }
};
