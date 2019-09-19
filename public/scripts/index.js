const snackbar = new mdc.snackbar.MDCSnackbar.attachTo(document.querySelector('.mdc-snackbar'));
const buttonRipple = new mdc.ripple.MDCRipple.attachTo(document.querySelector('.mdc-button'));
const textField = new mdc.textField.MDCTextField(document.querySelector('.mdc-text-field'));
const menu = new mdc.menu.MDCMenu.attachTo(document.querySelector('.mdc-menu'));
const dialog = new mdc.dialog.MDCDialog(document.querySelector('.mdc-dialog'));
const tabBar = new mdc.tabBar.MDCTabBar(document.querySelector('.mdc-tab-bar'));

// Получение ссылок на элементы UI
let connectButton = document.getElementById('connect');
let disconnectButton = document.getElementById('disconnect');
let terminalContainer = document.getElementById('terminal');
let sendForm = document.getElementById('send-form');
let inputField = document.getElementById('text-field-hero-input');
let cartTemp = document.getElementById("temp");
let cartSpeed = document.getElementById("speed");
let speedMenuButton = document.getElementById("speedMenu");
let tempMenuButton = document.getElementById("tempMenu");
let batteryMenuButton = document.getElementById("batteryMenu");
let serialMenuButton = document.getElementById("serialMenu");
let dialogConnect = document.getElementById("blueConnect");
let dialogDisconnect = document.getElementById("blueDisconnect");
let fullscreenButton = document.getElementById("fullscreen");
let fullscreenButton1 = document.getElementById("fullscreenExit");

var fullscreenView = document.getElementById("fullscreen-content");
var mainView = document.getElementById("main-div");

var splitData;

speedMenuButton.addEventListener('click', function() {
  menu.open = true;
});

fullscreenButton.addEventListener('click', function() {
  fullscreenViewMode();
});

fullscreenButton1.addEventListener('click', function() {
  fullscreenViewMode();
});

function fullscreenViewMode() {
  if (fullscreenView.style.display === "none") {
    fullscreenView.style.display = "block";
    mainView.style.display = "none";
  } else {
    fullscreenView.style.display = "none";
    mainView.style.display = "block";
  }
}

// Подключение к устройству при нажатии на кнопку Connect
connectButton.addEventListener('click', function() {
  dialog.open();
  bluetoothDialog();
});

function bluetoothDialog() {
  dialogConnect.addEventListener('click', function() {
    connect();
  });
  dialogDisconnect.addEventListener('click', function() {
    disconnect();
  });
}

// Обработка события отправки формы
sendForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Предотвратить отправку формы
  send(inputField.value); // Отправить содержимое текстового поля
  inputField.value = '';  // Обнулить текстовое поле
  inputField.focus();     // Вернуть фокус на текстовое поле
});

// Кэш объекта выбранного устройства
let deviceCache = null;

// Кэш объекта характеристики
let characteristicCache = null;

// Промежуточный буфер для входящих данных
let readBuffer = '';

function scrollTerminal() {
  terminal.scrollTop = terminal.scrollHeight;
}

// Запустить выбор Bluetooth устройства и подключиться к выбранному
function connect() {
  return (deviceCache ? Promise.resolve(deviceCache) :
      requestBluetoothDevice()).
      then(device => connectDeviceAndCacheCharacteristic(device)).
      then(characteristic => startNotifications(characteristic)).
      catch(error => log(error));
}

// Запрос выбора Bluetooth устройства
function requestBluetoothDevice() {
  log('Requesting bluetooth device...');
  scrollTerminal();

  return navigator.bluetooth.requestDevice({
    filters: [{services: [0xFFE0]}],
  }).
      then(device => {
        log('"' + device.name + '" bluetooth device selected');
        scrollTerminal();
        deviceCache = device;
        deviceCache.addEventListener('gattserverdisconnected',
            handleDisconnection);

        return deviceCache;
      });
}

