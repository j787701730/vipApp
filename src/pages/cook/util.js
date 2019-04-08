import Taro from "@tarojs/taro";

export const key = "&key=2a97d3b007e58";
// export const bgJpg = "https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-698898.png";
export const bgJpg = "https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-728382.jpg";

export function ajax(url, data, toast = true, sucFun = null, failFun = null) {
  console.log(`${url}${key}`);
  const param = {
    url: `${url}${key}`,
    method: "get",
    headers: {
      "X-Requested-With": "XMLHttpRequest"
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    data
  };

  return Taro.request(param)
    .then(res => {
      // if (res.data.err_code === 0) {
      // if (toast) {
      //   Taro.showToast({ title: "res.data.err_msg" });
      // }
      if (sucFun !== null) {
        sucFun(res.data);
      }
      // } else if (res.data.err_code === 88888) {
      //   // 登录处理
      //   // const history = createHashHistory();
      //   history.push("/user/login");
      // } else {
      //   if (toast) {
      //     Taro.showToast({ title: res.data.err_msg });
      //   }
      //   if (failFun !== null) {
      //     failFun(res.data);
      //   }
      // }
    })
    .catch(() => {
      if (toast) {
        Taro.showToast({title: "请求失败"});
      }
      if (failFun !== null) {
        failFun();
      }
    });
}


/**
 * Created by zw on 2017/12/22 0022. 输入框只能输入整数
 * <script src="__ROOT__/Public/adminrelas/js/common/number.js"></script>
 */

export function clearNoInt(value) {
  let val;
  val = value.replace(/[^0-9]+/g, '');
  if (value != '') {
    val = parseInt(value, 10);
  }
  return val;
}

/**
 *
 * @param value 值
 * @param decimal 保留小数位数
 * @param sign 是否支持负数 传'-'支持 , 不传只支持正数
 */
export function clearNoNum(value, decimal, sign) {
  let val;
  if (value != '' && value.substr(0, 1) == '.') {
    val = "";
  }
  if (sign === '-') {
    if (value.substr(0, 1) == '-' && value.substr(1, 1) == '.') {
      val = "-";
    }
  }
  val = value.replace(/^0*(0\.|[1-9])/, '$1'); //解决 粘贴不生效

  if (sign === '-') {
    val = value.replace(/[^\d.-]/g, "");  //清除“数字”和“.”"-"以外的字符
  } else {
    val = value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
  }

  val = value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
  if (sign === '-') {
    val = value.replace(/^\-{2,}/g, "-"); //只保留第一个- 清除多余的
  }
  val = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");

  if (sign === '-') {
    val = value.replace("-", "$#$").replace(/\-/g, "").replace("$#$", "-");
  }

  if (decimal === 3) {
    val = value.replace(/^(\-)*(\d+)\.(\d\d\d).*$/, '$1$2.$3');//只能输入三个小数
  } else {
    val = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数
  }

  if (sign === '-' && value.indexOf("-") > 0) {
    val = value.substr(0, value.indexOf("-"));
  }

  if (value.indexOf(".") < 0 && value != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
    if (value.substr(0, 1) == '0' && value.length == 2) {
      val = value.substr(1, value.length);
    }
  }
  if (sign === '-' && value.indexOf("-") > -1 && value != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
    if (value.substr(0, 1) == '-' && value.length > 2 && value[1] === '0' && value[2] >= 0) {
      val = value.substr(0, 2);
    }
  }
  return val;
}

// 判断手机号码
export function checkPhoneNum(value) {
  return /^\d{11}$/.test(value)
}

// 判断是否为json

export function isJSON(str) {
  if (typeof str == 'string') {
    try {
      let obj = JSON.parse(str);
      return (typeof obj == 'object' && obj);
    } catch (e) {
      // console.log('error：' + str + '!!!' + e);
      return false;
    }
  }
}

export function checkImage(name) {
  return /\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(name.toLowerCase())
}
