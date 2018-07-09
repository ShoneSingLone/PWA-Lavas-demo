export function getBlogFromRemote() {
    return new Promise((resolve, reject) => {
        // 更新数据
        Axios(url).then(result => {
            console.timeEnd("blog/SET_BLOG");
            if (result && result.data) {
                resolve(result.data);
            } else {
                throw new Error(result);
            }
        }).catch(error => {
            reject(error);
        });

    })
}
