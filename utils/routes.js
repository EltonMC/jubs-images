
'use strict';

const helper = require('./helper');

class Routes{

	constructor(app){
		this.app = app;
	}

	/* creating app Routes starts */
	appRoutes(){

		this.app.get('/', function (request, response) {
			response.send("Server Images ON!");
		});
	}

	routesConfig(){
		this.appRoutes();
	}

}

module.exports = Routes;