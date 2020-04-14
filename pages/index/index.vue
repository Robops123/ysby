<template>
	<view class="content">
		<scroll-view scroll-y="true" 	@scrolltolower='reachBottom' :style="{height:scrollHeight+'px'}">
			<view id="scroll-content">
				<video width="800" height="600" :danmu-list="danmuList" enable-danmu danmu-btn controls ref='myVideo' id="myVideo" direction='-90'
				@timeupdate='timeupdate' :initial-time='initialTime' @loadedmetadata='loadedmetadata'  @fullscreenchange='fullscreenchange'
				src="http://workers.lllnet.cn/video/gclc-techs/CYGR20201581243705-1.mp4?sign=9b4dae9ba63bd3786001849f16c19395&t=5e7eea0e">
				</video>
				
				<view>{{reachtimes}}</view>
				<button type="default" @click="play">play</button>
				<button type="default" @click="pause">pause</button>
			</view>
		</scroll-view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value:'',
				title: 'Hello',
				scrollHeight:'',
				initialTime:'',
				currentTime:'',
				src: '',
				            danmuList: [{
				                    text: '第 1s 出现的弹幕',
				                    color: '#ff0000',
				                    time: 1
				                },
				                {
				                    text: '第 3s 出现的弹幕',
				                    color: '#ff00ff',
				                    time: 3
				                }
				            ],
				            danmuValue: '',
							reachtimes:0
			}
		},
		mounted() {
			// if()
				this.calculateWindowHeight()
				this.calcReachBottom()
			  this.videoContext = uni.createVideoContext('myVideo')
			var record=uni.getStorageSync('record')
			if(record!=null || record!=''){
				this.initialTime=record
			}
		},
		onUnload(){
			
		},
		onPageScroll(e){
			// console.log(e)
		},
		onHide(){
			uni.getStorageSync('record',this.currentTime)
			this.videoContext.pause()
		},
		onReachBottom(){
			console.log('到底部')
		},
		methods: {
			timeupdate(e){
				this.currentTime=e.detail.currentTime
			},
			loadedmetadata(e){
				
			},
			 // sendDanmu: function() {
			 //            this.videoContext.sendDanmu({
			 //                text: this.danmuValue,
			 //                color: this.getRandomColor()
			 //            });
			 //            this.danmuValue = '';
			 //        },
			        videoErrorCallback: function(e) {
			            uni.showModal({
			                content: e.target.errMsg,
			                showCancel: false
			            })
			        },
			        getRandomColor: function() {
			            const rgb = []
			            for (let i = 0; i < 3; ++i) {
			                let color = Math.floor(Math.random() * 256).toString(16)
			                color = color.length == 1 ? '0' + color : color
			                rgb.push(color)
			            }
			            return '#' + rgb.join('')
			        },
					openModal(){
						uni.showModal({
						    title: '提示',
						    content: '这是一个模态弹窗',
						    success: function (res) {
						        if (res.confirm) {
						            console.log('用户点击确定');
						        } else if (res.cancel) {
						            console.log('用户点击取消');
						        }
						    }
						});
					},
					reachBottom(){
						this.reachtimes++
					},
					calculateWindowHeight(){
						var that=this
						uni.getSystemInfo({
							success:(res) =>{
								that.scrollHeight=res.windowHeight
							},
							fail:(reason) =>{
								uni.showToast({
									title: JSON.stringify(reason),
								})
							}
						})
					},
					calcReachBottom(){
						var that=this
						uni.createSelectorQuery().in(this).select('#scroll-content').boundingClientRect().exec((res)=>{ 
						   if (res[0]) { 
							   if(res[0].height<this.scrollHeight){
								   this.reachtimes++
							   }
						 }else { 
						     this.$nextTick(()=>{ 
						      this.calcReachBottom(); 
						 }) 
						   } 
						  }) 
					},
					fullscreenchange(f,d){
							console.log(f,d)
					},
					onSearch(){
						console.log('search')
					},
					onCancel(){
						console.log('cancel')
					},
					 onClickIcon() {
					    Toast('点击图标');
					  },
					
					  onClickButton() {
					    Toast('点击按钮');
					  },
					play(){
						// this.$refs.video.play()
						console.log(this.videoContext)
						this.videoContext.play()
						
					},
					pause(){
						// this.$refs.video.pause()
						this.videoContext.pause()
					},
		}
	}
</script>

<style>
	@import "../../wxcomponents/vant/common/index.wxss";
	.content{
	}
	video{
		width: 100%;
		height: 300px;
	}
</style>
