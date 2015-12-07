angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $ionicActionSheet) {
    // 点击按钮触发，或一些其他的触发条件
    $scope.show = function() {
        console.log(123123123);

        // 显示操作表
        $ionicActionSheet.show({
            buttons: [{
                text: '<b>Share</b> This'
            }, {
                text: 'Move'
            }, ],
            destructiveText: 'Delete',
            titleText: 'Modify your album',
            cancelText: 'Cancel',
            buttonClicked: function(index) {
                if (index == 0) {
                    console.log("Share This");
                }
                if (index == 1) {
                    console.log("Move");
                }
                return true;
            }
        });

    };
})

.controller('ChatsCtrl', function($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
        Chats.remove(chat);
    };
})

.controller('CircleCtrl', function($scope) {})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    })
    .controller('NewsCtrl', function($scope, $ionicLoading) {

        $scope.data = {
            showDelete: false
        };

        $scope.edit = function(item) {
            alert('Edit Item: ' + item.id);
        };
        $scope.share = function(item) {
            alert('Share Item: ' + item.id);
        };

        $scope.moveItem = function(item, fromIndex, toIndex) {
            $scope.items.splice(fromIndex, 1);
            $scope.items.splice(toIndex, 0, item);
        };

        $scope.onItemDelete = function(item) {
            $scope.items.splice($scope.items.indexOf(item), 1);
        };

        $.ajax({
                url: 'http://localhost:8070/news/getNewsCollection',
                type: "GET",
                contentType: "application/json; charset=utf-8",
                dataType: "jsonp",
                data: {},
            })
            .done(function(response) {
                console.log("success");
                $(".has-header").css('top', '90px');
                $scope.items = response;
                console.log(JSON.stringify(response));
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });
    })

.controller('AccountCtrl', function($scope) {
    $scope.settings = {
        enableFriends: true
    };
})

.controller('ResultCtrl', function($scope, Results) {
    $scope.shouldShowDelete = false;
    $scope.shouldShowReorder = false;
    $scope.listCanSwipe = true;
    // debugger;
    $scope.matches = Results.all();
});