var express     =   require('express'); // 설치한 express module을 불러와서 변수(express)에 담습니다.
var app         =   express(); //express를 실행하여 app object를 초기화 합니다.
var mongoose    =   require('mongoose');
var bodyParser  =   require('body-parser');
var methodOverride  =   require('method-override');//method-override module을 변수에 담는다

// DB setting
mongoose.set('useNewUrlParser', true);    
mongoose.set('useFindAndModify', false);  
mongoose.set('useCreateIndex', true);     
mongoose.set('useUnifiedTopology', true);
let url         =  "mongodb://localhost:27017/node_st";
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection; 
db.once('open', function(){//db가 연결이 된 경우
    console.log('DB connected');
});
db.on('error', function(err){//db 연결 중 에러가 발생한 경우 
    console.log('DB ERROR : ', err);
});

// Other settings
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended:true})); //bodyParser을 사용하기 위한 코드 form으로 입력받은 데이터가 bodyParser을 통해 req.body로 생성
app.use(methodOverride('_method')); //query로 들어오는 값으로 HTTP method를 바꾼다

// Router
app.use('/',require('./routes/home'));
app.use('/contacts',require('./routes/contacts'));

// Port setting
var port = 3000; // 사용할 포트 번호를 port 변수에 넣습니다. 
app.listen(port, function(){ // port변수를 이용하여 3000번 포트에 node.js 서버를 연결합니다.
  console.log('server on! http://localhost:'+port); //서버가 실행되면 콘솔창에 표시될 메세지입니다.
});