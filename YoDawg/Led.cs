using System;
using Windows.Devices;
using Windows.Devices.Gpio;
using Microsoft.IoT.Lightning.Providers;

namespace HardwareController
{
    public sealed class Led
    {
        public Led()
        {
            if (LightningProvider.IsLightningEnabled)
            {
                LowLevelDevicesController.DefaultProvider = LightningProvider.GetAggregateProvider();
            }

        }
        public void LedOn()
        {
            SetPin(GpioPinValue.High);
        }

        public void LedOff()
        {
            SetPin(GpioPinValue.Low);
        }

        private async void SetPin(GpioPinValue gpioPinValue)
        {
            GpioController controller = await GpioController.GetDefaultAsync();
            if (controller == null) throw new Exception("no controller");
            using (GpioPin pin = controller.OpenPin(29))
            {
                if (pin == null) throw new Exception("no pin");
                pin.SetDriveMode(GpioPinDriveMode.Output);
                pin.Write(gpioPinValue);
            }
        }
    }
}
