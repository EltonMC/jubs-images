
'use strict';

const helper = require('./helper');

class Routes{

	constructor(app){
		this.app = app;
	}

	/* creating app Routes starts */
	appRoutes(){

		this.app.get('/', function (request, response) {
			var azure = require('azure-storage');
			var blobService = azure.createBlobService();

			blobService.createBlockBlobFromLocalFile('images-service', 'jubs', 'jubs.txt', function(error, result, res) {
				if (!error) {
					response.send("Win");
					// file uploaded
				}else{
					reponse.send("lose");
				}
			});
			//response.send("Server Images ON!");
		});
	}

	routesConfig(){
		this.appRoutes();
	}

}

module.exports = Routes;