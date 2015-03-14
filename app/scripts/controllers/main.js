'use strict';

angular.module('geekValetLanding')
  .controller('MainCtrl',['$scope','$anchorScroll','$location','Api','ngDialog','$document','Selectedtime',function ($scope,$anchorScroll,$location,api,ngDialog,$document,selectedTime) {
    $scope.selected = {};
    $scope.timeunselected = true;
    $scope.loggedin = false;
    $scope.laundrySkills=['Wash + Iron', 'Iron']
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
                            url: 'https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg',
                            type: 'xyz',

                            
                        }
                    },
                    overlays: {
                        xyz: {
                            name: 'Labels',
                            type: 'xyz',
                            url: 'https://stamen-tiles.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}.png',
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
                            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
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
    $scope.poptastic=function(url) {
      var GoogleSignin = window.open(url , 'GoogleSignin', 'height=600,width=450');
      if (window.focus) {
        GoogleSignin.focus();
      }

      var pollTimer   =   window.setInterval(function() { 
                try {
                    
                    if (GoogleSignin.document.URL.indexOf('close') != -1) {
                        window.clearInterval(pollTimer);
                        var url =   GoogleSignin.document.URL;
                        if($scope.selected.timerange==undefined){
                          $scope.timeunselected = true;
                        }else{
                          $scope.timeunselected = false;
                        }
                        $scope.loggedin = true
                        $scope.$apply()
                        GoogleSignin.close();
                        

                    }
                } catch(e) {
                }
       }, 100);

    }
    $scope.SelectTimeSlot=function(){
      api.getTimeSlots.then(function(data){
        $scope.timeslots = data.available_slots

      })


    $scope.timeslotsDialog = ngDialog.open({
              template:'views/laundry.html',
              scope:$scope,
              className: 'ngdialog-theme-default'
            })    
    }
    $scope.selectSkill=function(){
      selectedTime.set($scope.selected.skill)
    }
    $scope.ModifyOrder=function(){
      $scope.ordercomplete = false
      $scope.timeunselected=true
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
              className: 'ngdialog-theme-default'
            })      
          });
        }else{
          $scope.placeholdertext = 'valid email id is required'
        }
    }
    $scope.$watch('loggedin',function(){
      if($scope.loggedin == true){
         api.user.get().then(function(response){
            $scope.user = response
         })
      }
    })
    
    $scope.$watch('selected.timerange',function(){
      if($scope.selected.timerange){
        $scope.parsedslot = JSON.parse($scope.selected.timerange)
        $scope.selectSlot = moment($scope.parsedslot.schedule_start_at)
        $scope.selectedSlotHumanized = $scope.selectSlot.format('dddd, MMM Do hh:mm a')
      }
    })
    $scope.OrderSubmit = function(){
      $scope.user.save()
      var selectedDateJSON = $scope.selectSlot.format('YYYY-MM-DDTHH:mm:ss.SSS')+'Z'
      var args={
        "service":"laundry",
        "request":$scope.selected.skill,
        "scheduled":selectedDateJSON,
        "address":$scope.user.address

      }
      api.order.post(args).then(function(response){
        $scope.ordercomplete = true;
        
      })
    }
                
}]);
