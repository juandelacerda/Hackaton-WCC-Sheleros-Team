/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var map;

//
// function googleMaps(){
//   div=$('#divMap');
//   map =plugin.google.maps.Map.getMap(div);
//   map.addEventListener(plugin.google.maps.event.MAP_READY, onMapReady);
// }
//
// function onMapReady() {
//   var button = document.getElementById("button");
//   button.addEventListener("click", onBtnClicked);
// }
//
// function onBtnClicked() {
//
//   // Move to the position with animation
//   map.animateCamera({
//     target: {lat: 37.422359, lng: -122.084344},
//     zoom: 17,
//     tilt: 60,
//     bearing: 140,
//     duration: 5000
//   }, function() {
//
//     // Add a maker
//     map.addMarker({
//       position: {lat: 37.422359, lng: -122.084344},
//       title: "Welecome to \n" +
//              "Cordova GoogleMaps plugin for iOS and Android",
//       snippet: "This plugin is awesome!",
//       animation: plugin.google.maps.Animation.BOUNCE
//     }, function(marker) {
//
//       // Show the info window
//       marker.showInfoWindow();
//
//       // Catch the click event
//       marker.on(plugin.google.maps.event.INFO_CLICK, function() {
//
//         // To do something...
//         alert("Hello world!");
//
//       });
//     });
//   });
// }


var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
      //  document.addEventListener('deviceready', googleMaps, false);
        $('#uberBtn').on('click',this.uberAction);
    },

    uberAction: function(){
      navigator.geolocation.getCurrentPosition(function(position){
        navigator.notification.alert(position.coords.latitude);
        var uberData = {
            clientId: "YOUR_CLIENT_ID",
            toLatitude: "37.802374",
            toLongitude: "-122.405818",
            toAddress: "",
            toNickname: "Home",
            fromLatitude: position.coords.latitude,
            fromLongitude: position.coords.longitude,
            fromNickname: 'Actual position',
            fromAddress: "",
            productId: "a1111c8c-c720-46c3-8534-2fcdd730040d"
        };
         window.uber(uberData, function(error) {
             navigator.notification.alert('Uber error'+error);
         });
      });

      // var home='';
      //
      //
      // $.ajax({
      //   method:'GET',
      //   url:'https://api.uber.com/v1/places/home',
      //   statusCode:{
      //     200: function(){
      //       navigator.notification.alert('code 200');
      //     },
      //     404: function(){
      //       navigator.notification.alert('code 404');
      //     },
      //     401:function(){
      //       //navigator.notification.alert('unautorized');
      //     },
      //     422:function(){
      //       navigator.notification.alert('unknow address');
      //     },
      //
      //   }
      // })
      // .done(function(data){
      // //  navigator.notification.alert('Done'+data);
      //    home= data.address;
      //
      //
      // }).fail(function(err){
      //     //navigator.notification.alert(err);
      // });
    },



    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();
