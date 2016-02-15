'use strict';

angular.module('conFusion.services', ['ngResource'])
        .constant("baseURL", "http://192.168.1.205:3000/")
        .factory('menuFactory', ['$resource', 'baseURL',function($resource, baseURL) {


                return $resource(baseURL+"dishes/:id", null, {'update':{method:'PUT'}});

}])
.factory('promotionFactory', ['$resource', 'baseURL', function ($resource, baseURL){

                return $resource(baseURL + "promotions/:id");


        }])

        .factory('corporateFactory', ['$resource', 'baseURL',function($resource, baseURL) {

                return $resource(baseURL + "leadership/:id", null, {'update': {method: 'PUT'}});

        }])

        .factory('feedbackFactory', ['$resource', 'baseURL',function($resource, baseURL) {
            var feedfac = {};

            // Implement function, named getFeedBack

            feedfac.getFeedBack = function () {
                return $resource(baseURL + "feedback/:id", null, {'update': {method: 'POST'}});
            };

            // Remember this is a factory not a service. Return object
            return feedfac;
        }])

        .factory('favoriteFactory', ['$resource', '$localStorage','baseURL', function ($resource, $localStorage, baseURL) {

          var favFac = {};
          var favorites = $localStorage.getObject('fav', []);

          favFac.addToFavorites = function (index) {
            for (var i = 0; i < favorites.length; i++) {
              if (favorites[i].id == index)
              return;
            }
            favorites.push({id: index});
            $localStorage.storeObject('fav', favorites);
          };

          favFac.deleteFromFavorites = function (index) {
            for (var i = 0; i < favorites.length; i++) {
              if (favorites[i].id == index) {
                favorites.splice(i, 1);
                $localStorage.storeObject('fav', favorites);
              }
            }
          };

          favFac.getFavorites = function () {
            return favorites
          };

          return favFac;
        }])
  .factory('$localStorage', ['$window', function($window) {
    return {
      store: function(key, value) {
        $window.localStorage[key] = value;
      },
      get: function(key, defaultValue) {
        return $window.localStorage[key] || defaultValue;
      },
      storeObject: function(key, value) {
        $window.localStorage[key] = JSON.stringify(value);
      },
      getObject: function(key, defaultValue) {
        return JSON.parse($window.localStorage[key] || defaultValue);
      }
    }
  }])


;