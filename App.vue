<script>
	
	export default {
		onLaunch: function() {
			// console.log('App Launch')
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		},
	}
</script>

<style>
@import "./static/css/iconfont.css";
	@import './static/css/common.css';
	@import url("/components/gaoyia-parse/parse.css");

	.slideInUp {
	    -webkit-animation-name: slideInUp;
	    animation-name: slideInUp
	}
	@keyframes slideInUp {
	    0% {
	        -webkit-transform: translate3d(0,100%,0);
	        transform: translate3d(0,100%,0);
	        visibility: visible
	    }
	
	    to {
	        -webkit-transform: translateZ(0);
	        transform: translateZ(0)
	    }
	}
	
	@keyframes shake {
	    0%,to {
	        -webkit-transform: translateZ(0);
	        transform: translateZ(0)
	    }
	
	    10%,30%,50%,70%,90% {
	        -webkit-transform: translate3d(-10px,0,0);
	        transform: translate3d(-10px,0,0)
	    }
	
	    20%,40%,60%,80% {
	        -webkit-transform: translate3d(10px,0,0);
	        transform: translate3d(10px,0,0)
	    }
	}
	
	.shake {
	    -webkit-animation-name: shake;
	    animation-name: shake
	}
	.animated {
	    -webkit-animation-duration: 0.3s;
	    animation-duration: 0.3s;
	    -webkit-animation-fill-mode: both;
	    animation-fill-mode: both
	}
	
	
</style>
