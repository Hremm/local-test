/**  定义图书详情相关的接口 */
// 添加图书,查询图书类型,通过类别id查询图书,查询所有图书,模糊查询图书,通过id查询图书,删除图书,修改图书信息
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const Response = require("../utils/Response.js");

// 引入mysql连接池
const pool = require("../utils/db.js");

/**
 * 添加图书接口
 * @param:
 *   详见接口文档
 * @return:
 *   {code:200, msg:'ok'}
 */
router.post("/book_details/add", (req, resp) => {
  let {
    type_id,
    cover,
    title,
    type,
    author_name,
    publish_date,
    score,
    description,

  } = req.body; // post请求参数在req.body中

  // 表单验证
  let schema = Joi.object({
    type_id: Joi.number().required(),
    cover: Joi.string().required(),
    title: Joi.string().required(),
    type: Joi.string().required(),
    author_name: Joi.string().required(),
    publish_date: Joi.string().required(),
    score: Joi.string().required(),
    description: Joi.string().required(),

  });
  let { error, value } = schema.validate(req.body);
  if (error) {
    resp.send(Response.error(400, error));
    return; // 结束
  }

  // 表单验证通过，执行添加操作
  let sql = `insert into book_details 
        (type_id,cover, title, type,author_name ,publish_date, score, description) 
            values 
        (?,?,?,?,?,?,?,?)`;
  pool.query(
    sql,
    [
      type_id,
      cover,
      title,
      type,
      author_name,
      publish_date,
      score,
      description,

    ],
    (error, result) => {
      if (error) {
        resp.send(Response.error(500, error));
        throw error;
      } else {
        resp.send(Response.ok());
      }
      // 获取当前添加图书的ID，并新增book_desc表
      // let insertId = result.insertId
      // let sql2 = 'insert into book_desc (bid, description) values (?, ?)';
      // pool.query(sql2, [insertId, description], (error2, result2) => {
      //   if (error2) {
      //     resp.send(Response.error(500, error2));
      //     throw error2;
      //   }
      //   
      // })
    }
  );
});

/**
 * 查询所有的图书类型
 * @param:
 *   详见接口文档
 * @return:
 *   {code:200, msg:'ok', data:[]}
 */
router.get("/book_type", (req, resp) => {
  let sql = "select * from book_type";
  pool.query(sql, (error, result) => {
    if (error) {
      resp.send(Response.error(500, error));
      throw error;
    }
    resp.send(Response.ok(result));
  });
});

/**
 * 通过类别ID查询所有图书
 * @param:
 *   详见接口文档
 * @return:
 *   {code:200, msg:'ok', data:[]}
 */
router.get("/book_details/type", async (req, resp) => {
  // 获取请求参数   get请求的参数封装在req.query中
  let { page, pagesize, id } = req.query;

  //TODO 服务端表单验证  如果验证通过那么继续后续业务  如果验证不通过，则直接返回参数异常
  let schema = Joi.object({
    id: Joi.number().required(), // id必须是数字，必填
    page: Joi.number().required(), // page必须是数字，必填
    pagesize: Joi.number().integer().max(100).required(), // pagesize必须是不大于100的数字，必填
  });
  let { error, value } = schema.validate(req.query);
  if (error) {
    resp.send(Response.error(400, error));
    return; // 结束
  }

  // 执行查询数组业务
  try {
    id = parseInt(id);
    let startIndex = (page - 1) * pagesize;
    let size = parseInt(pagesize);
    let sql = "select * from book_details where type_id=? limit ?,?";
    console.log(`------------------------select * from movie_info where type_id=${id} limit ${startIndex},${size}---------------------------`)
    let result = await pool.querySync(sql, [id, startIndex, size]);
    // 执行查询总条目数
    let sql2 = "select count(*) as count from book_details where type_id=?";
    let result2 = await pool.querySync(sql2, [id]);
    let total = result2[0].count;
    resp.send(
      Response.ok({ page: parseInt(page), pagesize: size, total, result })
    );
  } catch (error) {
    resp.send(Response.error(error));
  }
});


/**
 * 查询所有图书
 * @param:
 *   详见接口文档
 * @return:
 *   {code:200, msg:'ok', data:[]}
 */
router.get("/book_details", async (req, resp) => {
  // 获取请求参数   get请求的参数封装在req.query中
  let { page, pagesize } = req.query;

  //TODO 服务端表单验证  如果验证通过那么继续后续业务  如果验证不通过，则直接返回参数异常
  let schema = Joi.object({
    page: Joi.number().required(), // page必须是数字，必填
    pagesize: Joi.number().integer().max(100).required(), // pagesize必须是不大于100的数字，必填
  });
  let { error, value } = schema.validate(req.query);
  if (error) {
    resp.send(Response.error(400, error));
    return; // 结束
  }

  // 执行查询数组业务
  try {
    let startIndex = (page - 1) * pagesize;
    let size = parseInt(pagesize);
    let sql = "select * from book_details limit ?,?";
    let result = await pool.querySync(sql, [startIndex, size]);
    // 执行查询总条目数
    let sql2 = "select count(*) as count from book_details";
    let result2 = await pool.querySync(sql2, [startIndex, size]);
    let total = result2[0].count;
    resp.send(
      Response.ok({ page: parseInt(page), pagesize: size, total, result })
    );
  } catch (error) {
    resp.send(Response.error(error));
  }
});

