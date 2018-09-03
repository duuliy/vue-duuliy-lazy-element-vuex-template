<template>
  <el-col class="detail" :span='23'>
    <div class="tit">
      <ul>
        <li>
          {{pageName}}
        </li>
        <li>
          {{organName}}
        </li>
      </ul>
    </div>
    <div class="descp">
      <ul>
        <li>
          名字: {{organName2}}
        </li>
        <li>
          描述: {{organDes}}
        </li>
      </ul>
      <ul>
        <li>
          上级机构: {{HiAuthority}}
        </li>
        <li>
          到期时间: {{ExpiryTime}}
        </li>
        <li>
          创建时间: {{CreationTime}}
        </li>
      </ul>
      <ul>
        <li>
          剩余字数: {{NumRewords}}
        </li>
        <li>
          用户数量: {{NumUsers}}
        </li>
      </ul>
    </div>
    <div class="cont">
      <div class="cont_left">
        <el-input placeholder="请输入搜索名字" class="input-with-select" v-model='userName'>
          <el-button slot="append" icon="el-icon-search" style='width: 50px;text-algin:center;' @click='searchUser'></el-button>
        </el-input>
      </div>
      <div class="cont_right">
        <!-- <el-button @click="handleEditAll()" style='color:#FFFFFF;background:#5F92EF;width:78px;height:40px;'>编辑</el-button> -->
        <el-button @click="openAddUser" style='color:#FFFFFF;background:#5F92EF;width:102px;height:40px;'>添加用户</el-button>
        <!-- //这是弹框 -->
        <el-dialog :title="userState" :visible.sync="dialogFormVisible">
          <el-form :model="form" :rules="rule" label-position="top" ref="ruleForm">
            <el-form-item label="昵称" :label-width="formLabelWidth">
              <el-input v-model="form.name" auto-complete="off" max-length='80'></el-input>
            </el-form-item>
            <el-form-item label="职位" :label-width="formLabelWidth">
              <el-select v-model="form.position" placeholder="请选择">
                <el-option v-for="item in options" :key="item.id" :value="item.id" :label="item.name">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="组织机构" :label-width="formLabelWidth">
              <el-select v-model="form.organizations" placeholder="请选择">
                <el-option v-for="item in options2" :key="item.id" :value="item.id" :label="item.name">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="用户名" :label-width="formLabelWidth">
              <el-input v-model="form.loginuser" auto-complete="off" max-length='80'></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="emil" :label-width="formLabelWidth">
              <el-input type="email" v-model="form.emil" class="form-control" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话号码" prop="phonenum" :label-width="formLabelWidth" max-length='11'>
              <el-input v-model="form.phonenum" class="form-control" auto-complete="off"></el-input>
            </el-form-item>

            <div class="frametype">
              <p>领域类型</p>
              <el-checkbox-group v-model="form.checkList">
                <el-checkbox :label="item.id" v-for='item in domainList' :key='item.id'>{{item.name}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" style="margin:25px 0 25px 0;background:#5F92EF;float:right;" @click="saveUser">保存</el-button>
          </div>
        </el-dialog>
        <!-- //这是弹框 -->
      </div>
      <div class="cont_con">
        <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'rgba(226, 235, 243, 1)'}"
          v-loading="LOADINGs"
          element-loading-text="Loading...."
          element-loading-spinner="el-icon-loading" 
          element-loading-background="rgba(0, 0, 0, 0.8)"           
         :row-class-name="tableRowClassName">
          <el-table-column prop="name" label="昵称">
          </el-table-column>
          <el-table-column prop="userName" label="用户名">

          </el-table-column>
          <el-table-column prop="appEmail" label="电子邮箱">

          </el-table-column>
          <el-table-column prop="appPhoneNumber" label="电话号码">

            <!-- </el-table-column>
          <el-table-column prop="appUserInfo" label="应用应户名">

          </el-table-column>
          <el-table-column prop="normalizedEmail" label="应用电子邮件">

          </el-table-column>
          <el-table-column prop="appPhoneNumber" label="应用电话号码"> -->

          </el-table-column>
          <el-table-column prop="createTimeDesc" label="创建时间">

          </el-table-column>
          <el-table-column prop="userType" label="用户类型">

          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handlerouter(scope.$index, scope.row)" style='color:#2E62F2;background:#DEE9FF;border:1px solid #ADC1F7;'>详情</el-button>
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" style='color:#0BA4E2;background:#D8F2FF;border:1px solid #87D3F4;'>编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="paging">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage3" :page-size="pageSize" layout="prev, pager, next, jumper" :total="totaL2">
        </el-pagination>
      </div>
    </div>

    <!-- 这里是弹框 -->
    <el-dialog class="detajectileFrame" title="用户详情：" :visible.sync="centerDialogVisible" width="30%">
      <userDetails :userRoute="userRoute"></userDetails>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 这里是弹框 -->
  </el-col>
