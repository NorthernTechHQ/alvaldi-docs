---
title: Security
date: 2023-07-12T00:00:00+00:00
preview_description: Overview of the security aspects and benefits of Alvaldi.
sorting: 3
---

Alvaldi was built with security in mind.
At [Northern.tech](https://northern.tech) we have a long history of creating security critical software for servers and IoT devices.
We perform code review, focusing on finding security issues and architecting a robust solution to keep your data and devices safe.
If you've found a potential security issue or otherwise need to get in contact with our security team, see: [northern.tech/security.txt](https://northern.tech/security.txt).
Below, we've outlined some of the key benefits of Alvaldi from a security perspective.

## No open ports on the device

The client running on the device initiates all connections with the Alvaldi server.
Unlike for example SSH, there is no need to have software listening for arbitrary IP connections on a port of the device.
You can configure the firewall to drop / reject incoming connections (all incoming if you don't have other software which needs this).

## Encryption

To ensure confidentiality of your data, Alvaldi utilizes encryption at rest and during transit.

All communication is encrypted with TLS / HTTPS.
This applies to users using the web UI, as well as the communication between the server and the devices.
When using the remote terminal, commands and output are sent using a WebSocket connection (which also uses HTTPS).

In the backend, MongoDB is used to store user data, and storage level encryption ensures sensitive data is never written to disk unencrypted.

## Authentication

Users authenticate with a username and password combination, and an optional 2FA app.
Authenticating with a SAML-compatible identity provider (Such as Azure) is also possible.

Devices authenticate with a cryptographic key pair (currently defaulting to ECDSA).

## Device authorization

The integration between Azure IoT Hub and Alvaldi ensures devices which already exist in IoT Hub get automatically authorized in Alvaldi.
Only authorized devices can communicate with the Alvaldi server, and only with the associated tenant in Alvaldi.
Unauthorized devices (or devices authorized with another organization) cannot interact with your organization in Alvaldi.

## Role-based access control (RBAC)

In Alvaldi, users within the same organization can have different levels of access.
It is recommended to follow [the principle of least privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege) - granting only the minimum level of access necessary, to the people necessary.

As an example, you might only need a couple of administrators to manage user accounts, the compliance team could get read-only access to audit logs, while only support staff need the role for connecting devices and running commands to help customers.

[Read more about RBAC in Alvaldi.](/features/rbac)

## Auditability

Actions performed by users are recorded in the audit log.
Even the input keystrokes and program output in the device terminal are recorded, allowing you to play back terminal sessions.
The audit log allows you to investigate suspicious, malicious, or accidental activity, helping you prove compliance and better handle security incidents.

[Read more about audit logs in Alvaldi.](/features/audit-log)

## Open source client

The code running on the device is [open source and available on GitHub](https://github.com/NorthernTechHQ/nt-connect).
We encourage you to review the security aspects of it and [disclose any potential vulnerabilities to us](https://northern.tech/security.txt).
