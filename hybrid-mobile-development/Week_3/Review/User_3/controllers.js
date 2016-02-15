angular.module('conFusion.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $localStorage) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = $localStorage.getObject('userinfo','{}');
  $scope.favorites = $localStorage.getArray('favoriteIDs');

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    $localStorage.storeObject('userinfo',$scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
    
    // Create the reserve modal that we will use later
  $ionicModal.fromTemplateUrl('templates/reserve.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.reserveform = modal;
  });

  // Triggered in the reserve modal to close it
  $scope.closeReserve = function() {
    $scope.reserveform.hide();
  };

  // Open the reserve modal
  $scope.reserve = function() {
    $scope.reserveform.show();
  };

  // Perform the reserve action when the user submits the reserve form
  $scope.doReserve = function() {
    console.log('Doing reservation', $scope.reservation);

    // Simulate a reservation delay. Remove this and replace with your reservation
    // code if using a server system
    $timeout(function() {
      $scope.closeReserve();
    }, 1000);
  };    
})

.controller('MenuController', ['$scope', 'dishesShowMessage', 'favoriteFactory', 'baseURL', '$ionicListDelegate', 
                               function ($scope, dishesShowMessage, favoriteFactory, baseURL, $ionicListDelegate) {
            $scope.baseURL = baseURL;     
            $scope.tab = 1;
            $scope.filtText = '';
                                   
            $scope.showDetails = false;
                                   
            $scope.showMenu = dishesShowMessage.showMenu;
            $scope.message = dishesShowMessage.message;
            $scope.dishes = dishesShowMessage.dishes;
                        
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
            $scope.addFavorite = function (index) {
                favoriteFactory.addToFavorites(index);
                // refresh list of favorites
                $scope.favorites = favoriteFactory.getFavorites();
                $ionicListDelegate.closeOptionButtons();
            }
        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])

        .controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope,feedbackFactory) {
            
            $scope.sendFeedback = function() {
                
                console.log($scope.feedback);
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
                    feedbackFactory.save($scope.feedback);
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'dish', 'menuFactory', 'baseURL', '$ionicPopover', 'favoriteFactory', '$ionicModal', function($scope, $stateParams, dish, menuFactory, baseURL, $ionicPopover, favoriteFactory, $ionicModal) {
            $scope.baseURL = baseURL;
            $scope.dish = dish;
            $scope.showDish = false;
            $scope.message="Loading ...";
            
            $scope.commentCandidate = {rating:5, date:"", author:"", comment:""};
            $scope.ratings = [1, 2, 3, 4, 5];
            
            $ionicPopover.fromTemplateUrl('templates/dish-detail-popover.html', {
                scope: $scope
            }).then(function(popover) {
                $scope.popover = popover;
            });
            
            $scope.openPopover = function($event, dishID) {
                $scope.currentIDPopover = dishID;
                $scope.popover.show($event);
            } 
            
            $scope.addToFavorites = function() {
                if($scope.currentIDPopover != -1) {
                    favoriteFactory.addToFavorites($scope.currentIDPopover);
                    $scope.currentIDPopover = -1;
                    $scope.popover.hide();
                }
            } 
            $scope.addComment = function($event) {
                $scope.currentIDPopover = -1;
                $scope.popover.hide();
                $scope.commentModal.show();
            }
            

          $ionicModal.fromTemplateUrl('templates/dish-comment.html', {
            scope: $scope
          }).then(function(modal) {
            $scope.commentModal = modal;
          });
            
            $scope.doAddComment = function() {
                $scope.commentCandidate.date = new Date().toISOString();
                $scope.dish.comments.push($scope.commentCandidate);
                menuFactory.update({id:$scope.dish.id},$scope.dish);
                
                $scope.commentModal.hide();
                $scope.commentCandidate = {rating:5, date:"", author:"", comment:""};
            }
            $scope.closeAddComment = function() {
                $scope.commentCandidate = {rating:5, date:"", author:"", comment:""};
                scope.commentModal.hide();
            }
        }])

        .controller('DishCommentController', ['$scope', 'menuFactory', function($scope,menuFactory) {
            
            $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            
            $scope.submitComment = function () {
                
                $scope.mycomment.date = new Date().toISOString();
                console.log($scope.mycomment);
                
                $scope.dish.comments.push($scope.mycomment);
        menuFactory.update({id:$scope.dish.id},$scope.dish);
                
                $scope.commentForm.$setPristine();
                
                $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            }
        }])

        .controller('IndexController', ['$scope', 'dishShowMessage', 'leader', 'promotion', 'baseURL', function($scope, dishShowMessage, leader, promotion, baseURL) {

            $scope.baseURL = baseURL;

            $scope.leader = leader;
            $scope.promotion = promotion;
            
            $scope.showDish = dishShowMessage.showDish;
            $scope.message = dishShowMessage.message;
            $scope.dish = dishShowMessage.dish;
      }])
    .controller('AboutController', ['$scope', 'leadersShowMessage','baseURL', function($scope, leadersShowMessage, baseURL) {
         
            $scope.baseURL = baseURL;
        
            $scope.leaderMessage = leadersShowMessage.leaderMessage;
            $scope.showLeaders = leadersShowMessage.showLeaders;
            $scope.leaders = leadersShowMessage.leaders;
        }])
    .controller('FavoritesController', ['$scope', 'dishes', 'favorites', 'favoriteFactory', 'baseURL', '$ionicListDelegate', '$ionicPopup', '$ionicLoading', '$timeout', function ($scope, dishes, favorites, favoriteFactory, baseURL, $ionicListDelegate, $ionicPopup, $ionicLoading, $timeout) {
    
        $scope.favorites = favorites;
        $scope.dishes = dishes;

        $scope.baseURL = baseURL;
        $scope.shouldShowDelete = false;

        $scope.deleteFavorite = function (index) {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Confirm Delete',
                template: 'Are you sure you want to delete this item?'
            });
            confirmPopup.then(function (res) {
                if (res) {
                    console.log('Ok to delete');
                    favoriteFactory.deleteFromFavorites(index);
                    $scope.favorites = favoriteFactory.getFavorites();
                } else {
                    console.log('Canceled delete');
                }
            });
            $scope.shouldShowDelete = false;
        }
    }])
    .filter('favoriteFilter', ['favoriteFactory', function (favoriteFactory) {
        return function (dishes) {
            var out = [];
            var fav = favoriteFactory.getFavorites();
            for (var i = 0; i < fav.length; i++) {
                for (var j = 0; j < dishes.length; j++) {
                    if (dishes[j].id === fav[i])
                        out.push(dishes[j]);
                }
            }
        return out;
        }
    }]);
;