</template>

<script>
import "@/assets/css/public.css";
import userDetails from "./userDetails";
import { mapState, mapMutations, mapActions } from "vuex";
import { checkid } from "@/utils/user";

export default {
  name: "userStati",
  components: {
    userDetails
  },
  data() {
    let checkPhone = (rule, value, callback) => {
      // if (!value) {
      //   return callback(new Error("手机号不能为空"));
      // } else {
      const reg = /^1[0-9]{10}$/;
      if (reg.test(value) || value == "") {
        callback();
      } else {
        return callback(new Error("请输入正确的手机号"));
      }
      // }
    };
    return {
      pageName: "",
      organName: "",
      organName2: "",
      organDes: "",
      HiAuthority: "",
      ExpiryTime: "",
      CreationTime: "",
      NumRewords: "",
      NumUsers: "",
      tableData: [],
      userName: "",
      //分页
      currentPage3: 1,
      pageSize: 10,
      totaL2: 1,
      pageIndex: "",
      //弹框
      myId: "",
      nameS: unescape(localStorage.getItem("userinfo")),
      dialogFormVisible: false,
      options: [
        {
          id: 6,
          name: "管理者"
        },
        {
          id: 0,
          name: "职员"
        }
      ],
      options2: [],
      // domainList: [],
      userState: "",
      form: {
        name: "",
        emil: "",
        loginuser: "",
        phonenum: "",
        position: "",
        organizations: "",
        checkList: []
      },
      rule: {
        phonenum: [{ validator: checkPhone, trigger: "blur" }],
        emil: [
          // { required: true, message: "邮箱地址不能为空", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ]
      },
      formLabelWidth: "120px",
      //用户详情弹框
      centerDialogVisible: false,
      userRoute: ""
    };
  },
  beforeRouteEnter(to, from, next){
    checkid()
    next();
  },
  async created() {
    let nameS;
    await this.GETBYQUERYASYNC({
      name: this.$route.query.name,
      pageIndex: 0
    });
    this.totaL2 = this.tableData3.length;
    this.tableData = this.tableData3.splice(0, 10);

    if (this.$route.query.name) {
      nameS = this.$route.query.name;
    } else {
      nameS = this.nameS.userName;
    }
    await this.CALLGETBYQUERY({ name: nameS });

    // console.log(this.tableData23);
    this.pageName = this.tableData23.name;
    this.organName = this.tableData23.parentName;
    this.organName2 = this.tableData23.name;
    this.organDes = this.tableData23.description;
    this.HiAuthority = this.tableData23.parentName;
    this.ExpiryTime = this.tableData23.dateDueDesc;
    this.CreationTime = this.tableData23.createTimeDesc;
    this.NumRewords = this.tableData23.remainWords;
    this.NumUsers = this.tableData23.userCount;
  },
  computed: {
    ...mapState({
      tableData3: state => state.userStati.tableData3,
      tableData23: state => state.userStati.tableData23,
      domainList: state => state.userStati.domainList,
      addmessage: state => state.userStati.addmessage,
      upmessage: state => state.userStati.upmessage,
      LOADINGs: state => state.nav.LOADINGs
    })
  },
  methods: {
    ...mapActions([
      "GETBYQUERYASYNC",
      "CALLGETBYQUERY",
      "GETDOMAINTYPESLISTASYNC",
      "GETUSERDETAILDTOBYIDASYNC",
      "ADDASYNC",
      "UPDATEUSERASYNC"
    ]),
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    //下页
    async handleCurrentChange(val) {
      this.pageIndex = val - 1;
      await this.GETBYQUERYASYNC({
        name: this.$route.query.name,
        pageIndex: this.pageIndex,
        pageSize: 10
      });
      this.tableData = this.tableData3;
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 != 0) {
        return "warning-row";
      }
      return "";
    },
    async searchUser() {
      await this.GETBYQUERYASYNC({
        name: this.userName
      });
      this.totaL2 = this.tableData3.length;
      this.tableData = this.tableData3;
    },
    handleEditAll() {},

    async openUser() {
      let myId2;
      let Dtos = [];
      await this.GETDOMAINTYPESLISTASYNC();
      if (this.myId) {
        myId2 = this.myId;
      } else {
        myId2 = this.nameS.id;
      }
      const res2 = await this.$axios.post(
        "/api/App/GetUserDetailDtoByIdAsync?id=" + myId2
      );
      // console.log(this.options2);
      if (res2.data) {
        this.options2 = res2.data.orgTree;
        this.form.organizations = this.options2[0].id;
        res2.data.userDetail.domainTypeDtos.map(item => {
          Dtos.push(item.id);
        });
        this.form.checkList = Dtos;
        this.dialogFormVisible = true;
      }
    },
    openAddUser() {
      this.userState = "添加用户:";
      this.form = {
        name: "",
        emil: "",
        loginuser: "",
        phonenum: "",
        position: "",
        organizations: "",
        checkList: []
      };
      this.nextTick(() => {
        this.form.checkList = [];
      });
      this.openUser();
    },
    addUser() {
      // console.log(this.form);
      this.$refs["ruleForm"].validate(async valid => {
      if (valid) {
        await this.ADDASYNC({
          password: "a123456",
          name: this.form.name,
          userType: this.form.position,
          organizationId: this.form.organizations,
          userName: this.form.loginuser,
          email: this.form.emil,
          phone: this.form.phonenum,
          domainTypeIds: this.form.checkList
        });
      } else {
        console.log("error submit!!");
        return false;
      }})

      if (this.addmessage.isSuccess === true) {
        this.$message({
          message: "恭喜你，添加成功!",
          type: "success"
        });
      } else {
        this.$message.error("添加失败:" + this.addmessage.errorMessage);
      }
      this.myId = "";
      this.dialogFormVisible = false;
    },
    editUser() {
      // console.log(this.form);
      this.$refs["ruleForm"].validate(async valid => {
      if (valid) {
        await this.UPDATEUSERASYNC({
          appUserId: this.myId,
          name: this.form.name,
          userType: this.form.position,
          organizationId: this.form.organizations,
          userName: this.form.loginuser,
          email: this.form.emil,
          phone: this.form.phonenum,
          domainTypeIds: this.form.checkList
        });
      } else {
        console.log("error submit!!");
        return false;
      }})

      if (this.upmessage.isSuccess === true) {
        this.$message({
          message: "恭喜你，编辑成功!",
          type: "success"
        });
      } else {
        this.$message.error("编辑失败:" + this.upmessage.errorMessage);
      }
      this.myId = "";
      this.dialogFormVisible = false;
    },
    saveUser() {
      if (this.userState.indexOf("添加") != -1) {
        this.addUser();
      } else if (this.userState.indexOf("编辑") != -1) {
        this.editUser();
      }
    },
    async handlerouter(index, row) {
      const res = await this.$axios.post(
        "/api/App/GetUserDetailDtoByIdAsync?id=" + row.appUserId
      );
      // console.log(res.data);
      res.data.userDetail.domainTypeDtos.map(item => {
        if (item.content == "标准版") {
          item.src = "/static/images/img_normal.png";
        } else if (item.content == "金融财经版") {
          item.src = "/static/images/img_fnacial.png";
        } else if (item.content == "法律合同版") {
          item.src = "/static/images/img_falv.png";
        } else if (item.content == "国际工程版") {
          item.src = "/static/images/img_engnieer.png";
        } else if (item.content == "生物医药版") {
          item.src = "/static/images/img_hos.png";
        } else if (item.content == "专利") {
          item.src = "/static/images/img_regonization.png";
        }
      });
      this.userRoute = res.data.userDetail;
      this.centerDialogVisible = true;
    },
    handleEdit(index, row) {
      // console.log(index, row);
      this.userState = "编辑用户:";
      this.myId = row.appUserId;
      this.openUser();
      this.form.name = row.name;
      this.form.position = row.userType;
      this.form.loginuser = row.userName;
      this.form.emil = row.appEmail;
      this.form.phonenum = row.appPhoneNumber;

      this.dialogFormVisible = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.detail {
  margin: 30px 0 0 40px;
  // overflow: hidden;
}
.tit {
  border-bottom: 2px solid rgba(194, 198, 219, 1);
  ul li {
    color: rgba(45, 45, 45, 1);
    font-size: 20px;
    line-height: 28px;
    &:nth-of-type(2) {
      font-size: 14px;
      padding-bottom: 10px;
    }
  }
}
.descp {
  border-bottom: 2px solid rgba(194, 198, 219, 1);
  height: 110px;
  ul {
    margin: 5px 0 0 40px;
    float: left;
    li {
      color: rgba(45, 45, 45, 1);
      font-size: 14px;
      line-height: 20px;
      margin-top: 10px;
    }
    &:nth-of-type(1) {
      margin-left: 0;
    }
  }
}
/deep/.cont {
  .cont_left {
    float: left;
    font-size: 16px;
    color: rgba(40, 40, 40, 1);
    line-height: 22px;
    margin: 15px 0 0 0;
    font-weight: 700;
    position: relative;
    > div {
      margin-left: 5px;
      width: 264px;
      height: 40px;
      &:first-child {
        input {
          & + div {
            color: #fff;
            border: none;
            background-color: #3878ed;
            width: 36px;
            padding: 0 12px 0 0;
            text-align: center;
            i {
              font-size: 23px;
            }
          }
        }
      }
    }
  }
  .cont_right {
    float: left;
    margin: 15px 0 15px 35px;
    .el-dialog {
      width: 510px;
      overflow: hidden;
      .el-dialog__header {
        font-weight: 700;
        background-color: #eaedf3;
      }
      .el-dialog__body {
        padding: 15px 20px;
      }
      /deep/.el-form-item {
        width: 200px;
        float: left;
        &:nth-of-type(3),
        &:nth-of-type(6) {
          margin-left: 65px;
        }
        &:nth-of-type(1) {
          width: 100%;
          margin: 0 0 5px 0;
        }
        &:nth-of-type(4) {
          width: 100%;
          border-top: 1.5px solid rgba(221, 221, 221, 1);
          margin: 0 0 5px 0;
          padding-top: 15px;
        }
        > label {
          padding: 0 0 0 0;
        }
      }
      .frametype {
        width: 100%;
        padding-top: 15px;
        float: left;
        border-top: 1.5px solid rgba(221, 221, 221, 1);
        p {
          line-height: 30px;
        }
        .el-checkbox {
          margin-left: 100px;
          font-size: 14px;
          &:nth-of-type(1),
          &:nth-of-type(4) {
            margin-left: 0;
          }
          &:nth-of-type(4),
          &:nth-of-type(5),
          &:nth-of-type(6) {
            margin-top: 15px;
          }
          &:nth-of-type(5) {
            margin-left: 72px;
          }
          .el-checkbox__inner {
            width: 18px;
            height: 18px;
            &::after {
              height: 10px;
              left: 6px;
            }
          }
        }
      }
    }
  }
}
/deep/.cont_con {
  .el-table .warning-row {
    background-color: #fafafa;
  }
}
.paging {
  float: right;
  margin-top: 25px;
}
/deep/.detajectileFrame {
  .el-dialog {
    .el-dialog__header {
      background-color: #eaedf3;
    }
    .el-dialog__body {
      padding: 0 20px;
    }
  }
}
</style>