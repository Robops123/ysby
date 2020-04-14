<script>
	export default {
		onLaunch: function() {
			this.getDeviceHeight()
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			getDeviceHeight(){
				var info=uni.getSystemInfoSync()
				console.log(info)
			}
		}
	}
</script>

<style>

</style>
