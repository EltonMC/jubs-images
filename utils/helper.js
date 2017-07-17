'use strict';
 
const fs = require("fs");

class Helper{
 
	constructor(){}

	saveImagesService(data, callback){
		let result = {
			error: false
		};
		data.images.forEach(image => {

			var base64Data = image.replace(/^data:image\/png;base64,/, "");
			base64Data +=  base64Data.replace('+', ' ');

			fs.writeFile(data.idService+".png", base64Data, 'base64', function(err) {
				if(!err){
					var azure = require('azure-storage');
					var blobService = azure.createBlobService();

					blobService.createBlockBlobFromLocalFile('images-service', data.idService+'/'+indexOf(image), data.idService+'.png', function(error, result, res) {
						if (!error) {
							fs.unlink(data.idService+'.png', function(error) {
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
}
 
module.exports = new Helper();