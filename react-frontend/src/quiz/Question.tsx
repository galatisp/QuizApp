import React, { useState, useEffect } from 'react';

import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Item from './Item';

import './Question.css';

interface QuestionOption {
    text: string;
    correct?: boolean;
}
interface QuestionItem {
    number: string;
    questionText: string;
    subjectName: string;
    options: QuestionOption[];
    correctAnswer: string;
    explanation: string;
}
const Question = (question: QuestionItem) => {



    // console.log(question.number + " " + question.questionText);
    // console.log("options : " + question.options);
    const questionOptions: QuestionOption[] = question.options;

    // const showOptions =
    //     (questionOptions.length === 0) ? <p>Δε βρέθηκαν Επιλογές</p> :
    //         questionOptions?.map((option, index) => <Item key={index} text={option.text} correct={option.correct}></Item>);

    const displayCorrectOption = () => {
        const correctOption = question.options.findIndex((option: any) => option.correct);
        const correctID = 'item'+correctOption
        let element = document.getElementById(correctID);
        element?.setAttribute('class', 'container correct');
        // setTimeout(() => {
        //     element?.classList.remove('correct');
        // }, 1000);

    }
    const parentFunc = (data:any) => {
        console.log("Receiving the ", data);
        let element = document.getElementById(data);
        console.log("Option "+element?.nodeValue+" pressed");
        displayCorrectOption();
        
    };

    return (
        <div>
            <h4>{question.questionText} </h4>


            { (questionOptions && questionOptions.length > 0) ?  
                questionOptions?.map((option, index) => <Item key={index} id={question.number+"-"+index} class={'container'} parentFunc={parentFunc} text={option.text} correct={option.correct} ></Item>): <p>Δε βρέθηκαν Επιλογές</p>
            }

            
        </div>
    );



};

export default Question;