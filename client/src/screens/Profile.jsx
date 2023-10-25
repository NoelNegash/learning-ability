import { Container, Row, Col, Button, Nav, Card } from "react-bootstrap"
import { useDecksQuery } from "../slices/deckApiSlice";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Loader from "../components/Loader";
import Deck from "../components/Deck";
import 'chart.js/auto'
import { Line } from 'react-chartjs-2';

const DeckChart = ({deck}) => {
    const data = {
        labels: deck.drills.map(_ => ''),
        datasets: [
            {
                label: 'Accuracy',
                data: deck.drills.map(d => d.accuracy*100),
                fill: true,
                borderColor: 'rgb(192, 75, 192)',
            },
            {
                label: 'Questions Per Minute',
                data: deck.drills.map(d => d.speed),
                fill: true,
                borderColor: 'rgb(75, 192, 192)',
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
    };

    return <Line data={data} options={options} />;
};

const PaymentOptions = () => {

    const { userInfo } = useSelector((state) => state.auth)

    const handlePayPalPayment = () => {}
    const handleStripePayment = () => {}

    return (
        <div>
        <h2 className="my-5">Payment Options</h2>
        <p className='my-5 pl-5 text-center'> Your subscription has <b>{Math.floor((new Date(userInfo.accountExpires) - Date.now())/(1000*60*60*24))}</b> days left.</p>
        <Card className='mb-2'>
            <Card.Body>
            <Card.Title>Pay with PayPal</Card.Title>
            <Card.Text>
                You can add 30 days to your subscription for $5.
            </Card.Text>
            <Button variant="primary" onClick={handlePayPalPayment}>
                Pay with PayPal
            </Button>
            </Card.Body>
        </Card>

        <Card>
            <Card.Body>
            <Card.Title>Pay with Stripe</Card.Title>
            <Card.Text>
                You can add 30 days to your subscription for $5.
            </Card.Text>
            <Button variant="primary" onClick={handleStripePayment}>
                Pay with Stripe
            </Button>
            </Card.Body>
        </Card>
        </div>
    )
}

const Profile = () => {
    const {data: decks, isLoading, refetch} = useDecksQuery()
    const [pageIndex, setPageIndex] = useState(0)

    useEffect(() => {
        var reset = () => window.location.reload()
        window.addEventListener('popstate', reset);
        return () => {
            window.removeEventListener('popstate', reset);
        };
    }, []);

    return (
        <Container fluid>
            <Row>
                <Col md={2}>
                    <Nav className="flex-column mt-5 pt-5 ">
                        <Button className='mb-2' variant={`outline-${pageIndex===0?'primary' : 'secondary'}`} onClick={()=>setPageIndex(0)} size="lg" block>
                            Definition Lists
                        </Button>
                        <Button className='mb-2' variant={`outline-${pageIndex===1?'primary' : 'secondary'}`} onClick={()=>setPageIndex(1)} size="lg" block>
                            Subscription
                        </Button>
                    </Nav>
                </Col>
                <Col md={10}>
                {[<>
                    <h2 className='my-5'> Your Definition Lists </h2>
                    <Row>
                        <Col>
                            {isLoading ? <Loader/> : 
                                decks.map((deck, index) => 
                                    <Row>
                                        <Col md={4}><Deck key={index} refetch={refetch} deck={deck}/></Col>
                                        <Col md={8} className='ml-5 pr-5'><DeckChart deck={deck}></DeckChart></Col>
                                    </Row>            
                                )
                            }
                        </Col>
                    </Row>
                </>,
                <Container>
                    <PaymentOptions/>
                </Container>][pageIndex]}
                </Col>
            </Row>
        </Container>
    )
}

export default Profile