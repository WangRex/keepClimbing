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

.factory('News', function($http) {
    // Might use a resource here that returns a JSON array

    return {
        all: function(message) {

            $http.get('http://localhost:8070/news/getNewsCollection', message, {}).success(function(response) {
                var news = response;
                console.log(news);
                return news;
            }).error(function() {});

        },
        remove: function(news) {
            news.splice(news.indexOf(news), 1);
        },
        get: function(newsId) {
            for (var i = 0; i < news.length; i++) {
                if (news[i].id === parseInt(newsId)) {
                    return news[i];
                }
            }
            return null;
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
