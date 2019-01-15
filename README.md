## Node-RED + fram nodes

Made for [netPI RTE 3](https://www.netiot.com/netpi/), the Raspberry Pi 3B Architecture based industrial suited Open Edge Connectivity Ecosystem

### Debian with Node-RED and fram nodes for ferroelectric random access memory access

The image provided hereunder deploys a container with installed Debian, Node-RED and fram nodes to communicate with the onboard ferroelectric random access memory on netPI RTE 3,

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

STEP 4. Press the button **Actions > Start/Deploy container**

Pulling the image may take a while (5-10mins). Sometimes it takes so long that a time out is indicated. In this case repeat the **Actions > Start/Deploy container** action.

#### Accessing

After starting the container open Node-RED in your browser with `http://<netpi's ip address>:<mapped host port>` e.g. `http://192.168.0.1:1880`. Two extra nodes *fram read* and *fram write* in the nodes *fram* library palette provides you random access to netPI RTE 3's FRAM. Their info tabs in Node-RED explain how to use them.

#### Automated build

The project complies with the scripting based [Dockerfile](https://docs.docker.com/engine/reference/builder/) method to build the image output file. Using this metod is a precondition for an [automated](https://docs.docker.com/docker-hub/builds/) web based build process on DockerHub platform.

DockerHub web platform is x86 CP based, but an ARM CPU coded output file is needed for Raspberry systems. This is why the Dockerfile includes the [balena.io](https://balena.io/blog/building-arm-containers-on-any-x86-machine-even-dockerhub/) steps.

#### License

View the license information for the software in the project. As with all Docker images, these likely also contain other software which may be under other licenses (such as Bash, etc from the base distribution, along with any direct or indirect dependencies of the primary software being contained).
As for any pre-built image usage, it is the image user's responsibility to ensure that any use of this image complies with any relevant licenses for all software contained within.

[![N|Solid](http://www.hilscher.com/fileadmin/templates/doctima_2013/resources/Images/logo_hilscher.png)](http://www.hilscher.com)  Hilscher Gesellschaft fuer Systemautomation mbH  www.hilscher.com
