<template>
	<view style="border-top: 20upx solid #f3f3f3;padding-bottom: 130upx;">
		<view class="bottom-border" v-for='(item,index) in dataList' :key='index' @click='longpress(item.id,item)'>
			<view class="padding s2">
				<view class="s8 magin">
					<text class="label-80">{{item.contactname}}</text>
					<text>{{item.usermobile}}</text>
					<text class="fr cr" v-if="item.isdefault=='1'">默认地址</text>
				</view>
				<view class="flex-between magin">
					<text class="address">{{item.province+item.city+item.district+item.address}}</text>
					<view class="icon-Write iconfont " @click.stop="toChange('edit',item)"></view>
				</view>
			</view>
		</view>
		
		<view style="text-align: center;">
			<button type="default" class="btn" @click="toChange('add','')"><view class="icon-fire iconfont button-icon"></view>+新建收货地址</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				dataList:'',
				url:'&r=api.member.address',
				uid:'',
				token:'',
				mode:''
			}
		},
		mounted(){
			var userInfo=uni.getStorageSync('userInfo'),that=this
			if(userInfo!='' & userInfo!=null & userInfo!=undefined){
				this.uid=userInfo.uid
				this.token=userInfo.token
				this.getAddressList()
			}
			
			uni.$on('updateAddressList',function(){
				that.getAddressList()
			})
		},
		onLoad(e){
			if(e.type=='choose'){
				this.mode=1
			}
		},
		methods:{
			toChange(t,it){
				uni.navigateTo({
					url:'./addressChange?type='+t+'&item='+JSON.stringify(it)
				})
			},
			getAddressList(){
				var that=this
				var params={
					uid:this.uid,
					token:this.token,
					page:1,
					pagesize:99,
				}
				  this.$apiPost(this.url,params).then((res) =>{
					that.dataList=res.data	
				  })
			},
			longpress(id,item){
				var that=this,list
				if(this.mode==1){
					list=['删除','选为收货地址']
				}else{
					list=['删除']
				}
				uni.showActionSheet({
				    itemList: list,
				    success: function (res) {
						console.log(res)
						if(res.tapIndex==0){
							that.deleteAddress(id)
						}else if(res.tapIndex==1){
							uni.$emit('chooseAddress',item)
							uni.navigateBack({
								delta:1
							})
						}
				    },
				    fail: function (res) {
				        console.log(res.errMsg);
				    }
				});
			},
			deleteAddress(id){
				var that=this
				var params={
					uid:this.uid,
					token:this.token,
					addressid:id
				}
				var url='&r=api.member.address.delete'
				  this.$apiPost(url,params).then((res) =>{
					  that.$msg('删除成功')
					  setTimeout(function(){
						  that.getAddressList()
					  },0)
				  })
			}
		}
	}
</script>

<style>
	page{
		background-color: #fff;
	}
	.bottom-border{
		border-bottom: 1px solid #f7f7f7;
	}
	.label-80{
		display: inline-block;
		margin-right: 20upx;
		width: 160upx;
	}
	.address{
		display: inline-block;
		width: 80%;
	}
	.magin{
		margin: 10upx 0;
	}
	
	.btn{
		width: 80%;
		height: 75upx;
		background: #ff6d7e !important;
		border-radius: 0;
		margin: 20upx 10%;
		text-align: center;
		line-height: 75upx;
		border-radius: 75upx;
		letter-spacing: 4px;
		color: white !important;
		font-size: 34upx;
		position: fixed;
		bottom: 40upx;
	}
	.button-icon{
		display: inline;
	}
</style>
