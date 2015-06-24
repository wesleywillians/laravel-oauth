function loginController($scope, $http, $location, $localStorage) {
    $scope.email = "";
    $scope.password = "";

    $scope.error = {
        valid: false,
        message: ""
    };

    $scope.login = function () {
        $http.post('/oauth/access_token', {
            username: $scope.email,
            password: $scope.password,
            client_id: 1,
            client_secret: 'secret',
            grant_type: 'password'

        }).
            success(function (data) {
                if (typeof data.access_token != 'undefined' && data.access_token != "") {
                    $localStorage.$reset();
                    $localStorage.token = data.access_token;
                    $location.path('posts');
                }
            }).
            error(function (data) {
                $scope.error.valid = true;
                $scope.error.message = data.error_description;
            });
        return false;
    }
}

function postController($scope, $http) {
    $scope.posts = [];

    $http.get('/post').
        success(function (data) {
            $scope.posts = data;
        });
}

function sessionInjector($localStorage, $location, $q) {
    var sessionInjector = {
        request: function (config) {
            if ($localStorage.hasOwnProperty('token') && $localStorage.token != null) {
                config.headers.Authorization = "Bearer " + $localStorage.token;
            }
            return config;
        },
        'responseError': function (rejection) {
            if (rejection.status == 400 || rejection.status == 401) {
                $localStorage.$reset();
                $location.path('/login');
            }

            return $q.reject(rejection);
        }
    };

    return sessionInjector;
};

var app = angular.module('app', ['ngRoute', 'ngStorage']);

app.controller('LoginController', ['$scope', '$http', '$location', '$localStorage', loginController])
    .controller('PostController', ['$scope', '$http', postController]);

app.service('sessionInjector', ['$localStorage', '$location', '$q', sessionInjector]);

app.config(function ($routeProvider, $httpProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: '/js/views/login.html',
            controller: 'LoginController'
        })
        .when('/posts', {
            templateUrl: '/js/views/posts.html',
            controller: 'PostController'
        });
    $httpProvider.interceptors.push('sessionInjector');
});