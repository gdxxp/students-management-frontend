<template>
  <div class="w-full">
    <div class="mb-3">
      <a-form-item>
        <a-input
          style="margin-right: 10px"
          v-model="filterForm.searchInfo"
          allow-clear
          placeholder="根据学号或姓名筛选"
        />
        <a-cascader
          v-model="filterForm.order"
          :options="orderOptions"
          allow-clear
          placeholder="排序方式"
          style="width: 340px; margin-right: 50%"
        />
        <a-button type="primary" @click="handleOpenDrawer()">添加学生</a-button>
      </a-form-item>
    </div>
    <a-table
      :bordered="true"
      :columns="columns"
      :data="studentsList"
      :hoverable="true"
      :loading="isLoading"
      :pagination="false"
      :scroll="{ maxHeight: 'calc(100vh - 230px)' }"
      class="w-full"
      size="large"
    >
      <template #gender="{ record }">
        {{ record.gender === 0 ? '男' : '女' }}
      </template>
      <template #option="{ record }">
        <div class="flex justify-around items-center">
          <a-button size="mini" type="primary" @click="handleOpenDrawer2(record)">修改 </a-button>
          <a-popconfirm content="确认删除该条学生信息吗？" @ok="handleDelete(record.id)">
            <a-button class="me-1" size="mini" status="danger" type="primary">删除</a-button>
          </a-popconfirm>
        </div>
      </template>
    </a-table>
    <a-pagination
      v-model:current="page.current"
      v-model:page-size="page.size"
      :page-size-options="[10, 20, 50]"
      :total="page.total"
      class="mt-5"
      show-page-size
      show-total
      @change="handleUpdatePage()"
      @page-size-change="handleUpdatePageSize()"
    />
    <a-drawer :visible="isVisible" unmount-on-close width="45%" @cancel="handleCloseDrawer">
      <template #title>添加学生</template>
      <div>
        <a-tabs a-tabs default-active-key="0" @change="handleChangeAddStudentRangeType">
          <a-tab-pane key="0" title="单个添加">
            <a-form :model="addStudentForm" style="max-width: 500px">
              <a-form-item label="学号">
                <a-input v-model="addStudentForm.stuId" :allow-clear="false" />
              </a-form-item>
              <a-form-item label="姓名">
                <a-input v-model="addStudentForm.name" :allow-clear="false" />
              </a-form-item>
              <a-form-item label="年龄">
                <a-input v-model="addStudentForm.age" :allow-clear="false" />
              </a-form-item>
              <a-form-item label="性别">
                <a-cascader
                  v-model="addStudentForm.gender"
                  :options="studentGenderOptions"
                  placeholder="请选择性别"
                />
              </a-form-item>
              <a-form-item label="出生年月">
                <a-input v-model="addStudentForm.birthday" :allow-clear="false" />
              </a-form-item>
              <a-form-item label="家庭住址">
                <a-input v-model="addStudentForm.address" :allow-clear="false" />
              </a-form-item>
              <a-form-item
                :rules="[
                  { required: true, message: '手机号不能为空' },
                  {
                    match:
                      /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
                    message: '手机号格式错误'
                  }
                ]"
                :validate-trigger="['change', 'input', 'blur']"
                field="phone"
                label="电话"
              >
                <a-input v-model="addStudentForm.phone" :allow-clear="false" />
              </a-form-item>
              <a-form-item label="Email">
                <a-input v-model="addStudentForm.email" :allow-clear="false" />
              </a-form-item>
            </a-form>
          </a-tab-pane>
          <a-tab-pane key="1" title="Excel导入">
            <a-form-item :rules="{ required: true, message: '手机号不能为空' }" label="选择文件">
              <a-upload :custom-request="handleImportBatch" :limit="1" tip="支持Excel文件导入" />
            </a-form-item>
          </a-tab-pane>
        </a-tabs>
      </div>
      <template #footer>
        <div class="flex flex-row justify-around">
          <a-button class="basis-1/2" shape="round" @click="handleCloseDrawer()">取消</a-button>
          <a-button
            :loading="isSubmitLoading"
            class="basis-1/2 ms-4"
            shape="round"
            type="primary"
            @click="handleSubmitAdd()"
            >提交
          </a-button>
        </div>
      </template>
    </a-drawer>
    <a-drawer :visible="isVisible2" unmount-on-close width="45%" @cancel="handleCloseDrawer2">
      <template #title>修改学生信息</template>
      <div>
        <a-form ref="updateStudentFormRef" :model="updateStudentForm" style="max-width: 500px">
          <a-form-item label="学号">
            <a-input v-model="updateStudentForm.stuId" :allow-clear="false" />
          </a-form-item>
          <a-form-item label="姓名">
            <a-input v-model="updateStudentForm.name" :allow-clear="false" />
          </a-form-item>
          <a-form-item label="年龄">
            <a-input v-model="updateStudentForm.age" :allow-clear="false" />
          </a-form-item>
          <a-form-item label="性别">
            <a-cascader
              v-model="updateStudentForm.gender"
              :options="studentGenderOptions"
              placeholder="请选择性别"
            />
          </a-form-item>
          <a-form-item label="出生年月">
            <a-input v-model="updateStudentForm.birthday" :allow-clear="false" />
          </a-form-item>
          <a-form-item label="家庭住址">
            <a-input v-model="updateStudentForm.address" :allow-clear="false" />
          </a-form-item>
          <a-form-item
            :rules="[
              { required: true, message: '手机号不能为空' },
              {
                match:
                  /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
                message: '手机号格式错误'
              }
            ]"
            :validate-trigger="['change', 'input', 'blur']"
            field="phone"
            label="电话"
          >
            <a-input v-model="updateStudentForm.phone" :allow-clear="false" />
          </a-form-item>
          <a-form-item label="Email">
            <a-input v-model="updateStudentForm.email" :allow-clear="false" />
          </a-form-item>
        </a-form>
      </div>
      <template #footer>
        <div class="flex flex-row justify-around">
          <a-button class="basis-1/2" shape="round" @click="handleCloseDrawer2()">取消</a-button>
          <a-button
            :loading="isSubmitLoading2"
            class="basis-1/2 ms-4"
            shape="round"
            type="primary"
            @click="handleSubmitAdd2()"
            >提交
          </a-button>
        </div>
      </template>
    </a-drawer>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { addStudent, addStudentsBatch, deleteStudent, getStudents, updateStudent } from '@/api'
