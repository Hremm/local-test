"use strict";(self["webpackChunkdsk_ms_client"]=self["webpackChunkdsk_ms_client"]||[]).push([[511],{5511:function(a,e,r){r.r(e),r.d(e,{default:function(){return c}});var t=function(){var a=this,e=a._self._c;return e("div",[e("el-form",{ref:"form",staticStyle:{width:"600px"},attrs:{model:a.form,rules:a.rules,"label-width":"100px"}},[e("el-form-item",{attrs:{label:"作者姓名",prop:"author_name"}},[e("el-input",{model:{value:a.form.author_name,callback:function(e){a.$set(a.form,"author_name",e)},expression:"form.author_name"}})],1),e("el-form-item",{attrs:{label:"选择头像",prop:"author_avatar"}},[e("el-upload",{staticClass:"avatar-uploader",attrs:{action:`${a.uploadURL}/upload`,"show-file-list":!1,"on-success":a.handleAvatarSuccess,"before-upload":a.beforeAvatarUpload}},[a.form.author_avatar?e("img",{staticClass:"avatar",attrs:{src:a.form.author_avatar}}):e("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),e("el-form-item",[e("el-button",{attrs:{type:"primary"},on:{click:function(e){return a.submit()}}},[a._v("立即新增")]),e("el-button",{on:{click:function(e){return a.cancelExpert("form")}}},[a._v("取消")])],1)],1)],1)},s=[],o=r(3479),l={data(){return{form:{author_name:"",author_avatar:""},rules:{author_name:[{required:!0,message:"作者姓名不能为空",trigger:"blur"}],author_avatar:[{required:!0,message:"请选择一张头像",trigger:"blur"}]}}},methods:{cancelExpert(a){this.$refs[a].resetFields()},submit(){this.$refs["form"].validate((a=>{a&&o.Z.authorAPI.add(this.form).then((a=>{console.log("添加作者结果",a),200==a.data.code?this.$message.success("恭喜，添加成功"):this.$message.error("添加失败，稍后重试"),this.$refs["form"].resetFields()}))}))},handleAvatarSuccess(a,e){console.log(a),this.form.author_avatar=a.data},beforeAvatarUpload(a){const e="image/jpeg"===a.type,r=a.size/1024/1024<2;return e||this.$message.error("上传头像图片只能是 JPG 格式!"),r||this.$message.error("上传头像图片大小不能超过 2MB!"),e&&r}}},u=l,i=r(1001),n=(0,i.Z)(u,t,s,!1,null,"517d7d70",null),c=n.exports}}]);
//# sourceMappingURL=511.8041451e.js.map