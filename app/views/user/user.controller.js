'use strict';

module.exports = ['$scope', 'api', '$http', 'account', '$routeParams', function($scope, api, $http, account, $routeParams) {

    $scope.user = {

    };
    $scope.imageLoaded = false;
    $scope.previewSRC = '';

    $scope.myself = false;

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

                if(account.me.id == $scope.user.id) {
                    $scope.myself = true;
                }

            }, function(error) {

            });
    };
    if($routeParams.user_id) {
        $scope.loadUser();
    }

    $scope.uploadProfilePicture = function() {
        if($scope.myself) {
            $('#uploadProfilePictureButton').click();
        }
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
        if($scope.myself) {
            var form = new FormData();
            form.append('picture', file);
            $http.post('/api/upload_profile_picture', form, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                })
                .success(function(response){
                    console.log(response);
                    Materialize.toast('Your picture was uploaded.', 3000);
                })
                .error(function(){
                    Materialize.toast('Only png, jpg and gif allowed', 3000);
                });
        }
    };


    $scope.editingUserData = false;
    $scope.changedUser = {
        firstname: '',
        lastname: '',
        doChangePassword: false,
        password: '',
        newpassword: ''
    };
    $scope.editUserData = function() {
        if($scope.myself) {
            $scope.changedUser.firstname = $scope.user.firstname;
            $scope.changedUser.lastname = $scope.user.lastname;
            $scope.editingUserData = true;
        }
    };
    $scope.closeEditUserData = function() {
        $scope.editingUserData = false;
    };

    $scope.doEditUserData = function() {
        if($scope.myself) {
            api.put('/api/user/' + account.me.id, $scope.changedUser)
                .then(function(response) {
                    $scope.loadUser();
                    Materialize.toast('Your profile was updated', 3000);
                }, function(error) {
                    Materialize.toast('Wrong password', 3000);
                });
        }
    };

}];