import emailjs from 'emailjs-com';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

const sendEmailListaPokeFavs = (userEmail, pokemons) => {
  const templateParams = {
    to_email: userEmail,
    subject: "Mi lista de pokemons favoritos",
    message: `Lista de mis Pokemons favoritos:\n${pokemons.join(',\n ')}`
  };

  emailjs.send('service_ufoeavp', 'template_pj0t33r', templateParams, 'wA5YHA5IVX7ipcFAY')
    .then((response) => {
      Swal.fire("El correo se envio correctamente");
      console.log('Correo enviado!', response.status, response.text);
    }, (error) => {
      Swal.fire("El correo no se envio correctamente");
      console.error('Error al enviar el correo', error);
    });
};

const sendEmailPreguntaRapida = (userEmail, preguntaRapida) => {
  const templateParams = {
    to_email: userEmail,
    subject: "Preguntas",
    message: preguntaRapida
  };

  emailjs.send('service_ufoeavp', 'template_606wmu6', templateParams, 'wA5YHA5IVX7ipcFAY')
    .then((response) => {
      Swal.fire("El correo se envio correctamente");
      console.log('Correo enviado!', response.status, response.text);
    }, (error) => {
      Swal.fire("El correo no se envio correctamente");
      console.error('Error al enviar el correo', error);
    });
};

export { sendEmailListaPokeFavs, sendEmailPreguntaRapida };