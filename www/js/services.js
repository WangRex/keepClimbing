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
.factory('Results',function(){
  var matches = [{
    id: 0,
    court: '甘井子区政府',
    record: '1:0',
    face: 'img/ben.png'
  },{
    id: 1,
    court: '沙河口区政府',
    record: '1:1',
    face: 'img/ben.png'
  },{
    id: 2,
    court: '高新园区政府',
    record: '3:0',
    face: 'img/ben.png'
  },{
    id: 3,
    court: '软件园',
    record: '1:2',
    face: 'img/ben.png'
  },{
    id: 4,
    court: '腾飞',
    record: '1:0',
    face: 'img/ben.png'
  },{
    id: 5,
    court: '蓝宝',
    record: '1:4',
    face: 'img/ben.png'
  },{
    id: 6,
    court: '11中学',
    record: '1:3',
    face: 'img/ben.png'
  },{
    id: 7,
    court: '甘井子区政府',
    record: '1:5',
    face: 'img/ben.png'
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
