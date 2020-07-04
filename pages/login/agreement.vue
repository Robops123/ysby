<template>
	<web-view :src="src"></web-view>
</template>

<script>
	export default{
		data(){
			return{
				src:''
			}
		},
		onLoad(p){
			this.src=p.src
			uni.setNavigationBarTitle({
				title:p.title
			})
		},
		
	}
</script>

<style>
</style>
