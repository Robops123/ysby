<template>
	<view class="main">
		<view class="padding">
			<view class="sub-title">自助服务</view>
			<view class="opt-container">
				<view style="width: max-content;margin: 40upx 0;">
					<view class="item-list" @click="getCorespondList(item.id)" v-for="(item,index) in cateList" :key='index'>
						<image :src="item.icon" mode=""></image>
						<view>{{item.title}}</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="sub-title padding">猜你想问</view>
		<view class="question" v-for="(item,index) in questionList" :key='index'>
			<view @click="showQuestion(index)">
				<text>{{index+1}}、{{item.title}}</text>
				<text class="fr iconfont icon-down" ></text>
			</view>
			<view v-show="item.show" class="question-detail" :class="{animate__fadeInDown:item.show}">
				 <!-- <u-parse :content="item.content" id="article" class="article"  ref='article'/> -->
				 <view v-html="item.content"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import uParse from '@/components/gaoyia-parse/parse.vue'
	export default{
		components:{
			uParse
		},
		data(){
			return{
				page:1,
				pageSize:10,
				cateList:[],
				questionList:[]
			}
		},
		onLoad(){
			this.getList()
		},
		methods:{
			getList(){
				var that=this
				var params={
				  page:this.page,
				  pagesize: this.pageSize
				}
				  var url='&r=api.helper.category'
				  this.$apiPost(url,params).then((res) =>{
					  that.cateList=that.cateList.concat(res.data)
					  that.getCorespondList(res.data[0].id)
				  })
			},
			getCorespondList(id){
				this.questionList=[]
				this.$loading()
				var that=this
				var params={
				  page:this.page,
				  pagesize: this.pageSize,
				  cateid:id
				}
				  var url='&r=api.helper.catehelp'
				  this.$apiPost(url,params).then((res) =>{
					  that.questionList=that.questionList.concat(res.data)
					  uni.hideLoading()
				  })
			},
			showQuestion(from){
				this.questionList[from].show=!this.questionList[from].show
				this.questionList.splice(0,0)
			}
		}
	}
</script>

<style>
	.main{
		border-top: 20upx solid #f3f3f3;
	}
	.sub-title{
		font-size: 18px;
		margin-top: 30upx;
	}
	.opt-container{
		width: 100%;
		overflow: hidden;
		overflow-x: auto;
	}
	.item-list image{
		width: 30px;
		height: 30px;
		margin-bottom: 20upx;
	}
	.item-list{
	width: 160upx;	
	text-align: center;
	display: inline-block;
	vertical-align: middle;
	}
	.item-list view{
		white-space: nowrap;
		font-size: 24upx;
		color: #696969;
	}
	.question{
		padding: 20upx ;
		margin: 20upx 0;
		
	}
	.question:not(:last-child){
		border-bottom:1px solid #dcdcdc;
	}
	/* .question .iconfont{
		 margin-top: 5px;
	} */
	.question-detail{
		transition: 0.4s linear all;
		margin-top: 20upx;
		line-height: 1.5;
		/* text-indent: 20px; */
	}
	.article img{
		width: initial;
		max-width: 100%;
	}
</style>
