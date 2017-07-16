'use strict';
 
const fs = require("fs");

class Helper{
 
	constructor(){}

	saveImagesService(data, callback){
		let result = {
			count = 0,
			error = false
		};
		for (image in data.images){
			var base64Data = image.replace(/^data:image\/jpeg;base64,/, "");
			base64Data +=  base64Data.replace('+', ' ');

			fs.writeFile(data.idService+".png", base64Data, 'base64', function(err) {
				if(!err){
					var azure = require('azure-storage');
					var blobService = azure.createBlobService();

					blobService.createBlockBlobFromLocalFile('images-service', data.idService+'/'+result.count, data.idService+'.png', function(error, result, res) {
						if (!error) {
							fs.unlink(data.idService+'.png', function(error) {
								if (error) {
									throw error;
								}
							});
						}else{
							result.error = true;
							callback(result);
						}
					});
				}else{
					result.error = true;
					callback(result);

				}
			});
			result.count += 1;
		}
		callback(result);
	}
}
 
module.exports = new Helper();