const mongoose=require('mongoose')
mongoose.connect("mongodb://localhost:27017/baza",{useNewUrlParser:true,useUnifiedTopology:true},function(err){
    if(!err){
        console.log('db connected');
    }else{
        console.log('db error')
    }
});
