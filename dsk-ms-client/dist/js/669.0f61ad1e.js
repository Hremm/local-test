"use strict";(self["webpackChunkdsk_ms_client"]=self["webpackChunkdsk_ms_client"]||[]).push([[669],{4669:function(e,t,a){a.r(t),a.d(t,{default:function(){return u}});a(7658);var o=function(){var e=this,t=e._self._c;return t("div",[t("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0},nativeOn:{submit:function(e){e.preventDefault()}}},[t("el-form-item",{attrs:{label:"图书名称"}},[t("el-input",{attrs:{placeholder:"请输入书名关键字"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.submit.apply(null,arguments)}},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}})],1),t("el-form-item",[t("el-button",{attrs:{type:"primary"},on:{click:e.submit}},[e._v("查询")])],1)],1),t("el-divider",{attrs:{"content-position":"left"}},[e._v("图书列表")]),t("el-table",{attrs:{data:e.bookData.result}},[t("el-table-column",{attrs:{label:"图书封面"},scopedSlots:e._u([{key:"default",fn:function(e){return[t("img",{attrs:{src:e.row.cover,width:"55px"}})]}}])}),t("el-table-column",{attrs:{label:"图书名称",prop:"title"}}),t("el-table-column",{attrs:{align:"center",label:"作者",prop:"author_name"}}),t("el-table-column",{attrs:{align:"center",label:"发布日期",width:"120px",prop:"publish_date"}}),t("el-table-column",{attrs:{label:"评分",align:"center",width:"80px",prop:"score"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.score)+" 分")]}}])}),t("el-table-column",{attrs:{label:"所属类别",prop:"type",align:"center"}}),t("el-table-column",{attrs:{label:"操作",width:"180px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(a){return[t("el-button",{attrs:{size:"small",type:"warning",icon:"el-icon-edit",circle:""},on:{click:function(t){return e.$router.push("/home/book-update/"+a.row.bid)}}}),t("el-button",{attrs:{size:"small",type:"danger",icon:"el-icon-delete",circle:""},on:{click:function(t){return e.del(a.row.bid)}}})]}}])})],1),t("el-pagination",{attrs:{background:"","page-size":e.bookData.pagesize,"current-page":e.bookData.page,layout:"->,total,prev, pager, next,jumper",total:e.bookData.total},on:{"current-change":e.changeCurrentPage}})],1)},n=[],l=a(3479),r={data(){return{name:"",bookData:{page:1,pagesize:10,total:0,result:[]}}},methods:{submit(){this.bookData.page=1,this.search()},search(){this.name.trim()?this.queryBookByName():this.queryBook()},changeCurrentPage(e){this.bookData.page=e,this.search()},queryBook(){let e={page:this.bookData.page,pagesize:this.bookData.pagesize};l.Z.bookAPI.queryAll(e).then((e=>{console.log("首页图书数据列表",e),this.bookData=e.data.data}))},queryBookByName(){let e={name:this.name,page:this.bookData.page,pagesize:this.bookData.pagesize};l.Z.bookAPI.queryByNameLike(e).then((e=>{console.log("模糊查询图书数据列表",e),this.bookData=e.data.data}))},del(e){console.log("点击了删除",e),this.$confirm("此操作将永久删除该图书, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{l.Z.bookAPI.del({bid:e}).then((e=>{console.log("删除成功了,删除的结果如下",e),200==e.data.code&&(this.search(),this.$message({type:"success",message:"删除成功!"}))}))})).catch((()=>{this.$message({type:"info",message:"已取消删除"})}))},init(){let e={page:1,pagesize:5};l.Z.bookAPI.queryAll(e).then((e=>{console.log("显示部分图书",e),this.bookData=e.data.data}))}},mounted(){this.init()}},s=r,i=a(1001),c=(0,i.Z)(s,o,n,!1,null,"0b56064d",null),u=c.exports}}]);
//# sourceMappingURL=669.0f61ad1e.js.map