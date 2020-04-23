export const getHeight=function(selector,succb){
  var h;
  uni.getSystemInfo({
    				success: (resu) => {
    					const query = uni.createSelectorQuery()
    					query.select(selector).boundingClientRect()
    					query.exec(function(res) {
							h= resu.windowHeight - res[0].top
							succb(h)
    					})
    				},
    				fail: (res) => {}
    			})
}


export const loading=function(msg){
	uni.showLoading({
		title:msg,
	})
}

export const msg=function(msg,type){
	uni.showToast({
	    title: msg,
		icon:type || 'none',
	    duration: 2000
	});
}

