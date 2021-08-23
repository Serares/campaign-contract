import React from 'react';
import { Header } from './Header';
import { Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

export const Layout = (props) => {

    return (
        <Container style={{marginTop: "10px"}}>
            <header><Header /></header>
            {props.children}
            <footer>Footer</footer>
        </Container>
    )

}
