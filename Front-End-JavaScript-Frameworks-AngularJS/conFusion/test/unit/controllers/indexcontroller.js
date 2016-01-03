/**
 * Created by josh on 1/3/2016.
 */
describe('Controller: IndexController', function () {

    // load the controller's module
    beforeEach(module('confusionApp')); // before each test

    var IndexController, scope, $httpBackend
    var api_root = "http://localhost:3000/";

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, _$httpBackend_,  $rootScope, menuFactory, corporateFactory) {

        // place here mocked dependencies
        $httpBackend = _$httpBackend_;

        $httpBackend.when('GET', api_root+"dishes"+"/0").respond(
            {
                "id": 0,
                "name": "Uthapizza",
                "image": "images/uthapizza.png",
                "category": "mains",
                "label": "Hot",
                "price": "4.99",
                "description": "A",
                "comments":[{}]
            }
        );

        $httpBackend.when('GET', api_root+"promotions"+"/0").respond(
            {
                "id": 0,
                "name": "Weekend Grand Buffet",
                "image": "images/buffet.png",
                "label": "New",
                "price": "19.99",
                "description": "B"
            }
        );

        $httpBackend.when('GET', api_root+"leadership"+"/3").respond(
            {
                "id": 3,
                "name": "Alberto Somayya",
                "image": "images/alberto.png",
                "designation": "Executive Chef",
                "abbr": "EC",
                "description": "C"
            }
        );


        scope = $rootScope.$new(); // create a new scope
        IndexController = $controller('IndexController', {
            $scope: scope, menuFactory: menuFactory, corporateFactory: corporateFactory
        });
        $httpBackend.flush();

    }));

    // Tests to be ran

    it('should create "featuredDish" with 1 dishes fetched from xhr', function(){

        expect(scope.showDish).toBeTruthy();
        expect(scope.featuredDish).toBeDefined();
        //expect(scope.featuredDish.length).toBe(1);

    });

   it('should create "promotion" with 1 promotion fetched from xhr', function(){

        expect(scope.showPromotion).toBeTruthy();
        expect(scope.promotion).toBeDefined();
        //expect(scope.promotion.length).toBe(1);

    });

    /*it('should create "executiveChef" with 1 promotion fetched from xhr', function() {

        expect(scope.showexecutiveChef).toBeTruthy();
        expect(scope.dishes[0].name).toBe("Uthapizza");
        expect(scope.dishes[1].label).toBe("New");

    });

    it('should change the tab selected based on tab clicked', function(){

        expect(scope.tab).toEqual(1);

        scope.select(3);

        expect(scope.tab).toEqual(3);
        expect(scope.filtText).toEqual('mains');

    });*/
});