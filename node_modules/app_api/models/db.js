var mongoose = require("mongoose");
var dbURI = 'mongodb://localhost/mekanbul';
mongoose.connect(dbURI)
mongoose.connection.on("connected", function(){
    console.log(dbURI+" adresindeki veri tabanına bağlandı");
});
mongoose.connection.on("error", function(){
    console.log("Bağlantı sağlanamadı");
});
mongoose.connection.on("disconnected", function(){
    console.log("Bağlantı kesildi");
});

kapat = function(msg,callback){
    mongoose.connection.close(function(){
        console.log("Bağlantı kapatıldı:" +msg);
        callback();
});
process.on("SIGINT", function(){
    kapat("Uygulama kapatıldı", function(){
        process.exit(0);
    });
});
};

require("./venue")