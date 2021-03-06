/**
 * Created by josh on 1/2/2016.
 */
describe('Controller: MenuController', function () {

    // load the controller's module
    beforeEach(module('confusionApp')); // before each test

    var MenuController, scope, $httpBackend;
    var api_root = "http://localhost:3000/";

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, _$httpBackend_,  $rootScope, menuFactory) {

        // place here mocked dependencies
        $httpBackend = _$httpBackend_;


        $httpBackend.when('GET', api_root+"dishes").respond([
            {
                "id": 0,
                "name": "Uthapizza",
                "image": "images/uthapizza.png",
                "category": "mains",
                "label": "Hot",
                "price": "4.99",
                "description": "A",
                "comments":[{}]
            },
            {
                "id": 1,
                "name": "Zucchipakoda",
                "image": "images/zucchipakoda.png",
                "category": "mains",
                "label": "New",
                "price": "4.99",
                "description": "A",
                "comments":[{}]
            }
        ]);

        scope = $rootScope.$new(); // create a new scope
        MenuController = $controller('MenuController', {
            $scope: scope, menuFactory: menuFactory
        });
        $httpBackend.flush();

    }));

    // Tests to be ran

    it('should have showDetails as false', function () {

        expect(scope.showDetails).toBeFalsy();

    });

    it('should create "dishes" with 2 dishes fetched from xhr', function(){

        expect(scope.showMenu).toBeTruthy();
        expect(scope.dishes).toBeDefined();
        expect(scope.dishes.length).toBe(2);

    });

    it('should have the correct data order in the dishes', function() {

        expect(scope.dishes[0].name).toBe("Uthapizza");
        expect(scope.dishes[1].label).toBe("New");

    });

    it('should change the tab selected based on tab clicked', function(){

        expect(scope.tab).toEqual(1);

        scope.select(3);

        expect(scope.tab).toEqual(3);
        expect(scope.filtText).toEqual('mains');

    });
});