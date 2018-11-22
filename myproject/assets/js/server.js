var http=require("http");
var strs=require("querystring");
const url=require("url");
const fs = require("fs");
http.createServer(function (req,res) {
    var pathname = url.parse(req.url).pathname;

}).listen(3004,"10.9.42.230",function () {
    console.log("启动服务，开始侦听");
});