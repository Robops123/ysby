<template>
	<view>
		<scroll-view scroll-y="true" id="sv" :style="{height:sh+'px'}"  @scrolltolower='toBottom'>
			<view class="padding comment" v-for="(item,index) in dataList" :key='index'>
				<view class="user">
					<image :src="item.headimgurl" mode="" class="headface"></image>
					<view>
						<view>
							{{item.nickname}}
						</view>
						<view class="createtime">
							{{item.createtime}}
						</view>
					</view>
				</view>
				<view class="comment">
					<view class="comment-word">
						{{item.content}}
					</view>
					<view class="comment-pic" v-if='item.picurl.length>0'>
						<image :src="commentImgItem" mode="" v-for="(commentImgItem,commentImgIndex) in item.picurl.split(',')"
						v-if="commentImgIndex<=3"  :key='commentImgIndex' @click="readImg(commentImgItem)"></image>
					</view>
				</view>
				<view class="s3 cg">{{item.skuname ? item.skuname:'无规格'}}</view>
				
			</view>
			<uni-load-more :status="more"></uni-load-more>
		</scroll-view>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default{
		components:{
			uniLoadMore
		},
		data(){
			return{
				goodsid:'',
				active:1,
				rangeActive:'',
				sh:'',
				dataList:[],
				page:1,
				pageSize:6,
				total:0,
				more:''
			}
		},
		computed: {
		     noMore () {
		       return this.dataList.length >= this.total
		     },
		   },
		onLoad(e){
			var that=this
			this.goodsid=e.id
			this.getList(this.page)
			setTimeout(function(){
				that.$getHeight('#sv',(res) =>{
					that.sh=res
				})
			},0)
		},
		methods:{
			getList(p){
				var that=this
				var params={
				  page:p,
				  pagesize: this.pageSize
				}
				if(this.page==1){
					this.$loading()
				}
				  var url='&r=api.goods.detail.comments&goodsid='+this.goodsid+'&page='+p+'&pagesize='+this.pageSize
				  this.$apiPost(url,params).then((res) =>{
					  that.total=res.total
					  that.dataList=that.dataList.concat(res.data)
					  that.more=''
					  if(that.page==1){
					  	uni.hideLoading()
					  }
				  })
			},
			toBottom(){
				if(this.noMore){
					this.more='noMore'
					return;
				}
				var that=this
				this.more='loading'
			  // setTimeout(function(){
				  that.page++
				  that.getList(that.page)
			  // },2000)
			},
			readImg(url){
							  uni.previewImage({
							  	current:url,
							  	urls:[url]
							  })
			}
		}
	}
</script>

<style>
	page{
		background-color: #f2f2f2;
	}
	
	.comment{
		background-color: #fff;
		margin-top: 20upx;
	}
	.user>image,
	.user>view{
		vertical-align: middle;
		display: inline-block;
	}
	
	.user .headface{
		width: 70upx;
		margin-right: 20upx;
		height: 70upx;
		border-radius: 50%;
	}
	.comment-word{
		line-height: 1.5;
		/* height: 72upx; */
		/* overflow:hidden;//一定要写
		    text-overflow: ellipsis;//超出省略号
		    display:-webkit-box;//一定要写
		    -webkit-line-clamp: 2;//控制行数
		    -webkit-box-orient: vertical;//一定要写 */
			margin: 25upx 0 15upx;
			word-break: break-word;
	}
	
	.comment-pic image{
		width: 31%;
		height: 200upx;
		border-radius: 10upx;
		margin-right: 2% ;
	}
	.createtime{
		font-size: 22upx;
		line-height: 22upx;
		margin-top: 16upx;
		color: #c3c3c3;
	}
</style>
