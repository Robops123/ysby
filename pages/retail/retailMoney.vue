<template>
	<view >
		<!-- <view class="top-nav padding">
			<view class="nav-content">
				<text class="iconfont icon-previewleft " @click="back"></text>
				<text>代理佣金</text>
				<text class="cg fr s2" >提现明细</text>
			</view>
		</view> -->
		
		<view class="main">
			<view class="recommendAward-card">
				<image class="recommendAward-card-img1" src="../../static/img/pic/proxy/icon7.png" mode=""></image>
				<view class="recommendAward-card-left">可提现金额</view>
				<view class="recommendAward-card-right">{{data.canCommission}}元</view>
			</view>
			<view class="recommendAward-card">
				<image class="recommendAward-card-img2" src="../../static/img/pic/proxy/icon8.png" mode=""></image>
				<view class="recommendAward-card-left">已申请金额</view>
				<view class="recommendAward-card-right recommendAward-card-rights">{{data.freezeCommission}}元</view>
			</view>
			<view class="recommendAward-card">
				<image class="recommendAward-card-img3" src="../../static/img/pic/proxy/icon1.png" mode=""></image>
				<view class="recommendAward-card-left">成功提现金额</view>
				<view class="recommendAward-card-right recommendAward-card-rights">{{data.doneCommission}}元</view>
			</view>
			<view style="width: 750upx;height: 20upx;background-color: #f3f3f3;"></view>
			<view class="recommendAward-info" @click="isshowinfo=!isshowinfo">
				<view class="recommendAward-info-txt">用户须知</view>
			</view>
			<view class="showinfo" v-if="isshowinfo">
				<view class="showinfo-card">买家订单完成后，立即获得推荐奖励</view>
				<view class="showinfo-card showinfo-cards">友情提示:可用金额满<text>1</text>元后可能申请提现</view>
			</view>
			<view class="recommendAward-info-btn" @click="startWithdraw">我要提现</view>
			
			
			
		</view>
		
		<s-popup custom-class="demo-popup" position="center" v-model="visible" customClass='advPopup'>
		  <!-- 内容 -->
			<view class="invite-container">
				<view class="invite-title">申请提现</view>
				<picker @change="withdrawWayChange" :value="index" :range="array"  class="border-bottom">
				    <view class="uni-input">{{array[index] || '选择提现方式'}}</view>
				</picker>
				<view v-show="index===0 || index==='0'">
					<view class="border-bottom">
						<input type="text" v-model="wxno" placeholder="请输入微信号"/>
					</view>
				</view>
				<view v-show="index===1 || index==='1'">
					<view class="border-bottom">
						<input type="text" v-model="realname" placeholder="请输入姓名"/>
					</view>
					<view class="border-bottom">
						<input type="text" v-model="idcardno" placeholder="请输入身份证号"/>
					</view>
					<view class="border-bottom">
						<input type="text" v-model="bankcardno" placeholder="请输入银行卡号"/>
					</view>
					<view class="border-bottom">
						<input type="text" v-model="bankname" placeholder="请输入所属支行"/>
					</view>
				</view>
				<view v-show="index===2 || index==='2'">
					<view class="border-bottom">
						<input type="text" v-model="realname" placeholder="请输入姓名"/>
					</view>
					<view class="border-bottom">
						<input type="text" v-model="idcardno" placeholder="请输入身份证号"/>
					</view>
					<view class="border-bottom">
						<input type="text" v-model="alipayno" placeholder="请输入支付宝账号"/>
					</view>
				</view>
				
				<view class="border-bottom">
					<input type="number" @input='oninput' v-model="amount" placeholder="请输入要提现金额"/>
				</view>
				
				<view style="margin-top: 20upx;">
					<button class="adv-btn adv-btn2" @click="withdraw">确定</button>
				</view>
			</view>
		</s-popup>
	</view>
</template>

