<template>
	<view class="padding">
		<view style="text-align: center;" class="s5">{{title}}</view>
		<view v-html="data"></view>
		<!-- <u-parse :content="data" v-if="data" id="article" class="article"  ref='article'/> -->
	</view>
</template>

<script>
	import uParse from '@/components/gaoyia-parse/parse.vue'
	export default{
		components:{
			uParse
		},
		data(){
			return {
				title:'',
				data:'',
				type:''
			}
		},
		onLoad(p){
			this.type=p.type
			if(p.title){
				uni.setNavigationBarTitle({
					title:p.title
				})
			}
			this.getDetail()
		},
		methods:{
			getDetail(){
				var that=this,url=''
				if(this.type=='1'){
					// 1服务
					url='&r=api.agreement.service'
				}else{
					// 2隐私
					url='&r=api.agreement.privacy'
				}
				
				  this.$apiPost(url).then((res) =>{
					that.data=res.data.content
					that.title=res.data.title
				  })
			}
		}
	}
</script>

<style>
	view,.p{
		line-height: 1.5;
		word-break: break-all;
	}
	.article img{
		width: initial;
		max-width: 100%;
	}
</style>
