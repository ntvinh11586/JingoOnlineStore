var app = angular.module('onlineAuctionApp', ['ui.router']);

app.controller('mainController', function($scope){
	$scope.categories = categories;

});

var categories = [
	{
		title : "Woman",
		description : "Welcome to our category. Everything you need to find, check out our category.",
		image : "images/category1.jpg"
	},
	{
		title : "Man",
		description : "Welcome to our category. Everything you need to find, check out our category.",
		image : "images/category2.jpg"
	},
	{
		title : "Kid",
		description : "Welcome to our category. Everything you need to find, check out our category.",
		image : "images/category3.jpg"
	},
	{
		title : "Shoe",
		description : "Welcome to our category. Everything you need to find, check out our category.",
		image : "images/category4.jpg"
	}];

app.controller('productListController', function($scope){
	$scope.productList = productList;

});

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

app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider){

		$stateProvider
			.state('/home', {
				url: '/home',
				templateUrl: '/home.html',
				controller: 'mainController'
			});
		$urlRouterProvider.otherwise('home');
}]);