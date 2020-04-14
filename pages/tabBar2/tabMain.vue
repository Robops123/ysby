<template>
    <view class="tabs">
        <scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
            <view v-for="(tab,index) in tabBars" :key="tab.id" class="uni-tab-item" :id="tab.id" :data-current="index" @click="ontabtap">
				<view class="uni-tab-item-icon">
					<image :src="tab.iconPath" mode="" v-if="tab.index!=tabIndex"></image>
					<image :src="tab.selecctedIconPath" mode="" v-if="tab.index==tabIndex"></image>
				</view>
                <view class="uni-tab-item-title" :class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab.name}}</view>
            </view>
        </scroll-view>
        <view class="line-h"></view>
        <swiper :current="tabIndex" class="swiper-box" style="flex: 1;" :duration="300" @change="ontabchange">
            <swiper-item class="swiper-item">
				<operating ></operating>
            </swiper-item>
			<swiper-item class="swiper-item">
				<vip ></vip>
			</swiper-item>
			<swiper-item class="swiper-item">
				<order ></order>
			</swiper-item>
			<swiper-item class="swiper-item">
				<financial ></financial>
			</swiper-item>
        </swiper>
    </view>
</template>
<script>
	import financial from './financial.vue'
	import operating from './operating.vue'
	import vip from './vip.vue'
	import order from './order.vue'
    export default {
        components: {
            // mediaItem
			financial,
			operating,
			vip,
			order
        },
        data() {
            return {
				curComponent:operating,
				comList:[financial,operating,vip,order],
                newsList: [],
                cacheTab: [],
                tabIndex: 0,
                tabBars: [{
                    name: '工作台',
                    id: 'gzt',
					index:0,
					iconPath:'../../static/img/icon/home.png',
					selecctedIconPath:'../../static/img/icon/homed.png'
                }, {
                    name: '会员',
                    id: 'hy',
					index:1,
					iconPath:'../../static/img/icon/home.png',
					selecctedIconPath:'../../static/img/icon/homed.png'
                }, {
                    name: '订单',
                    id: 'dd',
					index:2,
					iconPath:'../../static/img/icon/home.png',
					selecctedIconPath:'../../static/img/icon/homed.png'
                }, {
                    name: '财务',
                    id: 'cw',
					index:3,
					iconPath:'../../static/img/icon/home.png',
					selecctedIconPath:'../../static/img/icon/homed.png'
                }, {
                    name: '我的',
                    id: 'wd',
					index:4,
					iconPath:'../../static/img/icon/home.png',
					selecctedIconPath:'../../static/img/icon/homed.png'
                }],
                scrollInto: "",
                showTips: false,
                navigateFlag: false,
                pulling: false,
                refreshIcon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAB5QTFRFcHBw3Nzct7e39vb2ycnJioqK7e3tpqam29vb////D8oK7wAAAAp0Uk5T////////////ALLMLM8AAABxSURBVHja7JVBDoAgDASrjqj//7CJBi90iyYeOHTPMwmFZrHjYyyFYYUy1bwUZqtJIYVxhf1a6u0R7iUvWsCcrEtwJHp8MwMdvh2amHduiZD3rpWId9+BgPd7Cc2LIkPyqvlQvKxKBJ//Qwq/CacAAwDUv0a0YuKhzgAAAABJRU5ErkJggg=="
            }
        },
        onLoad() {
			var that=this
            setTimeout(()=>{
				uni.setNavigationBarTitle({
				    title: that.toggleTitle(0)
				});
              this.tabBars.forEach((tabBar) => {
                  this.newsList.push({
                      data: [],
                      isLoading: false,
                      refreshText: "",
                      loadingText: '加载更多...'
                  });
              });
            },350)
        },
        methods: {
            close(index1, index2) {
                uni.showModal({
                    content: '是否删除本条信息？',
                    success: (res) => {
                        if (res.confirm) {
                            this.newsList[index1].data.splice(index2, 1);
                        }
                    }
                })
            },
            loadMore(e) {
            },
            ontabtap(e) {
                let index = e.target.dataset.current || e.currentTarget.dataset.current;
				if(index==4){
					uni.switchTab({
						url:'/pages/tabBar/mine'
					})
				}
                this.switchTab(Number(index));
            },
            ontabchange(e) {
                let index = e.target.current || e.detail.current;
                this.switchTab(index);
            },
            switchTab(index) {
                // if (this.newsList[index].data.length === 0) {
                //     this.getList(index);
                // }
				var that=this
                if (this.tabIndex === index) {
                    return;
                }

                // 缓存 tabId
                if (this.newsList[this.tabIndex].data.length > 5) {
                    let isExist = this.cacheTab.indexOf(this.tabIndex);
                    if (isExist < 0) {
                        this.cacheTab.push(this.tabIndex);
                        //console.log("cache index:: " + this.tabIndex);
                    }
                }
				uni.setNavigationBarTitle({
				    title: that.toggleTitle(index)
				});
                this.tabIndex = index;
                this.scrollInto = this.tabBars[index].id;

                // 释放 tabId
                if (this.cacheTab.length > 5) {
                    let cacheIndex = this.cacheTab[0];
                    this.clearTabData(cacheIndex);
                    this.cacheTab.splice(0, 1);
                    //console.log("remove cache index:: " + cacheIndex);
                }
            },
            clearTabData(e) {
                this.newsList[e].data.length = 0;
                this.newsList[e].loadingText = "加载更多...";
            },
			toggleTitle(index){
				switch(index){
					case 0:
					return '工作台';
					case 1:
					return '会员';
					case 2:
					return '订单';
					case 3:
					return '财务';
					case 4:
					return '我的';
				}
			},
            refreshData() {},
            onrefresh(e) {
                var tab = this.newsList[this.tabIndex];
                if (!tab.refreshFlag) {
                    return;
                }
                tab.refreshing = true;
                tab.refreshText = "正在刷新...";

                setTimeout(() => {
                    this.refreshData();
                    this.pulling = true;
                    tab.refreshing = false;
					tab.refreshFlag = false;
                    tab.refreshText = "已刷新";
                    setTimeout(() => { // TODO fix ios和Android 动画时间相反问题
                        this.pulling = false;
                    }, 500);
                }, 2000);
            },
            onpullingdown(e) {
                var tab = this.newsList[this.tabIndex];
                if (tab.refreshing || this.pulling) {
                    return;
                }
                if (Math.abs(e.pullingDistance) > Math.abs(e.viewHeight)) {
                    tab.refreshFlag = true;
                    tab.refreshText = "释放立即刷新";
                } else {
                    tab.refreshFlag = false;
                    tab.refreshText = "下拉可以刷新";
                }
            },
            newGuid() {
                let s4 = function() {
                    return (65536 * (1 + Math.random()) | 0).toString(16).substring(1);
                }
                return (s4() + s4() + "-" + s4() + "-4" + s4().substr(0, 3) + "-" + s4() + "-" + s4() + s4() + s4()).toUpperCase();
            }
        }
    }
