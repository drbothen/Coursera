'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {

            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;

            $scope.dishes = {};
            $scope.showMenu = false;
            $scope.message = "Loading ...";

            $scope.dishes = menuFactory.getDishes().query(
                function(response) {
                    $scope.dishes = response;
                    $scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );


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

        .controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope, feedbackFactory) {

            $scope.sendFeedback = function() {

                console.log($scope.feedback);

                if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {

                    feedbackFactory.getFeedback().save($scope.feedback,
                        function(response, headers){
                            console.log("Success" + response + " " + headers);
                        },
                        function(error){
                            console.log("Error " + error);
                        });

                    $scope.invalidChannelSelection = false;
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])


        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {

            $scope.showDish = true;
            $scope.message="Loading ...";

            $scope.dish = menuFactory.getDishes().get({id : parseInt($stateParams.id, 10) } )
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

            $scope.myComment = {rating:5, comment:"", author:"", date:""};

            $scope.submitComment = function () {

                $scope.myComment.date = new Date().toISOString();
                console.log("DishCommentController " + $scope.myComment);

                $scope.dish.comments.push($scope.myComment);
                menuFactory.getDishes().update({id : $scope.dish.id}, $scope.dish);

                $scope.commentForm.$setPristine();
                $scope.myComment = {rating:5, comment:"", author:"", date:""};
            };
        }])




        .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function($scope, menuFactory, corporateFactory) {
            $scope.dish = {};
            $scope.showDish = false;
            $scope.message="Loading ...";

            $scope.dish = menuFactory.getDishes().get({id : 0})
                .$promise.then(
                    function(response){
                        $scope.dish = response;
                        $scope.showDish = true;
                    },
                    function(response) {
                        $scope.message = "Error: "+response.status + " " + response.statusText;
                    }
                );

            $scope.promotion = {};
            $scope.showPromotion = false;
            $scope.promotionMessage="Loading ...";
            $scope.promotion = menuFactory.getPromotion().get({id : 0})
                .$promise.then(
                    function(response){
                        $scope.promotion = response;
                        $scope.showPromotion = true;
                    },
                    function(response) {
                        $scope.promotionMessage = "Error: "+response.status + " " + response.statusText;
                    }
                );

            $scope.executiveChefInfo = {};
            $scope.showExecutiveChefInfo = false;
            $scope.executiveChefInfoMessage="Loading ...";
            $scope.executiveChefInfo = corporateFactory.getLeaders().get({id : 3})
                .$promise.then(
                    function(response){
                        $scope.executiveChefInfo = response;
                        $scope.showExecutiveChefInfo = true;
                    },
                    function(response) {
                        $scope.executiveChefInfoMessage = "Error: "+response.status + " " + response.statusText;
                    }
                );
        }])


        .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {

            $scope.leaders = {};
            $scope.showLeaders = false;
            $scope.leadersMessage="Loading ...";
            $scope.leaders = corporateFactory.getLeaders().query(
                function(response) {
                    $scope.leaders = response;
                    $scope.showLeaders = true;
                },
                function(response) {
                    $scope.leadersMessage = "Error: "+response.status + " " + response.statusText;
                }
            );

        }])

;
