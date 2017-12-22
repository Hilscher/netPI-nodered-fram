## Node-RED + fram nodes

Made for [netPI RTE 3](https://www.netiot.com/netpi/), the Open Edge Connectivity Ecosystem with Real-Time Ethernet

### Debian with Node-RED and fram nodes for ferroelectric random access memory access

The image provided hereunder deploys a container with installed Debian, Node-RED and fram nodes to communicate with the onboard ferroelectric random access memory.

Base of this image builds the latest version of [debian:jessie](https://hub.docker.com/r/resin/armv7hf-debian/tags/) with installed Internet of Things flow-based programming web-tool [Node-RED](https://nodered.org/) and two extra nodes *fram read* and *fram write* providing access to netPI's 8kByte FRAM FM24CL64B.

#### Container prerequisites

##### Port mapping

To allow the access to the Node-RED programming over a web browser the container TCP port `1880` needs to be exposed to the host.

##### Host device

To grant access to the FRAM from inside the container the `/dev/i2c-1` host device needs to be added to the container.

#### Getting started

STEP 1. Open netPI's landing page under `https://<netpi's ip address>`.

STEP 2. Click the Docker tile to open the [Portainer.io](http://portainer.io/) Docker management user interface.

STEP 3. Enter the following parameters under **Containers > Add Container**

* **Image**: `hilschernetpi/netpi-nodered-fram`

* **Port mapping**: `Host "1880" (any unused one) -> Container "1880"` 

* **Restart policy"** : `always`

* **Runtime > Devices > add device**: `Host "/dev/i2c-1" -> Container "/dev/i2c-1"`

STEP 4. Press the button **Actions > Start container**

Pulling the image from Docker Hub may take up to 5 minutes.

#### Accessing

After starting the container open Node-RED in your browser with `http://<netpi's ip address>:<mapped host port>` e.g. `http://192.168.0.1:1880`. Two extra nodes *fram read* and *fram write* in the nodes library provides you random access to netPI's FRAM. Their info tabs in Node-RED explain how to use them.

#### Tags

* **hilscher/netPI-nodered-fram:latest** - non-versioned latest development output of the master branch. Can run on any netPI RTE 3 system software version.

#### GitHub sources
The image is built from the GitHub project [netPI-nodered-fram](https://github.com/Hilscher/netPI-nodered-fram). It complies with the [Dockerfile](https://docs.docker.com/engine/reference/builder/) method to build a Docker image [automated](https://docs.docker.com/docker-hub/builds/).

To build the container for an ARM CPU on [Docker Hub](https://hub.docker.com/)(x86 based) the Dockerfile uses the method described here [resin.io](https://resin.io/blog/building-arm-containers-on-any-x86-machine-even-dockerhub/).

[![N|Solid](http://www.hilscher.com/fileadmin/templates/doctima_2013/resources/Images/logo_hilscher.png)](http://www.hilscher.com)  Hilscher Gesellschaft fuer Systemautomation mbH  www.hilscher.com
