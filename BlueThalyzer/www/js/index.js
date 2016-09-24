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
var mark;
var db;
var currentPosition;
var homePosition;

function googleMaps(){
  // db = window.sqlitePlugin.openDatabase({name: 'config.db', location: 'default'});
  // db.transaction(function(tx){
  //      tx.executeSql('CREATE TABLE IF NOT EXISTS config (home_lat, home_lng)');
  //      tx.executeSql('INSERT INTO config VALUES (?,?)', ['Alice', 101]);
  //       //tx.executeSql('INSERT INTO DemoTable VALUES (?,?)', ['Betty', 202]);
  //   }, function(error) {
  //      console.log('Transaction ERROR: ' + error.message);
  //    }, function() {
  //      console.log('Populated database OK');
  // });

  var div = document.getElementById("divMap");
  map =plugin.google.maps.Map.getMap(div);
  map.addEventListener(plugin.google.maps.event.MAP_READY, onMapReady);
}

function onMapReady() {
   var button = document.getElementById("addHome");
   button.addEventListener("click", onAddHomeClicked);
   goToCurrentPosition();
}

function onAddHomeClicked(){
  mark.getPosition(function(position){
    homePosition=position;
    navigator.notification.alert("homePosition"+homePosition);
    // db.transaction(function(tx){
    //      tx.executeSql('CREATE TABLE IF NOT EXISTS config (home_lat, home_lng)');
    //      tx.executeSql('INSERT INTO DemoTable VALUES (?,?)', [position.coords.latitude, position.coords.longitude ]);
    //     //  tx.executeSql('INSERT INTO DemoTable VALUES (?,?)', ['Betty', 202]);
    //   }, function(error) {
    //      console.log('Transaction ERROR: ' + error.message);
    //    }, function() {
    //      console.log('Populated database OK');
    // });
  });

}

function goToCurrentPosition() {
  navigator.geolocation.getCurrentPosition(function(position){
    map.animateCamera({
      target: {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      },
      zoom: 17,
      tilt: 0,
      bearing: 50,
      duration: 1000
    }, function() {

      // Add a maker
      map.addMarker({
        position: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
        draggable: true,
        title: "Welecome to \n" +
               "Cordova GoogleMaps plugin for iOS and Android",
        snippet: "This plugin is awesome!",
        animation: plugin.google.maps.Animation.BOUNCE
      }, function(marker) {
        mark=marker;
        // Show the info window
        //marker.showInfoWindow();

        // Catch the click event
        // marker.on(plugin.google.maps.event.INFO_CLICK, function() {
        //
        //   // To do something...
        //   //alert("Hello world!");
        //
        // });
      });
    });

  });


  // Move to the position with animation

}


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
        document.addEventListener('deviceready', googleMaps, false);
        $('#uberBtn').on('click',this.uberAction);
    },

    uberAction: function(){
      navigator.geolocation.getCurrentPosition(function(position){

        var uberData = {
            clientId: "YOUR_CLIENT_ID",
            toLatitude: homePosition.lat,
            toLongitude: homePosition.lng,
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

    }
};

app.initialize();
