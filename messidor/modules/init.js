let initData = {};
export default initData



// 从IndexDB取出数据，setBlogList，同时不管有没有都会后台触发从仓库查询，对现有数据进行更新，后续添加更新提醒
store.dispatch("blog/setBlog");
