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
				
			})
			.state('instruction', {
				url: '/instruction',
				templateUrl: '/instruction.html',
				
			})
			.state('login', {
				url: '/login',
				templateUrl: '/login.html',
				
			})
			.state('product-detail', {
				url: '/product-detail',
				templateUrl: '/product-detail.html',
				controller: 'productDetailController'
				
			})
			.state('register', {
				url: '/register',
				templateUrl: '/register.html',
				
			})
			.state('search-result', {
				url: '/search-result',
				templateUrl: '/search-result.html',
				
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
	'categories', 
	// 'category', 
	function($scope, categories){
		$scope.productList = productList;
		//$scope.categories = categories;
		//$scope.category = category;
}]);

var productList = [
	{
		price : "$83.99",
		title : "Handmade Shoes",
		description : "This shoes is paint by artist.",
		image : "images/product1.jpg"
	},
	{
		price : "$83.99",
		title : "Handmade Shoes",
		description : "This shoes is paint by artist.",
		image : "images/product2.jpg"
	},
	{
		price : "$83.99",
		title : "Handmade Shoes",
		description : "This shoes is paint by artist.",
		image : "images/product3.jpg"
	},
	{
		price : "$83.99",
		title : "Handmade Shoes",
		description : "This shoes is paint by artist.",
		image : "images/product4.jpg"
	},
	{
		price : "$83.99",
		title : "Handmade Shoes",
		description : "This shoes is paint by artist.",
		image : "images/product5.jpg"
	},
	{
		price : "$83.99",
		title : "Handmade Shoes",
		description : "This shoes is paint by artist.",
		image : "images/product6.jpg"
	},
	{
		price : "$83.99",
		title : "Handmade Shoes",
		description : "This shoes is paint by artist.",
		image : "images/product7.jpg"
	},
	{
		price : "$83.99",
		title : "Handmade Shoes",
		description : "This shoes is paint by artist.",
		image : "images/product8.jpg"
	}];


app.controller('productDetailController', function($scope){
	$scope.productDetail = productDetail;
});

var productDetail = 
	{
		name : "sample name",
		summary : "sample product summary",
		rating : "this product is very good",
		priceToBuy : "1000",
		priceCurrentBid : "500",
		status : "on sell",
		startDay : "20/05/2016",
		endDay : "01/06/2016",
		numberOfBid : "20",

		description : "This is a long, detail description of the product",
		information : "This is the product's info",
		review : "This is the product's review",

		image : "images/product1.jpg"
	};

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
