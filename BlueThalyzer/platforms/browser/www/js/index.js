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
        document.addEventListener('deviceready', this.onDeviceReady, false);
        $('#uberBtn').on('click',this.uberAction);
    },

    uberAction: function(){
    //  navigator.notification.alert('Uber action');
      var home='';

      $.ajax({
        method:'GET',
        url:'http://www.thomas-bayer.com/sqlrest/CUSTOMER',//'https://api.uber.com/v1/places/home',
        statusCode:{
          200: function(){
            navigator.notification.alert('code 200');
          },
          404: function(){
            navigator.notification.alert('code 404');
          },
          401:function(){
            navigator.notification.alert('unautorized');
          },
          422:function(){
            navigator.notification.alert('unknow address');
          },

        }
      })
      .done(function(data){
        navigator.notification.alert('Done'+data);
         home= data.address;
         var uberData = {
             clientId: "YOUR_CLIENT_ID",
             toLatitude: "37.802374",
             toLongitude: "-122.405818",
             toAddress: "1 Telegraph Hill Blvd, San Francisco, CA 94133",
             toNickname: "Coit Tower",
             fromLatitude: "37.775818",
             fromLongitude: "-122.418028",
             fromNickname: 'home',
             fromAddress: "1455 Market St, San Francisco, CA 94103",
             productId: "a1111c8c-c720-46c3-8534-2fcdd730040d"
         };
         window.uber(uberData, function(error) {
             navigator.notification.alert('Uber error');
         });

      }).fail(function(err){
          navigator.notification.alert(err);
      });
      navigator.notification.alert('Uber action');
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
