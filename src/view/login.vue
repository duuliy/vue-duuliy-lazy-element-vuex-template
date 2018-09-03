<template>
	<div class="login">
		<div class="box wh-center">
			<h1 class="title">译图后台管理系统</h1>
			<div class="inpBox mt50">
				<i class="iconfont icon-user h-center"></i>
				<input class="inp h-center" type="text" />
			</div>
			
			<div class="inpBox mt20">
				<i class="iconfont icon-lock h-center"></i>
				<input class="inp h-center" :type="pwdType" />
				<i class="iconfont icon-eye h-center" @click="toggleEye"></i>
			</div>
			
			<el-button type="primary" class="btn" @click="login">登录</el-button>
			
			<!--<el-input name="uname" type="text" v-model="uname" autoComplete="on" placeholder="username" />-->
		</div>
	</div>
</template>

<script>
	import { mapState, mapMutations, mapActions } from "vuex"
	export default {
		name: 'login',
		components: {

		},
		data() {
			return {
				uname: '',
				pwd:'',
				eyeFlag:false,
			}
		},
		computed:{
			pwdType(){
				if(this.eyeFlag){
					return 'text'
				}
				return 'password'
			}
		},
		methods: {
			toggleEye() {
				this.eyeFlag=!this.eyeFlag
			},
			login(){
				this.$message.success('登录成功！');
				setTimeout(()=>{
					this.$router.replace('/home');
				},500)
			}
		},
		created() {

		},
		mounted() {

		}

	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	$bg:#2d3a4b;
	$light_gray:#eee;
	.login {
		width: 100%;
		height: 100%;
		background: $bg;
		.box {
			width: 450px;
			height: 500px;
			.title {
				font-size: 24px;
				font-weight: bold;
				color: #fff;
				text-align: center;
			}
			.inpBox{
				position:relative;
				width:100%;
				height:50px;
				border:1px solid #3e4957;
				background:#283443;
				border-radius:4px;
				.iconfont{
					font-size:20px;
					color:#889aa4;
				}
				.icon-user,.icon-lock{
					left:14px;
				}
				.icon-eye{
					right:14px;
					cursor: pointer;
					&:hover{
						color:#fff;
					}
				}
				.inp{
					font-size:14px;
					color:#fff;
					width:300px;
					border:none;
					background:transparent;
					left:45px;
				}
			}
			.btn{
				display: block;
				width:200px;
				margin:50px auto 0;
			}
		}
	}
</style>