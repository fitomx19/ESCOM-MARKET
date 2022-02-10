import React, { useContext } from "react";
import Link from 'next/link';
import styled from '@emotion/styled';
import { FirebaseContext } from '../../firebase/index';

const Nav = styled.nav`
        padding-left: 2rem;
        a{
                font-size: 1.8rem;
                margin-left: 2rem;
                color: var(--gris2);
                font-family: 'PT Sans' ,sans-serif;

                &::last-of-type{
                        margin-left:0;
                }
        }
`;
const Navegacion = () => {
        const { usuario } = useContext(FirebaseContext);

    return (
      <Nav>
        <Link href="/">
          <p>Inicio</p>
        </Link>
        <Link href="/populares">
          <p>Populares</p>
        </Link>
        <Link href="/acerca">
          <p>Acerca de</p>
        </Link>

        {usuario && (
          <Link href="/nuevo-producto">
            <p>Nuevo Producto</p>
          </Link>
        )}
      </Nav>
    );
}
 
export default Navegacion;