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
				controller: 'productListController',
				resolve: {
					categoryPromise: ['categories', function(categories){
						return categories.getAll();
					}]}
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
				controller: 'AuthCtrl',
				onEnter: ['$state', 'auth', function($state, auth){
					if(auth.isLoggedIn()){
						$state.go('home');
					}
				}]
			})
			.state('product-detail', {
				url: '/product-detail',
				templateUrl: '/product-detail.html',
				controller: 'productDetailController'
			})
			.state('register', {
				url: '/register',
				templateUrl: '/register.html',
				controller: 'AuthCtrl',
				onEnter: ['$state', 'auth', function($state, auth){
					if(auth.isLoggedIn()){
						$state.go('home');
					}
				}]
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
					}],
					categoryPromise: ['categories', function(categories){
						return categories.getAll();
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

	o.bid = function(id, currentPrice){
		return $http.put('/products/' + id + '/current-price', {'currentPrice': currentPrice}).then(function(res){
			console.log(res);
		});
	}

	// o.update = function(id, price){
	// 	return $http.put('/products/' + id, )
	// }

	return o;
}]);

app.factory('auth', ['$http', '$window', function($http, $window){
   var auth = {};

   auth.saveToken = function (token){
   	$window.localStorage['jingoshop-token'] = token;
   };

   auth.getToken = function (){
   	return $window.localStorage['jingoshop-token'];
   }

   auth.isLoggedIn = function(){
   	var token = auth.getToken();

   	if(token){
   		var payload = JSON.parse($window.atob(token.split('.')[1]));

   		return payload.exp > Date.now() / 1000;
   	} else {
   		return false;
   	}
   };

   auth.currentUser = function(){
   	if(auth.isLoggedIn()){
   		var token = auth.getToken();
   		var payload = JSON.parse($window.atob(token.split('.')[1]));

   		return payload.firstname;
   	}
   };

   auth.getUserId = function(){
   	if(auth.isLoggedIn()){
   		var token = auth.getToken();
   		var payload = JSON.parse($window.atob(token.split('.')[1]));

   		return payload._id;
   	}
   };

   auth.register = function(user){
   	return $http.post('/register', user).success(function(data){
   		auth.saveToken(data.token);
   	});
   };

   auth.logIn = function(user){
   	return $http.post('/login', user).success(function(data){
   		auth.saveToken(data.token);
   	});
   };

   auth.logOut = function(){
   	$window.localStorage.removeItem('jingoshop-token');
   };

   return auth;
}]);


app.controller('AuthCtrl', [
	'$scope',
	'$state',
	'auth',
	function($scope, $state, auth){
		$scope.user = {};

		$scope.register = function(){
			console.log($scope.user);
			auth.register($scope.user).error(function(error){
				$scope.error = error;
			}).then(function(){
				$state.go('home');
			});
		};

		$scope.logIn = function(){
			auth.logIn($scope.user).error(function(error){
				$scope.error = error;
			}).then(function(){
				$state.go('home');
			});
		};

	}]);

app.controller('NavbarCtrl', [
	'$scope',
	'auth',
	function($scope, auth){
		$scope.isLoggedIn = auth.isLoggedIn;
		$scope.currentUser = auth.currentUser;
		$scope.logOut = auth.logOut;
		$scope.getUserId = auth.getUserId;
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


app.controller('productListController', [
	'$scope', 
	'categories',
	'category',
	function($scope, categories, category){
		// console.log(category.products);
		$scope.products = category.products;

		// console.log(categoryPromise.categories);
		$scope.categories = categories.categories;

		$scope.getId = function(product){
			return product._id;
		}
}]);


app.controller('productDetailController', [
	'$scope',
	'auth',
	'products',
	'product',
	function($scope, auth, products, product){

		$scope.product = product;

		$scope.getId = function(product){
			return product._id;
		}

		$scope.bid = function() {
			if ($scope.currentPrice <= product.currentPrice){
				window.alert('Your price must be larger than ' + product.currentPrice);
				return;
			}

			products.bid(product._id, $scope.currentPrice);
			product.currentPrice = $scope.currentPrice;
			$scope.currentPrice = "";
		}


}]);


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

