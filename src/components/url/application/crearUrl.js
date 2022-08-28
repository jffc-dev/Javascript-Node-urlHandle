/**
 * @param {Object} obj
 * @param {import('../infraestructure/MongoUrlRepository')} obj.UrlRepository
 */

export default ({ UrlRepository }) => {
  return async ({ url }) => {
    // if (!email) throw new Error('validation failed')
    // return UserRepository.getByEmail()
    const newUrl = {
      url: url
    }

    return await UrlRepository.add(newUrl)

    // const persona = request.body
    // if (persona.url && persona.number) {
    //   //  let nuevoId = 0
    //   const verifNombre = persons.find(person => person.url === persona.url)
    //   const verifNumero = persons.find(person => person.number === persona.number)
    //   if (verifNombre === undefined && verifNumero === undefined) {
    //     // while (true) {
    //     //   nuevoId = getRandomInt(100000)
    //     //   if (persons.find(person => person.id === nuevoId)) {
    //     //     continue
    //     //   } else {
    //     //     break
    //     //   }
    //     // }
    //     const nuevoContacto = {
    //       url: persona.url,
    //       number: persona.number
    //     }
    //     const id = await mongo.create('agenda', nuevoContacto)
    //     response.status(201).json({ Correcto: 'Se agregó correctamente a la presona', id: id, ...nuevoContacto })
    //   } else {
    //     if (verifNombre) {
    //       response.status(406).json({ Error: 'El valor ingresado en url debe ser único' })
    //     } else if (verifNumero) {
    //       response.status(406).json({ Error: 'El valor ingresado en number debe ser único' })
    //     }
    //   }
    // } else {
    //   if (persona.url) {
    //     response.status(406).json({ Error: 'No se ingresó el valor de url' })
    //   } else if (persona.number) {
    //     response.status(406).json({ Error: 'No se ingresó el valor de number' })
    //   }
    //   response.status(406).json({ Error: 'No se ingresó ningún valor' })
    // }
  }
}
