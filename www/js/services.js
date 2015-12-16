angular.module('starter.services', [])

.factory('Chats', function() {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [{
        id: 0,
        name: 'Ben Sparrow',
        lastText: 'You on your way?',
        face: 'img/ben.png'
    }, {
        id: 1,
        name: 'Max Lynx',
        lastText: 'Hey, it\'s me',
        face: 'img/max.png'
    }, {
        id: 2,
        name: 'Adam Bradleyson',
        lastText: 'I should buy a boat',
        face: 'img/adam.jpg'
    }, {
        id: 3,
        name: 'Perry Governor',
        lastText: 'Look at my mukluks!',
        face: 'img/perry.png'
    }, {
        id: 4,
        name: 'Mike Harrington',
        lastText: 'This is wicked good ice cream.',
        face: 'img/mike.png'
    }];

    return {
        all: function() {
            return chats;
        },
        remove: function(chat) {
            chats.splice(chats.indexOf(chat), 1);
        },
        get: function(chatId) {
            for (var i = 0; i < chats.length; i++) {
                if (chats[i].id === parseInt(chatId)) {
                    return chats[i];
                }
            }
            return null;
        }
    };
})

.factory('News', function($http, $q) {
    // Might use a resource here that returns a JSON array

    return {
        all: function(skip, limit) {
            var url = 'http://localhost:8070/news/getNewsCollectionRefresh?skip=' + skip + '&limit=' + limit;

            var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行  
            $http({
                method: 'GET',
                url: url
            }).
            success(function(data, status, headers, config) {
                deferred.resolve(data); // 声明执行成功，即http请求数据成功，可以返回数据了  
            }).
            error(function(data, status, headers, config) {
                deferred.reject(data); // 声明执行失败，即服务器返回错误  
            });
            return deferred.promise; // 返回承诺，这里并不是最终数据，而是访问最终数据的API  
            // end query

        },

        refresh: function(latest) {
            var url = 'http://localhost:8070/news/getNewsCollectionRefresh?latest=' + latest;

            var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行  
            $http({
                method: 'GET',
                url: url
            }).
            success(function(data, status, headers, config) {
                deferred.resolve(data); // 声明执行成功，即http请求数据成功，可以返回数据了  
            }).
            error(function(data, status, headers, config) {
                deferred.reject(data); // 声明执行失败，即服务器返回错误  
            });
            return deferred.promise; // 返回承诺，这里并不是最终数据，而是访问最终数据的API  
            // end query
        },

        remove: function(news) {
            news.splice(news.indexOf(news), 1);
        },

        get: function(newsId) {

            var url = 'http://localhost:8070/news/getNewsDetail?newsId=' + newsId;

            var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行  
            $http({
                method: 'GET',
                url: url
            }).
            success(function(data, status, headers, config) {
                deferred.resolve(data); // 声明执行成功，即http请求数据成功，可以返回数据了  
            }).
            error(function(data, status, headers, config) {
                deferred.reject(data); // 声明执行失败，即服务器返回错误  
            });
            return deferred.promise; // 返回承诺，这里并不是最终数据，而是访问最终数据的API  
            // end query


            /*console.log(News);
            for (var i = 0; i < News.length; i++) {
                if (News[i].newsId === newsId) {
                    return News[i];
                }
            }
            return null;*/
        }
    };
})

.factory('Results', function() {
    var matches = [{
        id: 0,
        court: '甘井子区政府',
        record: [{
            id: 0,
            score: 1,
            face: 'img/ben.png',
            theme: 'red'
        }, {
            id: 1,
            score: 1,
            face: 'img/adam.jpg',
            theme: 'purple'
        }],
    }, {
        id: 1,
        court: '沙河口区政府',
        record: [{
            id: 0,
            score: 1,
            face: 'img/ben.png',
            theme: 'black'
        }, {
            id: 1,
            score: 1,
            face: 'img/adam.jpg',
            theme: 'blue'
        }]
    }, {
        id: 2,
        court: '高新园区政府',
        record: [{
            id: 0,
            score: 1,
            face: 'img/ben.png',
            theme: 'green'
        }, {
            id: 1,
            score: 1,
            face: 'img/adam.jpg',
            theme: '#6B46E5'
        }]
    }, {
        id: 3,
        court: '软件园',
        record: [{
            id: 0,
            score: 1,
            face: 'img/ben.png',
            theme: '#FFC900'
        }, {
            id: 1,
            score: 1,
            face: 'img/adam.jpg',
            theme: '#0A9DC7'
        }]
    }, {
        id: 4,
        court: '腾飞',
        record: [{
            id: 0,
            score: 1,
            face: 'img/ben.png',
            theme: '#16C70A'
        }, {
            id: 1,
            score: 1,
            face: 'img/adam.jpg',
            theme: '#0C60EE'
        }]
    }, {
        id: 5,
        court: '蓝宝',
        record: [{
            id: 0,
            score: 1,
            face: 'img/ben.png',
            theme: '#EF473A'
        }, {
            id: 1,
            score: 1,
            face: 'img/adam.jpg',
            theme: 'orange'
        }]
    }, {
        id: 6,
        court: '11中学',
        record: [{
            id: 0,
            score: 1,
            face: 'img/ben.png',
            theme: 'red'
        }, {
            id: 1,
            score: 1,
            face: 'img/adam.jpg',
            theme: 'red'
        }]
    }, {
        id: 7,
        court: '甘井子区政府',
        record: [{
            id: 0,
            score: 1,
            face: 'img/ben.png',
            theme: 'green'
        }, {
            id: 1,
            score: 1,
            face: 'img/adam.jpg',
            theme: 'green'
        }]
    }];
    return {
        all: function() {
            return matches;
        },
        get: function(id) {
            for (var i = 0; i < matches.length; i++) {
                if (matches[i].id === parseInt(id)) {
                    return matches[i];
                }
            }
            return null;
        }
    };
});
