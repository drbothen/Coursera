'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;

            $scope.showMenu = false;
            $scope.message = "Loading ...";
            $scope.dishes = menuFactory.getDishes().query(
                function(response) {
                    $scope.dishes = response;
                    $scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                });


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

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])

        .controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope, feedbackFactory ) {
            
            $scope.sendFeedback = function() {
                
                console.log("INCOMING FEEDBACK:", $scope.feedback);
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
                    feedbackFactory.getFeedback().save($scope.feedback);
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                }
            };
        }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {

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
            
            $scope.submitComment = function () {
                
                $scope.mycomment.date = new Date().toISOString();
                console.log("The Comment:", $scope.mycomment);
                
                $scope.dish.comments.push($scope.mycomment);
                // Does update
                console.log("DISH BEING UPDATED:", $scope.dish);
                menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);

                $scope.commentForm.$setPristine();
                
                $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            };
        }])

    .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', 'promotionFactory', function($scope, menuFactory, corporateFactory, promotionFactory) {

        $scope.showDish = false;
        $scope.message="Loading ...";
        $scope.featuredDish = menuFactory.getDishes().get({id:0})
            .$promise.then(
                function(response){
                    console.log("DISH RETURNED:", response);
                    $scope.dish = response;
                    $scope.showDish = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }

        );

        $scope.showPromotion = false;
        $scope.promotionMessage="Loading ...";
        $scope.featuredPromotion = promotionFactory.getPromotion().get({id:0})
            .$promise.then(
                function(response){
                    console.log("PROMOTION RETURNED:", response);
                    $scope.featuredPromotion = response;
                    $scope.showPromotion = true;
                },
                function(response) {
                    $scope.promotionMessage = "Error: "+response.status + " " + response.statusText;
                }

            );

        $scope.showLeader = false;
        $scope.leaderMessage="Loading ...";
        $scope.featuredLeader = corporateFactory.getLeaders().get({id:3})
            .$promise.then(
                function(response){
                    console.log("LEADER RETURNED:", response);
                    $scope.featuredLeader = response;
                    $scope.showLeader = true;
                },
                function(response) {
                    $scope.leaderMessage = "Error: "+response.status + " " + response.statusText;
                }

            );

    }])

    .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {

        $scope.showLeadership = false;
        $scope.leadershipMessage="Loading ...";
        $scope.leadership = corporateFactory.getLeaders().query(
            function(response) {
                $scope.leadership = response;
                $scope.showLeadership = true;
            },
            function(response) {
                $scope.leadershipMessage = "Error: "+response.status + " " + response.statusText;
            });



    }])




;
