---
title: Edge module from container registry
date: 2024-01-19T00:00:00+00:00
preview_description: Use Azure IoT Edge to install the alvaldi client from our container registry
---

If, for whatever reason, you don't want to use the Alvaldi Edge module from Azure marketplace, you can also create an edge module based on a container registry.
This guide shows how to set up an edge module "from scratch", i.e. entering the container registry instead of using the marketplace.

In your Alvaldi account, go to **Settings**, and then **Organization and billing**:

{{< wideimg "/settings-organization-token.png" "The settings UI showing an organization token (censored).">}}

There you will see your **Organization token** (Tenant token).
Keep this window / tab open, you will need to copy the token soon.

Find the Azure IoT Edge devices in the Azure portal, and click **Set modules**:

{{< wideimg "/azure-iot-edge-set-modules.png" "IoT Edge UI with the Set modules button highlighted.">}}

Add a module and fill out the necessary configuration below:

**Module name:** Up to you, can be: `alvaldi-edge-module`.

**Image URI:** `northerntech/nt-connect:main`.

**Environment variables:**

```sh
CONNECT_CHROOT=/host
CONNECT_SERVER_URL=https://app.alvaldi.com
CONNECT_TENANT_TOKEN=<PASTE_TENANT_TOKEN_FROM_ALVALDI>
```

**Important:** Put your real tenant token from Alvaldi settings into the variable(!).

**Container create options:**

```json
{
  "HostConfig": {
    "Privileged": true,
    "NetworkMode": "host",
    "Binds": [
      "/:/host",
      "/var/lib/nt-connect:/var/lib/nt-connect"
    ]
  },
  "NetworkingConfig": {
    "EndpointsConfig": {
      "host": {}
    }
  }
}
```

After entering the container create options, environment variables and inserting the tenant token as shown above, click **Apply**, then **Review + create** and then finally **Create** to deploy the module, installing and running Alvaldi on the device.

Afterwards, you should see the module on the device inside Azure, and the device should also show up in Alvaldi.