/**
 * 通过图书名称关键字模糊查询所有图书
 * @param:
 *   详见接口文档 {name:xx, page:1, pagesize:10}
 * @return:
 *   {code:200, msg:'ok', data:[]}
 */
router.post("/book_details/name", async (req, resp) => {
  // 获取请求参数   get请求的参数封装在req.query中
  let { name, page, pagesize } = req.body;

  //TODO 服务端表单验证  如果验证通过那么继续后续业务  如果验证不通过，则直接返回参数异常
  let schema = Joi.object({
    name: Joi.string().required(), // name必须是数字，必填
    page: Joi.number().required(), // page必须是数字，必填
    pagesize: Joi.number().integer().max(100).required(), // pagesize必须是不大于100的数字，必填
  });
  let { error, value } = schema.validate(req.body);
  if (error) {
    resp.send(Response.error(400, error));
    return; // 结束
  }

  // 执行查询数组业务
  try {
    let startIndex = (page - 1) * pagesize;
    let size = parseInt(pagesize);
    let sql = "select * from book_details where title like ? limit ?,?";
    let result = await pool.querySync(sql, [`%${name}%`, startIndex, size]);
    // 执行查询总条目数
    let sql2 = "select count(*) as count from book_details where title like ?";
    let result2 = await pool.querySync(sql2, [`%${name}%`]);
    let total = result2[0].count;
    resp.send(
      Response.ok({ page: parseInt(page), pagesize: size, total, result })
    );
  } catch (error) {
    resp.send(Response.error(error));
  }
});


/**
 * 删除图书接口
 * @param:
 *   bid:   图书id
 * @return:
 *   {code:200, msg:'ok'}
 */
router.post("/book_details/del", (req, resp) => {
  let { bid } = req.body;

  // 表单验证
  let schema = Joi.object({
    bid: Joi.string().required(), // 必填
  });
  let { error, value } = schema.validate(req.body);
  if (error) {
    resp.send(Response.error(400, error));
    return; // 结束
  }

  // 执行删除业务
  let sql = "delete from book_details where bid = ?";
  pool.query(sql, [bid], (error, result) => {
    if (error) {
      resp.send(Response.error(500, error));
      throw error;
    } else {
      resp.send(Response.ok());
    }
    // pool.query('delete from book_desc where bookId=?', [id], (error2, result2) => {
    //   if (error2) {
    //     resp.send(Response.error(500, error2));
    //     throw error2;
    //   }
    //   
    // })
  });
});

/**
 * 通过ID查询图书接口
 * @param:
 *   bid:   图书bid
 * @return:
 *   {code:200, msg:'ok', data:{}}
 */
router.get("/book_details/query", (req, resp) => {
  let { bid } = req.query;
  // 表单验证
  let schema = Joi.object({
    bid: Joi.string().required(), // 必填
  });
  let { error, value } = schema.validate(req.query);
  if (error) {
    resp.send(Response.error(400, error));
    return; // 结束
  }

  // 执行查询业务
  let sql = `select 
              mi.bid bid,
              mi.type_id type_id,
              mi.cover cover,
              mi.title title,
              mi.type type,
              mi.author_name author_name,
              mi.publish_date publish_date,
              mi.score score,
              mi.description description
            from book_details mi where mi.bid=? LIMIT 0,1;`;
  pool.query(sql, [bid], (error, result) => {
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
 * 更新图书信息接口
 * @param:
 *   详见接口文档
 * @return:
 *   {code:200, msg:'ok'}
 */
router.post("/book_details/update", (req, resp) => {
  let {
    bid,
    type_id,
    cover,
    title,
    type,
    author_name,
    publish_date,
    score,
    description,

  } = req.body; // post请求参数在req.body中

  // 表单验证
  let schema = Joi.object({
    bid: Joi.string().required(),
    type_id: Joi.number().required(),
    cover: Joi.string().required(),
    title: Joi.string().required(),
    type: Joi.string().required(),
    author_name: Joi.string().required(),
    publish_date: Joi.string().required(),
    score: Joi.string().required(),
    description: Joi.string().required(),
  });
  let { error, value } = schema.validate(req.body, { allowUnknown: true });
  if (error) {
    resp.send(Response.error(400, error));
    return; // 结束
  }

  // 表单验证通过，执行更新电影信息操作
  let sql = `update book_details set type_id=?, cover=?, title=?, type=?, author_name=?, publish_date=?, score=?, description=?  where bid=?`;
  pool.query(
    sql,
    [

      type_id,
      cover,
      title,
      type,
      author_name,
      publish_date,
      score,
      description,
      bid
    ],
    (error, result) => {
      if (error) {
        resp.send(Response.error(500, error));
        throw error;
      } else { resp.send(Response.ok()); }
      // 修改基本信息成功，将简介更新到movie_desc表
      // pool.query('update book_desc set description=? where bookId=?', [description, id], (error2, result2) => {
      //   if (error2) {
      //     resp.send(Response.error(500, error2));
      //     throw error2;
      //   }

      // })

    }
  );
});

// 将router对象导出
module.exports = router;
