import { request } from "../utils/request";
// 登录
export function login(params){
    return request({
        url:'/login',
        method:'POST',
        data:params
    })
}
// 获取新闻列表
export function getNewsList(params){
    return request({
        url:'/getnewslist',
        method:'GET',
        data:params
    })
}
// 上传新闻图片
export function uploadImg(params){
    return request({
        url:'/uploadimg',
        method:'POST',
        data:params
    })
}
// 检查token
export function checkUserState(){
    return request({
        url:'/checkuserstate',
        method:'GET',
    })
}
// 更新新闻
export function updateNews(params){
    console.log(params);
    return request({
        url:'/updatenews',
        method:'POST',
        data:params
    })
}