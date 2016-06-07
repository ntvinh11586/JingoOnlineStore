var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
	name: String,
	summary: String,
	price: String,
	image: String,
	// seller: {type: mongoose.Schema.Types.ObjectId, ref: 'Seller'},
	category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'}
});

mongoose.model('Product', ProductSchema);