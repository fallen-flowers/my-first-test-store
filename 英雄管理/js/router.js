const express = require("express");
const formidable = require("formidable");
const path = require("path");
// 获取路由对象
const router = express.Router();
const model = require("./model");
// 设置允许跨域请求
router.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  // 设置完请求头后,交给后续的中间件处理
  next();
});
// 1.查询数据信息
router.get("/getHeroList", (req, res) => {
  model.getHeroList((err, data) => {
    if (err) {
      // 报错
      res.json({ code: -1, msg: err });
    } else {
      // 返回数据
      res.json({ code: 200, data });
    }
  });
});
// 2.增加数据信息
// 2.1.增加数据信息
router.post("/addHero", (req, res) => {
  // 获取到post请求到的参数
  // 需要中间件body-parser
  const { name, gender,img } = req.body;
  model.addHero(name, gender, img, (err, data) => {
    if (err) {
      res.json({ code: -1, msg: "新增失败" });
    } else {
      res.json({ code: 200, msg: "新增成功" });
    }
  });
});
// 2.2.头像的上传
router.post("/uploadFile", (req, res) => {
  // console.log(req.body); //{}
  // 利用第三方库formidable上传图片
  const form = formidable({
    // 设置上传目录
    uploadDir: path.join(__dirname, "../upload"),
    // 保存上传文件的后缀
    keepExtensions: true,
  });
  form.parse(req, (err, fields, files) => {
    const filePath = files.avatar.path;
    // console.log(filePath);
    // 截取文件名
    const fileName = path.basename(filePath);
    res.json({ code: 0, src: fileName });
  });
});
// 3.删除数据信息
router.get("/delHeroById", (req, res) => {
  // console.log(req.query); //{id:1}
  const { id } = req.query;
  model.deleteHeroById(id, (err, data) => {
    if (err) {
      res.json({ code: -1, msg: "删除失败" });
    } else {
      res.json({ code: 200, msg: "删除成功" });
    }
  });
});
//4.修改数据信息
//4.1.通过英雄id获取数据
router.get("/getHeroById", (req, res) => {
  const { id } = req.query;
  model.getHeroById(id, (err, data) => {
    if (err) {
      res.json({ code: -1, msg: "获取信息失败" });
    } else {
      // console.log(data);
      // console.log(data[0]);
      res.json({ code: 200, data: data[0] });
    }
  });
});
//4.2.修改数据信息
router.post("/updateHero", (req, res) => {
  const { name, gender, img, id } = req.body;
  model.updateHero(id, name, gender, img, (err, data) => {
    if (err) {
      res.json({ code: -1, msg: "更新失败" });
    } else {
      res.json({ code: 200, msg: "更新成功" });
    }
  });
});
// 导出路由对象
module.exports = router;
