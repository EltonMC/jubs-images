'use strict';
 
const fs = require("fs");

class Helper{
 
	constructor(){}

	saveImages(data, callback){

		for (image in data.images){
			var base64Data = image.replace(/^data:image\/jpeg;base64,/, "");
			base64Data  +=  base64Data.replace('+', ' ');

			fs.writeFile("{data.idService}.png", base64Data, 'base64', function(err) {
				if(!err){
					var azure = require('azure-storage');
					var blobService = azure.createBlobService();

					blobService.createBlockBlobFromLocalFile('images-service', '{data.idService}/{i}', '{data.idService}.png', function(error, result, res) {
						if (!error) {
							fs.unlink('{data.idService}.jpeg', function(error) {
								if (error) {
									throw error;
								}
								console.log('Deleted dog.jpg!!');
							});
							response.send("Win!");
						}else{
							response.send(error);
						}
					});
				}else{
					console.log(err);
				}
			});
		}
	}
}
 
module.exports = new Helper();