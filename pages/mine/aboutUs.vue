<template>
	<view class="main-container">
		<view v-html="data.content"></view>
		<!-- <u-parse :content="data.content" v-if="data" id="article" class="article"  ref='article'/> -->
	</view>
</template>

<script>
	import uParse from '@/components/gaoyia-parse/parse.vue'
	export default{
		data(){
			return {
				data:{}
			}
		},
		components:{
			uParse,
		},
		mounted(){
			this.getDetail()
		},
		methods:{
			getDetail(){
				var that=this
				  var url='&r=api.agreement.about'
				  this.$apiPost(url).then((res) =>{
					 that.data=res.data
				  }).catch((err) =>{
					  this.$msg(err)
				  })
			}
		}
	}
</script>

<style>
	.main-container{
		padding: 20upx;
	}
	.article img{
		width: initial;
		max-width: 100%;
	}
</style>
