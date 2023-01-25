export const StatusValidation = class {
  constructor (status, msg) {
    this.status = status
    this.msg = msg
  }
}

export const ValidationStructure = class {
  constructor (value, valid, fieldName, mandatory) {
    this.value = value
    this.valid = valid
    this.fieldName = fieldName
    this.mandatory = mandatory
  }
}

export const validacionGeneral = (datos, statusObject) => {
  let status = true
  let msg = ''

  for (const dato of datos) {
    if (dato.mandatory === true && (dato.value === undefined || dato.value === null)) {
      msg += 'El campo ' + dato.fieldName + ' es obligatorio. '
      status = false
      continue
    } else {
      if (dato.valid === 'url') {
        const urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
                    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
                    '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
                    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
                    '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
                    '(\\#[-a-z\\d_]*)?$', 'i') // validate fragment locator

        if (!!urlPattern.test(dato.value) === false) {
          msg += 'El campo ingresado como ' + dato.fieldName + ' no es una url válida. '
          status = false
        }
      }
    }
  }

  statusObject.status = status
  statusObject.msg = msg

  return status
}
