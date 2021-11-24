/**
 * Created by evo on 17.03.04.
 */


(function() {  // to keep variable myApp local

    // get all info about angular's evoApp, defined in evoApp.js
    var ngApp = angular.module("ngApp");


    // controller to prepare initial settings
    ngApp.controller('MainCtrl', function($scope, $state) {
        console.log('START MainCtrl');

        // all data in the parent scope
        var appData = $scope.appData = {};
        

        //get the CSV file
        var csvFile = "data/acronyms.csv";
        $.get(csvFile, function (data) {

            // convert to array of objects
            Papa.parse(data, {
                header: true,
                dynamicTyping: true,
                skipEmptyLines: true,
                complete: function(results) {
                    console.log('UPLOADED CSV FILE:');
                    console.log(results.data);

                    appData.data_all = results.data;
                }
            });
        });

        /////////////////////////
        // client
        var clientObj = new ClientJS();

        if (window.requestIdleCallback) {
            requestIdleCallback(function () {
                appData['browser'] = clientObj.getBrowserData();
                appData.browser['id'] = clientObj.getFingerprint();
            })
        } else {
            setTimeout(function () {
                appData['browser'] = clientObj.getBrowserData();
                appData.browser['id'] = clientObj.getFingerprint(); 
            }, 500)
        }


        /////////////////////////////////////////////
        console.log('MainCtrl Scope:',$scope);

        //////////////////////////////////////////////
        // FUNCTIONS

        $scope.GoToState = function (myState) {

            // set next State
            //appInfo.State++;
            appData.State  = myState;

            // go to next State
            $state.go(appData.State.toString(), {}, { location: false });

            console.log('MainCtrl Scope:',$scope);
        };

        $scope.DownloadCSV = function(){
            var csv = Papa.unparse($scope.final_array);
            console.log($scope.final_array);
            console.log(csv);
            var csvData = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
            var csvURL =  null;
            if (navigator.msSaveBlob) {
                csvURL = navigator.msSaveBlob(csvData, 'download.csv');
            } else {
                csvURL = window.URL.createObjectURL(csvData);
            }
            var tempLink = document.createElement('a');
            tempLink.href = csvURL;
            tempLink.setAttribute('download', 'download.csv');
            tempLink.click();
        }
    });

}());
