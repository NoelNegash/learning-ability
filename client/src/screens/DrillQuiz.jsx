import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import Speech from 'react-text-to-speech';
import { useNavigate } from "react-router-dom";
import { SERVER_NAME } from "../slices/apiSlice";
import { useNewDrillMutation } from "../slices/drillApiSlice"

function Question({question, points, answerCallback, correctAnswer, incorrectAnswer}) {

    return (
        <Container>
            <Card style={{height: "450px"}} className="my-5 d-flex flex-column align-items-center justify-content-center">
                {question.data.image && <img height="300px" src={SERVER_NAME + question.data.image} alt={question.data.term || ''} className="mb-5"/>}
                {question.data.term && 
                <Row className="justify-content-center align-items-center text-center">
                    <h4 className="mb-3"> {question.data.term} </h4>
                    <div style={{width:'75px'}}>
                        <Speech text={question.data.term}></Speech>
                    </div>
                </Row> }
            </Card>
            <Col className="answers">
            {question.answers.map( (a,i) => 
                <Row key={i}>
                <Col md={1}>
                    <Speech text={a}></Speech> 
                </Col>
                <Col key={i} md={11}>
                    <Button className={`mt-2 ${i === correctAnswer ? 'correct-answer' : (i === incorrectAnswer ? 'incorrect-answer' : '')}`} 
                            variant='light' style={{width:"100%"}} 
                            onClick={() => (correctAnswer === -1 && incorrectAnswer === -1) && answerCallback(i, i === question.correctAnswer ? points : 0)}> {a} 
                    </Button>
                </Col>
                </Row>
            )}
            </Col>
        </Container>
    )
    }

function GameScreen({ deck, finishCallback, startQuiz }) {
    const generateQuestion = (i = 0, q = {}) => {
        let cards = deck.cards
        let card

        /*let i;
        while (i === undefined || (cards.length > 1 && (cards[i]._id === q._id))) {
            i = Math.floor(Math.random()*cards.length)
        }*/
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
        if (deck.images && card.image && card.image !== '') {
            possibleQuestions.push({"image": card.image, "term": card.term})
            possibleQuestions.push({"image": card.image})
        }
        return {
            "data": {...possibleQuestions[Math.floor(Math.random()*possibleQuestions.length)], _id: card._id},
            "answers": possibleAnswers,
            "correctAnswer": possibleAnswers.indexOf(card.description)
        }
    }

    const [correctAnswer, setCorrectAnswer] = useState(-1)
    const [incorrectAnswer, setIncorrectAnswer] = useState(-1)
    const answerCooldown = 1.4;

    const startGame = () => {
        setScore(() => 0)
        setSeconds(() => 15*deck.increment)
        setNumQuestion(() => 1);
    }

    const answerCallback = (index, points) => {
        setScore(s => s+points)
        if (points === 0) {
            setCorrectAnswer(question.correctAnswer)
            setIncorrectAnswer(index);
        } else {
            setCorrectAnswer(index);
        }

        if (numQuestion === NUM_QUESTIONS) {
            finishCallback(score/(POINTS*NUM_QUESTIONS), NUM_QUESTIONS)
        }

        setTimeout(() => {
            setQuestion(q => generateQuestion(numQuestion%NUM_QUESTIONS))
            setSeconds(() => 15*deck.increment)
            setNumQuestion(q => q+1);

            setCorrectAnswer(-1)
            setIncorrectAnswer(-1)
        }, answerCooldown*1000)

    }

    const formatSeconds = (s) => `${Math.floor(s/60).toString()}:${(Math.floor(s)%60).toString().padStart(2, '0')}`

    const POINTS = 10;
    const NUM_QUESTIONS = deck.cards.length;

    const [score, setScore] = useState(0);
    const [numQuestion, setNumQuestion] = useState(1);
    const [question, setQuestion] = useState(generateQuestion());
    const [seconds, setSeconds] = useState(15*deck.increment);

    const frameRate = 24

    useEffect(() =>{
        startGame();
        const interval = setInterval(() => setSeconds((s) => s-1/frameRate), 1000/frameRate)

        return () => {
            clearInterval(interval);
        }
    }, [])


    return (<Container>

        {seconds > 0 && numQuestion <= NUM_QUESTIONS? 
        <Row>
            <Col md={2} className='d-flex align-items-center flex-column'>
                <h4 className='question mt-5'> Question {numQuestion}/{NUM_QUESTIONS} </h4>
                <div className='progress-bar my-5' style={{
                    font: '24px bold sans-serif',
                    background: `radial-gradient(closest-side, white 79%, transparent 80% 100%), conic-gradient(hotpink ${((1-seconds/(15*deck.increment))*100)}%, pink 0)`
                }}
                >
                    {formatSeconds(seconds)}
                </div>
                <h4 className='score'> Score: {score} </h4>
            
            </Col>
            <Col>
                <Question question={question} points={POINTS} numQuestion={`${numQuestion}/${NUM_QUESTIONS}`} correctAnswer={correctAnswer} incorrectAnswer={incorrectAnswer} answerCallback={answerCallback} />             
            </Col>
        </Row> :
        <GameFinishedScreen score={score} playAgainCallback={startQuiz}/>
        }
    </Container>)
    }

function GameFinishedScreen({score, playAgainCallback}) {

    const navigate = useNavigate()

    return (
        <Container style={{height:'600px'}} className='d-flex flex-column align-items-center justify-content-center pt-5'>
            <h2 className='my-5 score'> Score: {score} </h2>
            <Button className='my-2' onClick={playAgainCallback}> Play Again </Button>
            <Button className='my-2' onClick={() => navigate(-1)}> Exit </Button>
        </Container>
    )
}

const DrillQuiz = () => {
    const { deck } = useSelector((state) => state.deck)
    const [isStarted, setIsStarted] = useState(false);
    const [startTime, setStartTime] = useState(null)

    const [newDrill] = useNewDrillMutation();

    const startQuiz = () => {
        setStartTime(Date.now())
        setIsStarted(true)
    }

    const finishCallback = async (accuracy, questions) => {
        var drill = {
            deckID: deck._id,
            accuracy: accuracy,
            speed: questions/((Date.now()-startTime)/(1000*60))
        }
        await newDrill(drill)
    }

    return (
        <Container>
        <h2 className='quiz-name'> {deck.name} </h2>
        {isStarted ? 
            <GameScreen deck={deck} startQuiz={startQuiz} finishCallback={finishCallback}/> : 
            <Button onClick={startQuiz}> Start Game</Button>
        }
        </Container>
    );
}

export default DrillQuiz