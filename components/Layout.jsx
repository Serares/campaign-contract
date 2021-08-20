import React from 'react';
import { Header } from './Header';
import { Container } from 'semantic-ui-react';

export const Layout = (props) => {

    return (
        <Container style={{marginTop: "10px"}}>
            <header><Header /></header>
            {props.children}
            <footer>Salz</footer>
        </Container>
    )

}
