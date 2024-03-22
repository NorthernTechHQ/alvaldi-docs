---
title: Setup with Azure
date: 2023-07-12:00:00+00:00
preview_description: Create you account and install our module on your devices.
sorting: 2
---

With our Azure IoT Hub integration, and Azure IoT Edge module, it's easy to deploy Alvaldi to devices, and have your device list automatically synchronized with Alvaldi;

{{< img "/azure-how-it-works.png" "Diagram with Alvaldi communicating with a user, a device and the Azure IoT Hub.">}}

In this tutorial, we assume that you're already using Azure IoT Hub and Azure IoT Edge.
If you need help with using Azure IoT Hub / IoT Edge for the first time, take a look at our [Azure IoT Edge quickstart](/reference/azure-iot-edge-quickstart).

There are 3 short steps you need to complete to set up Alvaldi before using it for the first time:

{{< wideimg "/azure-getting-started.png" "Diagram with the 4 steps, sign up, enable integration, install module, connect">}}

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
When installing the module, your devices need to know which Alvaldi account to connect to.
In your Alvaldi account, go to **Settings**, and then **Organization and billing**:

{{< wideimg "/settings-organization-token.png" "The settings UI showing an organization token (censored).">}}

There you will see your **Organization token** (Tenant token).
Keep this window / tab open, you will need to copy the token soon.

Find the Alvaldi edge module in the Azure marketplace:

https://azuremarketplace.microsoft.com/en-us/marketplace/apps?search=alvaldi-edge-module&page=1

**Note:** We have 2 products listed on the Azure marketplace: **Alvaldi** for subscribing to a paid plan of Alvaldi via Azure, and **Alvaldi edge module** for installing the client on your Azure IoT Edge devices.

Click on **Get it now** and **Continue** to start the process of deploying the module.
You'll be redirected to the Azure Portal UI, letting you specify the device(s):

{{< wideimg "/edge-module-target-devices.png" "Screenshot of Azure's UI for targeting which devices to deploy to.">}}

Enter the IoT Edge device name or use the **Find Device** button if you don't remember it.
Continue by clicking **Create** once, but **do not click** the next **Review + create** button yet.

We first have to enter the Alvaldi tenant token - Click the name of the module (**Alvaldiedgemodule**) in order to edit it.
Go to the **Environment Variables** tab, and paste the tenant token from above (from Alvaldi settings) into the 3rd value:

{{< wideimg "/edge-module-edit-tenant-token.png" "Azure Module UI, showing the edited TENANT_TOKEN environment variable.">}}

You can also change the name, if you want.
Once done, you can click **Apply**, then **Review + create**, and **Create** to deploy the module.

## The device shows up

After the module has been successfully deployed, your device should show up in Alvaldi:

https://app.alvaldi.com/ui/devices

## Up next

The next part of the getting started series is:

[Connecting with the terminal.](/getting-started/connecting-with-the-terminal)
