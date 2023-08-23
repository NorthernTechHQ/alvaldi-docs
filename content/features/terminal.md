---
title: Terminal
date: 2023-07-12:00:00+00:00
---

Once you've found the device you're looking for in the device list, clicking on it will open the device info page.
A central part of the device info page is the terminal:

{{< wideimg "/screenshot-gui-device-info-page.png" "Screenshot of the device info page of Alvaldi's GUI, with a terminal which is not yet connected">}}

Click on the **Connect terminal** button to start a terminal session and type in commands:

{{< wideimg "/screenshot-gui-device-info-page-hello-world.png" "Screenshot of the terminal in Alvaldi's GUI, with a hello world command as an example">}}

These commands are run on the device, you can now start looking for misbehaving applications, errors in logs, or run your diagnostics scripts.

All your terminal sessions are logged in the [audit log](./audit-log), including both input (typed commands) and output (printed by the programs / shell), allowing you to [play them back later](./session-playback).
To the right of the terminal you can see [inventory and identity information about the device](./inventory).
Below the terminal is a section for [transferring files from/to the device](./file-transfer).
