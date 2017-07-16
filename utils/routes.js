
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
					response.send("Loose!");
				}else{
					response.send("Win");
				}
			});
		});
	}

	routesConfig(){
		this.appRoutes();
	}

}

module.exports = Routes;