</script>

<style>
    /* #ifndef APP-PLUS */
    page {
        width: 100%;
        min-height: 100%;
        display: flex;
    }

    /* #endif */
	#tab-bar{
		height: 96upx;
		z-index: 998;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		box-sizing: border-box;
		background-color: rgb(255, 255, 255);
	}
	#tab-bar *{
		box-sizing: border-box;
	}
	#tab-bar::before{
		content: '';
		background-color: rgba(0, 0, 0, 0.33);
		position: absolute;
		    left: 0;
		    top: 0;
		    width: 100%;
		    height: 1px;
		    -webkit-transform: scaleY(.5);
		    transform: scaleY(.5);
	}
    .tabs {
        flex: 1;
        flex-direction: column;
        overflow: hidden;
        background-color: #f3f3f3;
        /* #ifdef MP-ALIPAY || MP-BAIDU */
        height: 100vh;
        /* #endif */
    }

    .scroll-h {
        width: 750rpx;
        flex-direction: row;
        /* #ifndef APP-PLUS */
        white-space: nowrap;
        /* #endif */
        /* flex-wrap: nowrap; */
        /* border-color: #cccccc;
		border-bottom-style: solid;
		border-bottom-width: 1px; */
    }

    .line-h {
        height: 1rpx;
        background-color: #cccccc;
    }

    .uni-tab-item {
        /* #ifndef APP-PLUS */
        display: inline-block;
        /* #endif */
		width: 20%;
		text-align: center;
        flex-wrap: nowrap;
       /* padding-left: 34rpx;
        padding-right: 34rpx; */
    }
	.uni-tab-item image{
		width: 100%;
		height: 100%;
		/* margin-bottom: -10upx; */
	}
	.uni-tab-item-icon{
		position: relative;
		    display: inline-block;
		    margin-top: 5px;
		    width: 50upx;
		    height: 50upx;
	}
    .uni-tab-item-title {
        color: rgb(122, 126, 131);
        font-size: 20upx;
		line-height: 0.7;
        flex-wrap: nowrap;
        /* #ifndef APP-PLUS */
        white-space: nowrap;
        /* #endif */
    }

    .uni-tab-item-title-active {
        color: #007AFF;
    }

    .swiper-box {
        flex: 1;
    }

    .swiper-item {
        flex: 1;
        flex-direction: row;
    }

    .scroll-v {
        flex: 1;
        /* #ifndef MP-ALIPAY */
        flex-direction: column;
        /* #endif */
        width: 750rpx;
    }

    .update-tips {
        position: absolute;
        left: 0;
        top: 41px;
        right: 0;
        padding-top: 5px;
        padding-bottom: 5px;
        background-color: #FDDD9B;
        align-items: center;
        justify-content: center;
        text-align: center;
    }

    .update-tips-text {
        font-size: 14px;
        color: #ffffff;
    }

    .refresh {
        width: 750rpx;
        height: 64px;
        justify-content: center;
    }

    .refresh-view {
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: center;
    }

	.refresh-icon {
		width: 30px;
		height: 30px;
		transition-duration: .5s;
		transition-property: transform;
		transform: rotate(0deg);
		transform-origin: 15px 15px;
	}

	.refresh-icon-active {
		transform: rotate(180deg);
	}

	.loading-icon {
		width: 20px;
		height: 20px;
		margin-right: 5px;
		color: #999999;
	}

    .loading-text {
        margin-left: 2px;
        font-size: 16px;
        color: #999999;
    }

    .loading-more {
        align-items: center;
        justify-content: center;
        padding-top: 10px;
        padding-bottom: 10px;
        text-align: center;
    }

    .loading-more-text {
        font-size: 28rpx;
        color: #999;
    }
	
	.swiper-box{
		height: calc(100% - 100upx);
	}
	.swiper-box .swiper-item{
		overflow: auto;
	}
</style>
