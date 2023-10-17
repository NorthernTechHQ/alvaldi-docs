---
title: System requirements
date: 2023-10-03:00:00+00:00
preview_description: Requirements for systems to run Alvaldi
sorting: 3
---

Alvaldi lets you remotely access and troubleshoot connected devices, giving you information about the device, and the ability to transfer files and run commands in a terminal.

To use Alvaldi, you need:

* An Alvaldi account, to log in to the application: [app.alvaldi.com](https://app.alvaldi.com).
* An Azure account, with devices in Azure IoT Hub. Device list will be synchronized with Alvaldi.

To install Alvaldi on your devices, they must have:

* 32-bit ARM (armv6, armv7), 64-bit ARM or x86-64 CPU architecture.
* The Azure IoT Edge container runtime
* At least 11 MiB free storage and memory for the client

Currently, only Azure IoT Hub and Azure IoT Edge is supported, but we will introduce more platforms soon.
See the [FAQ](/reference/faq) for more information.

To get started with Alvaldi, read our [getting started guide](/getting-started).
