module.exports = function(RED) {
    function WNode(config) {
        var winston = require('winston');
        RED.nodes.createNode(this,config);
        var node = this;
        this.filename = config.filename;
        node.on('input', function(msg) {
            msg.payload = msg.payload
            node.send(msg);
        });
    }

    RED.nodes.registerType("w-node",WNode);

    function WConfigNode(n) {
		RED.nodes.createNode(this,n)
	}

    RED.nodes.registerType("w-config", WConfigNode)

}

