var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

// 部屋一覧を取得
router.get('/list', function(req, res, next) {
  mongoose.model('Room')
    .find({})
    .select('title author')
    .exec(function(err, rooms) {
      res.send(rooms);
    });
});
// ログイン
router.post('/login', function(req, res, next) {
  mongoose.model('Room').findById(req.body.roomId, function(err, room) {
    console.log(room);
    if(room.password === req.body.pass) {
      req.session.room = room;
      res.send(true);
    }
    else {
      res.send(false);
    }
  });
})
// 部屋作成画面
router.get('/registration', function(req, res, next) {
  res.render('room/registration', { title: '部屋の作成' })
});
// 部屋の作成
router.post('/registration', function(req, res, next) {
  if(req.session.user) {
    var newRoom = new (mongoose.model('Room'))();
    // 送信されたデータを1つ1つコピーする
    for(var key in req.body) {
      newRoom[key] = req.body[key];
    }
    newRoom['author'] = req.session.user.userName;
    console.log(newRoom);
    newRoom.save(function(err) {
      if(err) {
        console.log(err);
        res.send(false);
      }
      else {
        res.send(true);
      }
    });
  }
  else {
    res.send(false);
  }
});

module.exports = router;