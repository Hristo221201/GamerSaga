import { useNavigate } from "react-router-dom";
import React, { useEffect } from 'react';
import { useState } from 'react';
import PokemonAleatorio from './apiPokemon.jsx';
import { Texto } from './bdconection.js';
import PokemonsFavoritos from "./pokemonsFavoritos.jsx";
import { db } from './bdconection.js';
import { storage } from './bdconection.js';
import { sendEmailPreguntaRapida } from './emailConfig';
import { actualUser } from "./bdconection.js";
import { ref, getDownloadURL } from 'firebase/storage';
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'

async function mostrarContenido(contenidoID) {
    const secciones = [];
    let storageRef = storage.ref("Imagenes");

    const juegosRef = await storageRef.child("/Juegos/").listAll();
    //console.log(juegosRef);
    const prefixesJuegosRef = juegosRef.prefixes
    //console.log(prefixesJuegosRef);
    for(let i=0; i<prefixesJuegosRef.length; i++) {
        secciones.push(`contenido-${prefixesJuegosRef[i].name}`);
    }
    //console.log(secciones);
    secciones.push("contenido-Pokemon");
    secciones.push("contenido-Favoritos");
    console.log(secciones);

    secciones.forEach(seccionID => {
        const div = document.getElementById(seccionID);
        console.log(div);
        if (div) {
            div.style.display = (seccionID === contenidoID) ? "block" : "none";
        }
    });
}

/* Bucle implantacion de imagenes */
const ImagenesJuegos = ({ juego, imagenes, logoUrl, infoJuego }) => {

    const [selectedImage, setSelectedImage] = useState('');

    // Cambiar textos
    const [editingText, setEditingText] = useState('');
    const [isEditingText, setIsEditingText] = useState(false);
    const [idElemento, setIdElemento] = useState(null);

    const clickEdicion = (e, text) => {
        setEditingText(text);
        setIsEditingText(true);
        const elementID = e.target.id;
        setIdElemento(elementID);
    };


    const aceptarEdicion = () => {
        // Guardamos el nuevo texto
        const nombreJuego = idElemento.split('.');
        if (idElemento === `${juego}.Titulo`) {
            Texto.doc(nombreJuego[0]).update({Titulo: editingText});
            infoJuego.titulo = editingText;
        } else if (idElemento === `${juego}.Info`) {
            Texto.doc(nombreJuego[0]).update({Info: editingText});
            infoJuego.info = editingText;
        } else if (idElemento === `${juego}.TextoAntesDeImagenes`) {
            Texto.doc(nombreJuego[0]).update({TextoAntesDeImagenes: editingText});
            infoJuego.textoAntesDeImagenes = editingText;
        }

        console.log('Texto guardado en la base de datos:', editingText);
        setIsEditingText(false);
    };

    const cancelarEdicion = () => {
        setIsEditingText(false);
    };

    const mostrarImagen = (imageUrl) => {
        setSelectedImage(imageUrl);
    };


    return(
        <div id={`contenido-${juego}`} style={{display: "none"}} className={`contenido-${juego}`}>
            {isEditingText && (
                <div className="modal">
                    <input 
                        type="text" 
                        value={editingText} 
                        onChange={(e) => setEditingText(e.target.value)} 
                    />
                    <button onClick={aceptarEdicion}>Aceptar</button>
                    <button onClick={cancelarEdicion}>Cancelar</button>
                </div>
            )}
            <div align="center">
                <h2 id={`${juego}.Titulo`} onClick={(e) => clickEdicion(e, infoJuego.titulo)}>{infoJuego.titulo}</h2>
                <img src={logoUrl} id={`Logo${juego.split(".")[0]}`} alt={`Logo de ${juego}`} />
            </div>
            <br/>
            <p id={`${juego}.Info`} onClick={(e) => clickEdicion(e, infoJuego.info)}>{infoJuego.info}</p>
            <p className="textoEncimaDeSidebar" id={`${juego}.TextoAntesDeImagenes`} onClick={(e) => clickEdicion(e, infoJuego.textoAntesDeImagenes)}>{infoJuego.textoAntesDeImagenes}</p>
            <div className="divSidebar">
                <div className="imagenesSidebar">
                    {imagenes.map(( image, index ) => (
                        <>
                            <p id={index+1} key={index+1}>{image.name.split(".")[0].toUpperCase()}</p>
                            <img src={image.url} id={image.name.split(".")[0]} onClick={() => mostrarImagen(image.url)}></img>
                        </>
                    ))}
                    
                </div>
                <div className="contenidoSidebar">
                    <img id={`imagenMostrada${juego}`} src={selectedImage} alt="Imagen mostrada" />
                </div>
            </div>
            <div align="center">
                <h3 className="textoh3">Este es un video de algunas de las mejores jugadas</h3>
                <iframe id={infoJuego.idTituloJuego} width="960" height="515" src={infoJuego.videoUrl} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
            </div>
        </div>
    );
};







