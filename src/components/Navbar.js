import React, { useState, useEffect } from "react";
import { Button, Container, Navbar, Nav } from "react-bootstrap";
import { useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { jwtDecode } from "jwt-decode";


function GFTNavbar() {
    const tokens = JSON.parse(window.localStorage.getItem('tokens'));
    const [user, setUser] = useState(() => tokens && tokens.access ? jwtDecode(tokens.access): null);
    const login = useSelector( state => state.login);
    const { authTokens } = login;

    const navigate = useNavigate();

    useEffect(() => {
        const token = tokens || authTokens;
        if(token) {
            setUser(token && token.access ? jwtDecode(token.access): null)
        } else {
            window.localStorage.removeItem('tokens');
            setUser(null);
            login.authTokens = null;
        }
    }, [login, authTokens]);

    const handleLogout = (e) => {
        e.preventDefault();
        if(window.localStorage.getItem('tokens')) {
            window.localStorage.removeItem('tokens');
            // this to refresh Navbar after logout
            setUser(null);
            login.authTokens = null;
            // redirecting to login screen
            navigate('/login/');
        } else {
            navigate('/');
        }
    }


    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand>GFT GLOBAL</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-start">
                    <Nav className="me-auto">
                        <Nav.Link className="text-white" href="/">Home</Nav.Link>
                        {
                            !user
                            &&
                            <>
                                <Nav.Link className="text-white" href="/register/">Registration</Nav.Link>
                                <Nav.Link className="text-white" href="/login/">Login</Nav.Link>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
                {
                    user
                    &&
                    <>
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text className="me-2 text-white" style={{'textTransform': 'capitalize'}}>
                                Hi, {user.username} |
                            </Navbar.Text>
                            <Button className="text-danger" type="button" onClick={handleLogout}>Logout</Button>
                        </Navbar.Collapse>
                    </>
                }
            </Container>
        </Navbar>
    );
}

export default GFTNavbar;