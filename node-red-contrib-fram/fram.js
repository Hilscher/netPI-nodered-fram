module.exports = function(RED) {
    "use strict";
    var i2c = require("i2c-bus");

    // FRAM read node
    function framreadNode(n) {
        RED.nodes.createNode(this, n);

        this.address = 84; // FRAM on netPI has a fixed I2C address of 84
        this.device = 1; // FRAM on netPI is connected to I2C-1 bus
        this.amount = n.amount;
        this.offset = n.offset;
        var node = this;

        // open the I2C port first
        node.port = i2c.openSync(this.device,{forceAccess: true});

        node.on("input", function(msg) {

          // get arguments
          var offset = node.offset || msg.offset;
          var amount = node.amount || msg.amount;

          // prepare write buffer

          const writeBuffer = Buffer.from([(offset >> 8) & 0xff,offset & 0xff]);

          // write two bytes to set the offset address to be read from
          node.port.i2cWrite(node.address, writeBuffer.length, writeBuffer, function(err) {

              if (err) {
                node.error(err);
              } else {
                // read the amount of bytes specified

                const readBuffer = Buffer.alloc(parseInt(amount));

                node.port.i2cRead(node.address, readBuffer.length, readBuffer, function(err, bytesRead, readBuffer) {
                  if (err) {
                    node.error(err);
                  } else {
                    msg.payload = readBuffer;
                    node.send(msg);
                  }
                });
              }
            });
        });

        node.on("close", function() {
          node.port.close();
        });
    }
    RED.nodes.registerType("fram read", framreadNode);

    // FRAM write node 
    function framwriteNode(n) {
        RED.nodes.createNode(this, n);

        this.address = 84; // FRAM on netPI has a fixed I2C address of 84
        this.device = 1; // FRAM on netPI is connected to I2C-1 bus
        this.offset = n.offset;
        var node = this;

        // open the I2C port first
        node.port = i2c.openSync(this.device,{forceAccess: true});

        node.on("input", function(msg) {

           // get arguments
           var offset = node.offset || msg.offset;
           var amount = node.amount || msg.amount;

           const writeBuffer = Buffer.concat([Buffer.from([(offset >> 8) & 0xff,offset & 0xff]),Buffer.from(msg.payload)]);

            // write two bytes offset first, then data
           node.port.i2cWrite(node.address, writeBuffer.length , writeBuffer, function(err , bytesWritten, buffer) {
             if (err) {
                node.error(err);
               }
           });
        });

        node.on("close", function() {
          node.port.close();
        });
    }
    RED.nodes.registerType("fram write", framwriteNode);
}
