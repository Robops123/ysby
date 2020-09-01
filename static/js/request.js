
// const baseURL = 'http://192.168.1.157/yishuban/app/index.php?i=2&c=entry&m=zhonghong_zhihui&do=mobile';   //测试
const baseURL = 'https://www.wxzdhy.cn/app/index.php?i=2&c=entry&m=zhonghong_zhihui&do=mobile';   //正式
// 参数： url:请求地址  param：请求参数  way：请求方式 res：回调函数http://192.168.1.157/yishuban/app/index.php?i=2&c=entry&m=zhonghong_zhihui&do=mobile

 /**
  *  @name 请求http://www.wxzdhy.cn/web/merchant.php?i=2&c=site&a=entry&m=ewei_shopv2&do=web
  */
 async function apiPost(url,params){
 	// if(!params)console.warn("没有传入参数params");
 	return await new Promise((resolve,reject)=>{
 		uni.request({
 			url:baseURL+url,
 			method :"POST",
 			header:{
 				// 'Token': token,
 				// 'Accept': 'application/json',
 				"content-type":"application/x-www-form-urlencoded"
 			},
 			data:params,
 			success(res) {
				if(res.data.resultCode==0){
					resolve(res.data)
				}else if(res.data.resultMessage=='暂无数据'){
					resolve(res.data)
				}else if(res.data.resultMessage=='token有误'){
					uni.hideLoading()
					// uni.removeStorageSync('userInfo')
					uni.showToast({
						title:'请重新登录',
						icon:'none',
						duration:2000
						
					})
				}else{
					uni.hideLoading()
					uni.showToast({
					    title: res.data.resultMessage,
						icon:'none',
					    duration: 2000
					});
					reject(res.data)
				}
				
 			},
 			fail(err) {
				uni.hideLoading()
				uni.showToast({
				    title: err.errMsg,
					icon:'none',
				    duration: 2000
				});
 				reject(err.errMsg)
 			}
 		})
 	})
 }
 
 async function apiGet(url,params){
 	// if(!params)console.warn("没有传入参数params");
 	return await new Promise((resolve,reject)=>{
 		uni.request({
 			url:baseURL+url,
 			method :"GET",
 			header:{
 				// 'Accept': 'application/json',
 				"content-type":"application/x-www-form-urlencoded"
 			},
 			timeout:6000,
 			data:params,
 			success(res) {
 				if(res.resultCode==0){
 					resolve(res.data)
 				}else if(res.data.resultMessage=='暂无数据'){
					resolve(res.data)
				}else if(res.data.resultMessage=='token有误'){
					uni.hideLoading()
					uni.showToast({
						title:'请重新登录',
						icon:'none',
						duration:2000
					})
					// uni.removeStorageSync('userInfo')
				}else{
					uni.hideLoading()
					uni.showToast({
					    title: res.data.resultMessage,
						icon:'none',
					    duration: 2000
					});
 					reject(res.data)
 				}
 			},
 			fail(err) {
				uni.hideLoading()
				uni.showToast({
				    title: err.errMsg,
					icon:'none',
				    duration: 2000
				});
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