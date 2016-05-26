'use strict';

const Hapi = require('hapi');
const config = require('./config');
const inert = require('inert');
const postgres = require('./postgres');



const server = new Hapi.Server();
server.connection({ port: 3000 });
server.register(inert, (err)=>{

server.route({
	method: "GET",
	path: "/{param*}",
	handler:  {
		directory:{
			path: config.clientPath
		}

	}
})

server.route({
	method: "GET",
	path: "/highways",
	handler: postgres.getHighways
})
server.route({
	method: "GET",
	path: "/highway",
	handler: postgres.getHighway
})
server.route({
	method: "GET",
	path: "/customers",
	handler: postgres.getCustomers
})

server.route({
	method: "GET",
	path: "/customers/{id}",
	handler: postgres.getCustomerById
})
// Using postman to test it
//able to modify cus_name_short and cus_name_long by cus_ID
server.route({
	method: "PUT",
	path: "/customers/{id}",
	handler: postgres.putCustomerById
})

// this is a delete method
// dont call this function only if it is nesscary
// Or try post first, and delete the new instance
server.route({
	method: "DELETE",
	path: "/delete/{id}",
	handler: postgres.deleteCustomerById
})
// after /post/ pass 10 parameter to the HTTP
//HTTP reads it and create new object
server.route({
	method: "POST",
	path: "/post",
	handler: postgres.postCustomerById
})

server.start(() => {
    console.log('Server running at:', server.info.uri);
});
});
