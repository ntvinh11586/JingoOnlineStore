var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
	name: String,
	description: String,
	products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}]
});

mongoose.model('Category', CategorySchema);