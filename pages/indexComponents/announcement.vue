<template>
	<view class="padding">
		<view class="announcement">
			<text class="s1 cr title">公告</text>
			  <swiper class="content s2 cg ellipsis" :vertical="true"   :autoplay="true"  duration="500"  interval="5000"  >
				    <swiper-item v-for="(item, index) in noticeList" :key="index">
					     
					<icon type="" class="iconfont icon-tubiao-1" size="12" style="vertical-align: middle;" />
					<view  class='notice-content'>{{item.title}}</view>
					    
				</swiper-item>
				   </swiper>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				noticeList: [],
			}
		},
		mounted(){
			this.getNotice()
		},
		methods:{
			// 公告
			getNotice(p) {
				var that = this
				var url = '&r=api.home.notice'
				this.$apiPost(url).then((res) => {
					that.noticeList = res.data
				}).catch((err) => {
					this.$msg(err)
				})
			},
		}
	}
</script>

<style>
	.title {
		margin-right: 10upx;
		padding-right: 10upx;
		border-right: 1px solid #f4f4f4;
	}
	.announcement {
		margin-top: 15upx;
	}
	
	.notice-content {
		width: 90%;
		display: inline-block;
		overflow-x: auto;
	}
	.content icon {
		margin-right: 5upx;
		color: #ffba2d;
		display: inline-block;
		vertical-align: top !important;
	}
	
	.content {
		display: inline-block;
		vertical-align: middle;
		overflow-x: auto;
		width: 86%;
		height: 38upx;
	}
</style>
