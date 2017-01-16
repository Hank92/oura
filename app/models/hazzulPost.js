// app/models/issuePost.js
var mongoose = require('mongoose');

var hazzulSchema = mongoose.Schema({
  title: String, 
	url  : String,
	img_url: [String],
	img_comment: [String],
	video_url:[String],
	posted: { type: Date, default: Date.now },
	numClicks: {type: Number, default:0},
	usernumClicks: {type: Number, default:0},
	myClicks: {type: Number, default:0},
	comments: [{
		name: String,
		content: String
	}],
	userComments: [{
		userPost: String
	}]

     });

hazzulSchema.statics.findByTitle = function(title, cb) {
	this.find({ title: new RegExp(title, 'i')}, cb);
}


     hazzulSchema.plugin(mongoosePaginate);
     module.exports = mongoose.model('hazzulPost', hazzulSchema);
