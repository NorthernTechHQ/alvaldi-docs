---
title: Introduction
date: 2023-07-12:00:00+00:00
preview_description: Learn about what Alvaldi is and how it works.
sorting: 1
---

Alvaldi is a troubleshooting tool, enabling users to securely connect to remote devices and quickly resolve issues.
It offers useful features when diagnosing and fixing device issues, such as a [remote terminal](/features/terminal), [file transfer](/features/file-transfer), and [device inventory information](/features/inventory).
When compared to other troubleshooting and remote access solutions, it has some important benefits related to ease of use, maintenance and security;

* Entirely in browser - users do not have to install local clients on their machines.
* Easy to set up - this tutorial series will help you set it up in a few minutes.
* Integrated with Azure - The list of devices is synchronized with Azure IoT Hub, and the client is installed on devices as a Azure IoT Edge module.
* Audit logs - All user actions are logged, to see who did what, and when.
* Encrypted - All communication is encrypted during transit (TLS / HTTPS), and all data in our database is encrypted at rest (storage level encryption).
* RBAC - One organization can have multiple users with different roles and access.
* No open ports - Unlike SSH, there is no server on the device listening for incoming connections.

## More information

For more information about how Alvaldi works, see these helpful resources:

* [Architecture.](/architecture)
* [Security aspects of Alvaldi.](/security)
* [Frequently asked questions (FAQ).](/reference/faq)

## Up next

The next part of the getting started series is:

[Signing up and installing Alvaldi.](/getting-started/setup).
