<template>
	<view class="padding">
		<u-parse :content="data" v-if="data" id="article" class="article"  ref='article'/>
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
				uid:'',
				token:'',
				data:''
			}
		},
		mounted(){
			var userInfo=uni.getStorageSync('userInfo')
			if(userInfo!='' & userInfo!=null & userInfo!=undefined){
				this.uid=userInfo.uid
				this.token=userInfo.token
			}
			this.getDetail()
		},
		methods:{
			getDetail(){
				var that=this
				var url='&r=api.member.promoteintro'
				  this.$apiPost(url).then((res) =>{
					that.data=res.data.content
				  })
			}
		}
	}
</script>

<style>
</style>
