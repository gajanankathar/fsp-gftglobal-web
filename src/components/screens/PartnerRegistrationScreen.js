import React, {useState, useEffect} from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { actionPartnerCreate } from "../../actions/partnerActions";

import Loader from "../Loader";
import Message from "../Message";


function PartnerRegistrationScreen() {

    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [dob, setDOB] = useState('');
    const [phone_no, setPhoneNo] = useState('');
    const [email, setEmail] = useState('');

    const createdPartner = useSelector( state => state.partnerCreate);
    const {error, loading, partner} = createdPartner;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitRegistration = (event) => {
        event.preventDefault();
        const payload = {
            'first_name': first_name,
            'last_name': last_name,
            'dob': dob,
            'phone_no': phone_no,
            'email': email,
        }
        dispatch(actionPartnerCreate(payload));
    };

    useEffect(() => {
        if (!error && partner) {
            navigate('/');
        }
    }, [createdPartner, partner, error, navigate]);

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
            <h3 className="mb-4">Registration</h3>
            <Form onSubmit={e => submitRegistration(e)}>
                <Form.Group as={Row} className="mb-3" controlId="firstname">
                    <Form.Label column sm={1}>
                        First Name:
                    </Form.Label>
                    <Col sm={4}>
                        <Form.Control type="text" name="first_name" placeholder="First Name" value={first_name}
                            onChange={e => setFirstName(e.target.value)}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="lastname">
                    <Form.Label column sm={1}>
                        Last Name:
                    </Form.Label>
                    <Col sm={4}>
                        <Form.Control type="text" name="last_name" placeholder="Last Name" value={last_name}
                            onChange={e => setLastName(e.target.value)}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="dob">
                    <Form.Label column sm={1}>
                        DOB:
                    </Form.Label>
                    <Col sm={4}>
                        <Form.Control type="date" name="dob" placeholder="Date of Birth" value={dob}
                            onChange={e => setDOB(e.target.value)}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="phone_no">
                    <Form.Label column sm={1}>
                        Phone No.:
                    </Form.Label>
                    <Col sm={4}>
                        <Form.Control type="text" name="phone_no" placeholder="Phone No" value={phone_no}
                            onChange={e => setPhoneNo(e.target.value)}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="email">
                    <Form.Label column sm={1}>
                        Email:
                    </Form.Label>
                    <Col sm={4}>
                        <Form.Control type="email" name="email" placeholder="Email" value={email}
                            onChange={e => setEmail(e.target.value)}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 2, offset: 1 }}>
                        <Button type="submit">Register</Button>
                    </Col>
                </Form.Group>
            </Form>
        </Container>
        </>
    );
}

export default PartnerRegistrationScreen;