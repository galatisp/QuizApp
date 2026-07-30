function isIterable(input) {  
    if (input === null || input === undefined) {
      return false
    }
  
    return typeof input[Symbol.iterator] === 'function'
  }

function parseSubjects(subjects, req, res) {

    const result = {
        subjects: []
    };


    
    if (isIterable(subjects)) {


        for (let subject of subjects) {

            const s = {

                id: subject.dataValues.id,
                name: subject.dataValues.name,
                categoryId: subject.dataValues.categoryId,
                questions: subject.dataValues.questions

            };
            result.subjects.push(s);
        }
    }
    else{
        let subject = subjects;
        const s = {
            id: subject.dataValues.id,
            name: subject.dataValues.name,
            categoryId: subject.dataValues.categoryId,
            questions: subject.dataValues.questions

        };
        result.subjects.push(s);

    }

    
    res.status(200).send(result);


}

function parseCategories(categories, req, res) {

    const result = {
        categories: []
    };


    
    if (isIterable(categories)) {


        for (let category of categories) {

            const c = {

                id: category.dataValues.id,
                name: category.dataValues.name

            };
            result.categories.push(c);
        }
    }
    else{
        let category = categories;
        const c = {

            id: category.dataValues.id,
            name: category.dataValues.name

        };
        result.categories.push(c);

    }

    // console.log(result.subjects[0].questions[0]);
    //console.log(result);
    res.status(200).send(result);


}

module.exports = {isIterable, parseSubjects, parseCategories
};