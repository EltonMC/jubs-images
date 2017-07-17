
'use strict';

const helper = require('./helper');
const fs = require("fs");

class Routes{

	constructor(app){
		this.app = app;
	}

	/* creating app Routes starts */
	appRoutes(){

		this.app.post('/service', (request, response) => {
			const data = {
				idService: request.body.idService,
				images: request.body.images,
			}

			let registrationResponse = {}

			if (data.idService === ''){
	            registrationResponse.error = true;
	            registrationResponse.message = `id cant be empty.`;
	            response.status(412).json(registrationResponse);
			}else {
				helper.saveImagesService(data, (result) =>{

					if (result.error) {
						registrationResponse.error = true;
						registrationResponse.message = `Server error.`;
						response.status(404).json(registrationResponse);
					}else{
						registrationResponse.error = false;
						registrationResponse.message = `Image save.`;
						response.status(200).json(registrationResponse);
					}
				});					
			}
		});

		this.app.get('/', function (request, response) {
			response.send("Server Images ON!");
		});
	}

	routesConfig(){
		this.appRoutes();
	}

}

module.exports = Routes;