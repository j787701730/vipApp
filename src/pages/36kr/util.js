import Taro from "@tarojs/taro";

export const key = "&key=2a97d3b007e58";
// export const bgJpg = "https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-698898.png";
export const bgJpg = "https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-728382.jpg";

export function ajax(url, data, toast = true, sucFun = null, failFun = null) {
  console.log(`${url}`);
  const param = {
    url: `${url}`,
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
