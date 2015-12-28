'use strict';

angular.module('confusionApp', ['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/contactus', {
                templateUrl : 'contactus.html',
                controller : 'ContactController'
            })

            // route for the menu page
            .when('/menu', {
                templateUrl : 'menu.html',
                controller : 'MenuController'
            })

            // route for the dish details page
            .when('/menu/:id', {
                templateUrl : 'dishdetail.html',
                controller : 'DishDetailController'
            })

            // route for anything else
            .otherwise('/contactus');
    })

;

