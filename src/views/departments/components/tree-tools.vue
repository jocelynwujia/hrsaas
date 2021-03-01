<template>
  <el-row type="flex" justify="space-bettwen" align="middle" style="height:40px; width: 100%">
    <!-- 左侧内容 -->
    <el-col>
      <span>{{ treeNode.name }}</span>
    </el-col>
    <!-- 右侧内容 -->
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <el-dropdown @command="operateDepts">
            <span>操作<i class="el-icon-arrow-down" /></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="dele">删除子部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { deleDepartments } from '@/api/departments'
export default {
  props: {
    treeNode: {
      type: Object,
      required: true
    },
    isRoot: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    async operateDepts(command) {
      if (command === 'add') {
        // 添加新部门
        // console.log('添加')
        this.$emit('addDepts', this.treeNode)
        // console.log(this.treeNode)
      } else if (command === 'edit') {
        // 编辑部门
        // 显示弹层
        // console.log('编辑', this.treeNode)
        this.$emit('editDepts', this.treeNode)
      } else {
        // 删除业务
        this.$confirm('确定删除该部门吗？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          console.log('确定')
          // 调用删除接口
          return deleDepartments(this.treeNode.id) // 返回的是一个promise
        }).then(() => {
          this.$emit('delDepts')
          this.$message.success('删除部门成功')
        }).catch(() => {
          console.log('取消')
        })
      }
    }
  }
}
</script>

<style lang="less">

</style>
