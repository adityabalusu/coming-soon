'use strict';

angular.module('geekValetLanding')
  .controller('MainCtrl',['$scope','$anchorScroll','$location','Api','ngDialog','$document',function ($scope,$anchorScroll,$location,api,ngDialog,$document) {
    
    $scope.document = $document;
    angular.extend($scope, {
      mapconfig: {
                    //tileLayer: "http://c.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg",
                    zoomControl: false,
                    tileLayerOptions: {
                        opacity: 0.9,
                        detectRetina: true,
                        reuseTiles: true,
                    },
                    scrollWheelZoom: false
      },
      layers: {
                    baselayers: {
                        xyz: {
                            name: 'Plain',
                            url: 'http://c.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg',
                            type: 'xyz',

                            
                        }
                    },
                    overlays: {
                        xyz: {
                            name: 'Labels',
                            type: 'xyz',
                            url: 'http://c.tile.stamen.com/toner-labels/{z}/{x}/{y}.png',
                            visible:true,
                            layerParams: {
                                layers: 'labels',
                                format: 'image/png',
                                transparent: true,

                            }
                        },
                         osm: {
                            name: 'Open street map',
                            type: 'xyz',
                            url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                            layerParams: {
                                layers: 'labels',
                                format: 'image/png',
                                transparent: true,

                            }
                        }
                    }
                },
      circle:{
        shapes:{
                    type: "circle",
                    radius: 10*1000,
                    weight:2,
                    color:"#ff612f",
                    latlngs: {
                      lat: 12.931,
                      lng: 77.621
                    }
        }
      },
      center: {
          lat: 12.931,
          lng: 77.621,
          zoom: 12
      },
      
      koramangala:{
        mainMarker:{
          lat: 12.931,
          lng: 77.621,
          focus:true,
          message: "Koramangala"

        }
      } 
    });
    $scope.user = {};
    $scope.placeholdertext = 'Sign up now.Your first job(upto Rs.300) will be on us.'

    $scope.scrollTo = function(id,offset){
      var element = $('#'+id);
      $scope.document.duScrollToElement(element,offset,1000,TWEEN.Easing.Quadratic.Out)

    }

    $scope.submit = function(){
        var postdata = {email:$scope.user.email,feedback:$scope.user.feedback}
        api.signUp.post(postdata).then(function(response){
          $scope.submitted = true;
          $scope.submittedFeedback = true;
        });
    }
    $scope.onSignUpFocus=function(){
      $scope.placeholdertext='Your email id here'
    }
    $scope.onSignUpBlur=function(){
      $scope.placeholdertext='Sign up now.Your first job(upto Rs.300) will be on us.'
    }
     $scope.openDialog = function(){
        var postdata = {email:$scope.user.email}
        $scope.submittedFeedback = false;
        if($scope.user.email){
          api.signUp.post(postdata).then(function(response){
            ngDialog.open({
              template:'views/feedback.html',
              scope:$scope,
              showClose:false,
              className: 'ngdialog-theme-default'
            })      
          });
        }else{
          $scope.placeholdertext = 'valid email id is required'
        }
    }
                
}]);
