'use strict';

angular.module('conFusion.services', ['ngResource'])
        .constant("baseURL","http://localhost:3000/")
        .factory('menuFactory', ['$resource', 'baseURL', function($resource,baseURL) {
            return $resource(baseURL+"dishes/:id",null,  {'update':{method:'PUT' }});
        }])

        .factory('promotionsFactory', ['$resource', 'baseURL', function($resource,baseURL) {
            return $resource(baseURL+"promotions/:id");;
        }])

        .factory('corporateFactory', ['$resource', 'baseURL', function($resource,baseURL) {
            return $resource(baseURL+"leadership/:id");
        }])

        .factory('feedbackFactory', ['$resource', 'baseURL', function($resource,baseURL) {
            return $resource(baseURL+"feedback/:id");
        }])
        .factory('favoriteFactory', ['$localStorage', function ($localStorage) {
            var favFac = {};
            var favoritesKey = 'favoriteIDs';

            favFac.addToFavorites = function (dishID) {
                $localStorage.addItemToArray(favoritesKey, dishID);
            };
            favFac.deleteFromFavorites = function (dishID) {
                $localStorage.removeFromArray(favoritesKey, dishID);
            }
            favFac.getFavorites = function () {
                return $localStorage.getArray(favoritesKey);
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
    getObject: function(key,defaultValue) {
      return JSON.parse($window.localStorage[key] || defaultValue);
    },
    getArray: function(key) {
      return JSON.parse($window.localStorage[key] || []);
    },
    addItemToArray: function(key, value) {
        var currentArray = this.getArray(key);
        for (var i = 0; i < currentArray.length; i++) {
            if (currentArray[i] == value)
                return;
        }
        currentArray.push(value);
        $window.localStorage[key] = JSON.stringify(currentArray);
    },
    removeFromArray: function(key, value) {
        var currentArray = this.getArray(key);
        for (var i = 0; i < currentArray.length; i++) {
            if (currentArray[i] == value) {
                currentArray.splice(i, 1);
            }
        }
        $window.localStorage[key] = JSON.stringify(currentArray);
    }
  }
}])
;
