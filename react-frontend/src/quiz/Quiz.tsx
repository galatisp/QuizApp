import React, { useState, useEffect } from 'react';

import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

import Question from './Question';

import './Quiz.css';

export interface QuestionOption {
    text: string;
    correct?: boolean;
}

export interface QuestionItem {
    number: string;
    questionText: string;
    subjectName: string;
    options: QuestionOption[];
    correctAnswer: string;
    explanation: string;
}

const Questions = () => {
    const [questions, setQuestions] = useState<QuestionItem[]>([]);

    const [questionIndex, setQuestionIndex] = useState(0);

    // const [currentQuestionItem, setCurrentQuestionItem] = useState<Question>(questions[questionIndex]);


    function increaseIndex(e: any) {
        e.preventDefault();

        if (questionIndex < questions.length - 1) {
            setQuestionIndex(questionIndex + 1);

        }



    }

    const decreaseIndex = (e: any) => {
        e.preventDefault();
        if (questionIndex > 0) {
            setQuestionIndex(questionIndex - 1);
            // setCurrentQuestionItem(questions[questionIndex]);
        }



    };






    useEffect(() => {

        fetch('http://localhost:5000/public/questions/random')
            .then((response) => response.json())
            .then((data) => setQuestions(data["questions"]))
            .catch((err) => {
                console.log(err.message);
            });


    }, []);

    const showQuestion = questions.length === 0 ? <p>No Questions Retrieved ...</p> : <Question {...questions[questionIndex]}></Question>;

    const questionItem = (
        <>
            {showQuestion}
           

        </>

    );





    return (
        <div className="main">


            {questionItem}
        <div className="spacer"></div>
            <div className='wide'><button className="btn btn-success left" onClick={decreaseIndex}>Προηγούμενη</button>
                Εμφανίζεται η  {questionIndex + 1}η Ερώτηση, σε Σύνολο {questions.length} Ερωτήσεων
                <button className="btn btn-success right" onClick={increaseIndex}>Επόμενη</button>
            </div>

        </div>
    );
};


export default Questions;