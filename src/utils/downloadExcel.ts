import type { AxiosResponse } from 'axios'

export const downloadExcel = (resp: AxiosResponse) => {
  const blob = new Blob([resp.data])
  const contentDisposition =
    resp.headers['content-disposition'] || resp.headers['Content-Disposition']
  const pattern = new RegExp('filename=([^;]+\\.[^\\.;]+);*')
  const result = pattern.exec(contentDisposition)
  if (!result) {
    return
  }
  const fileName = decodeURI(result[1])
  const downloadElement = document.createElement('a')
  const href = URL.createObjectURL(blob)
  downloadElement.style.display = 'none'
  downloadElement.href = href
  downloadElement.download = fileName
  document.body.appendChild(downloadElement)
  downloadElement.click()
  document.body.removeChild(downloadElement)
  URL.revokeObjectURL(href)
}
