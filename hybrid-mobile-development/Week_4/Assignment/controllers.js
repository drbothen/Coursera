angular.module('conFusion.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $localStorage, $ionicPlatform, $cordovaCamera, $cordovaImagePicker) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = $localStorage.getObject('userinfo', '{}');
  $scope.reservation = {};
  $scope.registration = {};

  // Create the modals that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $ionicModal.fromTemplateUrl('templates/reserve.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.reserveform = modal;
  });

  $ionicModal.fromTemplateUrl('templates/register.html', {
    scope: $scope
  }).then(function (modal) {
    $scope.registerform = modal;
  });

  // Triggered in the modals to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  $scope.closeReserve = function() {
    $scope.reserveform.hide();
  };

  $scope.closeRegister = function () {
    $scope.registerform.hide();
  };

  // Open the modals
  $scope.login = function() {
    $scope.modal.show();
  };

  $scope.reserve = function() {
    $scope.reserveform.show();
  };

  $scope.register = function () {
    $scope.registerform.show();
  };

  // Perform the action when the user submits the form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    $localStorage.storeObject('userinfo', $scope.loginData);
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  $scope.doReserve = function() {
    console.log('Doing reservation', $scope.reservation);

    // Simulate a delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeReserve();
    }, 1000);
  };

  $scope.doRegister = function () {
    //console.log('Doing reservation', $scope.reservation);

    // Simulate a registration delay. Remove this and replace with your registration
    // code if using a registration system
    $timeout(function () {
      $scope.closeRegister();
    }, 1000);
  };

  $ionicPlatform.ready(function() {

    $scope.takePicture = function() {

      var options = {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 100,
        targetHeight: 100,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
      };

      $cordovaCamera.getPicture(options).then(function(imageData) {
        $scope.registration.imgSrc = "data:image/jpeg;base64," + imageData;
      }, function(err) {
        console.log(err);
      });

      $scope.registerform.show();

    };

    $scope.pickPicture = function() {

      var options = {
        maximumImagesCount: 1,
        Width: 100,
        height: 100,
        quality: 50
      };

      $cordovaImagePicker.getPictures(options)
        .then(function (imageData) {
          for (var i = 0; i < imageData.length; i++) {
            $scope.registration.imgSrc = imageData[i];
          }
        }, function (err) {
          console.log(err);
        });

      $scope.registerform.show()

    };

  });
})

  .controller('MenuController', ['$scope', 'menuFactory', 'dishes', 'favoriteFactory','baseURL', '$ionicListDelegate', '$ionicPlatform', '$cordovaLocalNotification', '$cordovaToast', function($scope, menuFactory, dishes, favoriteFactory, baseURL, $ionicListDelegate, $ionicPlatform, $cordovaLocalNotification, $cordovaToast) {

    $scope.baseURL = baseURL;
    $scope.tab = 1;
    $scope.filtText = '';
    $scope.showDetails = false;
    $scope.showMenu = false;
    $scope.message = "Loading ...";

    $scope.dishes = dishes;



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
      console.log("index is " + index);

      favoriteFactory.addToFavorites(index);
      $ionicListDelegate.closeOptionButtons();

      $ionicPlatform.ready(function () {
        $cordovaLocalNotification.schedule({
          id:1,
          title: "Added Favorite",
          text: $scope.dishes[index].name
        }).then(function () {
          console.log('Added Favorite'+$scope.dishes[index].name);
        },
          function () {
            console.log('Failed to add Favorite')
          });

        $cordovaToast
          .show('Added Favorite '+$scope.dishes[index].name, 'long', 'center')
          .then(function (success) {
            // success
          }, function (error) {
            // error
          });

      });
    }
  }])

  .controller('ContactController', ['$scope', function($scope) {

    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };

    var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];

    $scope.channels = channels;
    $scope.invalidChannelSelection = false;

  }])

  .controller('FeedbackController', ['$scope', 'feedbackFactory',function($scope, feedbackFactory) {

    $scope.sendFeedback = function() {

      console.log($scope.feedback);

      if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
        $scope.invalidChannelSelection = true;
        console.log('incorrect');
      }
      else {
        $scope.feedback.date = new Date().toISOString();
        feedbackFactory.getFeedBack().update($scope.feedback);


        $scope.invalidChannelSelection = false;



        $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
        $scope.feedback.mychannel="";
        $scope.feedbackForm.$setPristine();
        console.log($scope.feedback);
      }

    };
  }])

  .controller('DishDetailController', ['$scope', '$stateParams', 'dish', 'menuFactory', 'favoriteFactory','baseURL', '$ionicPopover', '$ionicModal', '$ionicPlatform', '$cordovaLocalNotification', '$cordovaToast', function($scope, $stateParams, dish, menuFactory, favoriteFactory, baseURL, $ionicPopover, $ionicModal, $ionicPlatform, $cordovaLocalNotification, $cordovaToast) {

    $scope.baseURL = baseURL;
    $scope.showDish = false;
    $scope.message = "Loading ...";

    $scope.dish = dish;

    // setup popover

    $ionicPopover.fromTemplateUrl('templates/dish-detail-popover.html', {
      scope: $scope
    }).then(function(popover) {
      $scope.popover = popover;
    });

    $scope.openPopover = function($event) {
      $scope.popover.show($event);
    };
    $scope.closePopover = function() {
      $scope.popover.hide();
    };

    // My Favorites

    $scope.addFavorite = function (index) {
      console.log("index is " + index);
      favoriteFactory.addToFavorites(index);
      $scope.closePopover();


      $ionicPlatform.ready(function () {
        $cordovaLocalNotification.schedule({
          id: 1,
          title: "Added Favorite",
          text: $scope.dish.name
        }).then(function () {
            console.log('Added Favorite ' + $scope.dish.name);
          },
          function () {
            console.log('Failed to add Notification ');
          });

        $cordovaToast
          .show('Added Favorite ' + $scope.dish.name, 'long', 'bottom')
          .then(function (success) {
            // success
          }, function (error) {
            // error
          });
      });
    };

    // setup Modals

    $ionicModal.fromTemplateUrl('templates/dish-comment.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.commentform = modal;
    });

    // Triggered in the modals to close it
    $scope.closeComment = function() {
      $scope.commentform.hide();
    };

    // Open the modals
    $scope.openComment = function() {
      $scope.commentform.show();
    };

    // Comment system

    $scope.mycomment = {
      rating:5,
      comment:"",
      author:"",
      date:""
    };

    $scope.submitComment = function () {
      $scope.closeComment();

      $scope.mycomment.date = new Date().toISOString();
      console.log($scope.mycomment);

      $scope.dish.comments.push($scope.mycomment);

      menuFactory.update({id:$scope.dish.id}, $scope.dish);

      $scope.commentForm.$setPristine();

      $scope.mycomment = {
        rating:5,
        comment:"",
        author:"",
        date:""
      };


    };


  }])

  .controller('DishCommentController', ['$scope', 'menuFactory', function($scope, menuFactory) {

    $scope.mycomment = {
      rating:5,
      comment:"",
      author:"",
      date:""
    };

    $scope.submitComment = function () {

      $scope.mycomment.date = new Date().toISOString();
      console.log($scope.mycomment);

      $scope.dish.comments.push($scope.mycomment);

      menuFactory.getDishes().update({id:$scope.dish.id}, $scope.dish);

      $scope.commentForm.$setPristine();

      $scope.mycomment = {
        rating:5,
        comment:"",
        author:"",
        date:""
      };
    };
  }])

  // implement the IndexController and About Controller here
  .controller('IndexController', ['$scope', 'featuredDish', 'promotion', 'executiveChef', 'corporateFactory', 'menuFactory', 'promotionFactory', 'baseURL', function($scope, featuredDish, promotion, executiveChef, corporateFactory, menuFactory, promotionFactory, baseURL) {

    $scope.baseURL = baseURL;
    $scope.message = "Loading ...";

    $scope.featuredDish = featuredDish;
    $scope.promotion = promotion;
    $scope.executiveChef = executiveChef;


  }])

  .controller('AboutController', ['$scope', 'corporateFactory', 'leaders', 'baseURL', function($scope, corporateFactory, leaders, baseURL) {

    $scope.baseURL = baseURL;
    $scope.leaders = leaders;


  }])

  .controller('FavoritesController', ['$scope', 'dishes', 'favorites', 'favoriteFactory', 'baseURL', '$ionicListDelegate', '$ionicPopup', '$ionicLoading', '$timeout', '$cordovaVibration', function ($scope, dishes, favorites, favoriteFactory, baseURL, $ionicListDelegate, $ionicPopup, $ionicLoading, $timeout, $cordovaVibration) {

    //console.log($cordovaVibration);

    $scope.baseURL = baseURL;
    $scope.shouldShowDelete = false;

    $scope.favorites = favorites;


    $scope.dishes = dishes;

    console.log($scope.dishes, $scope.favorites);

    $scope.toggleDelete = function () {
      $scope.shouldShowDelete = !$scope.shouldShowDelete;
      console.log($scope.shouldShowDelete);
    };

    $scope.deleteFavorite = function (index) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Confirm Delete',
        template: 'Are you sure you want to delete this item?'
      });

      confirmPopup.then(function(res) {
        if(res) {
          console.log('Ok to delete');
          favoriteFactory.deleteFromFavorites(index);
          $cordovaVibration.vibrate(100);
        } else {
          console.log('Canceled delete');
        }
      });
      $scope.shouldShowDelete = false;
      //$scope.favorites = favoriteFactory.getFavorites();
    };

  }])

  .filter('favoriteFilter', function () {
    return function (dishes, favorites) {
      var out = [];
      for (var i = 0; i < favorites.length; i++) {
        for (var j = 0; j < dishes.length; j++) {
          if (dishes[j].id === favorites[i].id)
            out.push(dishes[j]);
        }
      }
      return out;
    }
  })

;

