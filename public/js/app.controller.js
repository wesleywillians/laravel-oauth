function loginController($scope, $rootScope, $http, $location) {
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
                    $rootScope.token = data.access_token;
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

function postController($scope, $rootScope, $http, $location) {
    $scope.posts = [];

    $http({
        method: 'GET',
        url: '/post',
        headers: {
            Authorization: 'Bearer ' + $rootScope.token
        }
    }).success(function (data) {
        $scope.posts = data;
    }).error(function (data) {
        $location.path('login');
    });
}

app
    .controller('LoginController', ['$scope', '$rootScope', '$http', '$location', loginController])
    .controller('PostController', ['$scope', '$rootScope', '$http', '$location',postController]);
