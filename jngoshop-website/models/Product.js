var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
	name: String,
	summary: String,
	image: String,	
	startPrice: {type: Number, default: 0},
	currentPrice: {type: Number, default: 0},
	startDay: { type: Date, default: Date.now },
	endDay: { type: Date, default: Date.now },
	numberOfBids: {type: Number, default: 0},
	// seller: {type: mongoose.Schema.Types.ObjectId, ref: 'Seller'},
	category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
	users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

// ProductSchema.methods.setPrice = function(cb){
// 	this.
// }


mongoose.model('Product', ProductSchema);