"use strict";(self["webpackChunkdsk_ms_client"]=self["webpackChunkdsk_ms_client"]||[]).push([[553],{8553:function(e,t,n){n.r(t),n.d(t,{default:function(){return v}});var a=function(){var e=this,t=e._self._c;return t("div",[t("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0},nativeOn:{submit:function(e){e.preventDefault()}}},[t("el-form-item",{attrs:{label:"姓名"}},[t("el-input",{attrs:{placeholder:"请输入姓名关键字"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.search.apply(null,arguments)}},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}})],1),t("el-form-item",[t("el-button",{attrs:{type:"primary"},on:{click:e.search}},[e._v("查询")])],1)],1),t("el-divider",{attrs:{"content-position":"left"}},[e._v("作者列表")]),e._l(e.authors,(function(n){return t("person",{key:n.id,attrs:{name:n.author_name,avatar:n.author_avatar},on:{del:function(t){return e.deleteAuthor(n.id)}}})}))],2)},s=[],r=function(){var e=this,t=e._self._c;return t("div",{staticClass:"person"},[t("img",{attrs:{src:e.avatar}}),t("p",[e._v(e._s(e.name))]),t("i",{staticClass:"el-icon-error",on:{click:e.deletePerson}})])},i=[],o={props:["name","avatar"],methods:{deletePerson(){this.$emit("del")}}},l=o,u=n(1001),c=(0,u.Z)(l,r,i,!1,null,"8e513b02",null),h=c.exports,m=n(3479),d={components:{Person:h},data(){return{authors:[],name:""}},mounted(){this.init()},methods:{deleteAuthor(e){console.log("在父组件中 捕获到了用户点了叉子:id="+e),this.$confirm("此操作将永久删除该作者, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{m.Z.authorAPI.del({id:e}).then((e=>{console.log("删除作者结果",e),200==e.data.code&&this.search()})),this.$message({type:"success",message:"删除成功!"})})).catch((()=>{this.$message({type:"info",message:"已取消删除"})}))},search(){if(this.name.trim()){let e={name:this.name};m.Z.authorAPI.queryByNameLike(e).then((e=>{console.log("查询到的作者列表如下",e),this.authors=e.data.data}))}else this.init()},init(){m.Z.authorAPI.queryAllAuthor().then((e=>{console.log("加载作者列表结果",e),this.authors=e.data.data}))}}},f=d,p=(0,u.Z)(f,a,s,!1,null,"7aaafdb3",null),v=p.exports}}]);
//# sourceMappingURL=553.bcc6b086.js.map