/* Bucle carrusel vertical imagenes enlaces */

const CarouselVertical = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imagenesEnlaces, setImagenesEnlaces] = useState([]);

    let storageRef = storage.ref("Imagenes");

    useEffect(() => {
        const cargarImagenes = async () => {
            try {
                const enlacesRef = await storageRef.child("ImagenesEnlacesJuegos/").listAll();
                const enlacesPromises = enlacesRef.items.map(async (enlaceRef) => {
                    const imageName = enlaceRef.name.split("-")[0];
                    const imageUrl = await enlaceRef.getDownloadURL();
                    return { url: imageUrl, id: `contenido-${imageName}` };
                });
                const imagenes = await Promise.all(enlacesPromises);
                setImagenesEnlaces(imagenes);
            } catch (error) {
                console.error(`Error al cargar imágenes desde Firebase Storage:`, error);
            }
        };

        cargarImagenes();
        
    }, []);

    const imagenSiguiente = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === imagenesEnlaces.length - 2 ? 0 : prevIndex + 1
        );
    };
  
    const imagenAnterior = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? imagenesEnlaces.length - 2 : prevIndex - 1
        );
    };
  
    return (
        <div className="carousel-container">
            <a onClick={imagenAnterior} className="carousel-button"><img src="ImagenesYvideos/flechaHaciaArriba.png" style={{marginLeft: "35%", height: "60px", width: "64px"}} /></a>
            <div className="carousel" style={{marginLeft: "14%"}}>
                {imagenesEnlaces.slice(currentIndex, currentIndex + 2).map((image, index) => (
                    <a href="#inicioPagina" onClick={() => mostrarContenido(image.id)} id={currentIndex + index} key={currentIndex + index}>
                        <img src={image.url} alt={`Slide ${currentIndex + index}`} className="carousel-image" />
                    </a>
                ))}
            </div>
            <a onClick={imagenSiguiente} className="carousel-button"><img src="ImagenesYvideos/flechaHaciaAbajo.png" style={{marginLeft: "35%", height: "60px", width: "64px"}} /></a>
        </div>
    );
};


