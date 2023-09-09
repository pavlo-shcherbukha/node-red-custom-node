module.exports = function(RED) {
   
    function WshlogNode(config) {
        var winston = require('winston');
        var default_level = 'silly' ; 
        var lhostname = process.env.HOSTNAME||'localhost' ;

        const { createLogger, format, transports } = require('winston');
        const { combine, timestamp,label, printf, json } = format;
        const jFormat =  combine(timestamp({format: 'YYYY-MM-DDTHH:mm:ss.SSSSSSZ'}),json());
        
        
        RED.nodes.createNode(this,config);
        var node = this;
        this.configname = RED.nodes.getNode(config.configname)
        this.loglabel = config.loglabel
        this.loglevel = config.loglevel
        var options = {}
        var logger ={}

        if (this.configname.logto==='file'){
            var filepth = `${this.configname.logdir}/${this.configname.logname}`
            options = {
                file: {
                  level: default_level ,
                  filename: filepth,
                  handleExceptions: true,
                  json: true,
                  maxsize: 5242880, // 5MB
                  maxFiles: 20,
                  colorize: false,
                  format: jFormat,
                }
            };    
            logger = winston.createLogger({
                transports: [
                  new winston.transports.File(options.file),
                ],
                exitOnError: false, // do not exit on handled exceptions
            });
        } else {
            options = {
                console: {
                    level: default_level ,
                    handleExceptions: true,
                    json: true,
                    colorize: true,
                    format: jFormat
                  }
            };
            logger = winston.createLogger({
                transports: [
                  new winston.transports.Console(options.console)
                ],
                exitOnError: false, // do not exit on handled exceptions
            });
        }
        logger.stream = {
            write: function(message, encoding) {
              logger.silly(message);
            }
        };
          
        const applogger = logger.child({ label: this.loglabel, hostname: lhostname });



        node.on('input', function(msg) {

            var nodeContext = this.context();

            var flowContext = this.context().flow;
            var globalContext = this.context().global;     

            msg.payload = msg.payload
            if (this.loglevel==='INFO'){
                applogger.info( { payload: msg.payload, flow_context: flowContext, global_context: globalContext });
            } else if (this.loglevel==='ERROR'){
                applogger.error(  { payload: msg.payload, flow_context: flowContext, global_context: globalContext });
            } else if (this.loglevel==='WARN'){
                applogger.warn(  { payload: msg.payload, flow_context: flowContext, global_context: globalContext });
            } else if (this.loglevel==='DEBUG'){
                applogger.debug(  { payload: msg.payload, flow_context: flowContext, global_context: globalContext });
            } else if (this.loglevel==='TRACE'){
                applogger.trace(  { payload: msg.payload, flow_context: flowContext, global_context: globalContext });
            }

            node.send(msg);
        });
    }
    RED.nodes.registerType("wshlog-node", WshlogNode);

    function WshConfigNode(config) {
		RED.nodes.createNode(this,config)
		this.configname = config.configname
		this.logto = config.logto
		this.logname = config.logname
		this.logdir = config.logdir
	}

	RED.nodes.registerType("wshlog-config", WshConfigNode)

}

