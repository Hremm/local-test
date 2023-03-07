/**  定义User相关的接口 */
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const Response = require("../utils/Response.js");

// 引入mysql连接池
const pool = require("../utils/db.js");

const jwt = require('jsonwebtoken')
const SECRET_KEY = 'JWT_SECRET_KEY'

/**
 * 显示分页查询用户列表接口
 * @param:
 *  接口地址  /user
 * @return:
 *   {code: 200, data: r}
 */
router.get('/user',(req, res,next) => {
  // 获取请求参数   get请求的参数封装在req.query中 
  let {page, pagesize} = req.query 
    
  //TODO 服务端表单验证  如果验证通过那么继续后续业务  如果验证不通过，则直接返回参数异常
  let schema = Joi.object({
      page: Joi.number().required(),    // page必须是数字，必填
      pagesize: Joi.number().integer().required()   // pagesize必须是数字，必填
  });
  let {error, value} = schema.validate(req.query)
  if(error){
      res.send({code:400, error})
      return; // 结束
  }

  let startIndex = (page - 1) * pagesize;
  let size = parseInt(pagesize);
  // 分页查询
  let sql = "select * from user limit ?,?";
  pool.query(sql, [startIndex, size],(err,r)=>{
    if(err){
      return next(err)
    }
    // 总条数
    let sql2 = "select count(*) as count from user";
    pool.query(sql2, [startIndex, size],(err,z)=>{
      if(err){
        return next(err)
      }
      // page第几页 pagesize每页几条数据 total总数据数 users具体信息
      res.send({ page: parseInt(page), pagesize: size, total:z[0].count, users:r })
    });
  });
});

/**
   * 新增用户(注册)
 * @param:
 *   user_avatar:用户头像
 *   user_name:用户名
 *   password:密码
 *  接口地址 /user/register
 * @return:
 *   {code:200, msg:'ok'}
 */
     router.post('/user/register', (req, res, next) => {
      let obj = req.body
      //表单验证
      let { user_avatar,user_name,password} = obj
      //TODO 服务端表单验证  如果验证通过那么继续后续业务  如果验证不通过，则直接返回参数异常
      let schema = Joi.object({
          user_avatar: Joi.string().required(), // 必填
          user_name: Joi.string().required(), // 必填
          password:Joi.string().required()// 必填
      });
      let { error, value } = schema.validate(req.body);
      if (error) {
        res.send({ code: '400', error });
        return; // 结束
      }
      let sql = 'insert into user set user_avatar=?,user_name=?,password=MD5(?)'
      pool.query(sql, [user_avatar, user_name, password], (err, r) => {
        if (err) {
          return next(err)
        }
        if (r.affectedRows == 1) {
          res.send({ code: 200, msg: 'ok' })
        }
      })
    })

/**
 * 处理用户登录业务
 */
router.post("/user/login", (req, resp)=>{
  let{user_name, password} = req.body
  // 表单验证
  let schema = Joi.object({
    user_name: Joi.string().required().pattern(new RegExp('^\\w{3,15}$')), // 必填项
    password: Joi.string().required().pattern(new RegExp('^\\w{6,15}$')), // 必填项
  });
  let { error, value } = schema.validate(req.body);
  if (error) {
    resp.send(Response.error(400, error));
    return; // 结束
  }
  // 查询数据库，账号密码是否填写正确
  let sql = "select * from user where user_name=? and password=MD5(?)"
  pool.query(sql, [user_name, password], (error, result)=>{
    if (error) {
      resp.send(Response.error(500, error));
      throw error;
    }
    if(result.length==0){
      resp.send(Response.error(1001, '账号或密码输入错误'));
    }else{
      // 获取登录用户对象
      let user = result[0]
      // 为该用户颁发一个token字符串，未来该客户端若做发送其他请求，则需要在请求Header中携带token，完成状态管理。
      let payload = {id: user.id, user_name: user.user_name}
      let token = jwt.sign(payload, SECRET_KEY, {expiresIn: '1d'})
      // 返回user对象与token字符串
      user.password = undefined
      resp.send(Response.ok({user, token}));
    
    }
  })
});

// 将router对象导出
module.exports = router;
