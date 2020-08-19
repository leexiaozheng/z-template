import Axios from "axios";

Axios.defaults.baseURL = "";
Axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
Axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded;charset=UTF-8";
Axios.defaults.validateStatus = (status) => {
    return status === 200;
};

Axios.interceptors.response.use(
    (res) => res,
    (error) => {
        return Promise.reject(error);
    }
);

function successHandle(response, resolve, reject) {
    if (response) {
        let { status, data } = response;
        if (status && status === 200 && data) {
            if (typeof data === "string") {
                data = JSON.parse(data);
            }
            if (data.type === 0) {
                return resolve(data);
            } else {
                if (data.hasOwnProperty("code") && data.hasOwnProperty("msg")) {
                    cconsole.error(data.msg, data.code);
                    return reject(response);
                }
            }
        }
    }
    return reject({
        fail: (msg) => {
            console.error(msg);
        },
    });
}

function errorHandle(error, resolve, reject) {
    console.error("接口请求出错");
    return reject(error);
}

function get(url, config = {}) {
    return new Promise((resolve, reject) => {
        Axios.get(url, config)
            .then((e) => {
                successHandle(e, resolve, reject);
            })
            .catch((e) => {
                errorHandle(e, resolve, reject);
            });
    });
}

function post(url, data, config = {}) {
    return new Promise((resolve, reject) => {
        Axios.post(url, data, config)
            .then((e) => {
                successHandle(e, resolve, reject);
            })
            .catch((e) => {
                errorHandle(e, resolve, reject);
            });
    });
}

/**
 * 提供取消http的封装，可以参考axios关于cancelToken的相关内容
 * @param token
 * @returns {CancelTokenSource}
 */
function getCancelToken(token) {
    if (token) {
        token.cancel();
    }
    return CancelToken.source();
}

function isCancel(e) {
    return Axios.isCancel(e);
}

export { get, getCancelToken, post };
