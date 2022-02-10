const fs = require('fs');
const addStudent = (id, name, degrees, comment) => {
    const studentList = loadStudent();
    if(isNaN(id) || id == 0 || name === "" || degrees.length === 0){
        console.log("plz enter valid Data");
    }
    else{
        const duplicateStudent = studentList.find((ele) => {
            return ele.id === id
        })
        if (!duplicateStudent) {
            const totalDeg = degrees.reduce((current, next) => {
                return current + next;
            })
            studentList.push({
                id,
                name,
                degrees,
                total: totalDeg,
                comment
            })
            saveStudent(studentList);
        }
        else {
            console.log('The id is already exist can not add student with duplicate id !! plz try again')
        }
    }
}
const readStudent = (id) => {
    const students = loadStudent();
    if(isNaN(id) || id == 0){
        console.log('plz enter Valid id')
    }
    else{
        const studentReq = students.find((st) => {
            return st.id === id
        })
        if (studentReq) {
            console.log(`
            student id        :${id}
            student name      :${studentReq.name} , 
            degrees           :[${studentReq.degrees}] , 
            with total degree :${studentReq.total}`)
        }
        else {
            console.log(`there is no student with id ${id}`)
        }
    }
}
//list students 
const listStudents = () => {
    const studentLst = loadStudent();
    if(studentLst.length>0){
        studentLst.forEach((std) => {
            console.log(`
            student id        :${std.id}
            student name      :${std.name} , 
            degrees           :[${std.degrees}] , 
            with total degree :${std.total}
            `)
        })
    }
    else{
        console.log('There is no Data')
    }
}
const deleteStudent = (id)=>{
    const studentsLst = loadStudent();
    if(isNaN(id) || id == 0){
        console.log('plz enter valid id')
    }
    else{
        const studentToKeep = studentsLst.filter((std)=>{
            return std.id !== id
        })
        if(studentsLst.length >0){
            if(studentsLst.length !== studentToKeep.length){
                saveStudent(studentToKeep)
                console.log(`student with id: ${id} removed successfuly`)
            }
            else{
                console.log(`No student with id: ${id} to delete`)
            }
        }
        else{
            console.log(`No student with id: ${id} to delete`)
        }
    }
}
const loadStudent = () => {
    try {
        //fs.readFileSync('studentData.json')               ==>return Data Buffer
        //fs.readFileSync('studentData.json').totoString()  ==>convert from buffer to json
        const students = fs.readFileSync('studentData.json').toString();
        //JSON.parse ==> convert json to object
        return JSON.parse(students);
    }
    catch (e) {
        return [];
    }
}
const saveStudent = (studentList) => {
    fs.writeFileSync('studentData.json', JSON.stringify(studentList));
}
module.exports = {
    addStudent,
    readStudent,
    listStudents,
    deleteStudent
}