---
title: Role-based access control (RBAC)
date: 2023-07-12T00:00:00+00:00
---

It is recommended to use role-based access control (RBAC) to limit access and adhere to the [principle of least privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege).
Alvaldi supports separation of duties, giving you different default roles for members of your organization using Alvaldi for different purposes:

{{< wideimg "/screenshot-gui-settings-roles.png" "Screenshot of Alvaldi's GUI, showing a logged terminal session with commands and output played back.">}}

As an example, users can by default only get read access, to be able to see devices.
Support engineers will need access to terminal and file transfer, while the security and compliance teams can get access to view [audit logs](./audit-log) and [terminal session playback](./session-playback).
Finally, a very limited number of administrators need to be able to change settings and manage users and integrations.

It should be noted that these are just the default roles, you can add more roles and customize as necessary.