import type { FormInstance, RequestOption } from '@arco-design/web-vue'
import { Message, Notification } from '@arco-design/web-vue'

/** Data Start **/
// 表格loading状态
const isLoading = ref(false)

// 表格columns
const columns = [
  {
    title: '学号',
    dataIndex: 'stuId',
    slotName: 'stuId'
  },
  {
    title: '姓名',
    dataIndex: 'name',
    slotName: 'name'
  },
  {
    title: '年龄',
    dataIndex: 'age',
    slotName: 'age'
  },
  {
    title: '性别',
    dataIndex: 'gender',
    slotName: 'gender'
  },
  {
    title: '出生年月',
    dataIndex: 'birthday',
    slotName: 'birthday'
  },
  {
    title: '家庭住址',
    dataIndex: 'address',
    slotName: 'address'
  },
  {
    title: '电话',
    dataIndex: 'phone',
    slotName: 'phone'
  },
  {
    title: 'e-mail',
    dataIndex: 'email',
    slotName: 'email'
  },
  {
    title: '操作',
    dataIndex: 'option',
    slotName: 'option'
  }
]

// 获取到的学生列表
const studentsList = ref<API.Students[]>([])

// 分页
const page = ref({
  total: 0,
  size: 10,
  current: 1,
  pages: 1
})
// 筛选
const filterForm = ref({
  searchInfo: '',
  order: undefined
})
// 添加单个学生表单
const addStudentForm = ref({
  id: undefined,
  stuId: undefined,
  name: '',
  age: undefined,
  gender: 0,
  birthday: '',
  address: '',
  phone: '',
  email: ''
})
// 修改学生表单
const updateStudentForm = ref({
  id: undefined,
  stuId: undefined,
  name: '',
  age: undefined,
  gender: 0,
  birthday: '',
  address: '',
  phone: '',
  email: ''
})
// 添加时间段预约表单
const addStudentRangeForm = ref({
  // 0、单个添加，1、Excel导入
  type: '0'
})
// 是否显示抽屉
const isVisible = ref(false)
// 表单提交按钮状态
const isSubmitLoading = ref(false)
// 学生性别选项
const studentGenderOptions = [
  {
    value: 0,
    label: '男'
  },
  {
    value: 1,
    label: '女'
  }
]
// 排序方式选项
const orderOptions = [
  {
    value: 0,
    label: '姓名正序'
  },
  {
    value: 1,
    label: '姓名倒序'
  },
  {
    value: 2,
    label: '学号正序'
  },
  {
    value: 3,
    label: '学号倒序'
  }
]

const updateStudentFormRef = ref<FormInstance>()
// 是否显示抽屉
const isVisible2 = ref(false)
// 表单提交按钮状态
const isSubmitLoading2 = ref(false)