<script>
	import sPopup from '@/components/s-popup/index';
	export default {
		components: {
		   sPopup
		 },
		data() {
			return {
				reg:/^1[3456789]\d{9}$/,
				visible:false,
				isshowinfo:true,
				data:{},
				index:'',
				array:['微信','银行卡','支付宝'],
				uid:'',
				token:'',
				amount:'',
				wxno:'',
				bankcardno:'',
				alipayno:'',
				realname:'',
				idcardno:'',
				bankname:''
			}
		},
		mounted(){
			var userInfo=uni.getStorageSync('userInfo')
			if(userInfo!='' & userInfo!=null & userInfo!=undefined){
				this.uid=userInfo.uid
				this.token=userInfo.token
				this.getDetail()
			}
		},
		methods: {
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			to(where){
				uni.navigateTo({
					url:`./${where}`
				})
			},
			getDetail(){
				this.$loading()
				var that=this
				var params={
					uid:this.uid,
					token:this.token,
				}
				var url='&r=api.member.commission'
				  this.$apiPost(url,params).then((res) =>{
					  that.data=res.data
					  uni.hideLoading()
				  })
			},
			startWithdraw(){
				this.visible=true
			},
			oninput(e){
				var v=parseInt(e.detail.value)
				var c=parseInt(this.data.canCommission)
				if(v>=c){
					this.amount=c
				}else if(v<=1){
					this.amount=1
				}
			},
			intercept(){
				if(this.index!==''){
					// 微信
					if(this.index===0){
						if(!this.wxno){
							this.$msg('请填写微信账号')
							return false;
						}
					}
					// 银行卡
					else if(this.index===1){
						if(!this.realname){
							this.$msg('请填写真实姓名')
							return false;
						}
						if(!this.checkIdcard(this.idcardno)){
							this.$msg('请填写正确身份证号')
							return false;
						}
						if(!this.bankcardno || !this.checkBankno(this.bankcardno)){
							this.$msg('请填写正确银行卡号')
							return false;
						}
						if(!this.bankname){
							this.$msg('请填写所属支行')
							return false;
						}
					}
					// 支付宝
					else if(this.index===2){
						if(!this.realname){
							this.$msg('请填写真实姓名')
							return false;
						}
						if(!this.checkIdcard(this.idcardno)){
							this.$msg('请填写正确身份证号')
							return false;
						}
						if(!this.reg.test(this.alipayno)){
							this.$msg('请填写正确支付宝账号')
							return false;
						}
					}
				}else{
					this.$msg('请选择提现方式')
					return false;
				}
				if(this.amount>this.data.canCommission){
					this.$msg('超过可提现金额')
					return false;
				}
				return true;
			},
			withdraw(){
				if(!this.intercept()){
					return ;
				}
				this.$loading()
				var that=this
				var params={
					uid:this.uid,
					token:this.token,
					amount:this.amount,
					wxno:this.wxno,
					bankcardno:this.bankcardno,
					alipayno:this.alipayno,
					realname:this.realname,
					idcardno:this.idcardno,
					bankname:this.bankname,
					paytype:this.index+1
				}
				var url='&r=api.member.commission.withdrawal'
				  this.$apiPost(url,params).then((res) =>{
					  uni.hideLoading()
					  that.$msg('提交成功，请等待审核')
					  setTimeout(function(){
						  that.visible=false
						  that.reset()
						  that.getDetail()
					  },1000)
				  })
			},
			reset(){
				this.wxno=''
				this.bankcardno=''
				this.alipayno=''
				this.realname=''
				this.idcardno=''
				this.bankcardno=''
			},
			// 提现选择
			withdrawWayChange(e){
				console.log(e)
				var v=e.detail.value
				if(v!==this.index){
					this.index=v
					this.reset()
				}
				
			},
			// 身份证校验
			checkIdcard(personnumber) {
			    personnumber = personnumber.toUpperCase();
			    //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
			    if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(personnumber))) {
			        return false;
			    }
			    //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
			    //下面分别分析出生日期和校验位
			    var len, re;
			    len = personnumber.length;
			    if (len == 15) {
			        re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
			        var arrSplit = personnumber.match(re);
			
			        //检查生日日期是否正确
			        var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
			        var bGoodDay;
			        bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
			        if (!bGoodDay) {
			            return false;
			        }
			        else {
			            //将15位身份证转成18位
			            //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
			            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
			            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
			            var nTemp = 0, i;
			            personnumber = personnumber.substr(0, 6) + '19' + personnumber.substr(6, personnumber.length - 6);
			            for (i = 0; i < 17; i++) {
			                nTemp += personnumber.substr(i, 1) * arrInt[i];
			            }
			            personnumber += arrCh[nTemp % 11];
			            return true;
			        }
			    }
			    if (len == 18) {
			        re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
			        var arrSplit = personnumber.match(re);
			
			        //检查生日日期是否正确
			        var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
			        var bGoodDay;
			        bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
			        if (!bGoodDay) {
			            return false;
			        } else {
			            //检验18位身份证的校验码是否正确。
			            //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
			            var valnum;
			            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
			            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
			            var nTemp = 0, i;
			            for (i = 0; i < 17; i++) {
			                nTemp += personnumber.substr(i, 1) * arrInt[i];
			            }
			            valnum = arrCh[nTemp % 11];
			            if (valnum != personnumber.substr(17, 1)) {
			                return false;
			            }
			            return true;
			        }
			    }
			    return false;
			},
			checkBankno(bankno) {
			    var lastNum = bankno.substr(bankno.length - 1, 1);//取出最后一位（与luhm进行比较）
			    var first15Num = bankno.substr(0, bankno.length - 1);//前15或18位
			    var newArr = [];
			
			    for (var i = first15Num.length - 1; i > -1; i--) { //前15或18位倒序存进数组
			        newArr.push(first15Num.substr(i, 1));
			    }
			
			    var arrJiShu = []; //奇数位*2的积 <9
			    var arrJiShu2 = []; //奇数位*2的积 >9
			    var arrOuShu = []; //偶数位数组
			    for (var j = 0; j < newArr.length; j++) {
			        if ((j + 1) % 2 == 1) {//奇数位
			            if (parseInt(newArr[j]) * 2 < 9)
			                arrJiShu.push(parseInt(newArr[j]) * 2); else
			                arrJiShu2.push(parseInt(newArr[j]) * 2);
			        }
			        else //偶数位
			            arrOuShu.push(newArr[j]);
			    }
			
			    var jishu_child1 = [];//奇数位*2 >9 的分割之后的数组个位数
			    var jishu_child2 = [];//奇数位*2 >9 的分割之后的数组十位数
			    for (var h = 0; h < arrJiShu2.length; h++) {
			        jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
			        jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
			    }
			
			    var sumJiShu = 0; //奇数位*2 < 9 的数组之和
			    var sumOuShu = 0; //偶数位数组之和
			    var sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
			    var sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
			    var sumTotal = 0;
			    for (var m = 0; m < arrJiShu.length; m++) {
			        sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
			    }
			    for (var n = 0; n < arrOuShu.length; n++) {
			        sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
			    }
			    for (var p = 0; p < jishu_child1.length; p++) {
			        sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
			        sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
			    }
			    //计算总和
			    sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);
			    //计算Luhm值
			    var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
			    var luhm = 10 - k;
			    if (lastNum == luhm) {
			        return true;
			    }
			    else {
			        return false;
			    }
			}
		}
	}
