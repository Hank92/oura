// app/models/daily.js
var mongoose = require('mongoose');

var newsSchema = mongoose.Schema({
    title: String, 
    url: String,
	image_url:String,
	posted: { type: Date, default: Date.now },
	userComments: [{
		userPost: String
	}]
    });

newsSchema.statics.findByTitle = function(title, cb) {
	// This is an interesting line.
	// New RegExp(title, 'i') creates a Regular Expression that causes a case-insensitive search.
	// Also passing in the callback like this allows us to call this method like so:

	/*
		Pinless.findByTitle('kitty', function(err, results) {
			console.log(results)  // Here results will have all Pinless' with title 'kitty'
		})
	*/
	this.find({ title: new RegExp(title, 'i')}, cb);
}

     newsSchema.plugin(mongoosePaginate);
     module.exports = mongoose.model('newsPost', newsSchema);