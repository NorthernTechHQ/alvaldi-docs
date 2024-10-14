---
title: Architecture
date: 2023-07-12T00:00:00+00:00
preview_description: Detailed information on how Alvaldi works.
sorting: 2
---

Alvaldi lets users remotely access and troubleshoot their connected devices.
Devices and users connect to the Alvaldi service at:

https://app.alvaldi.com/

The Alvaldi server is the central point of all communication.
It synchronizes devices with Azure, serves the UI and requests made by users, and interacts with devices for inventory information, file transfers, and terminal sessions.

{{< wideimg "/how-it-works.png" "Diagram showing Alvaldi communicating with Azure, an IoT device, and a web browser.">}}

Terminal sessions are handled via a WebSocket connection, which is initiated by the device.
Unlike SSH, there is no server listening for incoming connections on the device.
The client is [open source and available on GitHub](https://github.com/NorthernTechHQ/nt-connect).
We encourage our users to review the source code, contribute patches and [report any potential security issues to us](https://northern.tech/security.txt).
For more information about the security aspects of Alvaldi, see the [Security docs](/security).
