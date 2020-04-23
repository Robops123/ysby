<template>
	<view>
		<u-parse :content="article" @preview="preview" @navigate="navigate"></u-parse>
	</view>
</template>

<script>
	import uParse from '@/components/gaoyia-parse/parse.vue'
	export default {
	  components: {
	    uParse
	  },
	  data () {
	    return {
	        article: '<p>11111</p><p>222</p><p><img src="http://192.168.1.157/yishuban2/attachment/images/2/2020/04/vXu68Q7lC2PpPFp3YYBCXb7uruoBp9.png" alt="picture01.png" style="max-width: 100%"/></p><p><img src="http://192.168.1.157/yishuban2/attachment/images/2/2020/04/o3x8U38Lx3KtkV3fxQkXxU7Fz7O2Oo.png" alt="picture01.png" style="max-width: 100%"/></p><p><img src="http://192.168.1.157/yishuban2/attachment/images/2/2020/04/CjD3iXHIPHp37ZCrC7RcZUAcZJiHIr.png" alt="picture01.png" style="max-width: 100%"/></p><p><video poster="http://localhost/web/resource/images/player.jpg" class="edui-upload-video video-js vjs-default-skin video-js" controls="" preload="none" width="300" height="200" src="http://localhost/yishuban2/attachment/videos/2/2020/04/H6oMbvXM8OB8w8ZoX2ZOmbzIWA62wi.mp4" data-setup="{}"><source src="http://localhost/yishuban2/attachment/videos/2/2020/04/H6oMbvXM8OB8w8ZoX2ZOmbzIWA62wi.mp4" type="video/mp4"/></video></p>'
	    }
	  },
	  methods: {
	    preview(src, e) {
	      // do something
	    },
	    navigate(href, e) {
	      // do something
	    }
	  }
	}
</script>

<style>
</style>
