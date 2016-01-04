'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
            $scope.showMenu = false;
            $scope.message = "Loading ...";

            $scope.dishes= 
            menuFactory.getDishes().query(function(response) {
                    $scope.dishes = response;
                    $scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                });


/*
            $scope.dishes= {};
                        menuFactory.getDishes()
            .then(
                function(response) {
                    $scope.dishes = response.data;
                }

            );*/
            
            
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

        .controller('ContactController', ['$scope', function($scope) {

           // $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"",tel:{areaCode:"", number:""},comments:"" };
            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"",tel:"",comments:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])

        .controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope, feedbackFactory) {
            
            $scope.sendFeedback = function() {
                
                console.log($scope.feedback);
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
                    feedbackFactory.saveFeedback().save($scope.feedback).$promise.then(
                        function(response){
                            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"", comments:"" };
                            $scope.feedback.mychannel="";
                            $scope.feedbackForm.$setPristine();
                            //    $scope.feedbackMessage="Successful...."
                            console.log($scope.feedback);
                        },
                        function(response){
                            console.log("Error:"+response.status+" " + response.statusText);
                        }
                    );               
              }
            };
        }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
            
            $scope.dish = {};
            $scope.showDish = false;
            $scope.message="Loading ...";
            
            $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
                 .$promise.then(
                        function(response){
                                $scope.dish = response;
                                $scope.showDish = true;
                        },
                        function(response) {
                            $scope.message = "Error: "+response.status + " " + response.statusText;
                        }
                  );
        }])

        .controller('DishCommentController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            $scope.select = function(index){
                $scope.mycomment.rating=index;
            };
            
            $scope.submitComment = function () {
                $scope.mycomment.date = new Date().toISOString();
                console.log($scope.mycomment);
                $scope.dish.comments.push($scope.mycomment);

                menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
                    $scope.commentForm.$setPristine();
                    $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            };       

        }])

        // implement the IndexController and About Controller here
        .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory){
          //  $scope.leaders = corporateFactory.getLeaders();  
            $scope.showLeaders=false;
            $scope.messageLeaders= "Loading ...";
            
            $scope.leaders = corporateFactory.getLeaders().query().$promise.then(
            function(response){
                $scope.leaders = response;
                $scope.showLeaders = true;
            },
            function(response){
                $scope.messageLeaders = "error:" + response.status + " " + response.statusText; 
                
                });
        }])
  
        .controller('IndexController',['$scope','menuFactory','corporateFactory', function($scope, menuFactory,corporateFactory){
 //       var dishes = menuFactory.getDishes();
//     var numberOfDishes=dishes.length;
        
//      $scope.featuredDish= dishes[Math.floor(Math.random()*numberOfDishes)];
        $scope.featuredDish= {};
        $scope.showDish = false;
        $scope.message="Loading ...";
             $scope.featuredDish = menuFactory.getDishes().get({id:0})
                   .$promise.then(
                        function(response){
                            $scope.featuredDish = response;
                            $scope.showDish = true;
                        },
                        function(response) {
                            $scope.message = "Error: "+response.status + " " + response.statusText;
                        }
                    );
       
            $scope.showPromotion = false;
            $scope.messagePromotion = "Loading ...";

            $scope.promotedDish= 
                menuFactory.getPromotions().get({id:0}).$promise.then(
                function(response) {
                    $scope.promotedDish = response;
                    $scope.showPromotion = true;
                },
                function(response) {
                    $scope.messagePromotion = "Error: "+response.status + " " + response.statusText;
                });
       // var promotion = menuFactory.getPromotion(0);
       // $scope.promotedDish = promotion; 
            
       // var leader = corporateFactory.getLeader("CEO");
            $scope.showLeader=false;
            $scope.messageLeader= "Loading ...";
            $scope.chef= corporateFactory.getLeaders().get({id:0}).$promise.then(
            function(response) {
                $scope.chef=response;
                $scope.showLeader=true;
            },
            function(response) {
                $scope.messageLeader="error:"+response.status+" " + response.statusText;  
            
            });
    
      //  $scope.chef = leader;
    }])

;
