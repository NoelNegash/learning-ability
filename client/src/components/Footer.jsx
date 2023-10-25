import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="mt-5 bg-dark text-light py-4">
        <Container>
            <Row>
            <Col md={6}>
                <h5>A Learning Ability</h5>
                <p>A flashcard website for effective learning</p>
            </Col>
            <Col md={6}>
                <h5>Contact</h5>
                <ul className="list-unstyled">
                <li>Email: info@learningability.com</li>
                <li>Phone: 123-456-7890</li>
                <li>Address: 123 Main St, City, State, ZIP</li>
                </ul>
            </Col>
            </Row>
            <hr className="mt-2" />
            <p className="text-center">&copy; {new Date().getFullYear()} A Learning Ability. All rights reserved.</p>
        </Container>
        </footer>
    );
    };

export default Footer;