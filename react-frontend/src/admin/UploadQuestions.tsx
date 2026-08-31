import React, { useState, useEffect } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';

import SelectSubject from "./SelectSubject";
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

const UploadQuestions = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [showSubjects, setShowSubjects] = useState(false);

  const [data, setData] = useState('');

  const handleData = (childData:any) => {
    setData(childData);
    console.log("Data got from Child Component : "+childData);
  };

  return (
    <div>
      <SelectSubject onSendData={handleData} />
      {data}
    </div>

  );



};

export default UploadQuestions;


