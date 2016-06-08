var app = angular.module('onlineAuctionApp', ['ui.router']);

app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider){

		$urlRouterProvider.otherwise('/home');

		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: '/home.html',
				controller: 'mainController',
				resolve: {
					categoryPromise: ['categories', function(categories){
						return categories.getAll();
					}]}
			})
			.state('product-list', {
				url: '/product-list',
				templateUrl: '/product-list.html',
				controller: 'productListController'
			})
			.state('contact', {
				url: '/contact',
				templateUrl: '/contact.html',
				controller: 'contactusController'
			})
			.state('instruction', {
				url: '/instruction',
				templateUrl: '/instruction.html',
				
			})
			.state('login', {
				url: '/login',
				templateUrl: '/login.html',
				controller: 'loginController'
			})
			.state('product-detail', {
				url: '/product-detail',
				templateUrl: '/product-detail.html',
				controller: 'productDetailController'
				
			})
			.state('register', {
				url: '/register',
				templateUrl: '/register.html',
				controller: 'registerController'
			})
			.state('search-result', {
				url: '/search-result',
				templateUrl: '/search-result.html',
				controller: 'registerController'
			})
			.state('user-profile', {
				url: '/user-profile',
				templateUrl: '/user-profile.html',
				controller: 'userProfileController'
			})
			.state('categories', {
				url: '/categories/{id}',
				templateUrl: '/product-list.html',
				controller: 'productListController',
				resolve: {
					category: ['$stateParams', 'categories', function($stateParams, categories) {
						return categories.get($stateParams.id);
					}]
				}
			})
			.state('products', {
				url: '/products/{id}',
				templateUrl: '/product-detail.html',
				controller: 'productDetailController',
				resolve: {
					product: ['$stateParams', 'products', function($stateParams, products) {
						return products.get($stateParams.id);
					}]
				}
			});

		
}]);

app.factory('categories', ['$http', function($http){
	var o = {
		categories: []
	};

	o.getAll = function() {
		return $http.get('/categories').success(function(data){
			angular.copy(data, o.categories);
		});
	};

	o.get = function(id) {
		return $http.get('/categories/' + id).then(function(res){
			return res.data;
		});
	};

	return o;
}]);

app.factory('products', ['$http', function($http){
	var o = {
		products: []
	};

	o.getAll = function() {
		return $http.get('/products').success(function(data){
			angular.copy(data, o.products);
		});
	};

	o.get = function(id) {
		return $http.get('/products/' + id).then(function(res){
			return res.data;
		});
	};

	return o;
}]);



app.controller('mainController', [
	'$scope', 
	'categories', 
	function($scope, categories){
		$scope.categories = categories.categories;

		$scope.getId = function(category){
			return category._id;
		}

}]);

// var categories = [
// 	{
// 		title : "Woman",
// 		description : "Welcome to our category. Everything you need to find, check out our category.",
// 		image : "images/category1.jpg"
// 	},
// 	{
// 		title : "Man",
// 		description : "Welcome to our category. Everything you need to find, check out our category.",
// 		image : "images/category2.jpg"
// 	},
// 	{
// 		title : "Kid",
// 		description : "Welcome to our category. Everything you need to find, check out our category.",
// 		image : "images/category3.jpg"
// 	},
// 	{
// 		title : "Shoe",
// 		description : "Welcome to our category. Everything you need to find, check out our category.",
// 		image : "images/category4.jpg"
// 	}];

app.controller('productListController', [
	'$scope', 
	'category', 
	function($scope, category){
		// console.log(category.products);
		$scope.products = category.products;

		$scope.getId = function(product){
			return product._id;
		}
}]);

// var productList = [
// 	{
// 		price : "$83.99",
// 		title : "Handmade Shoes",
// 		description : "This shoes is paint by artist.",
// 		image : "images/product1.jpg"
// 	},
// 	{
// 		price : "$83.99",
// 		title : "Handmade Shoes",
// 		description : "This shoes is paint by artist.",
// 		image : "images/product2.jpg"
// 	},
// 	{
// 		price : "$83.99",
// 		title : "Handmade Shoes",
// 		description : "This shoes is paint by artist.",
// 		image : "images/product3.jpg"
// 	},
// 	{
// 		price : "$83.99",
// 		title : "Handmade Shoes",
// 		description : "This shoes is paint by artist.",
// 		image : "images/product4.jpg"
// 	},
// 	{
// 		price : "$83.99",
// 		title : "Handmade Shoes",
// 		description : "This shoes is paint by artist.",
// 		image : "images/product5.jpg"
// 	},
// 	{
// 		price : "$83.99",
// 		title : "Handmade Shoes",
// 		description : "This shoes is paint by artist.",
// 		image : "images/product6.jpg"
// 	},
// 	{
// 		price : "$83.99",
// 		title : "Handmade Shoes",
// 		description : "This shoes is paint by artist.",
// 		image : "images/product7.jpg"
// 	},
// 	{
// 		price : "$83.99",
// 		title : "Handmade Shoes",
// 		description : "This shoes is paint by artist.",
// 		image : "images/product8.jpg"
// 	}];


app.controller('productDetailController', [
	'$scope',
	'product',
	function($scope, product){
		console.log(product)
		$scope.product = product;

		$scope.bidprice = "";

		$scope.bid = function(){
		window.alert("Bid " + $scope.bidprice);
	}

}]);

// var productDetail = 
// 	{
// 		name : "sample name",
// 		summary : "sample product summary",
// 		rating : "this product is very good",
// 		priceToBuy : "1000",
// 		priceCurrentBid : "500",
// 		status : "on sell",
// 		startDay : "20/05/2016",
// 		endDay : "01/06/2016",
// 		numberOfBid : "20",

// 		description : "This is a long, detail description of the product",
// 		information : "This is the product's info",
// 		review : "This is the product's review",

// 		image : "images/product1.jpg"
// 	};

app.controller('userProfileController', function($scope){
	$scope.userProfile = userProfile;
});

var userProfile = 
	{ 
		username : "sample user name",
		fullname : "sample full name",
		email : "me@gmail.com",
		birthday : "user birthday",
		address : "user adress",
		contact : "user contact",

		image : "images/user1.png"
	};


/*Angular Input Data Binding*/

app.controller('contactusController', function($scope){
	/*TODO*/
	$scope.contact = {name:"",email:"",message:""};

	$scope.submitContact = function(){
		window.alert("Hi " + $scope.contact.name 
			+ "\n"
			+ $scope.contact.email 
			+ "\n"
			+ $scope.contact.message);

		/*window.alert("Thank you!");*/
	}
});


app.controller('loginController', function($scope){
	/*TODO*/
	$scope.loginInfo = {username:"",password:""};

	$scope.login = function(){
		window.alert("Login " + $scope.loginInfo.username 
			+ "\n"
			+ $scope.loginInfo.password);
	}
});

app.controller('registerController', function($scope){
	
	$scope.user = {firstname:"", lastname:"", username:"", email:"", password:""};

	$scope.register = function(){
		window.alert("Register " + $scope.user.firstname
			+ "\n"
			+ $scope.user.lastname 
			+ "\n"
			+ $scope.user.username
			+ "\n"
			+ $scope.user.email 
			+ "\n"
			+ $scope.user.password
			);

		/*window.alert("Thank you!");*/
	}
});