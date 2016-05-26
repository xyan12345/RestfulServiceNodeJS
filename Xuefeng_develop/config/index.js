const _ = require("lodash");
var config={
	clientPath: "client"
};


module.exports = process.env.NODE_ENV ? _.merge(config, require("./" + process.env.NODE_ENV + ".js" || {})) : config;
