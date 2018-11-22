var http=require("http");
var strs=require("querystring");
const url=require("url");
const fs = require("fs");
http.createServer(function (req,res) {
    var pathname = url.parse(req.url).pathname;
    if(pathname==="/regist"){
        var str = "";
        req.on("data", function (chunk) {
            str += chunk;
        });
        req.on("end", function () {
            res.writeHead(200, {"Content-Type": "text/plane", "Access-Control-Allow-Origin": "*"});
            var query = JSON.parse(str);
            fs.readFile("../json/list.json", function (err, results) {
                var arr = JSON.parse(results);
                let index = arr.findIndex(v => v.phone == query.phone);
                //console.log(index);
                if (index >= 0) {
                    res.end(JSON.stringify({
                        ok: 2,
                        msg: "手机号已经注册过了"
                    }))
                }else if (index === -1) {
                    arr.push(query);
                    //console.log(arr)
                    fs.writeFile("../json/list.json", JSON.stringify(arr), function (err) {
                        if (err) {
                            res.end(JSON.stringify({
                                ok: 3,
                                msg: "网络连接错误"
                            }))
                        } else {
                            res.end(JSON.stringify({
                                ok: 1,
                                msg: "注册成功"
                            }))
                        }
                    })
                }
            })
        })
    }
    else if(pathname==="/login"){
        let shr = "";
        // 接收数据。
        req.addListener("data", function (chunk) {
            shr += chunk;
        });
        req.addListener("end", function () {
            res.writeHead(200, {"Content-Type": "text/plane", "Access-Control-Allow-Origin": "*"});
            let query1 = JSON.parse(shr);
            fs.readFile("../json/list.json", function (err, results) {
                let arr = JSON.parse(results);
                let index = arr.findIndex(v => v.phone == query1.phone);
                //console.log(query1)
                if (index >= 0 && arr[index].pwd===query1.pwd) {
                    res.end(JSON.stringify({
                        ok: 1,
                        msg: "登录成功"
                    }))
                }
                else if (index === -1) {
                    res.end(JSON.stringify({
                        ok: 2,
                        msg: "手机号未注册"
                    }))

                }else if(arr[index].pwd!==query1.pwd){
                    res.end(JSON.stringify({
                        ok: 2,
                        msg: "密码错误"
                    }))
                }
            })

        })
    }
    else if(pathname==="/cun"){
        var str = "";
        req.on("data", function (chunk) {
            str += chunk;
        });
        req.on("end", function () {
            res.writeHead(200, {"Content-Type": "text/plane", "Access-Control-Allow-Origin": "*"});
            let query = JSON.parse(str);
            if(query.color/1===1){
                query.color ="黑色";
            }else if(query.color/1===2){
                query.color ="红色";
            }else if(query.color/1===3){
                query.color ="黄色";
            }
            query.id = Date.now();
            fs.readFile("../json/listshop.json", function (err, results) {
                let arr = JSON.parse(results);
                arr.push(query);
                fs.writeFile("../json/listshop.json", JSON.stringify(arr), function (err) {
                    if (err) {
                        res.end(JSON.stringify({
                            ok: 3,
                            msg: "添加失败"
                        }))
                    } else {
                        res.end(JSON.stringify({
                            ok: 1,
                            msg: "添加购物车成功"
                        }))
                    }
                })
            })
        })
    }
    else if(pathname ==="/select"){
        var str1 = "";
        req.on("data",function(chunk){
            str1+=chunk;
        })
        req.on("end",function(){
            res.writeHead(200, {"Content-Type": "text/plane", "Access-Control-Allow-Origin": "*"});
            let query2 = JSON.parse(str1);
            fs.readFile("../json/listshop.json",function(err,results){
                let arr2 = JSON.parse(results);
                let index = arr2.findIndex(v => v.id == query2.id);
                arr2[index].num = query2.typ/1;
                fs.writeFile("../json/listshop.json", JSON.stringify(arr2), function (err) {
                    if (err) {
                        res.end(JSON.stringify({
                            ok: 2,
                            msg: "添加失败"
                        }))
                    } else {
                        res.end(JSON.stringify({
                            ok: 1,
                            msg: arr2[index].price
                        }))
                    }
                })
            })
        })
    }
    else if(pathname==="/details"){
        let shr3 = "";
        // 接收数据。
        req.addListener("data", function (chunk) {
            shr3 += chunk;
        });
        req.addListener("end", function () {
            res.writeHead(200, {"Content-Type": "text/plane", "Access-Control-Allow-Origin": "*"});
            let query3 = JSON.parse(shr3);
            fs.readFile("../json/listshop.json", function (err, results) {
                let arr3 = JSON.parse(results);
                let index3 = arr3.findIndex(v => v.id == query3);
                arr3.splice(index3, 1);
                //console.log(arr3)
                fs.writeFile("../json/listshop.json", JSON.stringify(arr3), function (err) {
                    if (err) {
                        res.end(JSON.stringify({
                            ok: 2,
                            msg: "删除失败"
                        }))
                    } else {
                        res.end(JSON.stringify({
                            ok: 1,
                            msg: "删除成功"
                        }))
                    }
                })
            })
        })
    }
}).listen(3004,"10.9.42.230",function () {
    console.log("启动服务，开始侦听");
});