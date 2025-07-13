export const AppResponse = class {
  constructor (status, message, data) {
    this.status = status
    this.message = message
    this.data = data
  }
}

export const AppResponseDataPaginated = class {
  constructor (items, totalItems, totalPages, currentPage) {
    this.items = items
    this.totalItems = totalItems
    this.totalPages = totalPages
    this.currentPage = currentPage
  }
}
