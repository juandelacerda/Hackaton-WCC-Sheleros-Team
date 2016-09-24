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
<<<<<<< HEAD
  var socket = new Socket();
  socket.open(
    "192.168.1.7",
    55555,
    function(){
      // invoked after successful opening of socket
      navigator.notification.alert('port opened');
    },
    function(errorMessage) {
      // invoked after unsuccessful opening of socket
      navigator.notification.alert('error socket');
      
  });

    socket.onData = function(data) {
      //invoked after new batch of data is received (typed array of bytes Uint8Array)
      navigator.notification.alert("fghjk");
    };

=======
>>>>>>> a6c690db4564d2064dd1116af51247e1191f8cf0
  db = window.sqlitePlugin.openDatabase({
      name: 'my.db',
      location: 'default',
      androidDatabaseImplementation: 3,
      androidLockWorkaround: 1
  });

  db.transaction(function(tx){
<<<<<<< HEAD
      // tx.executeSql('CREATE TABLE IF NOT EXISTS config (home_lat, home_lng, nombre, apellido, tel1, tel2)');
       //tx.executeSql('INSERT INTO config VALUES (?, ?, ?, ?, ?, ?)', [position.coords.latitude, position.coords.longitude,'Juan','Zheng','6642879876','123456789' ]);

=======
       tx.executeSql('CREATE TABLE IF NOT EXISTS config (home_lat, home_lng, nombre, apellido, tel1, tel2)');
>>>>>>> a6c690db4564d2064dd1116af51247e1191f8cf0
        //tx.executeSql('INSERT INTO DemoTable VALUES (?,?)', ['Betty', 202]);
    }, function(error) {
      navigator.notification.alert("error");
       console.log('Transaction ERROR: ' + error.message);
<<<<<<< HEAD

     }, function() {
       //navigator.notification.alert("success");
       console.log('Populated database OK');
  });
  //navigator.notification.alert("onMapReady");
=======
     }, function() {
       navigator.notification.alert("success");
       console.log('Populated database OK');
  });
  navigator.notification.alert("onMapReady");
>>>>>>> a6c690db4564d2064dd1116af51247e1191f8cf0
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
    db.transaction(function(tx){
<<<<<<< HEAD
        //  tx.executeSql('CREATE TABLE IF NOT EXISTS config (home_lat, home_lng, nombre, apellido, tel1, tel2)');
        //  tx.executeSql('INSERT INTO config VALUES (?, ?, ?, ?, ?, ?)', [position.coords.latitude, position.coords.longitude,'Juan','Zheng','6642879876','123456789' ]);
=======
    //     tx.executeSql('CREATE TABLE IF NOT EXISTS config (home_lat, home_lng, nombre, apellido, tel1, tel2)');
         tx.executeSql('INSERT INTO config VALUES (?,?,?,?,?,?)', [homePosition.lat, homePosition.lng, 'Juan', 'Zheng', '6642879876', '123456789' ]);
>>>>>>> a6c690db4564d2064dd1116af51247e1191f8cf0
        //  tx.executeSql('INSERT INTO DemoTable VALUES (?,?)', ['Betty', 202]);
      },
      function(error) {
         console.log('Transaction ERROR: ' + error.message);
<<<<<<< HEAD
         navigator.notification.alert('Error');
      },
      function() {
        navigator.notification.alert('addhome select');
        // db.transaction(function(tx){
        //   tx.executeSql('SELECT * AS data FROM config', [], function(tx, rs) {
        //     navigator.notification.alert('Record count (expected to be 2): ' + rs.rows.item(0).data);
        //   },
        //   function(tx, error) {
        //     console.log('SELECT error: ' + error.message);
        //   });
        //
        // });
    });
=======
          navigator.notification.alert('Error');
      },
      function() {
        navigator.notification.alert('addhome select');
    });    
>>>>>>> a6c690db4564d2064dd1116af51247e1191f8cf0
  });
    
    
    db.transaction(function(tx){    
        //tx.executeSql('SELECT * FROM config', [], function(tx, rs) {
          //alert('Record count (expected to be 2): ' + rs);
    alert('select');    
    }, function(tx, error) {
            alert('SELECT error: ' + error.message);
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
