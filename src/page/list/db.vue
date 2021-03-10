<template>
  <avue-crud :option="option"
             :data="data"
             :page.sync="page"
             :before-open="beforeOpen"
             v-model="form"
             ref="crud"
             @row-update="rowUpdate"
             @row-save="rowSave"
             @row-del="rowDel"
             @refresh-change="refreshChange"
             @on-load="onLoad"></avue-crud>
</template>

<script>
import { getList, getDetail, add, update, remove } from "@/api/db";
export default {
  data () {
    return {
      form: {},
      query: {},
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      option: {
        index: true,
        viewBtn: true,
        column: [
          {
            label: "名称",
            prop: "name",
            width: 120,
            rules: [{
              required: true,
              message: "请输入数据源名称",
              trigger: "blur"
            }]
          },
          {
            label: "驱动类",
            prop: "driverClass",
            type: 'select',
            dicData: [
              {
                label: 'com.mysql.cj.jdbc.Driver',
                value: 'com.mysql.cj.jdbc.Driver',
              }, {
                label: 'org.postgresql.Driver',
                value: 'org.postgresql.Driver',
              }, {
                label: 'oracle.jdbc.OracleDriver',
                value: 'oracle.jdbc.OracleDriver',
              }
            ],
            width: 200,
            rules: [{
              required: true,
              message: "请输入驱动类",
              trigger: "blur"
            }]
          },
          {
            label: "用户名",
            prop: "username",
            width: 120,
            rules: [{
              required: true,
              message: "请输入用户名",
              trigger: "blur"
            }]
          },
          {
            label: "密码",
            prop: "password",
            hide: true,
            rules: [{
              required: true,
              message: "请输入密码",
              trigger: "blur"
            }]
          },
          {
            label: "连接地址",
            prop: "url",
            span: 24,
            rules: [{
              required: true,
              message: "请输入连接地址",
              trigger: "blur"
            }]
          },
          {
            label: "备注",
            prop: "remark",
            span: 24,
            minRows: 3,
            hide: true,
            type: "textarea"
          },
        ]
      },
      data: []
    };
  },
  methods: {
    rowSave (row, done, loading) {
      add(row).then(() => {
        this.onLoad();
        this.$message({
          type: "success",
          message: "操作成功!"
        });
        done();
      }, error => {
        window.console.log(error);
        loading();
      });
    },
    rowUpdate (row, index, done, loading) {
      update(row).then(() => {
        this.onLoad();
        this.$message({
          type: "success",
          message: "操作成功!"
        });
        done();
      }, error => {
        window.console.log(error);
        loading();
      });
    },
    rowDel (row) {
      this.$confirm("确定将选择数据删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return remove(row.id);
        })
        .then(() => {
          this.onLoad();
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        });
    },
    beforeOpen (done, type) {
      if (["edit", "view"].includes(type)) {
        getDetail(this.form.id).then(res => {
          this.form = res.data.data;
        });
      }
      done();
    },
    refreshChange () {
      this.onLoad();
    },
    onLoad () {
      getList(this.page.currentPage, this.page.pageSize).then(res => {
        const data = res.data.data;
        this.page.total = data.total;
        this.data = data.records;
      });
    }
  }
};
</script>

<style>
</style>