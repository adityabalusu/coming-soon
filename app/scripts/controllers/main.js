'use strict';

angular.module('geekValetLanding')
  .controller('MainCtrl',['$scope','$anchorScroll','$location','Api','ngDialog','$document','Selectedtime','$http',function ($scope,$anchorScroll,$location,api,ngDialog,$document,selectedTime,http) {
    $scope.selected = {};
    $scope.activeareas=['Koramangala','Neelasandra','Adugodi','HSR Layout','Ejipura','Viveka Nagar']
    $scope.timeunselected = true;
    $scope.location_permitted =false;
    $scope.location_denied =false;
    $scope.currentlyserving = false;
    $scope.location ={};
    $scope.loggedin = false;
    $scope.laundrySkills=['Wash + Iron','Wash', 'Iron']
    $scope.plumberSkills=['Repair','Installation']
    $scope.elecSkills=['Repair','Installation']
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
    $scope.signupSpecificVert = function(vertical){
        var postdata = {email:$scope.user.email,feedback:vertical}
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
    $scope.locationDenied =function(){
      $scope.location_denied = true;
    }
    $scope.SelectTimeSlot=function(event){
    
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(response){
            var args;
            $scope.location= response;
            
            http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+$scope.location.coords.latitude+','+$scope.location.coords.longitude).then(function(response){
            //http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=12.938073,77.623953').then(function(response){
                $scope.location_permitted =true;
                var formatted_address = response.data.results[0].formatted_address;
                var address_tokens = formatted_address.split(',');
                var area_index = address_tokens.length - 4
                $scope.region = address_tokens[area_index]
                $scope.currentlyNotServing = $scope.activeareas.indexOf($scope.region.trim())==-1
                if($scope.currentlyNotServing){
                  var args ={
                    location:[$scope.location.coords.latitude,$scope.location.coords.longitude],
                    service_available:false
                  }
                }else{
                  var args ={
                    location:[$scope.location.coords.latitude,$scope.location.coords.longitude],
                    service_available:true
                  }
                }
                api.missedorder.post(args).then(function(response){
                
                })
                
                
            })
          });
      } else {
          $scope.noGeoLocation = true
      }
    

    $scope.service_type= event.currentTarget.id
    api.getTimeSlots.then(function(data){
        $scope.timeslots = data.available_slots

      })
    $scope.timeslotsDialog = ngDialog.open({
              template:'views/allVerticals.html',
              scope:$scope,
              className: 'ngdialog-theme-default'
            })    
    }
    $scope.launchingSoon=function(event){
     $scope.submitted = false;
     $scope.submittedFeedback = false;
     $scope.verticalChosen = event.currentTarget.id
     $scope.launchingSoonDialog = ngDialog.open({
              template:'views/launching.html',
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
        $scope.selectSlot = moment.unix($scope.parsedslot.schedule_start_at)
        $scope.selectedSlotHumanized = $scope.selectSlot.format('dddd, MMM Do hh:mm a')
      }
    })
    $scope.selectServingArea = function(area){
        $scope.selected.area = area;
    }
    $scope.OrderSubmit = function(){
      var args;
      var selectedDateJSON = $scope.selectSlot.format('X')
      if($scope.location){
        args={
        "service":$scope.service_type,
        "request":$scope.selected.skill,
        "location":[$scope.location.coords.latitude,$scope.location.coords.longitude],
        "location_permitted":true,
        "scheduled":selectedDateJSON,
        "address":$scope.user.address

        }
      }else{
        args={
          "service":$scope.service_type,
          "request":$scope.selected.skill,
          "location_permitted":false,
          "scheduled":selectedDateJSON,
          "address":$scope.user.address

        }
      }
      $scope.user.save().then(function(){
        api.order.post(args).then(function(response){
        $scope.ordercomplete = true;
        
      })

      })
     
      
    }
                
}]);
