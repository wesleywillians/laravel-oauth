app.config(function ($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: '/js/views/login.html',
            controller: 'LoginController'
        })
        .when('/posts', {
            templateUrl: '/js/views/posts.html',
            controller: 'PostController'
        });
});