
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

			let returnResponse = {}

			if (data.idService === ''){
	            returnResponse.error = true;
	            returnResponse.message = `id cant be empty.`;
	            response.status(412).json(returnResponse);
			}else {
				helper.saveImagesService(data, (result) =>{
					if (result.error) {
						returnResponse.error = true;
						returnResponse.message = `Server error.`;
						response.status(404).json(returnResponse);
					}else{
						returnResponse.error = false;
						returnResponse.message = `Image save.`;
						response.status(200).json(returnResponse);
					}
				});					
			}
		});

		this.app.post('/user', (request, response) => {
			const data = {
				idUser: request.body.idUser.toString(),
				image: request.body.image.toString(),
			}
			response.status(200).json(data);

			let returnResponse = {}

			if (data.idUser == ''){
	            returnResponse.error = true;
	            returnResponse.message = `id cant be empty.`;
	            response.status(412).json(returnResponse);
			}else {
				helper.saveImagePerfil(data, (result) =>{
					if (result.error) {
						returnResponse.error = true;
						returnResponse.message = `Server error.`;
						response.status(404).json(returnResponse);
					}else{
						returnResponse.error = false;
						returnResponse.message = `Image save.`;
						response.status(200).json(returnResponse);
					}
				});					
			}
		});

		this.app.delete('/user/:id', (request, response) => {
	
			let idUser = request.params.id;	

			let returnResponse = {}

			if (idUser == ''){
	            returnResponse.error = true;
	            returnResponse.message = `id cant be empty.`;
	            response.status(412).json(returnResponse);
			}else {
				helper.removeImagePerfil(idUser, (result) =>{
					if (result.error) {
						returnResponse.error = true;
						returnResponse.message = `Server error.`;
						response.status(404).json(returnResponse);
					}else{
						returnResponse.error = false;
						returnResponse.message = `Image remove.`;
						response.status(200).json(returnResponse);
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