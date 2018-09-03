<template>
  <el-col class="Organization" :span="23">
    <div class="tit">

      <div class="tit_left">
        显示 &nbsp;&nbsp;
        <el-dropdown @command="handleCommand">
          <el-button>
            {{pageSize}}
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="5">5</el-dropdown-item>
            <el-dropdown-item command="8">8</el-dropdown-item>
            <el-dropdown-item command="10">10</el-dropdown-item>
            <el-dropdown-item command="16">16</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        &nbsp;&nbsp; 项结果
      </div>

      <div class="tit_right">
        用户名:
        <el-input placeholder="请输入搜索名字" class="input-with-select" v-model='userName'>
          <el-button slot="append" icon="el-icon-search" style='width: 50px;text-algin:center;' @click='searchUser'></el-button>
        </el-input>
      </div>
    </div>

    <div class="cont">
      <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'rgba(226, 235, 243, 1)'}" 
      v-loading="LOADINGs"
       element-loading-text="Loading...."
        element-loading-spinner="el-icon-loading" 
        element-loading-background="rgba(0, 0, 0, 0.8)" :row-class-name="tableRowClassName">
        <el-table-column prop="name" label="名字">
        </el-table-column>
        <el-table-column prop="parentName" label="上级机构">

        </el-table-column>
        <el-table-column prop="remainWords" label="剩余字数">

        </el-table-column>
        <el-table-column prop="dateDueDesc" label="到期日期">

        </el-table-column>
        <el-table-column prop="createTimeDesc" label="创建时间">

        </el-table-column>
        <el-table-column prop="description" label="描述">

        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleDetails(scope.$index, scope.row)" style='color:#2E62F2;background:#DEE9FF;border:1px solid #ADC1F7;'>详情</el-button>
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" style='color:#0BA4E2;background:#D8F2FF;border:1px solid #87D3F4;'>编辑</el-button>
            <el-button size="mini" @click="handleDelete(scope.$index, scope.row)" style='color:#E82929;background:#FFE3DD;border:1px solid #FFA6A6;'>删除</el-button>

          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="paging">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="prev, pager, next, jumper" :total="totaL2">
      </el-pagination>
    </div>
    <!-- //这是弹框 -->
    <el-dialog title="编辑组织机构" :visible.sync="dialogFormVisible" class="solt_right">
      <el-form :model="form" label-position="top">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.descrip" auto-complete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="上级机构" :label-width="formLabelWidth">
          <el-input v-model="form.paOri" auto-complete="off"></el-input>
        </el-form-item> -->
        <el-form-item label="剩余字数" :label-width="formLabelWidth">
          <el-input-number v-model="form.wordNum" auto-complete="off" controls-position="right" :min="1"></el-input-number>
        </el-form-item>

        <el-form-item label="到期日期" :label-width="formLabelWidth">
          <el-date-picker v-model="form.dataTime" type="date" style='width:100%;' placeholder="选择日期">
          </el-date-picker>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" style="margin-top:25px;background:#5F92EF;" @click="addUser">保存</el-button>
      </div>
    </el-dialog>
    <!-- //这是弹框 -->
  </el-col>
</template>

<script>
import "@/assets/css/public.css";
import { mapState, mapMutations, mapActions } from "vuex";
import { checkid } from "@/utils/user";

export default {
  name: "organiZation",
  components: {},
  data() {
    return {
      userName: "",
      tableData: [],
      currentPage: 1,
      pageIndex: 0,
      pageSize: 10,
      totaL2: 1,
      dialogFormVisible: false,
      //弹框
      myId: "",
      formLabelWidth: "120px",
      form: {
        name: "",
        descrip: "",
        paOri: "",
        wordNum: "",
        dataTime: ""
      }
    };
  },
   beforeRouteEnter(to, from, next){
    checkid()
    next();
  },
  async created() {
    await this.GETBYQUERY({ pageIndex: 0 });
    this.totaL2 = this.tableData2.length;
    this.tableData = this.tableData2.splice(0, 10);
  },
  computed: {
    ...mapState({
      tableData2: state => state.organiZation.tableData,
      DeleAsync: state => state.organiZation.DeleAsync,
      EditAsync: state => state.organiZation.EditAsync,
      LOADINGs: state => state.nav.LOADINGs
    })
  },
  mounted() {},
  methods: {
    ...mapMutations(["pushToRouteTags"]),
    ...mapActions(["GETBYQUERY", "DELETEASYNC", "UPDATEASYNC"]),
    async handleCommand(command) {
      this.pageSize = parseInt(command);
      await this.GETBYQUERY({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      });
      this.tableData = this.tableData2;
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    async handleCurrentChange(val) {
      this.pageIndex = val - 1;
      await this.GETBYQUERY({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      });
      this.tableData = this.tableData2;
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 != 0) {
        return "warning-row";
      }
      return "";
    },
    async searchUser() {
      await this.GETBYQUERY({
        name: this.userName
      });
      this.totaL2 = this.tableData.length;
      this.tableData = this.tableData2;
    },
    handleDetails(index, row) {
      // console.log(row.name);
      let routes = {
        title: "用户统计",
        path: "userStati",
        name: "userStati",
        // fullPath: `/home/userStati?name=${row.name}`,
        fullPath: "/home/userStati",
        fatherTitle: "/home",
        icon: "w_icon icon-yhgl",
        component: resolve => require(["@view/homeSons/userStati"], resolve)
      };
      this.$router.push({ path: "userStati", query: { name: row.name } });
      this.pushToRouteTags(routes);
    },
    async handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.myId = row.id;
      await this.GETBYQUERY({
        name: row.name
      });
      this.form.name = this.tableData2[0].name;
      this.form.descrip = this.tableData2[0].description;
      this.form.paOri = this.tableData2[0].parentName;
      this.form.wordNum = this.tableData2[0].remainWords;
      this.form.dataTime = this.tableData2[0].dateDueDesc;
    },
    async delData(ida) {
      // console.log(ida);
      await this.DELETEASYNC({ id: ida });
      if (this.DeleAsync.isSuccess === false) {
        this.$message({
          type: "info",
          message: this.DeleAsync.errorMessage.split(":")[1]
        });
      } else if (this.DeleAsync.isSuccess === true) {
        this.$message({
          type: "success",
          message: "删除成功!"
        });
      }
    },
    async handleDelete(index, row) {
      let that = this;
      this.$confirm("此操作将删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.delData(row.parentId);
      });
    },
    async addUser() {
      await this.UPDATEASYNC({
        id: this.myId,
        name: this.form.name,
        description: this.form.descrip,
        remainWords: this.form.wordNum,
        dateDue: this.form.dataTime
      });
      if (this.EditAsync.isSuccess === true) {
        this.dialogFormVisible = false;
        this.$message({
          message: "恭喜你，修改成功",
          type: "success"
        });
      } else if (this.EditAsync.isSuccess === false) {
        this.dialogFormVisible = false;
        this.$message({
          message: this.EditAsync.errorMessage,
          type: "warning"
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.Organization {
  margin: 30px 0 0 40px;
}
.tit_left {
  float: left;
}
/deep/.tit_right {
  float: left;
  margin-left: 65px;
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
/deep/.cont {
  margin-top: 60px;
  .el-table .warning-row {
    background-color: #fafafa;
  }
}
.paging {
  float: right;
  margin-top: 25px;
}
/deep/.solt_right {
  .el-dialog {
    width: 420px;
    .el-dialog__header {
      background-color: #eaedf3;
    }
    .el-dialog__body {
      padding: 10px 20px;
    }
    .el-input-number {
      width: 380px;
    }
  }
}
</style>