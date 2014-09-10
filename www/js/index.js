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

var output = document.getElementById('output');

function clearOutput() {
    while (output.hasChildNodes()) {
        if (output.lastChild.id == 'title') return;
        output.removeChild(output.lastChild);
    }
}

function takePhoto() {
    clearOutput();

    navigator.camera.getPicture(onSuccess, onError);

    function onSuccess(imageData) {
        var image = document.createElement('img');
        image.src = "data:image/png;base64," + imageData;

        output.appendChild(image);
    }

    function onError(error) {
        alert('Error: ' + error.name);
    }
}

function uploadPhoto() {
    clearOutput();

    navigator.camera.getPicture(onSuccess, onError, { sourceType: 2 });

    function onSuccess(imageData) {
        var image = document.createElement('img');
        image.src = "data:image/png;base64," + imageData;

        output.appendChild(image);
    }

    function onError(error) {
        alert('Error: ' + error.name);
    }
}

function getDeviceInfo() {
    alert('Model: ' + device.model + '\n' + 
          'Platform: ' + device.platform + '\n' +
          'Version: ' + device.version + '\n');
}

function getAccelerometer() {
    clearOutput();

    var element = document.createElement('div');
    element.innerHTML = 'Waiting for acceleration...';

    var stop = document.createElement('button');
    stop.innerHTML = 'Stop!';
    stop.onclick = function() {
        if (watchId) {
            navigator.accelerometer.clearWatch(watchId);
            watchId = null;
        }        
    };

    var watchId = navigator.accelerometer.watchAcceleration(onSuccess, onError, { frequency: 1000 });

    output.appendChild(stop);
    output.appendChild(element);

    function onSuccess(acceleration) {
        element.innerHTML = 'Acceleration X: ' + acceleration.x         + '<br />' +
                            'Acceleration Y: ' + acceleration.y         + '<br />' +
                            'Acceleration Z: ' + acceleration.z         + '<br />' +
                            'Timestamp: '      + acceleration.timestamp + '<br />';
    }

    function onError() {
        alert('Error getting acceleration!');
    }
}

function getHeading() {
    clearOutput();

    var element = document.createElement('div');
    element.innerHTML = 'Waiting for heading...';

    var stop = document.createElement('button');
    stop.innerHTML = 'Stop!';
    stop.onclick = function() {
        if (watchId) {
            navigator.compass.clearWatch(watchId);
            watchId = null;
        }        
    };

    var watchId = navigator.compass.watchHeading(onSuccess, onError, { frequency: 1000 });

    output.appendChild(stop);
    output.appendChild(element);

    function onSuccess(heading) {
        element.innerHTML = 'Heading: ' + heading.magneticHeading;
    }

    function onError() {
        alert('Error getting acceleration!');
    }
}

function getNetworkInfo() {
    alert('Connection type: ' + navigator.connection.type);
}