/** Method Start **/
// 获取学生列表
const handleStudentsList = async () => {
  isLoading.value = true
  const resp = await getStudents({
    pageNo: page.value.current,
    pageNum: page.value.size,
    searchInfo: filterForm.value.searchInfo,
    order: filterForm.value.order
  })
  isLoading.value = false

  if (resp.code === 200) {
    studentsList.value = resp.data.records
    const { total, size, current, pages } = resp.data
    page.value = { total: total, size: size, current: current, pages: pages }
  } else if (resp.code === 501) {
    {
      {
        Message.error({
          content: resp.message
        })
      }
    }
  } else {
    {
      Message.error({
        content: '获取数据错误'
      })
    }
  }
}

// 切换分页
const handleUpdatePage = () => {
  handleStudentsList()
}

// 设置分页每页数据条数
const handleUpdatePageSize = () => {
  handleStudentsList()
}

// 删除学生
const handleDelete = async (id: number) => {
  const resp = await deleteStudent({ id })
  if (resp.code === 200) {
    Notification.success('删除成功')
    await handleStudentsList()
  } else {
    Notification.error(resp.message)
  }
}

// 打开抽屉
const handleOpenDrawer = () => (isVisible.value = true)
// 关闭抽屉
const handleCloseDrawer = () => (isVisible.value = false)
// 提交添加单个学生表单
const handleSubmitAdd = async () => {
  const formData = new FormData()
  if (addStudentRangeForm.value.type === '0') {
    formData.append('stuId', `${addStudentForm.value.stuId}`)
    formData.append('name', `${addStudentForm.value.name}`)
    formData.append('age', `${addStudentForm.value.age}`)
    formData.append('gender', `${addStudentForm.value.gender}`)
    formData.append('birthday', `${addStudentForm.value.birthday}`)
    formData.append('address', `${addStudentForm.value.address}`)
    formData.append('phone', `${addStudentForm.value.phone}`)
    formData.append('email', `${addStudentForm.value.email}`)

    isSubmitLoading.value = true
    const resp = await addStudent(formData)
    isSubmitLoading.value = false
    if (resp.code === 200) {
      await handleStudentsList()
      Notification.success('添加学生成功')
      isVisible.value = false
    } else {
      Notification.error(resp.message)
    }
  } else {
    return
  }
}

// 改变添加学生方式类型
const handleChangeAddStudentRangeType = (key: string) => {
  addStudentRangeForm.value.type = key
}

// 打开抽屉
const handleOpenDrawer2 = (record: any) => {
  isVisible2.value = true

  updateStudentForm.value.id = record.id
  updateStudentForm.value.stuId = record.stuId
  updateStudentForm.value.name = record.name
  updateStudentForm.value.age = record.age
  updateStudentForm.value.gender = record.gender
  updateStudentForm.value.birthday = record.birthday
  updateStudentForm.value.address = record.address
  updateStudentForm.value.phone = record.phone
  updateStudentForm.value.email = record.email
}
// 关闭抽屉
const handleCloseDrawer2 = () => (isVisible2.value = false)
// 提交修改学生的表单
const handleSubmitAdd2 = async () => {
  const result = await updateStudentFormRef.value?.validate()
  if (result) {
    return
  }

  const formData = new FormData()
  formData.append('id', `${updateStudentForm.value.id}`)
  formData.append('stuId', `${updateStudentForm.value.stuId}`)
  formData.append('name', `${updateStudentForm.value.name}`)
  formData.append('age', `${updateStudentForm.value.age}`)
  formData.append('gender', `${updateStudentForm.value.gender}`)
  formData.append('birthday', `${updateStudentForm.value.birthday}`)
  formData.append('address', `${updateStudentForm.value.address}`)
  formData.append('phone', `${updateStudentForm.value.phone}`)
  formData.append('email', `${updateStudentForm.value.email}`)

  isSubmitLoading2.value = true
  const resp = await updateStudent(formData)
  isSubmitLoading2.value = false
  if (resp.code === 200) {
    await handleStudentsList()
    Notification.success('修改成功')
  } else {
    Notification.error(resp.message)
  }
}
// Excel导入
const handleImportBatch = async (option: RequestOption) => {
  const { onError, onSuccess, fileItem } = option
  // console.log(onProgress)
  // console.log(onError)
  // console.log(onSuccess)
  const formData = new FormData()
  formData.append('excel', fileItem.file)
  const resp = await addStudentsBatch(formData)
  if (resp.code == 200) {
    onSuccess(resp)
    isVisible2.value = false
    await handleStudentsList()
    Notification.success('导入成功')
  } else {
    onError(resp)
    Notification.error(resp.message)
  }
}
/** Method End **/

onMounted(async () => {
  await handleStudentsList()
})

// 监听筛选条件
watch(
  filterForm,
  () => {
    handleStudentsList()
  },
  { deep: true }
)
</script>
<style scoped></style>
