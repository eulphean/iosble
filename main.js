console.log('javascript 2020');

const serviceUuid = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
const rxCharacteristic = "6e400003-b5a3-f393-e0a9-e50e24dcca9e";  // receive is from the phone's perspective

function connect() {
    console.log('Connect');
    navigator.bluetooth.requestDevice({
        filters: [{
          services: [serviceUuid]
        }]
      })
      .then(device => { 
          console.log('Device');
          console.log(device); 
          return device.gatt.connect();
        /* … */ })
      .then(server => {
          console.log('Server');
          console.log(server);
          return server.getPrimaryService(serviceUuid);
      })
      .then(service => {
          console.log('Service');
          console.log(service);
          return service.getCharacteristic(rxCharacteristic);
      })
      .then(characteristic => {
          console.log('Rx Characteristic');
          console.log(characteristic);
          return characteristic.startNotifications();
      })
      .then(characteristic => {
        characteristic.addEventListener('characteristicvaluechanged',
        handleRxData);

        console.log('Notifications started');
      })
      .catch(error => { console.error(error); });
}

function handleRxData(event) {
    console.log('Data received:');
    decoder = new TextDecoder('utf8');
    result = decoder.decode(event.target.value);
    console.log(result);
    // console.log(event);
}

function disconnect() {
    console.log('Disconnect');
}