/**  定义书房相关的接口 */
//删除书房,通过id查询书房,查询所有书房,查询所有书房类型,添加书房,修改书房
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const Response = require("../utils/Response.js");

// 引入mysql连接池
const pool = require("../utils/db.js");

/**
 * 删除书房接口
 * @param:
 *   id:   书房id
 * @return:
 *   {code:200, msg:'ok'}
 */
 router.post("/book_store/del", (req, resp) => {
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
  let sql = "delete from book_store where id = ?";
  pool.query(sql, [id], (error, result) => {
    if (error) {
      resp.send(Response.error(500, error));
      throw error;
    }
    resp.send(Response.ok());
  });
});

/**
 * 通过ID查询书房接口
 * @param:
 *   id:   书房id
 * @return:
 *   {code:200, msg:'ok', data:{}}
 */
 router.get("/book_store/query", (req, resp) => {
  let { id } = req.query;
  // 表单验证
  let schema = Joi.object({
    id: Joi.string().required(), // 必填
  });
  let { error, value } = schema.validate(req.query);
  if (error) {
    resp.send(Response.error(400, error));
    return; // 结束
  }

  // 执行查询业务
  let sql = "select * from book_store where id=?";
  pool.query(sql, [id], (error, result) => {
    if (error) {
      resp.send(Response.error(500, error));
      throw error;
    }
    if (result && result.length == 0) {
      // 没查到
      resp.send(Response.ok(null));
    } else {
      resp.send(Response.ok(result[0]));
    }
  });
});

/**
 * 查询所有书房
 * @param:
 *   无
 * @return:
 *   {code:200, msg:'ok', data:[{}]}
 */
router.get('/book_stores', (req, resp)=>{
  let sql ="select * from book_store"
  pool.query(sql, (error, result)=>{
    if(error){
      resp.send(Response.error(500, error))
      throw error;
    }
    resp.send(Response.ok(result))
  })
})


/**
 * 查询所有书房的类型
 * @param:
 *   无
 * @return:
 *   {code:200, msg:'ok', data:[{}]}
 */
router.get('/book_store/types', (req,resp)=>{
  let sql = "select * from book_store_type"
  pool.query(sql, (error, result)=>{
    if (error) {
      resp.send(Response.error(500, error));
      throw error;
    }
    resp.send(Response.ok(result));
  })
})

/**
 * 添加书房接口
 * @param:
 *   详见接口文档
 * @return:
 *   {code:200, msg:'ok'}
 */
router.post("/book_store/add", (req, resp) => {
  let {
    bookstore_name,
    address,
    province,
    city,
    district,
    longitude,
    latitude,
    types,
  } = req.body; // post请求参数在req.body中

  // 表单验证
  let schema = Joi.object({
    bookstore_name: Joi.string().required(),
    address: Joi.string().required(),
    province: Joi.string().required(),
    city: Joi.string().required(),
    district: Joi.string().required(),
    longitude: Joi.number().required(),
    latitude: Joi.number().required(),
    types: Joi.string().required(),
  });
  let { error, value } = schema.validate(req.body);
  if (error) {
    resp.send(Response.error(400, error));
    return; // 结束
  }

  // 表单验证通过，执行添加操作
  let sql = `insert into book_store (
      bookstore_name,
      address,
      province,
      city,
      district,
      longitude,
      latitude,
      types) values (?,?,?,?,?,?,?,?)`;
  pool.query(
    sql,
    [bookstore_name, address, province, city, district, longitude, latitude, types],
    (error, result) => {
      if (error) {
        resp.send(Response.error(500, error));
        throw error;
      }
      resp.send(Response.ok());
    }
  );
});

/**
 * 修改书房接口
 * @param:
 *   详见接口文档
 * @return:
 *   {code:200, msg:'ok'}
 */
 router.post("/book_store/update", (req, resp) => {
  let {
    id,
    bookstore_name,
    address,
    province,
    city,
    district,
    longitude,
    latitude,
    types,
  } = req.body; // post请求参数在req.body中

  // 表单验证
  let schema = Joi.object({
    id: Joi.string().required(),
    bookstore_name: Joi.string().required(),
    address: Joi.string().required(),
    province: Joi.string().required(),
    city: Joi.string().required(),
    district: Joi.string().required(),
    longitude: Joi.number().required(),
    latitude: Joi.number().required(),
    types: Joi.string().required(),
  });
  let { error, value } = schema.validate(req.body);
  if (error) {
    resp.send(Response.error(400, error));
    return; // 结束
  }

  // 表单验证通过，执行添加操作
  let sql = `update book_store set 
      bookstore_name=?, 
      address=?, 
      province=?, 
      city=?, 
      district=?, 
      longitude=?, 
      latitude=?, 
      types=?
    where id=?`;
  pool.query(
    sql,
    [bookstore_name, address, province, city, district, longitude, latitude, types, id],
    (error, result) => {
      if (error) {
        resp.send(Response.error(500, error));
        throw error;
      }
      resp.send(Response.ok());
    }
  );
});


// 将router对象导出
module.exports = router;
