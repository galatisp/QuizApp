import React, { useState, useEffect } from 'react';

import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";


const Quiz = () => {
    const [questions, setQuestions] = useState<any[]>([]);


    const [rowsOffset, setRowsOffset] = useState(0);
    const [limit, setLimit] = useState(10);

     function increaseOffset(e:any) {
        e.preventDefault();

        if (rowsOffset <= questions.length - limit)
            setRowsOffset(rowsOffset + limit);



    }

    const decreaseOffset = (e:any) => {
        e.preventDefault();
        if (rowsOffset >= limit)
            setRowsOffset(rowsOffset - limit);


    };

    

    useEffect(() => {

        fetch('http://localhost:5000/public/questions')
            .then((response) => response.json())
            .then((data) => {
                setQuestions(data["questions"]);
                // console.log(data["questions"]);

            })
            .catch((err) => {
                console.log(err.message);
            });


    }, []);
    
    const slicedQuestions = questions.slice(rowsOffset, rowsOffset + limit);
    const tableRows = slicedQuestions.map(question =>

        <tr key={question.number}>
            <td>{question.number}</td>
            <td>{question.questionText}</td>
            <td>{question.options[0].text}</td>
            <td>{question.options[1].text}</td>
            <td>{question.options[2].text}</td>
            <td>{question.options[3].text}</td>
          
        </tr>

        



    );


    return (
        <div className="main">
            <h2>Λίστα Ερωτήσεων</h2>


            <table className="table table-hover">
                <thead>
                    <tr>
                        <th className="narrow">Κωδικός</th>
                        <th>Εκφώνηση</th>
                        <th className='small'>Α</th>
                        <th className='small'>Β</th>
                        <th className='small'>Γ</th>
                        <th className='small'>Δ</th>
                    </tr>
                </thead>

                <tbody>

                    {tableRows}
                </tbody>

            </table>
            <div className='wide'><button className="btn btn-success left" onClick={decreaseOffset}>Προηγούμενες</button>
                Εμφανίζονται {rowsOffset + 1} έως {rowsOffset + limit} σε σύνολο {questions.length} Ερωτήσεων
                <button className="btn btn-success right" onClick={increaseOffset}>Επόμενες</button>
            </div>

        </div>
    );
};


export default Quiz;