import { request } from '@/utils/request/axios'
import axios from 'axios'
import cache from '@/utils/cache'
import { downloadExcel } from '@/utils/downloadExcel'

/** 登录 **/
export const login = (data: FormData) => {
  return request<API.Response<{ token: string }>>('/user/login', {
    method: 'post',
    data
  })
}

/** 判断token是否过期 **/
export const checkToken = () => {
  return request<API.Response<null>>('/user/isExpire', {
    method: 'get'
  })
}

/** 获取学生列表 **/
export const getStudents = (params: API.GetStudentsParams) => {
  return request<API.Response<API.GetStudentsResult>>('/student/list', {
    method: 'get',
    params
  })
}

/** 添加单个学生 **/
export const addStudent = (data: FormData) => {
  return request<API.Response<null>>('/student/add', {
    method: 'post',
    data
  })
}

/** Excel导入学生 **/
export const addStudentsBatch = (data: FormData) => {
  return request<API.Response<null>>('/student/import', {
    method: 'post',
    data
  })
}

/** 修改学生信息 **/
export const updateStudent = (data: FormData) => {
  return request<API.Response<null>>('/student/update', {
    method: 'put',
    data
  })
}

/** 删除学生 **/
export const deleteStudent = (params: { id: number }) => {
  return request<API.Response<null>>('/student/delete', {
    method: 'delete',
    params
  })
}
