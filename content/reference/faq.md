---
title: FAQ
date: 2023-07-12:00:00+00:00
preview_description: Frequently asked questions.
sorting: 2
---

On this page you'll find answers to frequently asked questions about Alvaldi.

## Are terminal commands and command output sent encrypted?

Yes, all communication between the device, the server, and the user's browser is encrypted with TLS / HTTPS.

## Is user data and device inventory encrypted at rest on your servers?

Yes, we use storage level encryption for all data in our backend databases, unencrypted data is never written to disk.

## Is Alvaldi only available to Azure users?

At this point, yes.
Alvaldi only supports Azure IoT Edge devices, currently.
We will introduce more platforms and ways of using Alvaldi in the future, to get notified, sign up for our newsletter at the bottom of [our webpage](https://alvaldi.com).

## What does the Azure integration for Alvaldi include?

Our Azure integration allows you to easily get started with troubleshooting and remote access using Alvaldi on your Azure IoT Edge devices.
We provide an IoT Edge module which can be installed via the Azure marketplace, and the Azure IoT Hub integration with our backend means that the list of devices is synchronized, and devices are automatically accepted in Alvaldi.
After installing our Edge module and enabling the Azure integration, devices appear in Alvaldi ready to connect, without any further setup steps.
Additionally, billing happens through the Azure marketplace.

## Is Alvaldi free?

There is a free trial, enabling you to use Alvaldi with up to 10 devices and 2 users for 6 months.
Our paid plans start at just 3$ per month, and pricing is based on number of devices, as well as number of users.
For more information, see [alvaldi.com/pricing](https://alvaldi.com/pricing).

## Is Alvaldi Open Source?

Alvaldi is built on a lot of Open Source technology, libraries and other dependencies.
At [Northern.tech](https://northern.tech) we have many years of experience building and maintaining both open source and closed source software.
For Alvaldi, [the client is open source](https://github.com/NorthernTechHQ/nt-connect), enabling you to review the security aspects and contribute improvements.
We are committed to creating the most easy to use and secure solution for remote troubleshooting of IoT devices, and hope that our users and the wider open source community can help us achieve this.

## How is Alvaldi different from SSH?

The secure shell protocol (SSH) is commonly used to enable remote login to computers and servers.
A SSH server listens for incoming connections (to port 22 by default).
The SSH client connects to the server, and the protocol enables authentication with a username and password combination or a cryptographic keypair.

When using SSH, there are several considerations and decisions you will need to make;
Should you set up a VPN to avoid exposing SSH to brute force / blind login attempts?
What to use for user / key management?
Will you configure centralized audit logging, with search/filtering and backups?
How do you document this setup, and ensure new employees are able to start using it, on different platforms?

Alvaldi solves all of these for you;
There are no open ports, the Alvaldi client on the devices initiates WebSocket connections with the server.
The terminal, as well as other remote access functionality (inventory, file transfer) are accessible in the browser, without installing and configuring an SSH client.
User login / authentication happens in the browser, using your identity provider.
All sessions are logged and searchable in the audit log, which resides on the Alvaldi server, not the device.
The solution is documented and tested by other users, all you need is give people access in the intuitive GUI and start using it.
