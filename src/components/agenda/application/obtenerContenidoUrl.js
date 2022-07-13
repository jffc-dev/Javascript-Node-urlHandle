import axios from 'axios'

export default () => {
    return async ({ url }) => {
        let contenido = ""
        let titulo = ""
        await axios.get(url)
        .then(function (response) {
            // handle success
            contenido = response.data;
            titulo = contenido.substring(contenido.toLowerCase().indexOf("<title>"),
            contenido.toLowerCase().indexOf("</title>"))
          })
          .catch(function (error) {
            // handle error
            console.log(error);
            console.log('3');
          })
          .then(function () {
            console.log('34');
          });
        return {
          url,
          contenido,
          "titulo": titulo.substring(7, titulo.length).trim()
        };
    }
}