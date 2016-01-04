'use strict';

angular.module('confusionApp')
    .constant("baseURL","http://localhost:3000/")
    .service('menuFactory', ['$resource', 'baseURL', function($resource, baseURL) {
//.service('menuFactory', ['$http', 'baseURL', function($http, baseURL) {
 
                this.getDishes = function(){
                    
                    return $resource(baseURL+"dishes/:id",null,  {'update':{method:'PUT' }});            
                };
    
                this.getPromotions=function(){
                    return $resource(baseURL+"promotions/:id",null);
                 };             
        }])

        .factory('corporateFactory', ['$resource', 'baseURL', function($resource, baseURL) {
    
            var corpfac = {};
      
             corpfac.getLeaders=function(){
            //     return resource(leadership);
                return $resource(baseURL+"leadership/:id",null);
             };
           
             return corpfac;      
        }])

        .factory('feedbackFactory', ['$resource', 'baseURL', function($resource, baseURL) {
            var feedbackFac = {};
            
            feedbackFac.saveFeedback = function(){
               return $resource(baseURL+"feedback/:id",null);
            };
            
            return feedbackFac;
        }])

;
