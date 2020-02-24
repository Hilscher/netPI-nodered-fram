## Node-RED + FRAM nodes

[![](https://images.microbadger.com/badges/image/hilschernetpi/netpi-raspbian.svg)](https://microbadger.com/images/hilschernetpi/netpi-nodered-fram "Node-RED + FRAM nodes")
[![](https://images.microbadger.com/badges/commit/hilschernetpi/netpi-raspbian.svg)](https://microbadger.com/images/hilschernetpi/netpi-nodered-fram "Node-RED + FRAM nodes")
[![Docker Registry](https://img.shields.io/docker/pulls/hilschernetpi/netpi-raspbian.svg)](https://registry.hub.docker.com/r/hilschernetpi/netpi-nodered-fram/)&nbsp;
[![Image last updated](https://img.shields.io/badge/dynamic/json.svg?url=https://api.microbadger.com/v1/images/hilschernetpi/netpi-nodered-fram&label=Image%20last%20updated&query=$.LastUpdated&colorB=007ec6)](http://microbadger.com/images/hilschernetpi/netpi-nodered-fram "Image last updated")&nbsp;

Made for [netPI RTE 3](https://www.netiot.com/netpi/), the Raspberry Pi 3B Architecture based industrial suited Open Edge Connectivity Ecosystem

### Secured netPI Docker

netPI features a restricted Docker protecting the system software's integrity by maximum. The restrictions are 

* privileged mode is not automatically adding all host devices `/dev/` to a container
* volume bind mounts to rootfs is not supported
* the devices `/dev`,`/dev/mem`,`/dev/sd*`,`/dev/dm*`,`/dev/mapper`,`/dev/mmcblk*` cannot be added to a container

### Container features 

The image provided hereunder deploys a container with installed Debian, Node-RED and fram nodes to communicate with the onboard ferroelectric random access memory on netPI RTE 3.

Base of this image builds [debian](https://www.balena.io/docs/reference/base-images/base-images/) with installed Internet of Things flow-based programming web-tool [Node-RED](https://nodered.org/) and two extra nodes *fram read* and *fram write* providing access to netPI's 8kByte FRAM FM24CL64B.

### Container setup

#### Port mapping

To allow the access to the Node-RED over a web browser the container TCP port `1880` needs to be exposed to the host.

#### Host device

To grant access to the FRAM from inside the container the `/dev/i2c-1` host device needs to be added to the container.

### Container deployment

STEP 1. Open netPI's website in your browser (https).

STEP 2. Click the Docker tile to open the [Portainer.io](http://portainer.io/) Docker management user interface.

STEP 3. Enter the following parameters under **Containers > Add Container**

Parameter | Value | Remark
:---------|:------ |:------
*Image* | **hilschernetpi/netpi-nodered-fram**
*Port mapping* | *host* **1880** -> *container* **1880** | *host*=any unused
*Restart policy* | **always**
*Runtime > Devices > +add device* | *Host path* **/dev/i2c-1** -> *Container path* **/dev/i2c-1** |

STEP 4. Press the button *Actions > Start/Deploy container*

Pulling the image may take a while (5-10mins). Sometimes it may take too long and a time out is indicated. In this case repeat STEP 4.

### Container access

The container starts Node-RED automatically when started.

Open Node-RED in your browser with `http://<netPi ip address>:<mapped host port>` (NOT https://) e.g. `http://192.168.0.1:1880`. Use the two extra nodes *fram read* and *fram write* in the nodes library for exchanging data with the FRAM. The nodes' info tab explains how to use the nodes.

### Container on Youtube

[![Tutorial](https://img.youtube.com/vi/A-asfhl7b0c/0.jpg)](https://youtu.be/A-asfhl7b0c)

### Container tips & tricks

For additional help or information visit the Hilscher Forum at https://forum.hilscher.com/

### Container automated build

The project complies with the scripting based [Dockerfile](https://docs.docker.com/engine/reference/builder/) method to build the image output file. Using this method is a precondition for an [automated](https://docs.docker.com/docker-hub/builds/) web based build process on DockerHub platform.

DockerHub web platform is x86 CPU based, but an ARM CPU coded output file is needed for Raspberry Pi systems. This is why the Dockerfile includes the [balena.io](https://balena.io/blog/building-arm-containers-on-any-x86-machine-even-dockerhub/) steps.

### License

View the license information for the software in the project. As with all Docker images, these likely also contain other software which may be under other licenses (such as Bash, etc from the base distribution, along with any direct or indirect dependencies of the primary software being contained).
As for any pre-built image usage, it is the image user's responsibility to ensure that any use of this image complies with any relevant licenses for all software contained within.

[![N|Solid](http://www.hilscher.com/fileadmin/templates/doctima_2013/resources/Images/logo_hilscher.png)](http://www.hilscher.com)  Hilscher Gesellschaft fuer Systemautomation mbH  www.hilscher.com

