---
title: Setup
date: 2023-07-12:00:00+00:00
preview_description: Create you account and install our module on your devices.
sorting: 2
---

In this tutorial, we assume that you're already using Azure IoT Hub and Azure IoT Edge.
If you need help with using Azure IoT Hub / IoT Edge for the first time, take a look at our [Azure IoT Edge quickstart](/reference/azure-iot-edge-quickstart).

There are 3 short steps you need to complete to set up Alvaldi before using it for the first time:

{{< wideimg "/getting-started.png" "Diagram with the 4 steps, sign up, enable integration, install module, connect">}}

In short, to set it up, you need to:

1. Create an Alvaldi account.
2. Enable the Azure IoT Hub integration.
3. Install the Azure IoT Edge module on your devices.

At that point, you're ready to start using Alvaldi, seeing device information, creating terminal sessions and transferring files.

## Step 1 - Create an Alvaldi account

You create an account via the signup page:

https://app.alvaldi.com/ui/signup

We recommend signing up using the Microsoft button, authenticating with your existing Microsoft account.
This will ease upgrade later - your Microsoft account can be automatically upgraded to a paid plan in the Azure Marketplace.

## Step 2 - Enable the Azure IoT Hub integration

When you log in for the first time, you will get a modal window guiding you to the next step:

{{< img "/azure-integration-popup.png" "Popup window with button for users to set up the Azure integration.">}}

Click the button, or navigate there manually via **Settings** -> **Integrations**.

Here you will need to enter the connection string from your IoT Hub, in Azure.
It can be found inside the policy you wish to use, under **Shared access policies** inside the IoT Hub:

{{< wideimg "/azure-iot-hub-connection-string.png" "Screenshot showing the information for a shared access policy of an Azure IoT Hub, including its primary / secondary key and primary / secondary connection string.">}}

Copy the connection string from your IoT Hub in Azure, to the text field in Alvaldi and press **Save**.

Device identities are now synchronized with Azure; when a device connects to Alvaldi it will be automatically approved.
Now we need to install the client on device(s) - the Azure IoT Edge module.

## Step 3 - Installing the Azure IoT Edge module

Your devices will not show up in Alvaldi until you install the client on them (the Alvaldi IoT Edge module).
In the device list, you will see:

{{< img "/no-devices-message.png" "UI with the message: It looks like Alvaldi is not installed. To get started, deploy the Alvaldi IoT Edge module in Azure.">}}

When you install the module, your devices need to know which Alvaldi account to connect to.
In your Alvaldi account, go to **Settings**, and then **Organization and billing**:

{{< wideimg "/settings-organization-token.png" "The settings UI showing an organization token (censored).">}}

There you will see your **Organization token** (Tenant token).
Keep this window / tab open, you will need to copy the token soon.

Find the Azure IoT Edge devices in the Azure portal, and click **Set modules**:

{{< wideimg "/azure-iot-edge-set-modules.png" "IoT Edge UI with the Set modules button highlighted.">}}

Add a module and fill out the necessary configuration below:

**Module name:** Up to you, can be: `alvaldi-edge-module`.

**Image URI:** `northerntech/nt-connect:main`.

**Environment variables:**

```sh
CONNECT_CHROOT=/host
CONNECT_SERVER_URL=https://app.alvaldi.com
CONNECT_TENANT_TOKEN=TENANT_TOKEN_FROM_YOUR_ALVALDI_ACCOUNT
```

**Important:** Put your real tenant token from Alvaldi settings into the variable(!).

**Container create options:**

```json
{
  "HostConfig": {
    "Privileged": true,
    "NetworkMode": "host",
    "Binds": [
      "/:/host"
    ]
  },
  "NetworkingConfig": {
    "EndpointsConfig": {
      "host": {}
    }
  }
}
```

**Note:** We are working on getting Alvaldi published as an Azure IoT Edge module in the Azure Marketplace.
Once that is in place, the values above will be pre-filled if you select the module in the marketplace.

## The device shows up

After the module has been successfully deployed, your device should show up in Alvaldi:

https://app.alvaldi.com/ui/devices

## Up next

The next part of the getting started series is:

[Connecting with the terminal.](/getting-started/connecting-with-the-terminal).
