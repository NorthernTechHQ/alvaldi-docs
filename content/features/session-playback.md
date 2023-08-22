---
title: Session playback
date: 2023-07-12:00:00+00:00
---

From within the [audit log](./audit-log) you can open up individual terminal events to see details about that event and play back the session:

{{< wideimg "/screenshot-gui-session-playback.png" "Screenshot of Alvaldi's GUI, showing a logged terminal session with commands and output played back.">}}

Since Alvaldi logs both input and output, you gain complete visibility into what a user did with the terminal and what they saw when running their commands.
This is useful for compliance and auditing purposes, as well as retracing your steps in case they need to be repeated or mistakes were made.

We recommend using the [RBAC feature](./rbac) to control who has access to run commands via the terminal as well as view the audit log and session playback in Alvaldi.
