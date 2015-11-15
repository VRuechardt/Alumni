'use strict';

module.exports = ['$scope', 'api', '$http', 'account', '$routeParams', function($scope, api, $http, account, $routeParams) {

    $scope.user = {

    };
    $scope.imageLoaded = false;
    $scope.previewSRC = '';

    $scope.loadUser = function() {
        api.get('/api/user/' + $routeParams.user_id, {})
            .then(function(response) {
                $scope.user = response.data;
                var profileImage = new Image();
                profileImage.onload = function(e) {
                    $scope.previewSRC = profileImage.src;
                    $scope.imageLoaded = true;
                    $scope.$apply();
                };
                profileImage.src = '/profile_pictures/' + $scope.user.id + '.png';
            }, function(error) {

            });
    };
    if($routeParams.user_id) {
        $scope.loadUser();
    }

    $scope.uploadProfilePicture = function() {
        $('#uploadProfilePictureButton').click();
    };

    $scope.previewPicture = function() {
        var reader = new FileReader();
        var file = $('#uploadProfilePictureButton')[0].files[0];
        reader.onloadend = function() {
            $scope.previewSRC = reader.result;
            $scope.imageLoaded = true;

            $scope.uploadPicture(file);
        };
        if (file) {
            reader.readAsDataURL(file); //reads the data as a URL
        } else {
            $scope.imageLoaded = false;
            $scope.previewSRC = '';
        }
    };
    $('#uploadProfilePictureButton').on('change', $scope.previewPicture);

    $scope.uploadPicture = function(file) {
        var form = new FormData();
        form.append('picture', file);
        $http.post('/api/upload_profile_picture', form, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
            .success(function(){
                Materialize.toast('Your picture was uploaded.');
            })
            .error(function(){
                Materialize.toast('Only png, jpg and gif allowed');
            });
    };

}];