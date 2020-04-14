<template>
	<view class="padding">
		<view class="list" v-for="(item,index) in 3" :key='index'>
			<image src="../../static/img/bg/activity.png" mode=""></image>
				<view class="info">
					<view class="s2 title">
						儿童木马麻木童儿儿童木马麻木童儿儿童木马麻木童儿儿童木马麻木童儿
						童儿儿童木马麻木童儿儿童木马麻木童儿童儿儿童木马麻木童儿儿童木马麻木童儿
					</view>
					<view class="bottom-content cr s5"><text class="s1">$</text>79.80</view>
					<view class="buy">
						<icon type="" class="icon-fire iconfont cr"></icon>
					</view>
				</view>
		</view>
	</view>
</template>

<script>
</script>

<style>
	.list{
		margin-bottom: 20upx;
	}
	.list>image,
	.list .info
	{
		display: inline-block;
		vertical-align: top;
	}
	.list>image{
		width: 280upx;
		height: 280upx;
		border-radius: 10px;
		margin-right: 20upx;
	}
	.list .title{
		line-height: 1.5;
		width: 360upx;
		height: 72upx;
		overflow:hidden;//一定要写
		    text-overflow: ellipsis;//超出省略号
		    display:-webkit-box;//一定要写
		    -webkit-line-clamp: 2;//控制行数
		    -webkit-box-orient: vertical;//一定要写
	}
	.list .bottom-content{
		margin: 80upx 0 30upx;
	}
	.buy{
		text-align: right;
	}
	.buy icon{
		border: 1px solid #ff6d7e;
		border-radius: 50%;
		padding: 10upx;
	}
</style>
