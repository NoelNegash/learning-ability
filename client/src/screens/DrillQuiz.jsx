import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

function Question({question, points, numQuestion, answerCallback}) {

    return (
        <Container>
            <h4 class='question'> Question {numQuestion} </h4>
            <Col style={{height: "300px"}} className="d-flex flex-column align-items-center justify-content-center">
                {question.data.image && <img height="350px" src={question.data.image} alt={question.data.term || ''} className="mb-5"/>}
                {question.data.term && <h3> {question.data.term} </h3> }
            </Col>
            <hr/>
            <Row className="answers">
            {question.answers.map( (a,i) => 
                <Col key={i} md={12}>
                    <Button variant='light' style={{width:"100%"}} className='mt-2' onClick={() => answerCallback(i === question.correctAnswer ? points : 0)}> {a} </Button>
                </Col>
            )}
            </Row>
        </Container>
    )
    }

function GameScreen({ deck }) {
    const generateQuestion = (q = {}) => {
        let cards = deck.cards
        let card

        let i;
        while (i === undefined || (cards.length > 1 && (cards[i]._id === q._id))) {
            i = Math.floor(Math.random()*cards.length)
        }
        card = cards[i]
        
        let possibleAnswers = [];
        possibleAnswers.push(card)

        while (possibleAnswers.length < Math.min(cards.length, 5)) {
            i = Math.floor(Math.random()*cards.length)
            if (possibleAnswers.indexOf(cards[i]) === -1) {
                possibleAnswers.push(cards[i])
            }
        }
        possibleAnswers = possibleAnswers.map( (c) => c.description )

        possibleAnswers.sort(() => Math.random()-0.5)

        let possibleQuestions = [{"term": card.term}]
        if (card.image && card.image !== '') {
            possibleQuestions.push({"image": card.image, "term": card.term})
            possibleQuestions.push({"image": card.image})
        }
        return {
            "data": {...possibleQuestions[Math.floor(Math.random()*possibleQuestions.length)], _id: card._id},
            "answers": possibleAnswers,
            "correctAnswer": possibleAnswers.indexOf(card.description)
        }
    }

    useEffect(() =>{
        startGame();
        setInterval(() => setSeconds((s) => s-0.1), 100)
    }, [])

    const startGame = () => {
        setScore(() => 0)
        setSeconds(() => 15*deck.increment)
        setNumQuestion(() => 1);
    }

    const answerCallback = (points) => {
        setScore(s => s+points)
        setQuestion(q => generateQuestion(q))
        setSeconds(() => 15*deck.increment)
        setNumQuestion(q => q+1);
    }

    const formatSeconds = (s) => `${Math.floor(s/60)}:${Math.floor(s)%60}`

    const POINTS = 10;
    const NUM_QUESTIONS = 20;

    const [score, setScore] = useState(0);
    const [numQuestion, setNumQuestion] = useState(1);
    const [question, setQuestion] = useState(generateQuestion());
    const [seconds, setSeconds] = useState(60);


    return (<Container>
        {seconds > 0 && numQuestion <= NUM_QUESTIONS? 
        <Container>
            <Container className='align-items-center d-flex flex-column justify-content-center'>
                <h4 class='timer'> Time: {formatSeconds(seconds)} </h4>
                <h4 class='score'> Score: {score} </h4>
                <Question question={question} points={POINTS} numQuestion={`${numQuestion}/${NUM_QUESTIONS}`} answerCallback={answerCallback} /> 
            </Container>
        </Container>:
        <GameFinishedScreen score={score} playAgainCallback={startGame}/>
        }
    </Container>)
    }

function GameFinishedScreen({score, playAgainCallback}) {

    const navigate = useNavigate()

    return (
        <Container>
            <h2 class='score'> Score: {score} </h2>
            <Button onClick={playAgainCallback}> Play Again </Button>
            <Button onClick={() => navigate('/')}> Exit </Button>
        </Container>
    )
}

const DrillQuiz = () => {
    const { deck } = useSelector((state) => state.deck)
    const [isStarted, setIsStarted] = useState(false);

    return (
        <Container>
        <h2 class='quiz-name'> {deck.name} </h2>
        {isStarted ? 
            <GameScreen deck={deck} /> : 
            <Button onClick={() => setIsStarted(() => true)}> Start Game</Button>
        }
        </Container>
    );
}

export default DrillQuiz