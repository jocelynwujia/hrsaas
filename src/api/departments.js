import request from '@/utils/request'
// 查询企业的部门列表
export function getDepartments() {
  return request({
    url: '/company/department'
  })
}

// 删除部门
export function deleDepartments(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'DELETE'
  })
}

// 添加部门
export function addDepartments(data) {
  return request({
    url: '/company/department',
    method: 'POST',
    data
  })
}

// 根据ID查询部门详情
export function getDepartDetail(id) {
  return request({
    url: `/company/department/${id}`
  })
}

// 保存编辑部门的数据， 根据ID修改部门详情
export function updateDepartDetail(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'PUT',
    data
  })
}
