// 引入数据库操作第三方库
const mysql = require("mysql");
// 创建连接对象
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "zhang",
  database: "space",
});
// 连接数据库
connection.connect();
// 查询信息
const getHeroList = (callback) => {
  connection.query("select * from heros", callback);
};
//新增信息
const addHero = (name, gender, img, callback) => {
  connection.query(
    "insert into heros (name,gender, img) values (?,?,?,?)",
    [name, gender, img],
    callback
  );
};
// 删除信息
const deleteHeroById = (id, callback) => {
  connection.query("delete from heros where id = ?", [id], callback);
};
//修改信息
//
const getHeroById = (id, callback) => {
  connection.query("select * from heros where id=?", [id], callback);
};
const updateHero = (id, name, gender, img, callback) => {
  connection.query(
    "update heros set gender= ?,name= ?,img= ?where id= ?",
    [gender, name, img, id],
    callback
  );
};

// 暴露出来
module.exports = {
  getHeroList,
  addHero,
  deleteHeroById,
  getHeroById,
  updateHero,
};
