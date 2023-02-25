//用于导出生产环境（远程）或测试环境（本地）下的接口前缀
const URL_envent = {
  //开发测试
  DEV: {
    dskURL: "http://localhost:3060",
    uploadURL: "http://localhost:9000",
  },
  //生产
  PRO: {
    dskURL: "https://remm.fun/dsk",
    uploadURL: "https://remm.fun/dskupload",
  },
};
export default URL_envent.DEV; //需要哪个环境就导出哪个
