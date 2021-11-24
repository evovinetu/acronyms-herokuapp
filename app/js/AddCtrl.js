/**
 * Created by evo on 17.03.04.
 */


(function() {  // to keep variable myApp local

    // get all info about angular's evoApp, defined in evoApp.js
    var ngApp = angular.module("ngApp");


    // controller to prepare initial settings
    ngApp.controller('AddCtrl', function($scope, $state){
        console.log('Add Controller');


        


        //////////////////////////////////////////////
        // FUNCTIONS

        $scope.UploadThis = function (add) {

            // add parameter that it's unconfirmed
            add['Unconfirmed'] = 'true';

            // TODO: upload the new data to the database
            console.log(add);

            // add to array
            $scope.appData.data_all.push(add);

            // sort array
            //$scope.appData.sort((a, b) => a.Acronym.localeCompare(b.Acronym));

            // in the search page, show the confirmation
            $scope.appData['confirmation'] = true;

            // go back to the search page
            $scope.GoToState('search');
        };


    });

}());
