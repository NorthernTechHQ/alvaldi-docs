---
title: Setup
date: 2024-03-11:00:00+00:00
sorting: 2
---

There are 3 short steps you need to complete to set up Alvaldi before using it for the first time:

{{< wideimg "/getting-started.png" "Diagram with the 4 steps, sign up, enable integration, install module, connect">}}

In short, to set it up, you need to:

1. Create an Alvaldi account.
2. Install the Alvaldi client on your device.
3. Approve the device in the UI.

At that point, you'll be ready to start using Alvaldi, seeing device information, creating terminal sessions and transferring files.

If you are using Azure IoT Hub and Azure IoT Edge, see our dedicated tutorial for [setting up Alvaldi with the Azure IoT Edge module](/getting-started/setup/setup-with-azure).

## Step 1 - Create an Alvaldi account

You create an account via the signup page:

https://app.alvaldi.com/ui/signup

## Step 2 - Install the client on your device

After signing up / logging in, you will see the device list.
A first time user will see an empty list, since you haven't added any devices.
Click on the **Add a new device** button in the top right corner:

{{< wideimg "/getting-started/setup/1-no-pending-devices.png" "Screenshot of the UI, showing no pending devices.">}}

The **Add a device** modal window shows you the different options for installing the client on your device:

{{< wideimg "/getting-started/setup/2-add-a-device.png" "Screenshot of the UI, showing the add a device modal window.">}}

If you have a raspberry pi ready to test Alvaldi, click the **Raspberry Pi quick start** option.
Otherwise, **Virtual device** gives you an easy way to test the the features of Alvaldi with a client running inside a Docker container on your computer.
(This requires that you have Docker installed on your computer).

The **Raspberry Pi quick start** option will show you a script that you can copy and paste into your Raspberry Pi terminal to install the client:

{{< wideimg "/getting-started/setup/3-install-script-raspberry-pi.png" "Screenshot of the UI, showing a script which can be copied to clipboard.">}}

Similarly, the **Virtual device** option also shows a script which can be copied into the terminal to download and run the appropriate Docker container:

{{< wideimg "/getting-started/setup/4-install-script-virtual-device.png" "Screenshot of the UI, showing another script which can be copied to clipboard.">}}

Either way, the result will be the same - your new device will show up in the device list.

## Step 3 - Approve the device in the UI

When the client is installed, the device will appear in the device list:

{{< wideimg "/getting-started/setup/5-all-devices.png" "Screenshot of the UI, showing devices.">}}

Click **Accept** to approve the device:

{{< wideimg "/getting-started/setup/6-authorize.png" "Screenshot of the UI.">}}

## Devices are ready

Once the client is installed and their identities are approved, you are ready to start using Alvaldi for troubleshooting and remote access to your devices.

## Up next

The next part of the getting started series is:

[Connecting with the terminal.](/getting-started/connecting-with-the-terminal)
