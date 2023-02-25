/**  定义图书作者相关的接口 */
//删除作者,新增作者,查询作者列表,通过姓名关键字查询作者
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const Response = require("../utils/Response.js");

// 引入mysql连接池
const pool = require("../utils/db.js");

/**
 * 删除作者接口
 * @param:
 *   id:   作者id
 * @return:
 *   {code:200, msg:'ok'}
 */
router.post("/book_author/del", (req, resp) => {
  let { id } = req.body;

  // 表单验证
  let schema = Joi.object({
    id: Joi.string().required(), // 必填
  });
  let { error, value } = schema.validate(req.body);
  if (error) {
    resp.send(Response.error(400, error));
    return; // 结束
  }

  // 执行删除业务
  let sql = "delete from book_author where id = ?";
  pool.query(sql, [id], (error, result) => {
    if (error) {
      resp.send(Response.error(500, error));
      throw error;
    }
    resp.send(Response.ok());
  });
});

/**
 * 添加作者接口
 * @param:
 *   authorName:   作者名字
 *   authorAvatar: 作者头像路径
 * @return:
 *   {code:200, msg:'ok'}
 */
router.post("/book_author/add", (req, resp) => {
  let { author_name, author_avatar } = req.body; // post请求参数在req.body中

  // 表单验证
  let schema = Joi.object({
    author_name: Joi.string().required(), // 必填
    author_avatar: Joi.string().required(), // 必填
  });
  let { error, value } = schema.validate(req.body);
  if (error) {
    resp.send(Response.error(400, error));
    return; // 结束
  }

  // 表单验证通过，执行添加操作
  let sql = "insert into book_author (author_name, author_avatar) values (?,?)";
  pool.query(sql, [author_name, author_avatar], (error, result) => {
    if (error) {
      resp.send(Response.error(500, error));
      throw error;
    }
    resp.send(Response.ok());
  });
});

/**
 * 模糊查询符合演员名称要求的接口
 * @param:
 *   name:作者名字
 * @returns:
 *   {code:200, msg:'ok', data:[{作者Obj},{作者Obj},{作者Obj}]}
 */
router.post("/book_authors/name", (req, resp) => {
  let { name } = req.body;
  //TODO 服务端表单验证  如果验证通过那么继续后续业务  如果验证不通过，则直接返回参数异常
  let schema = Joi.object({
    name: Joi.string().required(), // 必填
  });
  let { error, value } = schema.validate(req.body);
  if (error) {
    resp.send(Response.error(400, error));
    return; // 结束
  }
  // 执行模糊查询
  let sql = "select * from book_author where author_name like ?";
  pool.query(sql, [`%${name}%`], (err, result) => {
    if (err) {
      resp.send(Response.error(500, error));
      throw err;
    }
    // 将结果封装，返回给客户端
    resp.send(Response.ok(result));
  });
});



/**
 * 查询所有作者接口
 * @param:
 *   page: 1       当前页码
 *   pagesize: 10  每页条目数
 * @returns:
 *   {code:200, msg:'ok', data:[{作者Obj},{作者Obj},{作者Obj}]}
 */

router.get("/book_authors", (req, resp) => {
  // 获取请求参数   get请求的参数封装在req.query中
  let { page, pagesize } = req.query;

  //TODO 服务端表单验证  如果验证通过那么继续后续业务  如果验证不通过，则直接返回参数异常
  let schema = Joi.object({
    page: Joi.number().required(), // page必须是数字，必填
    pagesize: Joi.number().integer().required() // pagesize必须是不大于100的数字，必填
  });
  let { error, value } = schema.validate(req.query);
  if (error) {
    resp.send(Response.error(400, error));
    return; // 结束
  }

  // 查询数据库，book_author
  let startIndex = (page - 1) * pagesize;
  let size = parseInt(pagesize);
  let sql = "select * from book_author limit ?,?";
  pool.query(sql, [startIndex, size], (err, result) => {
    if (err) {
      resp.send(Response.error(500, error));
      throw err;
    }
    // 将结果封装，返回给客户端
    resp.send(Response.ok(result));
  });
});

// 将router对象导出
module.exports = router;
