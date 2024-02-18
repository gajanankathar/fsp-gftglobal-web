import React, {useState, useEffect} from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector} from 'react-redux';

import { jwtDecode } from "jwt-decode";

import { actionPartnerDetails, actionPartnerUpdate } from "../../actions/partnerActions";

import Loader from "../Loader";
import Message from "../Message";


function HomeScreen() {
    const dispatch = useDispatch();
    const initialState = { first_name: "", last_name: "", dob:"", phone_no:"", email: "" };
    const [details, setDetails] = useState(initialState);
    const [isEdit, setEdit] = useState(false);

    const partnerDetails = useSelector( state => state.partnerDetails);
    const {error, loading, partner} = partnerDetails;

    const login = useSelector( state => state.login);
    const { authTokens } = login;

    useEffect(() => {
        const tokens = JSON.parse(window.localStorage.getItem('tokens'));
        const token = tokens || authTokens;
        if(token && token.access) {
            const { user_id } = jwtDecode(token.access);
            dispatch(actionPartnerDetails(user_id, token.access))
        }
    }, [dispatch]);

    const handleChange = event => {
        const { target } = event;
        setDetails((prevState) => ({
            ...prevState,
            [target.name]: target.value,
        }));
    }

    const handleUpdateCustomer = e => {
        e.preventDefault();
        const tokens = JSON.parse(window.localStorage.getItem('tokens'));
        const token = tokens || authTokens;
        if(token && token.access) {
            const payload = { ...details };
            dispatch(actionPartnerUpdate(details.id, token.access, payload));
            setEdit(false);
        }
    }

    const handleEdit = e => {
        e.preventDefault();
        setEdit(true);
        setDetails(partner);
    }

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
            <h1 className="text-center">Welcome to GFT Global!</h1>
            <br />
            {!isEdit && partner &&
            <Form>
            <Form.Group as={Row} className="mb-3" controlId="firstname">
                <Form.Label column sm={1}>
                    First Name:
                </Form.Label>
                <Col sm={4}>
                    <Form.Control type="text" name="first_name" readOnly={true} placeholder="First Name" value={details.first_name || partner.first_name}
                        />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="lastname">
                <Form.Label column sm={1}>
                    Last Name:
                </Form.Label>
                <Col sm={4}>
                    <Form.Control type="text" name="last_name" readOnly={true} placeholder="Last Name" value={details.last_name || partner.last_name}
                        />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="dob">
                <Form.Label column sm={1}>
                    DOB:
                </Form.Label>
                <Col sm={4}>
                    <Form.Control type="date" name="dob" readOnly={true} placeholder="Date of Birth" value={details.dob || partner.dob}
                        />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="phone_no">
                <Form.Label column sm={1}>
                    Phone No.:
                </Form.Label>
                <Col sm={4}>
                    <Form.Control type="text" name="phone_no" readOnly={true} placeholder="Phone No" value={details.phone_no || partner.phone_no}
                       />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="email">
                <Form.Label column sm={1}>
                    Email:
                </Form.Label>
                <Col sm={4}>
                    <Form.Control type="email" name="email" readOnly={true} placeholder="Email" value={details.email || partner.email}
                        />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Col sm={{ span: 2, offset: 1 }}>
                    <Button type="button" onClick={ handleEdit }>Edit</Button>
                </Col>
            </Form.Group>
        </Form>
        }
        {isEdit && partner &&
        <Form onSubmit={e => handleUpdateCustomer(e)}>
            <Form.Group as={Row} className="mb-3" controlId="firstname">
                <Form.Label column sm={1}>
                    First Name:
                </Form.Label>
                <Col sm={4}>
                    <Form.Control type="text" name="first_name" placeholder="First Name" value={details.first_name || ""}
                        onChange={ handleChange }/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="lastname">
                <Form.Label column sm={1}>
                    Last Name:
                </Form.Label>
                <Col sm={4}>
                    <Form.Control type="text" name="last_name" placeholder="Last Name" value={details.last_name || ""}
                        onChange={ handleChange }/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="dob">
                <Form.Label column sm={1}>
                    DOB:
                </Form.Label>
                <Col sm={4}>
                    <Form.Control type="date" name="dob" placeholder="Date of Birth" value={details.dob || ""}
                        onChange={ handleChange }/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="phone_no">
                <Form.Label column sm={1}>
                    Phone No.:
                </Form.Label>
                <Col sm={4}>
                    <Form.Control type="text" name="phone_no" placeholder="Phone No" value={details.phone_no || ""}
                        onChange={ handleChange }/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="email">
                <Form.Label column sm={1}>
                    Email:
                </Form.Label>
                <Col sm={4}>
                    <Form.Control type="email" name="email" placeholder="Email" value={details.email || ""}
                        onChange={ handleChange }/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Col sm={{ span: 2, offset: 1 }}>
                    <Button type="submit">Update</Button>
                </Col>
            </Form.Group>
        </Form>
        }
        </Container>
        </>
    );
}

export default HomeScreen;