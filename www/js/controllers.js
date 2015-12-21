angular.module('starter.controllers', ['ionic'])

.controller('DashCtrl', function($scope, $ionicActionSheet) {
    // 点击按钮触发，或一些其他的触发条件
    $scope.show = function() {
        console.log("test");

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

.controller('NewsCtrl', function($scope, News, $state, $ionicScrollDelegate) {

    $scope.moreDataCanBeLoaded = true;

    $scope.jumpTo = function(urlController, params) {
        $state.go(urlController, params, {
            reload: true
        });
    }

    $scope.items = [];

    var skip;

    $scope.data = {
        showDelete: false
    };

    $scope.view = function(item) {
        $scope.jumpTo("tab.news-detail", {
            newsId: item.newsId
        });
    };

    $scope.doRefresh = function() {
        News.all(0, 10).then(function(data) {
            // extend the $scope.items array with the response
            // array from getData();
            // http://stackoverflow.com/a/1374131/1015046
            // 这是尾部叠加数据，不合适
            //Array.prototype.push.apply($scope.items, data);
            //http://stackoverflow.com/questions/7032550/javascript-insert-an-array-inside-another-array
            // 数组插入数组最优做法
            $scope.items = data;
            console.log("refresh", $scope.items.length);
        }).finally(function() {
            // Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');
        });
    };

    $scope.loadMore = function() {
        News.all(skip, 3).then(function(data) {

            if (data.length == 0) {
                $scope.moreDataCanBeLoaded = false;
            }
            // extend the $scope.items array with the respo
            Array.prototype.push.apply($scope.items, data);
            skip = $scope.items.length;
        }).finally(function() {
            // Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };

    $scope.scrollToTop = function() {
        $ionicScrollDelegate.scrollTop();
    };

    // get data on page load
    News.all(0, 3).then(function(data) {
        $scope.items = data;
        skip = $scope.items.length;
    }, function(data) { // 处理错误 .reject  
        $scope.items = {
            error: '没有新闻！'
        };
    });

})

/*.controller('NewsCtrl', function($scope, News) {

    // $scope.items = News.all();

    $scope.items = [];

    var promise = News.all(); // 同步调用，获得承诺接口  
    promise.then(function(data) { // 调用承诺API获取数据 .resolve  
        $scope.items = data;
    }, function(data) { // 处理错误 .reject  
        $scope.items = {
            error: '没有新闻！'
        };
    });

    $scope.data = {
        showDelete: false
    };

})
*/

.controller('NewsDetailCtrl', function($scope, $stateParams, News, $ionicNavBarDelegate) {

    console.log($stateParams.newsId);

    var promise = News.get($stateParams.newsId); // 同步调用，获得承诺接口  
    promise.then(function(data) { // 调用承诺API获取数据 .resolve  
        //这里有个问题，就是title不能通过这个动态来获取。
        $scope.news = data[0];
    }, function(data) { // 处理错误 .reject  
        $scope.news = {
            error: '没有新闻！'
        };
    });
    // $scope.news = News.get($stateParams.newsId);

})

.controller('MatchCtrl', function($scope, $stateParams, Match, $ionicPopup) {
    $scope.dateModel = new Date("08-14-2015");
    $scope.datePopup = new Date("08-14-2015");
    var disabledDates = [
        new Date(1437719836326),
        new Date(2015, 7, 10), //months are 0-based, this is August, 10th!
        new Date('Wednesday, August 12, 2015'), //Works with any valid Date formats like long format
        new Date("08-14-2015"), //Short format
        new Date(1439676000000) //UNIX format
    ];
    var monthList = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
    var weekDaysList = ["日", "一", "二", "三", "四", "五", "六"];
    $scope.datepickerObject = {};
    $scope.datepickerObject.inputDate = new Date();

    $scope.datepickerObjectModal = {
        titleLabel: '选择日期', //Optional
        todayLabel: '今天', //Optional
        closeLabel: '关闭', //Optional
        setLabel: '选择', //Optional
        errorMsgLabel: '请选择时间.', //Optional
        setButtonType: 'button-assertive', //Optional
        modalHeaderColor: 'bar-positive', //Optional
        modalFooterColor: 'bar-positive', //Optional
        templateType: 'modal', //Optional
        inputDate: $scope.datepickerObject.inputDate, //Optional
        mondayFirst: true, //Optional
        disabledDates: disabledDates, //Optional
        monthList: monthList, //Optional
        weekDaysList: weekDaysList,
        from: new Date(2012, 5, 1), //Optional
        to: new Date(2016, 7, 1), //Optional
        callback: function(val) { //Optional
            datePickerCallbackModal(val);
        }
    };
    $scope.datepickerObjectPopup = {
        titleLabel: '选择日期', //Optional
        todayLabel: '今天', //Optional
        closeLabel: '关闭', //Optional
        setLabel: '选择', //Optional
        errorMsgLabel: '请选择时间.', //Optional
        setButtonType: 'button-assertive', //Optional
        modalHeaderColor: 'bar-positive', //Optional
        modalFooterColor: 'bar-positive', //Optional
        templateType: 'popup', //Optional
        inputDate: $scope.datepickerObject.inputDate, //Optional
        //mondayFirst: true, //Optional
        sundayFirst: true, //Optional
        disabledDates: disabledDates, //Optional
        monthList: monthList, //Optional
        weekDaysList: weekDaysList,
        from: new Date(2014, 5, 1), //Optional
        to: new Date(2016, 7, 1), //Optional
        callback: function(val) { //Optional
            datePickerCallbackPopup(val);
        }
    };

    var datePickerCallbackModal = function(val) {
        if (typeof(val) === 'undefined') {
            console.log('未选择日期');
        } else {
            $scope.datepickerObjectModal.inputDate = val;
            $scope.dateModel = val;
            console.log('选择的日期是 : ', val)
        }
    };

    var datePickerCallbackPopup = function(val) {
        if (typeof(val) === 'undefined') {
            console.log('未选择日期');
        } else {
            $scope.datepickerObjectPopup.inputDate = val;
            $scope.datePopup = val;
            console.log('选择的日期是 : ', val)
        }
    };

    /* console.log($stateParams.matchId);

     var promise = Match.get($stateParams.matchId); // 同步调用，获得承诺接口  
     promise.then(function(data) { // 调用承诺API获取数据 .resolve  
         //这里有个问题，就是title不能通过这个动态来获取。
         $scope.match = data[0];
     }, function(data) { // 处理错误 .reject  
         $scope.match = {
             error: '赛事！'
         };
     });*/
    // $scope.news = Match.get($stateParams.matchId);

})

.controller('AccountCtrl', function($scope) {
    $scope.settings = {
        enableFriends: true,
        enableGirlFriends: true
    };
})

.controller('ResultCtrl', function($scope, Results) {
    $scope.shouldShowDelete = false;
    $scope.shouldShowReorder = false;
    $scope.listCanSwipe = true;
    // debugger;
    $scope.matches = Results.all();
});
