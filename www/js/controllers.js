angular.module('starter.controllers', ['ionic', 'ui.calendar', 'ui.bootstrap'])

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

    var skip, latest;

    $scope.data = {
        showDelete: false
    };

    $scope.view = function(item) {
        $scope.jumpTo("tab.news-detail", {
            newsId: item.newsId
        });
    };

    $scope.doRefresh = function() {
        News.refresh(latest).then(function(data) {
            // extend the $scope.items array with the response
            // array from getData();
            // http://stackoverflow.com/a/1374131/1015046
            // 这是尾部叠加数据，不合适
            //Array.prototype.push.apply($scope.items, data);
            //http://stackoverflow.com/questions/7032550/javascript-insert-an-array-inside-another-array
            // 数组插入数组最优做法
            if (data.length == 0) {
                $scope.items.splice.apply($scope.items, [0, 0].concat(data));
            }
            // $scope.items = data;
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
            } else {
                // extend the $scope.items array with the respo
                Array.prototype.push.apply($scope.items, data);
                // $scope.items.splice.apply($scope.items, [0, 0].concat(data));
                skip = $scope.items.length;
            }
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
        latest = $scope.items[0].createdTime;
        console.log(latest);
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

.controller('MatchCtrl', function($scope, $compile, $timeout, uiCalendarConfig) {

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    $scope.changeTo = 'Hungarian';

    /* event source that pulls from google.com */
    $scope.eventSource = {
        url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
        className: 'gcal-event', // an option!
        currentTimezone: 'America/Chicago' // an option!
    };

    /* event source that contains custom events on the scope */
    $scope.events = [{
        title: 'All Day Event',
        start: new Date(y, m, 1)
    }, {
        title: 'Long Event',
        start: new Date(y, m, d - 5),
        end: new Date(y, m, d - 2)
    }, {
        id: 999,
        title: 'Repeating Event',
        start: new Date(y, m, d - 3, 16, 0),
        allDay: false
    }, {
        id: 999,
        title: 'Repeating Event',
        start: new Date(y, m, d + 4, 16, 0),
        allDay: false
    }, {
        title: 'Birthday Party',
        start: new Date(y, m, d + 1, 19, 0),
        end: new Date(y, m, d + 1, 22, 30),
        allDay: false
    }, {
        title: 'Click for Google',
        start: new Date(y, m, 28),
        end: new Date(y, m, 29),
        url: 'http://google.com/'
    }];

    /* event source that calls a function on every view switch */
    $scope.eventsF = function(start, end, timezone, callback) {
        var s = new Date(start).getTime() / 1000;
        var e = new Date(end).getTime() / 1000;
        var m = new Date(start).getMonth();
        var events = [{
            title: 'Feed Me ' + m,
            start: s + (50000),
            end: s + (100000),
            allDay: false,
            className: ['customFeed']
        }];
        callback(events);
    };

    $scope.calEventsExt = {
        color: '#f00',
        textColor: 'yellow',
        events: [{
            type: 'party',
            title: 'Lunch',
            start: new Date(y, m, d, 12, 0),
            end: new Date(y, m, d, 14, 0),
            allDay: false
        }, {
            type: 'party',
            title: 'Lunch 2',
            start: new Date(y, m, d, 12, 0),
            end: new Date(y, m, d, 14, 0),
            allDay: false
        }, {
            type: 'party',
            title: 'Click for Google',
            start: new Date(y, m, 28),
            end: new Date(y, m, 29),
            url: 'http://google.com/'
        }]
    };

    /* alert on eventClick */
    $scope.alertOnEventClick = function( date, jsEvent, view){
        $scope.alertMessage = (date.title + ' was clicked ');
    };

    /* alert on Drop */
     $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
       $scope.alertMessage = ('Event Dropped to make dayDelta ' + delta);
    };

    /* alert on Resize */
    $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
       $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
    };
    
     /* Render Tooltip */
    $scope.eventRender = function( event, element, view ) {
        element.attr({'tooltip': event.title,
                      'tooltip-append-to-body': true});
        $compile(element)($scope);
    };

    /* config object */
    $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
          left: 'title',
          center: 'center',
          right: 'today prev,next'
        },
        eventClick: $scope.alertOnEventClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
        eventRender: $scope.eventRender
      }
    };

    /* event sources array*/
    $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
    $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];
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
