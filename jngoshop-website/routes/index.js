var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var Product = mongoose.model('Product');
// var Seller = mongoose.model('Seller');
var Category = mongoose.model('Category');
var User = mongoose.model('User');

var jwt = require('express-jwt');

var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Product ------------------------------------------------------------------

router.get('/products', function(req, res, next){
	Product.find(function(err, products){
		if (err) { return next(err); }

		res.json(products);
	});
})

// should remove
// router.post('/products', function(req, res, next){
// 	var product = new Product(req.body);

// 	product.save(function(err, product){
// 		if (err) { return next(err); }

// 		res.json(product);
// 	});
// });

router.param('product', function(req, res, next, id) {
	var query = Product.findById(id);

	query.exec(function(err, product){
		if (err) { return err;}
		if (!product) {return next(new Error('can\'t find this product'));}

		req.product = product;
		return next();
	});
});

router.get('/products/:product', function(req, res){
	res.json(req.product);
});

// Seller-------------------------------------------------------------------

// router.get('/sellers', function(req, res, next){
// 	Seller.find(function(err, sellers){
// 		if (err) {return next(err); }

// 		res.json(sellers);
// 	});
// });

// router.post('/sellers', function(req, res, next){
// 	var seller = new Seller(req.body);

// 	seller.save(function(err, seller){
// 		if (err) {return next(err); }

// 		res.json(seller);
// 	});
// });

// router.param('seller', function(req, res, next, id){
// 	var query = Seller.findById(id);

// 	query.exec(function(err, seller){
// 		if (err) {return next(err); }
// 		if (!seller) { return next(new Error('Can\'t find this seller'));}

// 		req.seller = seller;
// 		return next();
// 	});
// });

// should remove product list
// router.get('/sellers/:seller', function(req, res){
// 	req.seller.populate('products', function(err, seller){
// 		if (err) { return next(err); }

// 		res.json(req.seller);
// 	});
// });

// router.post('/sellers/:seller/products', function(req, res, next){
// 	var product = new Product(req.body);
// 	product.seller = req.seller;

// 	product.save(function(err, product){
// 		if (err) {return next(err); }

// 		req.seller.products.push(product);
// 		req.seller.save(function(err, product){
// 			if (err) {return next(err); }

// 			res.json(product);
// 		});
// 	});
// });

// router.get('/sellers/:seller/products', function(req, res, next){
// 	req.seller.populate('products', function(err, seller){
// 		if (err) {return next(err); }

// 		res.json(seller.products);
// 	});
// });

// Category
router.get('/categories', function(req, res, next){
	Category.find(function(err, categories){
		if (err) {return next(err); }

		res.json(categories);
	});
});

router.post('/categories', function(req, res, next){
	var cat = new Category(req.body);

	cat.save(function(err, cat){
		if (err) {return next(err); }

		res.json(cat);
	});
});

router.param('category', function(req, res, next, id){
	var query = Category.findById(id);

	query.exec(function(err, category){
		if (err) {return next(err); }
		if (!category) { return next(new Error('Can\'t find this category'));}

		req.category = category;
		return next();
	});
})

// router.post('/sellers/:seller/categories/:category/products', function(req, res, next){
// 	var product = new Product(req.body);
// 	product.seller = req.seller;
// 	product.category = req.category;

// 	product.save(function(err, product){
// 		if (err) {return next(err); }

// 		req.seller.products.push(product);
// 		req.seller.save(function(err, product){
// 			if (err) {return next(err); }
// 		});

// 		req.category.products.push(product);
// 		req.category.save(function(err, product){
// 			if (err) {return next(err); }

// 			res.json(product);
// 		});
// 	});
// });

router.get('/categories/:category', function(req, res){
	req.category.populate('products', function(err, category){
		if (err) {return next(err); }
		res.json(req.category);
	});
});

router.get('/categories/:category/products', function(req, res){
	req.category.populate('products', function(err, category){
		if (err) {return next(err); }

		res.json(category.products);
	});
});

router.post('/categories/:category/products', function(req, res){
	var product = new Product(req.body);
	product.category = req.category;

	product.save(function(err, product){
		if (err) {return next(err); }

		req.category.products.push(product);
		req.category.save(function(err, product){
			if (err) {return next(err); }

			res.json(product);
		});
	});
});

router.post('/register', function(req, res, next){
	if(!req.body.username || !req.body.password){
		return res.status(400).json({message: 'Please fill out all fields'});
	}

	var user = new User();

	user.username = req.body.username;

	user.setPassword(req.body.password);

	user.firstname = req.body.firstname;
	user.lastname = req.body.lastname;
	user.email = req.body.email;

	user.save(function (err){
		if(err){ return next(err); }

		return res.json({token: user.generateJWT()})
	});
});

router.post('/login', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  passport.authenticate('local', function(err, user, info){
    if(err){ return next(err); }

    if(user){
      return res.json({token: user.generateJWT()});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

router.put('/products/:product/current-price', function(req, res, next){
	console.log(req.body);
	Product.update(
		{_id:req.product._id}, 
		{$set: { currentPrice: req.body.currentPrice}}, 
		{upsert: true}, 
		function(err){
			if(err){ return next(err); }
		});
});

module.exports = router;
