var mongoose        =   require('mongoose');

// DB schema 
var contactSchema   = mongoose.Schema({
    name:{type:String, required:true, unique:true}, //required 필수 입력을 말한다, unique는 값의 중복을 의미한다.
    email:{type:String},
    phone:{type:String}
});
var Contact         = mongoose.model('contact', contactSchema); // 5
 
module.exports      =   Contact;