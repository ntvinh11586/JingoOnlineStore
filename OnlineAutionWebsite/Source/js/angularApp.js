var app = angular.module('onlineAuctionApp', []);

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

