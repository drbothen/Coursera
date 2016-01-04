'use strict';

angular.module('confusionApp')
    .constant("baseURL", "http://localhost:3000/")
    .service('menuFactory', ['$resource', 'baseURL', function($resource, baseURL) {

        this.getDishes = function(){
            return $resource(baseURL+"dishes/:id",null,  {'update':{method:'PUT' }});
        };

    }])
    .service('promotionFactory', ['$resource', 'baseURL', function($resource, baseURL) {

        this.getPromotion = function(){
            return $resource(baseURL+"promotions/:id",null,  {'update':{method:'PUT' }});
        };

    }])
    .service('feedbackFactory', ['$resource', 'baseURL', function($resource, baseURL) {

        this.getFeedback = function(){
            return $resource(baseURL+"feedback/:id",null,  {'update':{method:'PUT' }});
        };

    }])

    .factory('corporateFactory', ['$resource', 'baseURL', function($resource, baseURL) {

        var corporatefac = {};

        corporatefac.getLeaders = function(){
            return $resource(baseURL+"leadership/:id",null,  {'update':{method:'PUT' }});
        };
        return corporatefac;

    }])

;
