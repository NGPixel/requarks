/// <reference path="../typings/tsd.d.ts" />

export = {

  RQ: require('request'),

  data: {

  },

  init() {

    // debug mode
    //require('request-debug')(this.RQ);

  },

  _formatUrl(suffix:string) {
    return 'https://' + AppConfig.user.domain + '/api/' + suffix;
  },

  getStore(sQuery: Array<string>) {

    let self = this;
    let deferred = Q.defer();

    self.RQ.post({
      url: self._formatUrl('core/statics'),
      withCredentials: false,
      body: {statics: sQuery},
      json: true
    }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        deferred.resolve(body);
      } else {
        deferred.reject(error);
      }
    });

    return deferred.promise;

  }

}
