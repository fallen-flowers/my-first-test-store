// 思路要清晰,gogogo!
// 1.引入第三方库
const express = require("express");
const bodyParse = require("body-parser");
const router = require("./router");
// 初始化express
const app = express();
//2. 设置静态资源访问目录(注意路径问题)
app.use(express.static("../public"));
app.use(express.static("../upload"));
app.use(bodyParse.urlencoded());
//使用路由
app.use(router);
// 3.监听端口
app.listen(3001, (err) => {
  if (!err) {
    console.log("服务器启动成功,地址是http://127.0.0.1:3001/");
  }
});
