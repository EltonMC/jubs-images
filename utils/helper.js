'use strict';
 
const fs = require("fs");
const azure = require('azure-storage');

class Helper{
 
	constructor(){}

	saveImagesService(data, callback){
		let result = {
			error: false
		};
		data.images.forEach(function (image, i) {

			var base64Data = image.replace(/^data:image\/jpg;base64,/, "");
			base64Data +=  base64Data.replace('+', ' ');

			fs.writeFile(data.idService+".jpg", base64Data, 'base64', function(err) {
				if(!err){
					var blobService = azure.createBlobService();

					blobService.createBlockBlobFromLocalFile('images-service', data.idService+'/'+i, data.idService+'.jpg', function(error, result, res) {
						if (!error) {
							fs.unlink(data.idService+'.jpg', function(error) {
								if (error) {
									throw error;
								}
							});
						}else{
							result.error = true;
						}
					});
				}else{
					result.error = true;
				}
			});
		});

		callback(result);
	}

	saveImagePerfil(data, callback){
		let result = {
			error: false
		};

		var base64Data = data.image.replace(/^data:image\/jpg;base64,/, "");
		base64Data +=  base64Data.replace('+', ' ');

		fs.writeFile(data.idUser+".jpg", base64Data, 'base64', function(err) {
			if(!err){
				var blobService = azure.createBlobService();

				blobService.createBlockBlobFromLocalFile('images-perfil', data.idUser, data.idUser+'.jpg', function(error, result, res) {
					if (!error) {
						fs.unlink(data.idUser+'.jpg', function(error) {
							if (error) {
								throw error;
							}
						});
					}else{
						result.error = true;
					}
				});
			}else{
				result.error = true;
			}
		});
		callback(result);
	}

	removeImagePerfil(data, callback){
		let result = {
			error: falses
		};
		var blobService = azure.createBlobService();
		blobService.deleteBlob('images-perfil', '1179795758780631', function(error, response){
			if(!error){
				//Sucess
			}else{
				result.error = true;
			}

		});
		callback(result);

	}
}
 
module.exports = new Helper();