<template>
	<el-col class="userDetails" :span="24">
		<div class="cont">
			<ul>
				<li>
					<p>
						<span>昵称:</span>
						<span>{{userRoute.name}}</span>
					</p>
				</li>
				<li>
					<p>
						<span>用户名:</span>
						<span>{{userRoute.userName}}</span>
					</p>
				</li>
				<li>
					<p>
						<span>电子邮件:</span>
						<span>{{userRoute.email}}</span>
					</p>
				</li>
				<li>
					<p>
						<span>电话号码:</span>
						<span>{{userRoute.phone}}</span>
					</p>
				</li>
				<li>
					<p>
						<span>组织机构:</span>
						<span>{{userRoute.organizationName}}</span>
					</p>
				</li>
				<li>
					<p>
						<span>机构剩余字数:</span>
						<span>{{userRoute.organizationRemainWords}}</span>
					</p>
				</li>
				<li>
					<p>
						<span>字数到期日期:</span>
						<span>{{userRoute.organizationDateDueDesc}}</span>
					</p>
				</li>
				<li>
					<p>
						<span>创建时间:</span>
						<span>{{userRoute.createTimeDesc}}</span>
					</p>
				</li>
				<li>
					<p>
						<span>类型:</span>
						<span>{{userRoute.userType}}</span>
					</p>
				</li>
			</ul>
			<!-- <ul>
				<li>
					<p>
						<span>应用登录名:</span>
						<span>{{AppliuserName}}</span>
					</p>
				</li>
				<li>
					<p>
						<span>应用电子邮件:</span>
						<span>{{AppliuserEmail}}</span>
					</p>
				</li>
				<li>
					<p>
						<span>应用电话号码:</span>
						<span>{{AppliuserPhone}}</span>
					</p>
				</li>
			</ul> -->
		</div>
		<div class="VersionDomain">
			<p>版本领域</p>
			<ul>
				<li v-for='item in userRoute.domainTypeDtos' :key='item.id'>
					<img :src="item.src" alt="">
					<span>{{item.content}}</span>
				</li>
			</ul>
		</div>
	</el-col>
</template>

<script>
export default {
  name: "userDetails",
  components: {},
  data() {
    return {
      userName: "",
      loginName: "",
      loginEmail: "",
      loginphone: "",
      organliza: "",
      orNum: "",
      wordexpidate: "",
      createTime: "",
      type: "",
      AppliuserName: "",
      AppliuserEmail: "",
      AppliuserPhone: "",
      domainTypeDtos: []
    };
	},
	props:{
			userRoute:{

			},
	},
  created() {

    // this.loginName = this.userRoute.userName;
    // this.loginEmail = this.userRoute.email;
    // this.loginphone = this.userRoute.phone;
    // //
    // this.organliza = this.userRoute.organizationName;
    // this.orNum = this.userRoute.name;
    // this.wordexpidate = this.userRoute.organizationRemainWords;
    // this.createTime = this.userRoute.createTimeDesc;
    // this.type = this.userRoute.userType;
    // //
    // this.AppliuserName=res.data.appEmail;
    // this.AppliuserEmail=res.data.appEmail;
    // this.AppliuserPhone=res.data.appPhoneNumber;
    //
    // this.domainTypeDtos = this.userRoute.domainTypeDtos;

    // this.domainTypeDtos.map(item => {
    //   if (item.content == "标准版") {
    //     item.src = "/static/images/img_normal.png";
    //   } else if (item.content == "金融财经版") {
    //     item.src = "/static/images/img_fnacial.png";
    //   } else if (item.content == "法律合同版") {
    //     item.src = "/static/images/img_falv.png";
    //   } else if (item.content == "国际工程版") {
    //     item.src = "/static/images/img_engnieer.png";
    //   } else if (item.content == "生物医药版") {
    //     item.src = "/static/images/img_hos.png";
    //   } else if (item.content == "专利") {
    //     item.src = "/static/images/img_regonization.png";
    //   }
    // });

  },
  methods: {

  },
  mounted() {}
};
</script>


<style lang="scss" scoped>
.userDetails {
  overflow: hidden;
  .cont {
    border-bottom: 2px solid rgba(194, 198, 219, 1);
    overflow: hidden;
    ul {
      float: left;
      &:nth-child(2) {
        margin-left: 200px;
      }
      li {
        p {
          font-weight: 700;
          font-size: 14px;
          color: rgba(45, 45, 45, 1);
          line-height: 35px;
          span {
            display: inline-block;
            width: 140px;
            font-weight: 500;
            &:nth-of-type(2) {
              font-weight: 700;
              width: 210px;
            }
          }
        }
        &:nth-of-type(5) {
          margin-top: 40px;
        }
        &:nth-of-type(8) {
          margin-top: 40px;
        }
      }
    }
  }
  .VersionDomain {
    color: rgba(45, 45, 45, 1);
		padding-top: 15px;
    p {
      font-size: 14px;
      line-height: 20px;
      font-weight: 700;
    }
    ul {
			margin:15px 0;
			li {
      width: 100%;
      background-color: rgba(240,243,247,1);
      height: 48px;
      img {
        margin: 7px 15px 0 7px;
        float: left;
      }
      span {
        font-size: 16px;
        line-height: 48px;
        font-weight: 700;
      }
    }
		}
  }
}
</style>