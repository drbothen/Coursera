'use strict';

angular.module('confusionApp')
        .constant("baseURL","http://localhost:3000/")
        .service('menuFactory', ['$resource', 'baseURL', function($resource,baseURL) {
    
            this.getDishes = function() {
                return $resource(baseURL+"dishes/:id",null,  {'update':{method:'PUT' }});
            };
            
            this.getPromotions = function() {
                return $resource(baseURL+"promotions/:id",null,  {'update':{method:'PUT' }});
            };

            // implement a function named getPromotion
            // that returns a selected promotion.
    
                        
        }])

        .factory('corporateFactory', ['$resource', 'baseURL', function($resource,baseURL) {
    
            var corpfac = {};
    
            // Implement two functions, one named getLeaders,
            // the other named getLeader(index)
            corpfac.getLeaders = function() {
                return $resource(baseURL+"leadership/:id",null,  {'update':{method:'PUT' }});
            };

            return corpfac;
        }])

        .factory('feedbackFactory', ['$resource', 'baseURL', function($resource,baseURL) {
    
            var feedbackFac = {};
    
            // Implement two functions, one named getLeaders,
            // the other named getLeader(index)
            feedbackFac.getFeedback = function() {
                return $resource(baseURL+"feedback/:id",null,  {'update':{method:'PUT' }});
            };

            return feedbackFac;
        }])

;
