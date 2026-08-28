import React, { useState, useEffect } from 'react';

import "bootstrap/dist/css/bootstrap.min.css";
import './Item.css';

interface QuestionOption {
    text: string;
    correct?: boolean;
}



const Item = (props: any) => {

    let id = props.id;
    let text = props.text;
    let correct = props.correct;
    let funcPass = props.parentFunc;
    let initialClass = props.class;

    const check = (e: any) => {
        e.preventDefault();

        funcPass(e.target.id);
        if (correct) {

            e.target.setAttribute('class', 'container correct');
        }
        else {

            e.target.setAttribute('class', 'container incorrect');
        }

        // setTimeout(() => {
        //     e.target.classList.remove('correct');
        //     e.target.classList.remove('incorrect');
        // }, 1000);

    }

    return (
        <>
            {/* <button className={`container ${correct ? "correct" : "incorrect"}`}>{text} </button> */}

            <button id={id} className={initialClass} onClick={check}>{text} </button>


        </>
    );



};

export default Item;

