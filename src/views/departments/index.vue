<template>
  <div class="departments-container">
    <div class="app-container">
      <!-- 组织架构  头部 -->
      <el-card>
        <el-tabs>
          <el-tab-pane label="组织结构" name="first" />
        </el-tabs>
        <!-- 头部 -->
        <tree-tools :tree-node="company" class="tree-card" @addDepts="addDepts" />
        <el-tree :data="departs" default-expand-all>
          <tree-tools slot-scope="{ data }" class="tree-card" :tree-node="data" :is-root="false" @delDepts="getDepartments" @addDepts="addDepts" @editDepts="editDepts" />
        </el-tree>
      </el-card>
    </div>

    <!-- 添加部门 / 编辑部门 的弹框组件 -->
    <add-dept ref="addDept" :show-dialog="showDialog" :tree-node="node" @addDepts="getDepartments" @closeDialog="showDialog=false" />
  </div>
</template>

<script>
import TreeTools from './components/tree-tools'
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils'
import AddDept from './components/add-dept.vue'
export default {
  components: {
    TreeTools,
    AddDept
  },
  data() {
    return {
      company: {},
      departs: [],
      defaultProps: {
        label: 'name'
      },
      // 控制添加子部门弹出的显示与隐藏
      showDialog: false,
      node: null // 当前点击的部门
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    // 获取部门信息
    async getDepartments() {
      const result = await getDepartments()
      // console.log(result, 233)
      this.company = { name: result.companyName, manager: '负责人', id: '' }
      this.departs = tranListToTreeData(result.depts, '')
    },
    addDepts(node) {
      this.showDialog = true
      this.node = node
    },
    // 编辑部门
    async editDepts(node) {
      // console.log('父', node)
      // 打开弹出
      this.showDialog = true
      this.node = node // 赋值操作的节点
      // 用$refs调用子组件的方法
      // console.log(this.$refs.addDept)
      this.$refs.addDept.getDepartDetail(node.id)
    }
  }
}
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
