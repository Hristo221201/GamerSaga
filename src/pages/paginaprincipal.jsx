import { useNavigate } from "react-router-dom";
import React, { useEffect } from 'react';
import React, { useState, useEffect } from 'react';

export default function PaginaPrincipal() {

    useEffect(() => {
        // Agrega la clase específica para la página 2 al body
        document.body.classList.add('body-paginaprincipal');

        // Limpia la clase al desmontar el componente
        return () => {
            document.body.classList.remove('body-paginaprincipal');
        };
    }, [])

/*
    const PokemonAleatorio = () => {
        const [pokemon, setPokemon] = useState(null);
      
        useEffect(() => {
          const obtenerPokemonAleatorio = async () => {
            // Número total de Pokémon en la API
            const totalPokemon = 898;  // Este número puede cambiar según la versión de la API
      
            // Obtener un número aleatorio entre 1 y el total de Pokémon
            const numeroPokemon = Math.floor(Math.random() * totalPokemon) + 1;
      
            // Construir la URL de la API con el número de Pokémon aleatorio
            const url = `https://pokeapi.co/api/v2/pokemon/${numeroPokemon}/`;
      
            try {
              // Realizar la solicitud a la API
              const response = await fetch(url);
              const data = await response.json();
      
              // Actualizar el estado con la información del Pokémon
              setPokemon({
                nombre: data.name.capitalize(),
                id: data.id,
                tipos: data.types.map(tipo => tipo.type.name.capitalize())
              });
            } catch (error) {
              console.error('Error al obtener información del Pokémon:', error);
            }
          };
      
          obtenerPokemonAleatorio();
        }, []); // El segundo argumento [] asegura que useEffect se ejecute solo una vez al montar el componente

        
        {pokemon ? (
            <div>
            <h2>Información del Pokémon:</h2>
            <p>Nombre: {pokemon.nombre}</p>
            <p>ID: {pokemon.id}</p>
            <p>Tipos: {pokemon.tipos.join(', ')}</p>
            </div>
        ) : (
            <p>Cargando información del Pokémon...</p>
        )};

    };


        export default PokemonAleatorio;


*/

    /* FUNCIONES PAGINA PAGINAPRINCIPAL */
    const goto=useNavigate();
    function irLogin() {
        goto("/login");
    }

    function mostrarContenidoRocketLeague() {
        let divRocketLeague=document.getElementById("contenido-RocketLeague");
        let divLeagueOfLegends=document.getElementById("contenido-LeagueOfLegends");
        let divCounterStrike=document.getElementById("contenido-CounterStrike");
    
        divRocketLeague.style.display="block";
        divLeagueOfLegends.style.display="none";
        divCounterStrike.style.display="none";
        divPokemon.style.display="none";
    }
    
    function mostrarContenidoLeagueOfLegends() {
        let divRocketLeague=document.getElementById("contenido-RocketLeague");
        let divLeagueOfLegends=document.getElementById("contenido-LeagueOfLegends");
        let divCounterStrike=document.getElementById("contenido-CounterStrike");
    
        divRocketLeague.style.display="none";
        divLeagueOfLegends.style.display="block";
        divCounterStrike.style.display="none";
        divPokemon.style.display="none";
    }
    
    function mostrarContenidoCounterStrike() {
        let divRocketLeague=document.getElementById("contenido-RocketLeague");
        let divLeagueOfLegends=document.getElementById("contenido-LeagueOfLegends");
        let divCounterStrike=document.getElementById("contenido-CounterStrike");
    
        divRocketLeague.style.display="none";
        divLeagueOfLegends.style.display="none";
        divCounterStrike.style.display="block";
        divPokemon.style.display="none";
    }
    
    function mostrarPokemon() {
        let divRocketLeague=document.getElementById("contenido-RocketLeague");
        let divLeagueOfLegends=document.getElementById("contenido-LeagueOfLegends");
        let divCounterStrike=document.getElementById("contenido-CounterStrike");
        let divPokemon=document.getElementById("contenido-Pokemon");
    
        divRocketLeague.style.display="none";
        divLeagueOfLegends.style.display="none";
        divCounterStrike.style.display="none";
        divPokemon.style.display="block";
    }

    /* DEJAR COMO MEJORA
    function mostrarOcultarFooter() {
        let container4=document.getElementById("container4");
        let botonOcultarMostrar=document.getElementById("mostrarOcultarFooter");
        
        if(container4.style.display=="flex") {
            container4.style.display="none";
            botonOcultarMostrar.src="../../BORRARRR/PaginaPrincipal/ImagenesYvideos/subirFooter.png";
        } else if(container4.style.display=="none") {
            container4.style.display="flex";
            botonOcultarMostrar.src="../../BORRARRR/PaginaPrincipal/ImagenesYvideos/guardarFooter.png";
        }
    }
    */
    
    
    
    // Función para acceder a un objeto aleatorio de la API de Key-Drop/CounterStrike
    async function objetoAleatorioApiCounterStrike() {
        const apiUrl = "https://key-drop.com/cdn-cgi/image/format=auto,width=270,dpr=1/uploads/skins"; // https://rl.exchange/es/shop
        const apiKey = "6Ld2uggaAAAAAG9YRZYZkIhCdS38FZYpY9RRYkwN";
    
        try {
          // Realizar la solicitud GET utilizando fetch
          const response = await fetch(`${apiUrl}/random?api_key=${apiKey}`,{method: "GET", mode: "no-cors",});
      
          // Verificar si la respuesta es exitosa (código de estado 200)
          if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
          }
      
          // Parsear la respuesta como JSON
          const data = await response.json();
      
          // Procesar los datos del recurso aleatorio
    
          // Mostrar en el div debajo del boton 4 objetos aleatorios y un boton que ponga recargar para que cambie los 4 objetos aleatorios!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          console.log(data);
        } catch (error) {
          console.error("Error al realizar la solicitud:", error);
        }
    }
    
    // Función para acceder a un objeto aleatorio de la API de Key-Drop/RocketLeague
    async function objetoAleatorioApiRocketLeague() {
        const apiUrl = "https://api.imgur.com/3/image";
        const apiKey = "6LeZRdsZAAAAAAKi0GQhhuU7ssa0-txaoeiiRIEd";
    
        try {
          // Realizar la solicitud GET utilizando fetch
          const response = await fetch(`${apiUrl}/random?api_key=${apiKey}`,{method: "GET", mode: "no-cors",});
      
          // Verificar si la respuesta es exitosa (código de estado 200)
          if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
          }
      
          // Parsear la respuesta como JSON
          const data = await response.json();
      
          // Procesar los datos del recurso aleatorio
    
          // Mostrar en el div debajo del boton 4 objetos aleatorios y un boton que ponga recargar para que cambie los 4 objetos aleatorios!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          console.log(data);
        } catch (error) {
          console.error("Error al realizar la solicitud:", error);
        }
    }

    /* Funcion enviarPreguntaRapida */
    function enviarPreguntaRapida() {
        
        // Obtén el mensaje del textarea
        var textoPreguntaRapida=document.getElementById("preguntaRapida").value;
        if(textoPreguntaRapida!="") {
            // Usa el protocolo mailto para abrir el cliente de correo predeterminado
            var mailtoLink = "mailto:?subject=Pregunta rapida&body=" + encodeURIComponent(textoPreguntaRapida);

            // Abre el cliente de correo electrónico del usuario
            window.location.href = mailtoLink;
        } else {
            alert('Debe introducir la pregunta que quiere realizar');
        }

    }
    
    
    /* SIDEBAR */
    /* ROCKET LEAGUE */
    function mostrarOctane() {
        document.getElementById('imagenMostradaRocketLeague').src="ImagenesYvideos/RocketLeague/octaneFoto.jpeg";
    }
    function mostrarDominus() {
        document.getElementById('imagenMostradaRocketLeague').src="ImagenesYvideos/RocketLeague/dominusFoto.png";
    }
    function mostrarBatman() {
        document.getElementById('imagenMostradaRocketLeague').src="ImagenesYvideos/RocketLeague/batmanFoto.jpg";
    }
    function mostrarBugatti() {
        document.getElementById('imagenMostradaRocketLeague').src="ImagenesYvideos/RocketLeague/bugattiFoto.jpg";
    }
    function mostrarFennec() {
        document.getElementById('imagenMostradaRocketLeague').src="ImagenesYvideos/RocketLeague/fennecFoto.jpeg";
    }
    function mostrarJager() {
        document.getElementById('imagenMostradaRocketLeague').src="ImagenesYvideos/RocketLeague/jager619rsFoto.png";
    }

    /* League Of Legends */
    function mostrarKayn() {
        document.getElementById('imagenMostradaLeagueOfLegends').src="ImagenesYvideos/LeagueOfLegends/kaynFoto.jpg";
    }
    function mostrarChoGath() {
        document.getElementById('imagenMostradaLeagueOfLegends').src="ImagenesYvideos/LeagueOfLegends/chogathFoto.jpg";
    }
    function mostrarWarwick() {
        document.getElementById('imagenMostradaLeagueOfLegends').src="ImagenesYvideos/LeagueOfLegends/warwickFoto.jpg";
    }
    function mostrarIllaoi() {
        document.getElementById('imagenMostradaLeagueOfLegends').src="ImagenesYvideos/LeagueOfLegends/illaoiFoto.jpg";
    }
    function mostrarLux() {
        document.getElementById('imagenMostradaLeagueOfLegends').src="ImagenesYvideos/LeagueOfLegends/luxFoto.jpg";
    }
    function mostrarKhaZix() {
        document.getElementById('imagenMostradaLeagueOfLegends').src="ImagenesYvideos/LeagueOfLegends/khazixFoto.jpg";
    }

    /* Counter Strike */
    function mostrarGlock() {
        document.getElementById('imagenMostradaCounterStrike').src="ImagenesYvideos/CounterStrike/glock-18Foto.png";
    }
    function mostrarUsp() {
        document.getElementById('imagenMostradaCounterStrike').src="ImagenesYvideos/CounterStrike/usp-sFoto.png";
    }
    function mostrarTek() {
        document.getElementById('imagenMostradaCounterStrike').src="ImagenesYvideos/CounterStrike/tek-9Foto.png";
    }
    function mostrarAk() {
        document.getElementById('imagenMostradaCounterStrike').src="ImagenesYvideos/CounterStrike/ak-47Foto.png";
    }
    function mostrarSsg() {
        document.getElementById('imagenMostradaCounterStrike').src="ImagenesYvideos/CounterStrike/ssg08Foto.png";
    }
    function mostrarAwp() {
        document.getElementById('imagenMostradaCounterStrike').src="ImagenesYvideos/CounterStrike/awpFoto.png";
    }

    return (
        <>
            <div className="container1">
                <div className="sidebar">

                    <div id="parteDerMenu">
                        <div className="contenedor0Menu">
                            <img src="ImagenesYvideos/iconoEstrellaVacia.png" className="imagen"/>
                            <div className="menu-desplegable">
                                <a href="" className="menu-item">Hola</a>
                            </div>
                        </div>
                        <div className="contenedor1Menu">
                            <img src="ImagenesYvideos/iconoPLAY.png" className="imagen" />
                            <div className="menu-desplegable">
                                <a href="" onClick={mostrarContenidoRocketLeague} className="menu-item">Rocket League</a>
                            </div>
                        </div>
                        <div className="contenedor2Menu">
                            <img src="ImagenesYvideos/iconoPC.png" className="imagen" />
                            <div className="menu-desplegable">
                                <a href="#" onClick={mostrarContenidoRocketLeague} className="menu-item">Rocket League</a>
                                <a href="#" onClick={mostrarContenidoLeagueOfLegends} className="menu-item">League Of Legends</a>
                                <a href="#" onClick={mostrarContenidoCounterStrike} className="menu-item">Counter Strike 2</a>
                                <a href="#" onClick={mostrarPokemon} className="menu-item">Pokemon</a>
                            </div>
                        </div>
                        <div className="contenedor3Menu">
                            <img src="ImagenesYvideos/iconoUsuario.png" alt="Imagen" className="imagen" />
                            <div className="menu-desplegable">
                                <a href="./usuario" className="menu-item" target="_blank">Usuario</a>
                                <a href="./cambiocontraseña" className="menu-item" target="_blank">Cambiar contraseña</a>
                                <a href="#" onClick={irLogin} className="menu-item">Salir</a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="containerMedio">
                <div className="container2">
                    <div className="main-content">

                        <h1 className="textoEnlaces">Enlaces:</h1>
                        <div className='line-wh'></div>
                        <div id="listaEnlaces">
                            <table width="100%">
                                <thead></thead>
                                <tbody>
                                    <tr>
                                        <td><a href="#inicioPagina" onClick={mostrarContenidoRocketLeague}><img src="ImagenesYvideos/ImagenEnlaceRocketLeague.jpeg" /></a></td>
                                    </tr>
                                    <tr align="right">
                                        <td><a href="#inicioPagina" onClick={mostrarContenidoLeagueOfLegends}><img src="ImagenesYvideos/ImagenEnlaceLeagueOfLegends.jpeg" /></a></td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2"><a href="#inicioPagina" onClick={mostrarContenidoCounterStrike}><img src="ImagenesYvideos/ImagenEnlaceCounterStrike.jpeg" /></a></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <br/><br/>
                        <h2 align="center">¿Alguna pregunta rapida?</h2>
                        <div className='line-wh'></div>
                        
                        <div className="preguntaRapida">
                            <textarea id="preguntaRapida" name="mensaje" rows="5" cols="42" placeholder="Escribe tu pregunta aquí"></textarea>
                            <br/>
                            <input type="button" className="botonPreguntaRapida" id="botonEnviarPreguntaRapida" onClick={enviarPreguntaRapida} value="Enviar" />
                        </div>

                        <br/><br/>

                    
                    </div>
                </div>
                
                <div className="container3">
                    <div className="general-content">

                        <div id="inicioPagina"></div>

                        <div id="contenido-RocketLeague">
                            <div align="center">
                                <h2>Rocket League</h2>
                                <img src="ImagenesYvideos/LogoRocketLeague.jpeg" />
                            </div>
                            <br/>
                            <p>El Rocket League trata de un juego con coches y tiene varios modos. Tiene los partidos de futbol que pueden ser de 1 contra 1 hasta de 4 contra 4, tambien tiene otros modos de juego como futbol pero con un disco de hockey, baloncesto, futbol pero con poderes y un ultimo modo de anotar goles rompiendo el suelo, que esto se consigue haciendo que despues de darla a la pelota tu o uno de tu equipo tiene que botar en el suelo del equipo contrario.</p>

                            <p className="textoEncimaDeSidebar">Estos son algunos de los coches que se pueden usar en el juego</p>

                            <div className="divSidebar">
                                <div className="imagenesSidebar">
                                    <p>OCTANE</p>
                                    <img src="ImagenesYvideos/RocketLeague/octaneFoto.jpeg" alt="Imagen 1" onClick={mostrarOctane} />
                                    <p>DOMINUS</p>
                                    <img src="ImagenesYvideos/RocketLeague/dominusFoto.png" alt="Imagen 2" onClick={mostrarDominus} />
                                    <p>BATMAN</p>
                                    <img src="ImagenesYvideos/RocketLeague/batmanFoto.jpg" alt="Imagen 3" onClick={mostrarBatman} />
                                    <p>BUGATTI</p>
                                    <img src="ImagenesYvideos/RocketLeague/bugattiFoto.jpg" alt="Imagen 3" onClick={mostrarBugatti} />
                                    <p>FENNEC</p>
                                    <img src="ImagenesYvideos/RocketLeague/fennecFoto.jpeg" alt="Imagen 3" onClick={mostrarFennec} />
                                    <p>JAGER 619 RS</p>
                                    <img src="ImagenesYvideos/RocketLeague/jager619rsFoto.png" alt="Imagen 3" onClick={mostrarJager} />
                                </div>
                                <div className="contenidoSidebar">
                                    <img id="imagenMostradaRocketLeague" src="ImagenesYvideos/RocketLeague/octaneFoto.jpeg" alt="Imagen mostrada" />
                                </div>
                            </div>
                            
                            <div align="center">
                                <h3 className="textoh3">Este es un video de algunas de las mejores jugadas</h3>
                                <iframe width="960" height="515" src="https://www.youtube.com/embed/wodNhn9wh8E?si=Std8TygsY3XBcU4t" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                            </div>

                            <br/>
                            <button onClick={objetoAleatorioApiRocketLeague}>Mostrar un objeto aleatorio de la API</button>
                        </div>

                        <div id="contenido-LeagueOfLegends">
                            <div align="center">
                                <h2>League of Legends</h2>
                                <img src="ImagenesYvideos/LogoLeagueOfLegends.png" />
                            </div>
                            <br/>
                            <p>El League of Legends trata de un juego de 5 contra 5 que tiene distintos modos. Los personajes se enfrentan con sus habilidades y deben conseguir romper las torres y el nucleo del equipo contrario.</p>

                            <p className="textoEncimaDeSidebar">Estos son algunos de los PERSONAJES que se pueden usar en el juego:</p>

                            <div className="divSidebar">
                                <div className="imagenesSidebar">
                                    <p>KAYN</p>
                                    <img src="ImagenesYvideos/LeagueOfLegends/kaynFoto.jpg" alt="Imagen 1" onClick={mostrarKayn} />
                                    <p>CHO'GATH</p>
                                    <img src="ImagenesYvideos/LeagueOfLegends/chogathFoto.jpg" alt="Imagen 2" onClick={mostrarChoGath} />
                                    <p>WARWICK</p>
                                    <img src="ImagenesYvideos/LeagueOfLegends/warwickFoto.jpg" alt="Imagen 3" onClick={mostrarWarwick} />
                                    <p>ILLAOI</p>
                                    <img src="ImagenesYvideos/LeagueOfLegends/illaoiFoto.jpg" alt="Imagen 3" onClick={mostrarIllaoi} />
                                    <p>LUX</p>
                                    <img src="ImagenesYvideos/LeagueOfLegends/luxFoto.jpg" alt="Imagen 3" onClick={mostrarLux} />
                                    <p>KHA'ZIX</p>
                                    <img src="ImagenesYvideos/LeagueOfLegends/khazixFoto.jpg" alt="Imagen 3" onClick={mostrarKhaZix} />
                                </div>
                                <div className="contenidoSidebar">
                                    <img id="imagenMostradaLeagueOfLegends" src="ImagenesYvideos/LeagueOfLegends/kaynFoto.jpg" alt="Imagen mostrada" />
                                </div>
                            </div>
                            
                            <div align="center">
                                <h3 className="textoh3">Este es un video de algunas de las mejores jugadas</h3>
                                <iframe width="760" height="415" src="https://www.youtube.com/embed/F_0t6o3aWB0?si=Ad8YLESJP0yrzvzW" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>

                                <h3 className="textoh3">Este es un video de como se debe jugar con Kayn</h3>
                                <iframe width="960" height="515" src="https://www.youtube.com/embed/M2BRvbY_N4o?si=ebKZ5BjI71hmI7pc" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                            </div>
                        </div>

                        <div id="contenido-CounterStrike">
                            <div align="center">
                                <h2>Counter-Strike 2</h2>
                                <img src="ImagenesYvideos/LogoCounterStrike.jpeg" />
                            </div>
                            <br/>
                            <p>El Counter-Strike 2 se trata de un shooter tactico de 5 contra 5, en el que tienes que matar a tus contringantes o plantar una bomba y lograr que explote en el caso de los terroristas, y en el caso de los antiterroristas tienes que desactivar la bomba y matar a todos los terroristas o desactivar la bomba. Se divide en <b>Terroristas</b> y <b>Antiterroristas</b>.</p>
                            
                            <p className="textoEncimaDeSidebar">Estas son algunas de las armas que se pueden usar en el juego:</p>
                            
                            <div className="divSidebar">
                                <div className="imagenesSidebar">
                                    <p>GLOCK-18</p>
                                    <img src="ImagenesYvideos/CounterStrike/glock-18Foto.png" alt="Imagen 1" onClick={mostrarGlock} />
                                    <p>USP-S</p>
                                    <img src="ImagenesYvideos/CounterStrike/usp-sFoto.png" alt="Imagen 2" onClick={mostrarUsp} />
                                    <p>TEK-9</p>
                                    <img src="ImagenesYvideos/CounterStrike/tek-9Foto.png" alt="Imagen 3" onClick={mostrarTek} />
                                    <p>AK-47</p>
                                    <img src="ImagenesYvideos/CounterStrike/ak-47Foto.png" alt="Imagen 3" onClick={mostrarAk} />
                                    <p>SSG 08</p>
                                    <img src="ImagenesYvideos/CounterStrike/ssg08Foto.png" alt="Imagen 3" onClick={mostrarSsg} />
                                    <p>AWP</p>
                                    <img src="ImagenesYvideos/CounterStrike/awpFoto.png" alt="Imagen 3" onClick={mostrarAwp} />
                                </div>
                                <div className="contenidoSidebar">
                                    <img id="imagenMostradaCounterStrike" src="ImagenesYvideos/CounterStrike/glock-18Foto.png" alt="Imagen mostrada" />
                                </div>
                            </div>
                            
                            <div align="center">
                                <h3 className="textoh3">Este es un video de algunas de las mejores jugadas</h3>
                                <iframe width="960" height="515" src="https://www.youtube.com/embed/AINLFl9cKN0?si=t0vujq8S1KgYiwW9" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                            </div>

                            <br/>
                            <button onClick={objetoAleatorioApiCounterStrike}>Mostrar un objeto aleatorio de la API</button>
                            
                        </div>

                        <div id="contenido-Pokemon">
                            <div align="center">
                                <img src="ImagenesYvideos/LogoPokemon.png" className="imagenLogoPokemon"/>
                            </div>
                            <br/>
                            <p align="center" className="textoEncimaDeSidebar">Aqui tienes 4 pokemons aleatorios</p>
                            
                            
                            


                        </div>

                        <a href="#inicioPagina" className="botonHaciaArriba">
                            <img src="ImagenesYvideos/flechaPaginaHaciaArriba.png" id="imagenIrHaciaArriba" />
                        </a>
                    </div>
                </div>
            </div>

            <div className="container4" id="container4">
                <div className="aside">
                    <p id="footer">Pagina creada por <b>Hristo Stoyanov Gueorguiev</b></p>
                </div>
            </div>
        </>
    );
}