import React, { useState, useContext } from 'react';
import { css } from '@emotion/core';
import Router, { useRouter } from 'next/router';
import FileUploader from 'react-firebase-file-uploader';
import Layout from '../components/layout/Layout';
import { Formulario, Campo, InputSubmit, Error } from '../components/ui/Formulario';
import Error404 from '../components/layout/404';
import { FirebaseContext } from '../firebase/index';



// validaciones
import useValidacion from '../hooks/useValidacion';
import validarCrearProducto from '../validacion/validarCrearProducto';

const STATE_INICIAL = {
  nombre: '',
  empresa: '',
    imagen: '',
    categoria: '',
  url: '',
  bloque: '',
  descripcion: ''
}

const NuevoProducto = () => {

  // state de las imagenes
  const [nombreimagen, guardarNombre] = useState('');
  const [subiendo, guardarSubiendo] = useState(false);
  const [ progreso, guardarProgreso ] = useState(0);
  const [urlimagen, guardarUrlImagen] = useState('');

  const [ error, guardarError] = useState(false);

  const { valores, errores, handleSubmit, handleChange, handleBlur } = useValidacion(STATE_INICIAL, validarCrearProducto, crearProducto);

  const { nombre, empresa, bloque, imagen, url, descripcion ,categoria} = valores;

  // hook de routing para redireccionar
  const router = useRouter();

  // context con las operaciones crud de firebase
  const { usuario, firebase } = useContext(FirebaseContext);

  async function crearProducto() {

    // si el usuario no esta autenticado llevar al login
    if(!usuario) {
      return router.push('/login');
    }

    // crear el objeto de nuevo producto 
    const producto = {
        nombre, 
        empresa, 
        url, 
        bloque,
        urlimagen,
        descripcion,
        votos: 0,
        categoria,
        comentarios: [],
        creado: Date.now(), 
        creador: {
          id: usuario.uid,
          nombre: usuario.displayName
        }, 
        haVotado: []
    }

    // insertarlo en la base de datos
    firebase.db.collection('productos').add(producto);

    return router.push('/');

  }


  const handleUploadStart = () => {
      guardarProgreso(0);
      guardarSubiendo(true);
  }

  const handleProgress = progreso => guardarProgreso({ progreso });

  const handleUploadError = error => {
      guardarSubiendo(error);
      console.error(error);
  };

  const handleUploadSuccess = nombre => {
      guardarProgreso(100);
      guardarSubiendo(false);
      guardarNombre(nombre)
      firebase
          .storage
          .ref("productos")
          .child(nombre)
          .getDownloadURL()
          .then(url => {
            console.log(url);
            guardarUrlImagen(url);
          } );
  };


  return (
    <div>
      <Layout>
        { !usuario ? <Error404 /> : (
          <>
            <h1
              css={css`
                text-align: center;
                margin-top: 5rem;
              `}
            >Nuevo Producto</h1>
            <Formulario
              onSubmit={handleSubmit}
              noValidate
            >

              <fieldset>
                <legend>Informaci??n General </legend>
            
                <Campo>
                    <label htmlFor="nombre">Nombre</label>
                    <input 
                        type="text"
                        id="nombre"
                        placeholder="Nombre del Producto"
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </Campo>

                <Campo>
                    <label htmlFor="nombre">Des Breve/Precio</label>
                    <input 
                        type="text"
                        id="nombre"
                        placeholder="Descripcion Breve"
                        name="empresa"
                        value={empresa}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </Campo>
                {errores.empresa && <Error>{errores.empresa}</Error> }
                {errores.nombre && <Error>{errores.nombre}</Error> }
    
                <Campo>
                    <label htmlFor="bloque">Bloque</label>
                    <select
                      id="bloque"
                      name="bloque"
                      value={bloque}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >   <option value="">-Selecciona Bloque-</option>
                        <option value="Bloque A">Bloque A</option>
                        <option value="Bloque B">Bloque B</option>
                    </select>
                </Campo>

                <Campo>
                    <label htmlFor="categoria">Categoria</label>
                    <select
                      id="categoria"
                      name="categoria"
                      value={categoria}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >   <option value="">-Selecciona Categoria-</option>
                        <option value="Comida">Comida</option>
                        <option value="Electronica">Electronica</option>
                        <option value="Salud">Salud</option>
                        <option value="Otros">Otros</option>
                    </select>
                </Campo>

               
    
                <Campo>
                    <label htmlFor="imagen">Imagen</label>
                    <FileUploader 
                        accept="image/*"
                        id="imagen"
                        name="imagen"
                        randomizeFilename
                        storageRef={firebase.storage.ref("productos")}
                        onUploadStart={handleUploadStart}
                        onUploadError={handleUploadError}
                        onUploadSuccess={handleUploadSuccess}
                        onProgress={handleProgress}
                    />
                </Campo>
                <Campo>
                    <label htmlFor="url">WhatsApp/FB</label>
                    
                    <input 
                        type="url"
                        id="url"
                        name="url"
                        placeholder="https://wa.me/5215543701797"
                        value={url}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </Campo>
                <p>Ej: https://wa.me/5215548704797</p>

                {errores.url && <Error>{errores.url}</Error> }

              </fieldset>

              <fieldset>
                <legend>Sobre tu Producto</legend>

                <Campo>
                    <label htmlFor="descripcion">Descripcion</label>
                    <textarea 
                        id="descripcion"
                        name="descripcion"
                        value={descripcion}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </Campo>

                {errores.descripcion && <Error>{errores.descripcion}</Error> }
              </fieldset>

              
                

                {error && <Error>{error} </Error>}
    
                <InputSubmit 
                  type="submit"
                  value="Crear Producto"
                />
            </Formulario>
          </>
        ) }
        
      </Layout>
    </div>
  )
}

export default NuevoProducto;