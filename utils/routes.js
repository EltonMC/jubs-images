
'use strict';

const helper = require('./helper');
const fs = require("fs");
class Routes{

	constructor(app){
		this.app = app;
	}

	/* creating app Routes starts */
	appRoutes(){
		let idService = "jubs";
		this.app.get('/', function (request, response) {
			fs.unlink('{idService}.jpg', function(error) {
				if (error) {
					throw error;
				}
				console.log('Deleted dog.jpg!!');
			});
			response.send("Server Images ON!");
		});
	}

	routesConfig(){
		this.appRoutes();
	}

}

module.exports = Routes;