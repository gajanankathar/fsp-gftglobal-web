import React, {useState, useEffect} from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { actionUserLogin } from "../../actions/loginActions";

import Loader from "../Loader";
import Message from "../Message";


function LoginScreen() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const login = useSelector( state => state.login);
    const {error, loading, authTokens} = login;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitLogin = (event) => {
        event.preventDefault();
        const payload = {
            'username': username,
            'password': password,
        }
        dispatch(actionUserLogin(payload));
    };

    useEffect(() => {
        if (!error && authTokens) {
            window.localStorage.setItem('tokens', JSON.stringify(authTokens));
            navigate('/');
        }
    }, [login]);

    return (
        <>

        <Container>
            <br />
            {loading?(
                <Loader/>
            ):error ? (
                <Message variant='danger'>{error}</Message>
            ): ""}
            <br />
            <h3 className="mb-4">Login</h3>
            <Form onSubmit={e => submitLogin(e)}>
                <Form.Group as={Row} className="mb-3" controlId="username">
                    <Form.Label column sm={1}>
                        Username:
                    </Form.Label>
                    <Col sm={4}>
                        <Form.Control type="text" name="username" placeholder="Username" value={username}
                            onChange={(e) => setUsername(e.target.value)}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="password">
                    <Form.Label column sm={1}>
                        Password:
                    </Form.Label>
                    <Col sm={4}>
                        <Form.Control type="password" name="password" placeholder="Password" value={password}
                            onChange={(e) => setPassword(e.target.value)}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 2, offset: 1 }}>
                        <Button type="submit">Login</Button>
                    </Col>
                </Form.Group>
            </Form>
        </Container>
        </>
    )
}

export default LoginScreen;