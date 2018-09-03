export default {
	data(){
		return{
			loadingFlag:false,
		}
	},
	
	watch:{
		active(){
			this.loadingFlag=true;
			setTimeout(()=>{
				this.loadingFlag=false;
			},500);
		}
	}
}