</script>

<style>
	.top-nav{
		z-index: 999;
		background-color: #fff;
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		box-sizing: border-box;
		/* #ifdef APP-PLUS */
			padding-top: var(--status-bar-height);
		/* #endif */
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.nav-content{
		width: 100%;
		/* #ifdef APP-PLUS */
		display: flex;
		/* #endif */
		text-align: right;
		align-items: center;
		justify-content: space-between;
	}
	
	page{
			background-color: #fff;
		}
		.main{
			border-top: 20upx solid #f3f3f3;
			/* margin-top: 86upx; */
		}
	.recommendAward-set{
		width: 750upx;
		height: 45upx;
		margin-top: 71upx;
	}
	.recommendAward-set-back{
		width: 21upx;
		height: 37upx;
		margin: 4upx 0 0 24upx;
		float: left;
	}
	.recommendAward-set-title{
		width: 120upx;
		height: 100%;
		line-height: 45upx;
		font-family: PingFang-SC-Regular;
		font-size: 30upx;
		font-weight: normal;
		font-stretch: normal;
		color: #000000;
		float: left;
		margin-left: 270upx;
	}
	.recommendAward-set-right{
		width: 112upx;
		height: 100%;
		line-height: 45upx;
		font-family: PingFang-SC-Regular;
		font-size: 28upx;
		font-weight: normal;
		font-stretch: normal;
		color: #919191;
		float: left;
		margin-left: 150upx;
	}
	.recommendAward-card{
		width: 706upx;
		height: 90upx;
		margin: 0 auto;
		border-bottom: 2upx solid #f0f0f0;
	}
	.recommendAward-card-img1{
		width: 34upx;
		height: 34upx;
		float: left;
		margin: 28upx 12upx 0 25upx;
	}
	.recommendAward-card-img2{
		width: 33upx;
		height: 33upx;
		float: left;
		margin: 28upx 12upx 0 24upx;
	}
	.recommendAward-card-img3{
		width: 31upx;
		height: 30upx;
		float: left;
		margin: 30upx 13upx 0 26upx;
	}
	.recommendAward-card-left{
		height: 100%;
		line-height: 90upx;
		font-family: PingFang-SC-Regular;
		font-size: 26upx;
		font-weight: normal;
		font-stretch: normal;
		color: #575757;
		float: left;
	}
	.recommendAward-card-right{
		height: 100%;
		line-height: 90upx;
		font-family: PingFang-SC-Regular;
		font-size: 24upx;
		font-weight: normal;
		font-stretch: normal;
		color: #f82a2a;
		float: right;
	}
	.recommendAward-card-rights{
		color: #000000;
	}
	.recommendAward-info{
		width: 706upx;
		height: 80upx;
		border-bottom: 2upx solid #f0f0f0;
		margin: 0 auto;
	}
	.recommendAward-info-txt{
		height: 100%;
		line-height: 70upx;
		font-family: PingFang-SC-Regular;
		font-size: 26upx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 1px;
		color: #000000;
		float: left;
		margin-left: 4upx;
	}
	.recommendAward-info-img{
		width: 26upx;
		height: 15upx;
		float: right;
		margin: 36upx 5upx 0 0;
	}
	.showinfo-card{
		width: 706upx;
		font-family: PingFang-SC-Regular;
		font-size: 26upx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 1upx;
		color: #575757;
		margin: 22upx auto 0;
	}
	.showinfo-cards{
		margin: 8upx auto 0;
	}
	.showinfo-cards text{
		color: #f82a2a;
	}
	.recommendAward-info-btn{
		width: 80%;
		margin: 0 auto;
		height: 90upx;
		border-radius: 90upx;
		background-color: #ff6d7e;
		line-height: 90upx;
		margin-top: 100upx;
		text-align: center;
		font-family: PingFang-SC-Regular;
		font-size: 30upx;
		font-weight: normal;
		font-stretch: normal;
		color: #ffffff;
	}
	
	.adv-btn{
		width: 94%;
		margin: 0 auto;
		background-color: #fba1b0;
		color: #fff;
		border-radius: 6px;
		line-height: 1;
		border: none;
		outline: none;
		padding: 35upx 0;
		text-align: center;
		margin-bottom: 20upx;
		font-size: 12px;
	}
	
	.invite-container{
		padding: 30upx;
	}
	.invite-title{
		font-size: 18px;
		margin-bottom: 30upx;
	}
	.invite-container input{
		
		
	}
	.border-bottom{
		padding: 10upx 0;
		margin-bottom: 20upx;
		border-bottom: 1px solid #e9e9e9;
	}
	.adv-btn2{
		margin-top: 50upx;
	}
</style>
