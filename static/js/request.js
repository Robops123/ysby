
const baseURL = 'http://192.168.1.157/yishuban2/app/index.php?i=2&c=entry&m=ewei_shopv2&do=mobile';   //测试
// const baseURL = 'http://112.25.69.93/api';    //正式
// 参数： url:请求地址  param：请求参数  way：请求方式 res：回调函数
 /**
  *  @name 请求
  */
 async function apiPost(url,params){
 	if(!params)console.warn("没有传入参数params");
 	return await new Promise((resolve,reject)=>{
 		uni.request({
 			url:baseURL+url,
 			method :"POST",
 			header:{
 				// 'Token': token,
 				'Accept': 'application/json',
 				"content-type":"application/x-www-form-urlencoded"
 			},
 			data:params,
 			success(res) {
				if(res.data.resultCode==0){
					resolve(res.data)
				}else{
					uni.hideLoading()
					reject(res)
				}
 			},
 			fail(err) {
				uni.hideLoading()
 				reject(err.errMsg)
 			}
 		})
 	})
 }
 
 async function apiGet(url,params){
 	if(!params)console.warn("没有传入参数params");
 	return await new Promise((resolve,reject)=>{
 		uni.request({
 			url:baseURL+url,
 			method :"GET",
 			header:{
 				'Accept': 'application/json',
 				"content-type":"application/x-www-form-urlencoded"
 			},
 			timeout:6000,
 			data:params,
 			success(res) {
 				if(res.resultCode==0){
 					resolve(res.data)
 				}else{
					uni.hideLoading()
 					reject(res)
 				}
 			},
 			fail(err) {
				uni.hideLoading()
 				reject(err.errMsg)
 			}
 		})
 	})
 }
 
 
 
 // 登录
 async function login(params){
 	return await new Promise((resolve,reject)=>{
 		uni.request({
 			url:baseURL+'/login',
 			method :"GET",
 			header:{
 				// 'Token': token,
 				'Accept': 'application/json',
 				"content-type":"application/x-www-form-urlencoded"
 			},
 			data:params,
 			success(res) {
 				resolve(res.data)
 			},
 			fail(err) {
 				reject(err)
 			}
 		})
 	})
 }

export default {
    baseURL,
	apiPost,
	apiGet,
	login
}