export default function PaginaPrincipal() {
    const [nombreJuegoNuevo, setNombreJuegoNuevo] = useState('');
    const [nombreJuegoNuevoSinEspacios, setNombreJuegoNuevoSinEspacios] = useState('');
    const [logoJuegoNuevo, setLogoJuegoNuevo] = useState(null);
    const [infoJuegoNuevo, setInfoJuegoNuevo] = useState('');
    const [textoImagenesJuegoNuevo, setTextoImagenesJuegoNuevo] = useState('');
    const [imagenesJuegoNuevo, setImagenesJuegoNuevo] = useState([]);
    const [videoJuegoNuevo, setVideoJuegoNuevo] = useState('');
    const [imagenEnlaceJuegoNuevo, setImagenEnlaceJuegoNuevo] = useState(null);

    useEffect(() => {
        // Agrega la clase específica para la página 2 al body
        document.body.classList.add('body-paginaprincipal');

        // Limpia la clase al desmontar el componente
        return () => {
            document.body.classList.remove('body-paginaprincipal');
        };
    }, [])


    /* FUNCIONES PAGINA PAGINAPRINCIPAL */
    const goto=useNavigate();
    function irLogin() {
        goto("/login");
    }





    /* Funcion enviarPreguntaRapida */
    const enviarPreguntaRapida = async () => {
        // Obtén el mensaje del textarea
        var textoPreguntaRapida = document.getElementById("preguntaRapida").value;

        const docUsuarioActual = (await actualUser.get()).docs[0].data();
        console.log(docUsuarioActual);
        
        sendEmailPreguntaRapida(docUsuarioActual.correo, textoPreguntaRapida);
    };



    const [juegosData, setJuegosData] = useState([]);

    useEffect(() => {
        const cargarDatosJuego = async (juego) => {
            try {
                const textosRef = Texto.doc(`${juego}`);
                const doc = await textosRef.get();
                if (doc.exists) {
                    const { Info: info, VideoUrl: videoUrl, Titulo: titulo, TextoAntesDeImagenes: textoAntesDeImagenes } = doc.data();
                    return { info, videoUrl, titulo, textoAntesDeImagenes };
                } else {
                    console.log("No existe el documento!");
                    return null;
                }
            } catch (error) {
                console.error(`Error al cargar datos de ${juego}:`, error);
                return null;
            }
        };

        let storageRef = storage.ref("Imagenes");

        const cargarImagenes = async (juego) => {
            try {
                const logoRefJpeg = storageRef.child(`/Juegos/${juego}/Logo${juego}.jpeg`);
                const logoRefPng = storageRef.child(`/Juegos/${juego}/Logo${juego}.png`);

                let logoUrl;
                try {
                    logoUrl = await logoRefJpeg.getDownloadURL();
                } catch (error) {
                    logoUrl = await logoRefPng.getDownloadURL();
                }

                const imagesRef = await storageRef.child(`/Juegos/${juego}/imagenesSidebar`).listAll();
                const imagesPromises = imagesRef.items.map(async (imageRef) => {
                    const imageName = imageRef.name.split(".")[0];
                    const imageUrl = await imageRef.getDownloadURL();
                    return { name: imageName, url: imageUrl };
                });
                const imagenes = await Promise.all(imagesPromises);

                return { logoUrl, imagenes };
            } catch (error) {
                console.error(`Error al cargar imágenes de ${juego} desde Firebase Storage:`, error);
                return { logoUrl: '', imagenes: [] };
            }
        };

        const cargarJuegos = async () => {
            try {
                const juegosRef = storageRef.child(`/Juegos`);
                const juegosList = await juegosRef.listAll();
                const juegosPromises = juegosList.prefixes.map(async (juegoRef) => {
                    const juego = juegoRef.name;
                    const infoJuego = await cargarDatosJuego(juego);
                    const { logoUrl, imagenes } = await cargarImagenes(juego);
                    return { juego, infoJuego, logoUrl, imagenes };
                });
                const juegos = await Promise.all(juegosPromises);
                setJuegosData(juegos);
            } catch (error) {
                console.error("Error al cargar juegos desde Firebase Storage:", error);
            }
        };

        cargarJuegos();
    }, []);

    

    /* Desplegable parte enlaces */
    function mostrarUocultarEnlaces() {
        let divEnlaces = document.getElementById("divEnlaces");
        let divConteiner3 = document.getElementById("divConteiner3");
        // Verificamos si el div está visible o no
        if (divEnlaces.style.display === "none") {
            divEnlaces.style.display = "block"; // Mostrar el div

            divConteiner3.style.minWidth = "80%";
        } else {
            divEnlaces.style.display = "none"; // Ocultar el div
            
            divConteiner3.style.minWidth = "100%";
        }

    }







    
    const cargarFavoritos = () => {
        //obtenerFavoritos();
        mostrarContenido('contenido-Favoritos');
    };





        // TERMINAR LO DE ARRIBA Y LO DE ABAJOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO




    const [urls, setUrls] = useState({});
    useEffect(() => {
        const fetchUrls = async () => {
          const menuIconUrl = await getDownloadURL(ref(storage, 'Imagenes/Iconos/menu.png'));
          const iconoEstrellaVaciaUrl = await getDownloadURL(ref(storage, 'Imagenes/Iconos/iconoEstrellaVacia.png'));
          const iconoPLAYUrl = await getDownloadURL(ref(storage, 'Imagenes/Iconos/iconoPLAY.png'));
          const iconoPCUrl = await getDownloadURL(ref(storage, 'Imagenes/Iconos/iconoPC.png'));
          const iconoUsuarioUrl = await getDownloadURL(ref(storage, 'Imagenes/Iconos/iconoUsuario.png'));
          const flechaPaginaHaciaArriba = await getDownloadURL(ref(storage, 'Imagenes/Iconos/flechaPaginaHaciaArriba.png'));
          const logoPokemon = await getDownloadURL(ref(storage, 'Imagenes/Pokemon/LogoPokemon.png'));
    
          setUrls({
            menuIconUrl,
            iconoEstrellaVaciaUrl,
            iconoPLAYUrl,
            iconoPCUrl,
            iconoUsuarioUrl,
            flechaPaginaHaciaArriba,
            logoPokemon
          });
        };
    
        fetchUrls();
    }, []);
    


    async function mostrarBotonAñadirNuevoJuego() {
        const actualUserDOC = await actualUser.get();
        const actualUserData = actualUserDOC.docs[0].data();
        const botonNuevoJuego = document.getElementById("botonNuevoJuego");
        if(actualUserData.correo === "hsg2001@hotmail.com") {
            botonNuevoJuego.style.display = "block";
        } else {
            botonNuevoJuego.style.display = "none";
        }
    }
    mostrarBotonAñadirNuevoJuego();










    
    
    const handleFileChange = (e, setFileJuegoNuevo) => {
        setFileJuegoNuevo(e.target.files[0]);
    };

    const handleMultipleFileChange = (e) => {
        setImagenesJuegoNuevo(e.target.files);
    };

    const cargarJuegoNuevo = async (juego) => {
        console.log(juego.nombreJuegoNuevoSinEspacios);
        const gameRef = db.collection('Textos').doc(juego.nombreJuegoNuevoSinEspacios);

        try {
            // Subir el logo del juego
            const logoRef = storage.ref(`Imagenes/Juegos/${juego.nombreJuegoNuevoSinEspacios}/Logo${juego.nombreJuegoNuevoSinEspacios}.${juego.logoJuegoNuevo.type.split('/')[1]}`);
            await logoRef.put(juego.logoJuegoNuevo);

            // Subir las imágenes del juego
            const imagenesSidebarRef = storage.ref(`Imagenes/Juegos/${juego.nombreJuegoNuevoSinEspacios}/imagenesSidebar/`);
            for (let i=0; i < juego.imagenesJuegoNuevo.length; i++) {
                const imagen = juego.imagenesJuegoNuevo[i];
                const imagenRef = imagenesSidebarRef.child(`imagen_${i + 1}.${imagen.type.split('/')[1]}`);
                await imagenRef.put(imagen);
            }

            // Subir la imagen de enlace
            const imagenEnlaceRef = storage.ref(`Imagenes/ImagenesEnlacesJuegos/${juego.nombreJuegoNuevoSinEspacios}-ImagenEnlace.${juego.imagenEnlaceJuegoNuevo.type.split('/')[1]}`);
            await imagenEnlaceRef.put(juego.imagenEnlaceJuegoNuevo);

            // Guardar los datos en Firestore
            await gameRef.set({
                Titulo: juego.nombreJuegoNuevo,
                Info: juego.infoJuegoNuevo,
                TextoAntesDeImagenes: juego.textoImagenesJuegoNuevo,
                VideoUrl: juego.videoJuegoNuevo,
            });

            Swal.fire('Éxito', 'El juego se ha añadido correctamente', 'success');
        } catch (error) {
            console.error("Error al subir los archivos: ", error);
            Swal.fire('Error', 'Hubo un problema al añadir el juego', 'error');
        }
    };


    const botonAñadirNuevoJuego = () => {
        Swal.fire({
            title: 'Añadir Juego Nuevo',
            html:
              `<input id="nombreJuegoNuevo" class="swal2-input" placeholder="Nombre del juego">
              <p id="textoImagenLogoJuegoNuevo" class="swal2-file">Selecciona la imagen que sera el logo:</p>
              <input id="logoJuegoNuevo" type="file" class="swal2-file" accept="image/*">
              <input id="infoJuegoNuevo" class="swal2-input" placeholder="Información del juego">
              <input id="textoImagenesJuegoNuevo" class="swal2-input" placeholder="Texto antes de las imágenes">
              <p id="textoImagenesMostradasJuegoNuevo" class="swal2-file">Selecciona las imagenes que sobre el juego que mostraras:</p>
              <input id="imagenesJuegoNuevo" type="file" class="swal2-file" accept="image/*" multiple>
              <input id="videoJuegoNuevo" class="swal2-input" placeholder="URL del video">
              <p id="textoImagenEnlaceJuegoNuevo" class="swal2-file">Selecciona la imagen que sera el enlace que muestre la pagina:</p>
              <input id="imagenEnlaceJuegoNuevo" type="file" class="swal2-file" accept="image/*">`,
            confirmButtonText: 'Crear',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            preConfirm: async () => {
                const nombreJuegoNuevoo = document.getElementById('nombreJuegoNuevo').value;
            //console.log(nombreJuegoNuevo);
                const nombreJuegoNuevoSinEspacioss = nombreJuegoNuevoo.trim();
            //console.log(nombreJuegoNuevoSinEspacios);
                const logoJuegoNuevoo = document.getElementById('logoJuegoNuevo').files[0];
            //console.log(logoJuegoNuevo);
                const infoJuegoNuevoo = document.getElementById('infoJuegoNuevo').value;
            //console.log(infoJuegoNuevo);
                const textoImagenesJuegoNuevoo = document.getElementById('textoImagenesJuegoNuevo').value;
            //console.log(textoImagenesJuegoNuevo);
                const imagenesJuegoNuevoo = document.getElementById('imagenesJuegoNuevo').files;
            //console.log(imagenesJuegoNuevo);
                const videoJuegoNuevoo = document.getElementById('videoJuegoNuevo').value;
            //console.log(videoJuegoNuevo);
                const imagenEnlaceJuegoNuevoo = document.getElementById('imagenEnlaceJuegoNuevo').files[0];
            //console.log(imagenEnlaceJuegoNuevo);
          
                setNombreJuegoNuevo(nombreJuegoNuevoo);
                setNombreJuegoNuevoSinEspacios(nombreJuegoNuevoSinEspacioss);
                setLogoJuegoNuevo(logoJuegoNuevoo);
                setInfoJuegoNuevo(infoJuegoNuevoo);
                setTextoImagenesJuegoNuevo(textoImagenesJuegoNuevoo);
                setImagenesJuegoNuevo(imagenesJuegoNuevoo);
                setVideoJuegoNuevo(videoJuegoNuevoo);
                setImagenEnlaceJuegoNuevo(imagenEnlaceJuegoNuevoo);

                return {
                    nombreJuegoNuevo: nombreJuegoNuevoo,
                    nombreJuegoNuevoSinEspacios: nombreJuegoNuevoSinEspacioss,
                    logoJuegoNuevo: logoJuegoNuevoo,
                    infoJuegoNuevo: infoJuegoNuevoo,
                    textoImagenesJuegoNuevo: textoImagenesJuegoNuevoo,
                    imagenesJuegoNuevo: imagenesJuegoNuevoo,
                    videoJuegoNuevo: videoJuegoNuevoo,
                    imagenEnlaceJuegoNuevo: imagenEnlaceJuegoNuevoo
                };
            }
        }).then((result) => {
            console.log(result);
            if (result.isConfirmed) {
                Swal.fire("Se creo el juego correctamente");
                cargarJuegoNuevo(result.value);
            }
        });

        // Manejadores de eventos para los inputs de archivo después de que lo demas esté listo
        Swal.getPopup().querySelector('#logoJuegoNuevo').addEventListener('change', (e) => handleFileChange(e, setLogoJuegoNuevo));
        Swal.getPopup().querySelector('#imagenesJuegoNuevo').addEventListener('change', handleMultipleFileChange);
        Swal.getPopup().querySelector('#imagenEnlaceJuegoNuevo').addEventListener('change', (e) => handleFileChange(e, setImagenEnlaceJuegoNuevo));

    };

    return (
        <>
            <div className="container1">
                <div className="sidebar">
                    
                    <div id="parteDerMenu">
                        <img src={urls.menuIconUrl} align="left" onClick={mostrarUocultarEnlaces} id="menu" className="iconoDesplegableEnlaces" />
                        <div className="contenedor0Menu">
                            <img src={urls.iconoEstrellaVaciaUrl} id="iconoEstrellaVacia" className="imagen" />
                            <div className="menu-desplegable">
                                <a href="#inicioPagina" className="menu-item" onClick={cargarFavoritos}>Pokemons Favoritos</a>
                            </div>
                        </div>
                        <div className="contenedor1Menu">
                            <img src={urls.iconoPLAYUrl} id="iconoPLAY" className="imagen" />
                            <div className="menu-desplegable">
                                <a href="#inicioPagina" className="menu-item" onClick={() => mostrarContenido('contenido-RocketLeague')}>Rocket League</a>
                            </div>
                        </div>
                        <div className="contenedor2Menu">
                            <img src={urls.iconoPCUrl} id="iconoPC" className="imagen" />
                            <div className="menu-desplegable">
                                <a href="#inicioPagina" className="menu-item" onClick={() => mostrarContenido('contenido-RocketLeague')}>Rocket League</a>
                                <a href="#inicioPagina" className="menu-item" onClick={() => mostrarContenido('contenido-LeagueOfLegends')}>League Of Legends</a>
                                <a href="#inicioPagina" className="menu-item" onClick={() => mostrarContenido('contenido-CounterStrike')}>Counter Strike 2</a>
                                <a href="#inicioPagina" className="menu-item" onClick={() => mostrarContenido('contenido-Pokemon')}>Pokemon</a>
                            </div>
                        </div>
                        <div className="contenedor3Menu">
                            <img src={urls.iconoUsuarioUrl} id="iconoUsuario" alt="Imagen" className="imagen" />
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
                <div id="divEnlaces" className="container2">
                    <div className="main-content">
                        <h1 className="textoEnlaces">Enlaces:<button className="botonNuevoJuego" id="botonNuevoJuego" onClick={botonAñadirNuevoJuego}>Añadir nuevo juego</button></h1>
                        <div className='line-wh'></div>
                        <div id="listaEnlaces">

                            <CarouselVertical />

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
                
                <div id="divConteiner3" className="container3">
                    <div className="general-content">
                        <div id="inicioPagina"></div>

                            {juegosData.map((juegoData, index) => (
                                <ImagenesJuegos
                                    key={index}
                                    juego={juegoData.juego}
                                    imagenes={juegoData.imagenes}
                                    logoUrl={juegoData.logoUrl}
                                    infoJuego={juegoData.infoJuego}
                                />
                            ))}

                        <div id="contenido-Pokemon" className="contenido-Pokemon" style={{display: "none"}}>
                        
                            <div align="center">
                                <img src={urls.logoPokemon} className="imagenLogoPokemon"/>
                            </div>
                            
                            <PokemonAleatorio />
                                
                        </div>

                        <div id="contenido-Favoritos" className="contenido-Favoritos" style={{display: "none"}}>

                            <PokemonsFavoritos />
                                
                        </div>

                        <a href="#inicioPagina" className="botonHaciaArriba">
                            <img src={urls.flechaPaginaHaciaArriba} id="imagenIrHaciaArriba" />
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