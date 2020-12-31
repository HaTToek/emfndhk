var express     =   require('express');
var router      =   express.Router();
var Contact     =   require('../models/Contact');

// Contacts - Index 
// 에러가 있다면 에러를 json 형태로 웹브라우저에 표시하고, 에러가 없다면 검색 결과를 받아 render
router.get('/', function(req, res){
    Contact.find({}, function(err, contacts){
      if(err) return res.json(err);
      res.render('contacts/index', {contacts:contacts});
    });
  });
  
  // Contacts - New 
  router.get('/new', function(req, res){
    res.render('contacts/new');
  });
  
  // Contacts - create
  router.post('/', function(req, res){
    Contact.create(req.body, function(err, contact){
      if(err) return res.json(err);
      res.redirect('/contacts');
    });
  });
  
  // Contact - show
  //"contacts:id"에 get 요청이 오는 경우
  //:id 처럼 route에 : 을 사용하면 해당 위치의 값을 받아 req.params에 넣게 됩니다.
  //예를 들어 "contact/abcd1234"가 입력되면 "contacts/:id" route에서 이를 받아 req.params.id에 "abcd1234"를 널게 된다
  router.get('/:id', function(req, res){
      Contact.findOne({_id:req.params.id}, function(err, contact){ //model.findOne은 DB에서 해당 model의 document를 하나 찾는 함수
          if(err) return res.json(err);
          res.render('contacts/show', {contact:contact});
      });
  });
  
  // Contact - edit
  //검색 결과를 받아 render 한다
  router.get('/:id/edit', function(req, res){
      Contact.findOne({_id:req.params.id}, function(err, contact){
          if(err) return res.json(err);
          res.render('contacts/edit',{contact:contact});
      });
  });
  
  // Contact - update
  //model.findOneAndUpdate는 DB에서 해당 model 의 문서를 하나 찾아 그 data를 수정하는 함수
  //첫 번째 parameter로 찾을 조건을 object로 입력하고 두 번째 parameter로 updata할 정보를 object로 입력 data를 찾은 후 callback 함수 호출
  router.put('/:id', function(req, res){
      Contact.findOneAndUpdate({_id:req.params.id}, req.body, function(err, contact){
          if(err) return res.json(err);
          res.redirect('/contacts/'+req.params.id);
      });
  });
  
  // Contact - destroy
  // model.deleteOne 은 DB에서 해당 model의 document를 하나 찾아 삭제하는 함수
  router.delete('/:id', function(req, res){
      Contact.deleteOne({_id:req.params.id}, function(err){
          if(err) return res.json(err);
          res.redirect('/contacts');
      });
  });
  
  module.exports    =   router;