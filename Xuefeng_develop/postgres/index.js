const pg=require("pg");
const Fs = require("fs");
const config=require("./config");
const nodeGdal = require("./node_gdal/testdata");




module.exports= {
	getHighways: (request, reply) => {
		reply([
			{"routeid":1333, "Name": "I 15N"},
			{"routeid":1384, "Name": "0089N"},
			{"routeid":1330, "Name": "Tim Sweet Blvd"},
			]);

	},
	getHighway: (request, reply) => {
		reply(nodeGdal.info);

	},

	getCustomers: (request, reply) => {
		pg.connect(config.url, (err, client, done) =>{
			if(err) {
				reply("connerr" + err);
				done();
			}else {
				client.query(config.customers, (err, result)=>{
					done();
					if(err) {
						reply("fds" + err);
					}else {
						reply(result.rows);
					}
				});
			}

		});

	},

	getCustomerById: (request, reply) => {
		pg.connect(config.url, (err, client, done) =>{
			if(err) {
				reply("connerr" + err);
				done();
			}else {
				client.query(config.customerById, [request.params.id], (err, result)=>{
					done();
					if(err) {
						reply("fds" + err);
					}else {
						reply(result.rows[0]);
					}
				});
			}

		});

	},

	// this function can not be tested
    // company does not want to remove any customers from database
	// if in the future customer needs to be remove,
	// simply change  "customerById" to "deletecustomerById" and open comments in the config file
	deleteCustomerById: (request, reply) => {
		pg.connect(config.url, (err, client, done) =>{
			if(err) {
				reply("connerr" + err);
				done();
			}else {
				client.query(config.deletecustomerById, [request.params.id], (err, result)=>{
					done();
					if(err) {
						reply("fds" + err);
					}else {
						var message = "customer " + request.params.id + " is deleted";
						reply(message);
						//reply(result.rows[0],"is deleted");
					}
				});
			}

		});

	},


	// pass 10 parameters to url and reads it. put it on database

	postCustomerById: (request, reply) => {
		pg.connect(config.url, (err, client, done) =>{
			if(err) {
				reply("connerr" + err);
				done();
			}else {
				console.log("Received POST from " + request.payload.name);
				reply(request.payload);
			}
		});
    },


 			// 	reply({
	 		// 		greeting: 'POST hello to ' + request.payload.name
 			// 	});
				// const userParts = request.params.id.split('/');
				// 		client.query(config.postcustomerById, [encodeURIComponent(userParts[0]),
				// 									   encodeURIComponent(userParts[1]),
				// 									   encodeURIComponent(userParts[2]),
				// 									   encodeURIComponent(userParts[3]),
				// 									   encodeURIComponent(userParts[4]),
				// 									   encodeURIComponent(userParts[5]),
				// 									   encodeURIComponent(userParts[6]),
				// 									   encodeURIComponent(userParts[7]),
				// 									   encodeURIComponent(userParts[8]),
				// 									   encodeURIComponent(userParts[9])
				// 								   	   ], (err, result)=>{
				// 										   done();
				// 			if(err) {
				// 				reply("fds" + err);
				// 			}else {
				// 				var message = "customer " + request.params.id + " is deleted";
				// 				reply(message);
				// 				//reply(result.rows[0],"is deleted");
				// 				}
				// 			});

	//update information inside Database

	putCustomerById: (request, reply) => {
		var client = new pg.Client(config.url);
		client.connect((err) =>{
			if(err) {
				reply(err);
				client.end();
			}else {
				var obj = JSON.parse(request.payload);
						debugger;
				const userParts = request.params.id.split('/');
				client.query(config.updateCustomerById, [
					obj.cus_id,
					obj.cus_name_short,
					obj.cus_name_long
					], (err, result)=>{

					if(err) {
						reply(err);
					}else {
						reply("OK");
					}
					client.end();
				});
			}

		});
	}
}
