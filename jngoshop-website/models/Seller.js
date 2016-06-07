var mongoose = require('mongoose');

var SellerSchema = mongoose.Schema({
	name: String,
	contact: String,
	products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}]
});

mongoose.model('Seller', SellerSchema);