import React, { useState, useEffect } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';

import CategoryService from "../services/category.service";
import SubjectService from "../services/subject.service";

import '../myform.css';

export interface Category {
  id: number;
  name: string;
}

export interface Subject {
  id: number;
  name: string;
  categoryId: number;
}

const SelectSubject = ({onSendData}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [showSubjects, setShowSubjects] = useState(false);

  useEffect(() => {

    fetch('http://localhost:5000/public/categories')
      .then((response) => response.json())
      .then((data) => setCategories(data["categories"]))
      .catch((err) => {
        console.log(err.message);
      });


  }, []);

  const getCategorySubjects = (e: any) => {
    const category = e.target.value;
    // console.log("Category ID " + category + " selected");
    if (category) {
      SubjectService.getCategorySubjects(category)
        .then(
          (response) => {
            setSubjects(response.data["subjects"]);
            setShowSubjects(true);

          },
          (error) => {
            const _content =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();

            setSubjects(_content);
          }
        );

    }

  }

  const sendData = (e:any) => {
   
    const subject = e.target.value;
    console.log("Subject ID " + subject + " selected");
    onSendData(subject);
  };

  return (
    <div className="container-fluid mt-10 flex align-content-center justify-center ">
      <div className="bg-white p-8 border rounded-3xl border-slate-300 shadow-lg shadow-gray-500/50  sm:w-full mx-5 lg:w-3/6 ">
        <h4 className="text-2xl font-bold mt-5">Φόρτωση Νέων Ερωτήσεων</h4>


        <div className="flex justify-center">
          <div className="flex flex-row flex-wrap justify-center sm:w-full md:w-6/12 lg:w-3/6">
            <form className="form-container" action="http://localhost:5000/admin/upload-new-questions/" method="post" encType="multipart/form-data" >
              <div className="input-group horizontal">
                <label htmlFor="categoryId">Επίλεξε μια κατηγορία</label>
                <select
                  className="justify-center text-black placeholder-gray-600 px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-100 focus:outline-none focus:shadow-lg focus:ring-0 ring-offset-current ring-offset-1 ring-gray-400"
                  id="categoryId" name="categoryId" onChange={getCategorySubjects}
                >
                  <option value="" className="container">Επίλεξε μια κατηγορία</option>

                  {(categories && categories.length > 0) ?
                    categories?.map((category, index) => <option key={index} id={category.name + "-" + index} className={'container'} value={category.id} >{category.name}</option>) : <option>Δε βρέθηκαν Κατηγορίες</option>
                  }


                </select>

              </div>
              {showSubjects && (
                <div className="input-group horizontal">
                  <label htmlFor="subjectId" >Επίλεξε ένα Μάθημα</label>
                  <select id='subjectId' name="subjectId"
                  onChange={sendData}

                    className="justify-center text-black placeholder-gray-600 w-full x-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-100 focus:outline-none focus:shadow-lg focus:ring-0 ring-offset-current ring-offset-1 ring-gray-400">
                    <option value="" className="container">Επίλεξε ένα μάθημα</option>
                    {(subjects && subjects.length > 0) ?
                      subjects?.map((subject, index) => <option key={index} id={subject.name + "-" + index} className={'container'} value={subject.id} >{subject.name}</option>) : <option>Δε βρέθηκαν Μαθήματα</option>
                    }

                  </select>
                </div>
              )}



              {/* 
        <input type="file" value="Επιλέξτε αρχείο" name="uploaded_file" required accept=".xls,.xlsx,.xslm, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-100 focus:outline-none focus:shadow-lg focus:ring-0 ring-offset-current ring-offset-1 ring-gray-400" />
        <br>
          <input type="submit" value="Υποβολή" className="transition mt-5 ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 duration-300 shadow-lg shadow-blue-500/50 py-2 px-3 rounded-lg font-bold text-white hover:bg-blue-600 ">
            <!-- <button
              className="transition mt-5 ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 duration-300 shadow-lg shadow-blue-500/50 py-2 px-3 rounded-lg font-bold text-white hover:bg-blue-600 "
              routerLink="/question" (click)="startQuiz()">Ξεκίνα το quiz</button> --> */}
            {/* <button onClick={sendData}>Send Data</button> */}
            
            </form>
          </div>
        </div>






      </div >
    </div >
  );



};

export default SelectSubject;