// Обработчик разъединения
function handleDisconnection(event) {
  let device = event.target;

  log('"' + device.name +
      '" bluetooth device disconnected, trying to reconnect...');
  scrollTerminal();

  connectDeviceAndCacheCharacteristic(device).
      then(characteristic => startNotifications(characteristic)).
      catch(error => log(error));
}

// Подключение к определенному устройству, получение сервиса и характеристики
function connectDeviceAndCacheCharacteristic(device) {
  if (device.gatt.connected && characteristicCache) {
    return Promise.resolve(characteristicCache);
  }

  log('Connecting to GATT server...');
  scrollTerminal();

  return device.gatt.connect().
      then(server => {
        log('GATT server connected, getting service...');
        scrollTerminal();
        snackbar.labelText = "Your Connected";
        snackbar.open();
        return server.getPrimaryService(0xFFE0);
      }).
      then(service => {
        log('Service found, getting characteristic...');
        scrollTerminal();
        return service.getCharacteristic(0xFFE1);
      }).
      then(characteristic => {
        log('Characteristic found');
        scrollTerminal();
        characteristicCache = characteristic;

        return characteristicCache;
      });
}

// Включение получения уведомлений об изменении характеристики
function startNotifications(characteristic) {
  log('Starting notifications...');
  scrollTerminal();

  return characteristic.startNotifications().
      then(() => {
        log('Notifications started');
        scrollTerminal();
        characteristic.addEventListener('characteristicvaluechanged',
            handleCharacteristicValueChanged);
      });
}

// Получение данных
function handleCharacteristicValueChanged(event) {
  let value = new TextDecoder().decode(event.target.value);

  for (let c of value) {
    if (c === '\n') {
      let data = readBuffer.trim();
      readBuffer = '';

      if (data) {
        receive(data);
      }
    }
    else {
      readBuffer += c;
    }
  }
}

// Обработка полученных данных
function receive(data) {
  log(data, 'in');
  scrollTerminal();
  splitData = data.split("-", 2);
  cartTemp.innerHTML = splitData[0];
  cartSpeed.innerHTML = splitData[1];
}

// Вывод в терминал
function log(data, type = '') {
  terminalContainer.insertAdjacentHTML('beforeend',
      '<div' + (type ? ' class="' + type + '"' : '') + '>' + '<p class="d">' + data + '</p>' + '</div>');
}

// Отключиться от подключенного устройства
function disconnect() {
  if (deviceCache) {
    log('Disconnecting from "' + deviceCache.name + '" bluetooth device...');
    scrollTerminal();
    deviceCache.removeEventListener('gattserverdisconnected',
        handleDisconnection);

    if (deviceCache.gatt.connected) {
      deviceCache.gatt.disconnect();
      log('"' + deviceCache.name + '" bluetooth device disconnected');
      scrollTerminal();
    }
    else {
      log('"' + deviceCache.name +
          '" bluetooth device is already disconnected');
      scrollTerminal();
    }
  }

  if (characteristicCache) {
    characteristicCache.removeEventListener('characteristicvaluechanged',
        handleCharacteristicValueChanged);
    characteristicCache = null;
  }

  deviceCache = null;

  cartTemp.innerHTML = "0";
  cartSpeed.innerHTML = "0";
}

// Отправить данные подключенному устройству
function send(data) {
  data = String(data);

  if (!data || !characteristicCache) {
    return;
  }

  data += '\n';

  if (data.length > 20) {
    let chunks = data.match(/(.|[\r\n]){1,20}/g);

    writeToCharacteristic(characteristicCache, chunks[0]);

    for (let i = 1; i < chunks.length; i++) {
      setTimeout(() => {
        writeToCharacteristic(characteristicCache, chunks[i]);
      }, i * 100);
    }
  }
  else {
    writeToCharacteristic(characteristicCache, data);
  }

  log(data, 'out');
  scrollTerminal();
}

// Записать значение в характеристику
function writeToCharacteristic(characteristic, data) {
  characteristic.writeValue(new TextEncoder().encode(data));
}
