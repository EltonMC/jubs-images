'use strict';
 
const fs = require("fs");

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
					var azure = require('azure-storage');
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

		fs.writeFile(data.idUser+".", base64Data, 'base64', function(err) {
			if(!err){
				var azure = require('azure-storage');
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
}
 
module.exports = new Helper();