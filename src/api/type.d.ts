declare namespace API {
  type GetStudentsParams = {
    searchInfo?: string
    order?: number
    pageNo: number
    pageNum: number
  }

  type GetStudentsResult = {
    current: number
    pages: number
    total: number
    size: number
    records: Students[]
  }

  type Students = {
    id: number
    stuId: number
    name: string
    age: number
    gender: number
    birthday: string
    address: string
    phone: string
    email: string
  }

  type Response<T> = {
    code: number
    data: T
    message: string
  }
}
