const fs = require('fs');
console.log(fs);
// 引入Node.Js的crypto模块
const crypto = require("crypto");
// 引入axios模块
const axios = require('./axios/node_modules/axios/index.js');
// 创建全局变量来接收上一次下载的文件名，方便后续判断是否有新雷达资料需要下载
let fileName = '';

// 创建第一次请求的函数来获取雷达资料的URL下载地址
function Get () {
  // 生成查询半小时的雷达时间段参数
  let timeRange = [getUtcTime(60000, 0, 1200000).dateStart.UT, getUtcTime(60000, 0, 1200000).dateEnd.UT];
  // 生成URL
  let URL = createUrl(timeRange);
  axios.get(URL)
    .then(res => {
      let ArFile = [];
      let ObjFile = {};
      for (var i = 0; i < res.data.DS.length; i++) {
        // 初始化对象变量
        ObjFile = {};
        ObjFile.fileName = res.data.DS[i].FILE_NAME;
        ObjFile.fileUrl = res.data.DS[i].FILE_URL;
        // 将对象变量赋值给雷达文件信息全局变量
        ArFile[i] = ObjFile;
      }
      ArFile.sort(function (a, b) {
        return a.fileName - b.fileName;
      });

      if (fileName == ArFile[ArFile.length - 1].fileName) {
        console.log('无最新雷达标准基数据文件');
      } else {
        // 创建第二次请求的函数来下载雷达资料
        console.log(ArFile[ArFile.length - 1].fileUrl);
        axios.get(ArFile[ArFile.length - 1].fileUrl)
          .then(res => {
            // 输出雷达文件---------------------------------------------------------------------------------------
            // 创建可写流输出解析好的EC数据
            let rEC = fs.createWriteStream('./CMADaaS_RDdata/' + ArFile[ArFile.length - 1].fileName);
            // 通过rEC的write方法向文件中输出内容
            rEC.write(res.data);
            // 关闭流， 通过close关闭可能会导致流没全部写进文件
            rEC.end();

            console.log(ArFile[ArFile.length - 1].fileName + ' 文件下载成功');
            console.log('版权所有：郑舒天 电话：14769221540');
            fileName = ArFile[ArFile.length - 1].fileName;
          })
          .catch(err => {
            console.log(err);
          });
      }


    })
    .catch(err => {
      console.log(err);
    });
}


// 每两分钟下载一次雷达资料
Get();
var timer = setInterval(function () {
  Get();
}, 90000);

//创建MD5加密的函数
function MD5 (a) {
  function md5 (jiamistr) {
    return crypto.createHash('md5').update(String(jiamistr)).digest('hex');
  }
  var md5jiami = crypto.createHash("md5");
  md5jiami.update(a);
  var str = md5jiami.digest('hex');
  var s = str.toUpperCase();
  return s;
}
//创建生成UUID的函数
function uuid () {
  return 'xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

//实现时间对象转换为世界时天擎时间格式
function dateChangeTq (Date) {
  //处理世界时
  var y = Date.getUTCFullYear();
  var m = Date.getUTCMonth() + 1;
  m = m < 10 ? "0" + m : m;
  var d = Date.getUTCDate();
  d = d < 10 ? "0" + d : d;
  var h = Date.getUTCHours();
  h = h < 10 ? "0" + h : h;
  var mi = Date.getUTCMinutes();
  mi = mi < 10 ? "0" + mi : mi;
  var s = Date.getUTCSeconds();
  s = s < 10 ? "0" + s : s;
  //处理北京时
  var yb = Date.getFullYear();
  var mb = Date.getMonth() + 1;
  mb = mb < 10 ? "0" + mb : mb;
  var db = Date.getDate();
  db = db < 10 ? "0" + db : db;
  var hb = Date.getHours();
  hb = hb < 10 ? "0" + hb : hb;
  var mib = Date.getMinutes();
  mib = mib < 10 ? "0" + mib : mib;
  //返回结果
  var Tq = "" + y + m + d + h + mi + s;
  var BTime = "" + yb + "-" + mb + "-" + db + " " + hb + ":" + mib;
  var time = {
    UT: Tq,
    BT: BTime
  };
  return time;
};

//获取世界时天擎时间格式函数，movalue是取整，lead是提前量，length是时长
function getUtcTime (movalue, lead, length) {
  //根据本机时间计算开始和结束时间
  var nowTime = Date.now();
  var minTime = nowTime - (nowTime % movalue);
  var reminTime = minTime - lead;
  var startTime = reminTime - length;
  var dateStart = new Date(startTime);
  var dateEnd = new Date(reminTime);
  //返回结果
  var a = dateChangeTq(dateStart);
  var b = dateChangeTq(dateEnd);
  var c = {
    dateStart: a,
    dateEnd: b
  };
  return c;
};

//生成URL的函数
function createUrl (timeRange) {
  // 创建一个数组来放所有请求参数
  var params = new Array();
  params[0] = "pwd=Sd13769391718!";
  params[1] = "userId=BFMZ_MZZST";
  params[2] = "serviceNodeId=NMIC_MUSIC_CMADAAS";
  params[3] = "dataCode=RADA_L2_FMT";
  params[4] = "interfaceId=getRadaFileByTimeRangeAndStaId";
  params[5] = "dataFormat=json";
  params[6] = "timeRange=[" + timeRange + "]";
  params[7] = "staIds=Z9873";
  // 利用函数生成查询时刻的时间戳
  params[8] = "timestamp=" + Date.now();
  // 利用函数生成本次请求对应的随机数
  params[9] = "nonce=" + uuid();
  var pwdStr = "&" + params[0];
  // 将所有参数按照Key排序
  params.sort(function (a, b) {
    return (a.charCodeAt()) - (b.charCodeAt());
  });
  // 将排序后的字符串MD5加密后生成URL
  var stringSignTemp = "";
  for (var i = 0; i < params.length; i++) {
    stringSignTemp = stringSignTemp + "&" + params[i];
  }
  stringSignTemp = stringSignTemp.slice(1);
  var URL = "http://10.208.122.120/music-ws/api?" + stringSignTemp + "&sign=" + MD5(stringSignTemp);
  //将用户密码从最终的url中删除，不参与网络传输
  URL = URL.replace(pwdStr, "");
  return URL;
}