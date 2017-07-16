
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

			blobService.createBlockBlobFromLocalFile('images-service', 'taskblob', 'task1-upload.txt', function(error, result, response) {
				if (!error) {
					// file uploaded
				}
			});
			response.send("Server Images ON!");
		});
	}

	routesConfig(){
		this.appRoutes();
	}

}

module.exports = Routes;