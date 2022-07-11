import axios from 'axios'

export default ({ UrlRepository }) => {
    return async ({ url }) => {
        let contenido = ""
        await axios.get(url)
        .then(function (response) {
            // handle success
            contenido = response.data;
          })
          .catch(function (error) {
            // handle error
            console.log(error);
            console.log('3');
          })
          .then(function () {
            console.log('34');
          });

        console.log(contenido.indexOf("<title>"));
        console.log(contenido.indexOf("</title>"));
        console.log(contenido.substring(contenido.indexOf("<title>"),contenido.indexOf("</title>")).replace('<title>',''));
        return contenido;
    }
}