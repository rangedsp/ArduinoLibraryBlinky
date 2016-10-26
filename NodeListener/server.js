var http = require('http');
var url = require('url');
var uwp = require('uwp');

uwp.projectNamespace('Windows');
uwp.projectNamespace('Microsoft');

if (Microsoft.IoT.Lightning.Providers.LightningProvider.isLightningEnabled) {
    Windows.Devices.LowLevelDevicesController.defaultProvider = Microsoft.IoT.Lightning.Providers.LightningProvider.getAggregateProvider();
}

var gpioController = Windows.Devices.Gpio.GpioController.getDefault();

pin = gpioController.openPin(5);
pin.setDriveMode(Windows.Devices.Gpio.GpioPinDriveMode.output);
pin.write(Windows.Devices.Gpio.GpioPinValue.high);

http.createServer(function (req, res) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var action = query.action;

    if (action === "on") {
        pin.write(Windows.Devices.Gpio.GpioPinValue.high);
    }
    if (action === "off") {
        pin.write(Windows.Devices.Gpio.GpioPinValue.low);
    }

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Toggling LED. action: ' + action + '\n');
}).listen(1337);