---
title: Glossary
date: 2023-07-12:00:00+00:00
preview_description: List of commonly used terms and their meaning.
sorting: 1
---

Below you'll find a list of words and concepts that might be useful to understand when reading our documentation and using Alvaldi for remote troubleshooting.

## Audit logs {#audit-logs}

Logging focused on the users' actions, especially when it comes to making changes, and activity which could cause negative results (change a value, remove a device, disable functionality, change settings, restart systems, and so on).
Proper audit logging should include when a change occurred, what resource was changed, and how it was changed.
For proper audit logging, it is essential that users have individual accounts, and don't use shared accounts, or share the login information to their personal accounts.
Audit logs are useful for investigating what has happened in cases where there's been a security incident, data breach, suspicious activity, etc.
Audit logging is often needed for compliance with laws or security frameworks, depending on industry and application.
See the [audit log feature documentation](/features/audit-log) for more information.

## Authentication {#authentication}

The process of having a user, device, or server prove their identity as part of communication.
The most well known example of authentication is the login screen / password lock on most computer systems - the user proves their identity by typing in a secret password only they know, often in combination with a username or email address.
Mutual authentication means that both parties have to verify the identity of the other, both the server and the device in Alvaldi's case.
After authenticating (logging in), the system typically determines what resources and functionality this user should have access to - this step is referred to as authorization, and should not be confused with authentication.
Authentication can be "federated", handled by an external system.
See the sections about [authorization](#authorization) and [single sign-on](#sso) for more information.

## Authorization {#authorization}

Following authentication, computer systems often determine what resources and functionality an authenticated user should have access to, based on a number of factors: the user's tenant / organizations, roles, group memberships, which resources have been explicitly shared with them, etc.
One common way of managing access in multi-user enterprise software is with role based access control (RBAC).
See [the section below](#rbac) for more information about RBAC.

## Graphical user interface (GUI) {#gui}

Programs often have multiple interfaces to interact with users and other programs.
GUIs are perhaps the most well known ones - phone apps, websites and desktop applications are examples of GUIs.
Other common interfaces are [application programming interfaces (APIs)](https://en.wikipedia.org/wiki/API) and [command line interfaces (CLIs)](https://en.wikipedia.org/wiki/Command-line_interface).
GUIs are considered the most intuitive and therefore easiest to use and learn as well as more efficient for some tasks (tasks where visuals / layout help the user experience).
Another common benefit of web-based GUIs is that they don't require any installation or configuration or specific platforms to work, users already have web browsers on their devices, and they can use the entire functionality from within the web browser.

## Groups {#groups}

In Alvaldi, groups are collections of devices, either static lists or dynamic rules based on filters, used for organizing devices and finding the one you're looking for faster.

## Hyper text transfer protocol secure (HTTPS) {#https}

Protocol for secure [communication between web servers and clients](https://en.wikipedia.org/wiki/Client%E2%80%93server_model) (for example for websites and APIs).
In Alvaldi, confidentiality and integrity of communication between the server, devices, and the users (web browsers) is ensured through the use of HTTPS (cryptographic signatures and encryption).
Also referred to as HTTP over [TLS](#tls) - it is implemented as HTTP communication over a [TLS connection](#tls).

## Identity provider {#identity-provider}

The concept of an identity provider (IdP) only applies to the [single sign-on](#sso) situation.
It is the entity responsible for authenticating the user (providing identities and user management capabilities) while service the user is signing in to use is referred to as the service provider.
If you're using Microsoft to log in to Alvaldi, Microsoft is the identity provider while Alvaldi is the service provider.
See [the section on single sign-on](#) for more information.

## Inactive devices {#inactive-devices}

In Alvaldi, inactive devices are devices which have been deactivated in Azure.
If you try to open up / connect to a device which is inactive, you will be prompted with the option of removing the device from Alvaldi.

## Inventory {#inventory}

Information collected about all your devices / computers / servers is typically called inventory.
This includes operating system, software version numbers, IP addresses, MAC addresses, hostnames, etc.
See [the feature page for device inventory](/features/inventory) for more information.

## No open ports {#no-open-ports}

The term "open ports" typically refers to having a server program listening for incoming connections from clients on a [network port](https://en.wikipedia.org/wiki/Port_%28computer_networking%29), and/or opening up a network port in your firewall rules.
In Alvaldi, the open ports are only on the server, which accepts standard HTTPS communication on port 443.
The device initiates the connection with the server, so it is only making outbound connections.
Thus, the potential attack surface is reduced, by not having any server software listening to arbitrary connections from the internet, and you can block all incoming traffic in the firewall rules of the device.
For more information on how Alvaldi works, see the [architecture page in our documentation](/architecture).

## Offline devices {#offline-devices}

In Alvaldi, there is a time threshold (adjustable in the settings page) for when to consider non-communicating devices offline.
This could happen for a number of reasons; the device is turned off, temporarily without network or power, malfunctioning, or the device has been decommissioned.
In these cases it will not be possible to connect to the device with the terminal, and data about the device is not getting updated.

## Role based access control (RBAC) {#rbac}

With multi-user enterprise software it is considered best practice to give users as little access as possible (the principle of least privilege).
This is achieved using an RBAC approach, where you assign one or more roles to users, granting them access to different functionality and resources.
Restricting access prevents malicious actors from engaging in harmful activities and  safeguards against well-intentioned individuals inadvertently making mistakes.
In Alvaldi, the default, lowest level of access you can grant users is Read.
Beyond this, support staff and engineers which need to troubleshoot devices may need the roles for using the Terminal and File transfer capabilities.
Members of security and compliance teams may not need write access, but would typically need the Audit role, for accessing audit logs and terminal session playback.
Finally, Admin access is only needed for a few specific high impact actions (such as managing users and settings), and thus should be limited to only a few administrators.
See the [feature page for RBAC](#rbac) for more information.

## Secure Shell (SSH) {#ssh}

SSH enables running a shell securely on a remote machine - authentication is required and communication is encrypted.
While setting up SSH is relatively simple for a single user and device, managing it at scale and fulfilling desired security requirements can be challenging.
Additional software and configuration is required for user and key management, [RBAC](#rbac), [audit logging](#audit-logs), not accepting arbitrary connections from the internet (tunnel / [VPN](#vpn)), [2-factor authentication](#mfa), etc.
These security requirements are even more relevant for IoT devices, since they are often connected to open and untrusted networks.
Alvaldi provides some of the same functionality as SSH; enabling users to log in remotely and securely, run commands, see the output and troubleshoot issues, while supporting all of these security features out of the box, without further configuration or installation of additional software.

## Single Sign-On (SSO) {#sso}

SSO allows users to authenticate with a service, such as Alvaldi, without creating a new identity and password specific to that service, instead relying on an existing account in an [identity provider](#identity-provider) which can handle authentication.
This has many security benefits, especially for larger enterprises, such as: less maintenance overhead for creating, managing, and deleting users, faster and less error prone revocation of access when employees leave the company or team, easier to enforce authentication requirements across multiple services (such as 2FA / MFA, strong passwords, password changes, etc.).
Alvaldi supports SSO with [the SAML 2.0 protocol](https://en.wikipedia.org/wiki/SAML_2.0).

## Terminal {#terminal}

A computer program / UI which allows users to type commands (with their keyboard), run them, and see the output printed on their screen.
Terminal typically refers to the visual / high level program that the user starts and sees and interacts with directly, while the program which actually parses the input and reacts to it is referred to as the [shell](https://en.wikipedia.org/wiki/Shell_%28computing%29), or the command line.
In Alvaldi, the terminal is running in the user's browser, while the shell it's communicating with is running on the remote device.

## Transport layer security (TLS) {#tls}

One of the most widely used protocols for transporting information securely over the network, i.e. ensuring the data can not be read or tampered with before reaching its intended recipient.
Since Alvaldi uses HTTPS for communication between the server and users as well as devices, it is using TLS.
Since Alvaldi uses HTTPS for communication between the server, users and devices; it is using TLS.
See [the section on HTTPS](#https) for more information.

## Virtual Private Network (VPN) {#vpn}

A virtual private network is a mechanism for secure communications between computers / devices.
Multiple applications can communicate securely over a VPN, without being adjusted for it, since it just replaces the "network" they usually communicate with.
There are many different VPN implementations, with different benefits and drawbacks, and configuration for exactly how to establish connections, what protocols will be used for communication, how to do authentication, etc.
On its own, a VPN provides only a network, users typically use another program, such as SSH, to actually log in and run commands on remote devices.
You can find [more information about VPNs on Wikipedia](https://en.wikipedia.org/wiki/Virtual_private_network).

## 2-Factor Authentication (2FA) / Multi-Factor Authentication (MFA) {#mfa}

Typically, users authenticate (log in) with a username and password.
There are various reasons why passwords might be compromised: passwords are cracked because they are too short / easy to guess, passwords are reused across multiple services, a password database of an online service is breached, a malware / key logger is running on user's computers, etc.
One very effective way of strengthening the log in process is relying on multiple factors for authentication (i.e. something you know, the password, and something you have, your phone).
The most common approaches include a code generator app on the phone, a text message, an email, or a hardware security key.
Alvaldi supports 2FA, and we recommend everyone to use it, either set it up in the settings page if you're using password based authentication, or via your [identity provider](#identity-provider) if you're using [single sign-on](#sso).
