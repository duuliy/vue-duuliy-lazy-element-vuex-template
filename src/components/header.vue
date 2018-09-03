<template>
  <header>
    <div class="logo">
      <a href="/UI/module/home.html">
        <img src="../../static/images/logo.png" alt="">
      </a>
      <h1>后台管理系统</h1>
    </div>
    <div class="userinfo">
      <img src="../assets/img/userHead.gif" alt="">
      <el-dropdown>
        <span class="el-dropdown-link">
          {{user.name}}
        </span>
        <el-dropdown-menu slot="dropdown">
          <a href="home.html">
            <el-dropdown-item>回到首页</el-dropdown-item>
          </a>
          <a href="account.html">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </a>
          <a @click='logout'>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </a>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- <i class="w_icon icon-tuichu"></i>
      <span class="logout" @click="logout">退出</span> -->
    </div>
  </header>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      user: {
        name: "王五"
      }
    };
  },
  created() {
    this.name = unescape(localStorage.getItem("userinfo"));
  },
  computed: {
    ...mapState({
      logoutmeg: state => state.nav.logoutmeg
    })
  },
  methods: {
    ...mapActions(["SignOutAsync"]),
    async logout() {
      await this.SignOutAsync();
      if (this.logoutmeg.status == 200) {
        location.href = "home.html";
      } else {
        this.$message.error("注销失败！");
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
header {
  height: 90px;
  line-height: 90px;
  background-color: #292b33;
  color: #fff;
  padding: 0 35px;
  .logo {
    float: left;
    img {
      vertical-align: middle;
    }
    h1 {
      height: 56px;
      line-height: 56px;
      margin-left: 24px;
      padding-left: 18px;
      border-left: 1px solid #4498ff;
      vertical-align: middle;
      font-size: 24px;
      color: #9ccafa;
      display: inline-block;
    }
  }
  .userinfo {
    float: right;
    height: inherit;
    cursor: pointer;
    img {
      width: 48px;
      height: 48px;
      margin: -10px 14px 0 0;
      border-radius: 50%;
      vertical-align: middle;
    }
    span {
      color: #8088a7;
      font-weight: 400;
      font-size: 16px;
    }
    .logout {
      margin-left: 13px;
      color: #7a7e8f;
      cursor: pointer;
    }
  }
  .el-dropdown {
    display: inline;
  }
  .icon-tuichu {
    margin-left: 57px;
    color: #6b7081;
    font-size: 26px;
    &:before {
      vertical-align: middle;
    }
  }
}
</style>
