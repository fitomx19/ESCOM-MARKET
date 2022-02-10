import React from "react";
import styled from "@emotion/styled";
import Layout from "../components/layout/Layout";
import DetallesProducto from "../components/layout/DetallesProducto";
import useProductos from '../hooks/useProductos';
import {css} from '@emotion/core';

const Acerca = () =>{
  const { productos} = useProductos('votos');

  const IMG = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
`;
const DIV = styled.img`
width: 100%;
max-width: 400px;
height: auto;
`;
  return (
 
    <div>
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            
          <div class="w3-container">
<center>  <h2>Adolfo Huerta</h2></center>

  <center>
  <div class="w3-card-4" css={css`width:50%`}>
  <center><IMG src="https://lh3.googleusercontent.com/F9a3eT_gB5on6GUqfJsNAckB6J4v8gQHnJEwt6KpNDopbBcWUbGLAhgh3eQFGWvKRRwGKvk0eOpEd2En65bb1tRH3J7fRp90o3ylYWmf3UWj1c8juS0iXqnM0edvIB1eukVqkhACBUw2DSVakxhVeaMj_o1sDR_PslYUuB2QFIYFxzQmPE4H-jhRsR7MWSq-jBqAPaKk1sCa86Hq_O46xBt4oE5gdMcg3o_1USry2r_IEa5s0pOBUbotKbqb8mBOcDDgFwRo3sJElId3PqQvfTTmVDg5cOKJKzHVJeJ0q92UFJ4zPljtEsL1IiWjj2fydLhC4x-4fGanyB1eDNSNQSa4SWKMLjvucDcZR-cC9VIafKECWTxzc7UCCOwvLAA_XJ5f4AM5-aq3GnwgcKeMFQy8yluQdB-gx3Bm60JGNz_J79KZRTAnGyUwBgWJqqnzPWPcmHAHgMC02bXqQID19zSBLMOmQX4fs3DnWdlkGZPMwkL9S6gaDkLY1a0gMEbKd5zdrRrMeFMqVP9LLjLVCIs7LpkQbpzcMasvIcqIWbLmhy8lbL4jPx51GglxyenLEBQfMOYOVjWKvGFakej09pZw9RKqPfmwwpFiRqMz9EY5u1BzvVPeljIbteI4VlSdO5DeUycwzj-0FC00JpbTH-ng2jLtpEXotoI48PZT35oOsaBs5_Vzjl8EMc3AjRavX7849GmYSs_Zm-wJQnFBwQQR=w703-h938-no?authuser=0" alt="Alps" /></center>
    <div class="w3-container w3-center">
      <p css={css`font-size:0.95rem;`}>4 semestre LCD</p>
      <p css={css`font-size:0.75rem;`}>Github:<a href="https://github.com/fitomx19">fitomx19</a></p>
      <p css={css`font-size:0.75rem;`}>Tel: <a href="tel:5548701797">(55)48701797</a></p>
      <small>Desarrolle esta applicacion con el fin de que puedan agregar sus ventas de productos dentro de la ESCOM , cualquier duda o sugerencia contactenme porfavor!</small>
    </div>
  </div>
  </center>
</div>
                
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Acerca;
