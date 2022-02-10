const yargs = require('yargs');
const gradingFun = require('./gradingFun')

//add new student
yargs.command({
    command: 'add',
    describe: 'add new student',
    builder: {
        id: {
            describe: 'id of student from add',
            demandOption: true,
            type: 'number',            
        },
        name: {
            describe: 'student name from add',
            demandOption: true,
            type: 'string',           
        },
        degrees: {
            describe: 'student degrees from add',
            demandOption: true,
            type: 'array',
            
        },
        comment: {
            describe: 'comment of student from add',
            type: 'string'
        }
    },
    handler: (x) => {
        gradingFun.addStudent(x.id, x.name, x.degrees, x.comment)
    }
})
//read student with id 
yargs.command({
    command:'read',
    describe:'get a student',
    builder:{
        id:{
            type:'number',
            describe:'student id in read',
            demandOption:true
        }
    },
    handler:(x)=>{
        gradingFun.readStudent(x.id)
    }

})
//list students
yargs.command({
    command:'list',
    describe:'list of students',
    handler:()=>{
        gradingFun.listStudents();
    }
})
//Remove Student
yargs.command({
    command:'delete',
    describe:'delete student',
    builder:{
        id:{
            describe:'id from delete',
            demandOption:true,
            type:'number'
        }
    },
    handler : (x)=>{
        gradingFun.deleteStudent(x.id)
    }
    
})
//to call yargs to get inputs from terminal
yargs.parse();