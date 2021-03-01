<template>
  <el-dialog
    :title="showTitle"
    :visible="showDialog"
    width="80%"
    @close="btnCancel"
  >
    <el-form ref="deptForm" :model="formData" :rules="formRules" label-width="120px">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width: 80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width: 80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" style="width:80%" placeholder="请选择" @focus="getEmployeeSimple">
          <el-option
            v-for="item in peoples"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" style="width: 80%" type="textarea" placeholder="1-300个字符" :rows="3" />
      </el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button type="primary" size="small" @click="addDepts">确定</el-button>
        <el-button size="small" @click="btnCancel">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getDepartments, addDepartments, getDepartDetail, updateDepartDetail } from '@/api/departments'
import { getEmployeeSimple } from '@/api/employees'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    treeNode: {
      type: Object,
      default: null
    }
  },
  data() {
    // 现在定义一个函数 这个函数的目的是 去找 同级部门下 是否有重复的部门名称
    const checkNameRepeat = async(rule, value, callback) => {
      // 先要获取最新的组织架构数据
      const { depts } = await getDepartments()
      let isRepeat = false
      // depts是所有的部门数据
      if (this.formData.id) {
        // 当前为编辑部门
        // 用formData 和 treeNode都可以
        // isRepeat = depts.filter(item => item.pid === this.formData.pid && item.id !== this.formData.id).some(item => item.name === this.formData.name)
        isRepeat = depts.filter(item => item.id !== this.treeNode.id && item.pid === this.treeNode.pid).some(item => item.name === value)
      } else {
        // 当前为新增部门
        isRepeat = depts.filter(item => item.pid === this.treeNode.id).some(item => item.name === value)
      }
      // 如何去找技术部所有的子节点
      isRepeat ? callback(new Error(`同级部门下已经有${value}的部门了`)) : callback()
    }

    // 现在定义一个函数 这个函数的目的是 去找 同级部门下 是否有重复的部门编码
    const checkCodeRepeat = async(rule, value, callback) => {
      // 先要获取最新的组织架构数据
      const { depts } = await getDepartments()
      // depts是所有的部门数据
      let isRepeat = false
      if (this.formData.id) {
        isRepeat = depts.some(item => item.id !== this.formData.id && item.code === value && value)
      } else {
        isRepeat = depts.some(item => item.code === value && value)
      }
      // 如何去找技术部所有的子节点
      isRepeat ? callback(new Error(`组织结构下已经有${value}部门编码了`)) : callback()
    }
    return {
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门负责人
        introduce: '' // 部门介绍
      },
      formRules: {
        name: [
          { required: true, trigger: 'blur', message: '部门名称不能为空' },
          { min: 1, max: 50, trigger: 'blur', message: '部门名称是1-50个字符' },
          { trigger: 'blur', validator: checkNameRepeat }
        ],
        code: [
          { required: true, trigger: 'blur', message: '部门编码不能为空' },
          { min: 1, max: 50, trigger: 'blur', message: '部门名称是1-50个字符' },
          { trigger: 'blur', validator: checkCodeRepeat }
        ],
        manager: [
          { required: true, trigger: 'blur', message: '部门负责人不能为空' }
        ],
        introduce: [
          { required: true, trigger: 'blur', message: '部门介绍不能为空' },
          { min: 1, max: 50, trigger: 'blur', message: '部门名称是1-300个字符' }
        ]
      }, // 校验规则
      peoples: [] // 接收员工的简单列表的数据
    }
  },
  computed: {
    // 用计算属性来控制标题
    showTitle() {
      return this.formData.id ? '编辑部门' : '新增子部门'
    }
  },
  methods: {
    // 获取员工的简单列表数据
    async getEmployeeSimple() {
      this.peoples = await getEmployeeSimple()
    },
    // 点击确定按钮，提交表单
    addDepts() {
      // 自定义校验表单
      this.$refs.deptForm.validate(async isOk => {
        if (isOk) {
          // 如果校验通过，并且formData有值，说明是编辑部门
          if (this.formData.id) {
            // 调用编辑接口
            await updateDepartDetail(this.formData)
          } else {
            // 否则就是添加部门，调用添加部门接口，添加父部门的id
            await addDepartments({ ...this.formData, pid: this.treeNode.id })
          }

          // 告诉父组件重新拉取数据
          this.$emit('addDepts')
          // 关闭弹出 用sync修饰符
          // this.$emit('update: showDialog', false)
          this.$emit('closeDialog')
          // 关闭弹层，会自动触发el-dialog 的close事件 自动清空表单
        }
      })
    },
    // 点击取消按钮
    btnCancel() {
      // 手动清空formData数据
      this.formData = {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门负责人
        introduce: '' // 部门介绍
      }
      // 关闭弹层
      this.$emit('closeDialog')
      // 重置表单 只能清除el-from表单中的数据 非表单中的数据清除不了
      this.$refs.deptForm.resetFields()
    },
    // 获取部门详情
    async getDepartDetail(id) {
      // 因为是父组件调用子组件的方法，而props传值是异步的 所有不用this.treeNode.id 因为有可能拿不到
      // 直接调用方法 传入id
      const result = await getDepartDetail(id)
      // console.log(result, 'hello')
      this.formData = result
    }

  }
}
</script>

<style scoped>

</style>
