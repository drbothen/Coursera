'use strict';

angular.module('conFusion.services', ['ngResource'])
        .constant("baseURL", "http://192.168.1.205:3000/")
        .service('menuFactory', ['$resource', 'baseURL',function($resource, baseURL) {

            this.getDishes = function(){

                return $resource(baseURL+"dishes/:id", null, {'update':{method:'PUT'}});

            };

            this.getPromotion = function () {

                return $resource(baseURL + "promotions/:id", null, {'update': {method: 'PUT'}});

            };


        }])

        .factory('corporateFactory', ['$resource', 'baseURL',function($resource, baseURL) {

            var corpfac = {};

            // Implement function,named getLeaders,
            corpfac.getLeaders = function(){
                return $resource(baseURL + "leadership/:id", null, {'update': {method: 'PUT'}});
            };

            // Remember this is a factory not a service
            return corpfac;

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

        .factory('favoriteFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

          var favFac = {};
          var favorites = [];

          favFac.addToFavorites = function (index) {
            for (var i = 0; i < favorites.length; i++) {
              if (favorites[i].id == index)
              return;
            }
            favorites.push({id: index});
          };

          favFac.deleteFromFavorites = function (index) {
            for (var i = 0; i < favorites.length; i++) {
              if (favorites[i].id == index) {
                favorites.splice(i, 1);
              }
            }
          };

          favFac.getFavorites = function () {
            return favorites;
          };

          return favFac;
        }])

;
