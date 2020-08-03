const cTable = require('console.table');
const express = require('express');
const router = express.Router();

let timeTable = [     
    ["Monday", 0, 0, 0, 0, 0, 0, 0, 0],
    ["Tuesday", 0, 0, 0, 0, 0, 0, 0, 0],
    ["Wednesday", 0, 0, 0, 0, 0, 0, 0, 0],
    ["Thursday", 0, 0, 0, 0, 0, 0, 0, 0],
    ["Friday", 0, 0, 0, 0, 0, 0, 0, 0],
];

let classRooms = [
    [[[],[],[],[],[],]],
    [[[],[],[],[],[],]],
    [[[],[],[],[],[],]],
    [[[],[],[],[],[],]],
    [[[],[],[],[],[],]]
];

let classes = [[
    [[],[],[],[],[],]],
    [[[],[],[],[],[],]],
    [[[],[],[],[],[],]],
    [[[],[],[],[],[],]],
];


let courses = [
    {name: '', session: '', teacher: '', crHouurs: []},

];

let teachers = [[[[],[],[],[]]]];

let daysPerWeek = timeTable.length;
let hoursPerDay = timeTable[0].length;

//function to check the teacher for particular course in particular hourse is available 
checkTeacher = (currentCourse, i, j, cr) => {

    if((currentCourse.crHouurs[cr] == 0) || currentCourse.crHouurs.length == 0){
        return [false];
    }
    
    for(let t = 0; t < teachers.length; t++){
        
        if(currentCourse.teacher === teachers[t][0]){   //maching teacher of current course

            //checking teacher for all credit hourse of course is available
            let tHour = j;  
            for(let l = 0; l < currentCourse.crHouurs[cr]; l++){
                
                if(teachers[t][1][i][tHour] == 0){
                    tHour++;
                }else{
                    return [false]; //return false if teacher is not avaiable for current course
                }
                if(l == currentCourse.crHouurs[cr] - 1){
                    return [true, t];   //returning index of teacher and true if teacher is available
                }
            }
        }
    }
}


checkClassRoom = (currentCourse, i, j, cr, cl) => {

    //checking class room for all credit hourse of course is available
    let clHour = j;
    for(let l = 0; l < currentCourse.crHouurs[cr]; l++){
        if(classRooms[cl][1][i][clHour] == 0){
            clHour++;
        }else{
            return false;
        }
        if(l == currentCourse.crHouurs[cr] - 1){
            return true;
        }
    }
}

checkClasses = (currentCourse, i, j, cr, cls) => {
    //checking class for all credit hourse of course is available
    let clHour = j;
    for(let l = 0; l < currentCourse.crHouurs[cr]; l++){
        if((classes[cls][1][i][clHour] == 0)){
            clHour++;
        }else{
            return false;
        }
        if(l == currentCourse.crHouurs[cr] - 1){
            return true;
        }
    }
}

checkTimeTable = (currentCourse, i, j, cr) => {
    //checking time table for all credit hourse of course is available
    let clHour = j;
    for(let l = 0; l < currentCourse.crHouurs[cr]; l++){
        
        if((timeTable[i][clHour] == 0)){
            clHour++;
        }else{
            return false;
        }
        if(l == currentCourse.crHouurs[cr] - 1){
            return true;
        }
    }
}


checkCourse = (currentCourse, i, j, cr, cls, cl) => {
    let count = 0;
    

    if (currentCourse.crHouurs[cr] == 3 && j >=  6){    //if redit of course is greater then available hourse then course should not be allocate
        count--;
    }

    if (currentCourse.crHouurs[cr] == 2 && j >=  7){    //if redit of course is greater then available hourse then course should not be allocate
        count--;
    }

    if(classes[cls][0] == currentCourse.session){       //if class is available for current course
        count++;
    }
    
    
    let chTeacher = checkTeacher(currentCourse, i, j, cr);

    if (chTeacher[0]){   //if teacher is available making count increase
        count++;
    }
    
    if(checkClassRoom(currentCourse, i, j, cr, cl)){     //if class room available count increase
        count++
    }
    
    if(checkClasses(currentCourse, i, j, cr, cls)){     //if class available count increase
        count++
    }
    
    if(checkTimeTable(currentCourse, i, j, cr)){        //if timeTable available count increase
        count++
    }
    
    if (count == 5){     //if all resources available then return chTeacher with teacher index and true
        return chTeacher;
    }

    return [false];
}

let allTables = new Array;  //to store all time tables 

generateTimeTable = () => {
    let cl = 0;
    while(cl < classRooms.length ){
        
        for(let cls = 0; cls < classes.length; cls++){
            
            for(let i = 0; i < daysPerWeek; i++){
                
                let j = 1;
                let jCouunt = 0;
                while(j < hoursPerDay ){
                    
                    //if time table, class room and class mean all have time slots available
                    if((timeTable[i][j] == 0) && (classRooms[cl][1][i][j] == 0) && (classes[cls][1][i][j] == 0)) {
                        
                        let y = 0;
                        while(y < courses.length){  //checking for courses on every hour of the day so that can be alloted
                            if(j === hoursPerDay){
                                j = 1;
                            }
                            let chCourse = checkCourse(courses[y], i, j, 0, cls, cl);   //if course is avaible mean course have teacehr for all its current credit hourse
                            
                            if (chCourse[0]){
                                
                                for(let m = 0; m < courses[y].crHouurs[0]; m++){    //making bussy to all slots until credit hourse and allocating course

                                    timeTable[i][j] = courses[y].name + ', ' + courses[y].teacher + ', ' + classRooms[cl][0];
                                    classRooms[cl][1][i][j] = 1;
                                    classes[cls][1][i][j] = 1;
                                    teachers[chCourse[1]][1][i][j] = 1;
                                    j++;

                                }
                                courses[y].crHouurs.splice(0, 1);          //removing credit that are used
                                
                                if(courses[y].crHouurs.length == 0){
                                    courses.splice(y, 1)     //removing course if its all its credit hours is used so length of course array will be less by 1
                                }
                                
                            }else{
                                y++;
                            }
                        }
                        
                        j++;
                    }else{
                        j++;
                    }
                }
            }
           
            var table = []; 
            for (var k = 0; k < timeTable.length; k++) {    //to copy array by value
                table[k] = timeTable[k].slice();    
            }
            
            //pushing current session table to allTable array ant making him empty
            for(let ta = 0; ta < allTables.length || allTables.length == 0; ta++){
                if(allTables.length != 0){
                    
                    if(classes[cls][0] == allTables[ta][0]){

                        for(let dpw = 0; dpw < daysPerWeek; dpw++){
                            for(let hpd = 1; hpd < hoursPerDay; hpd++){
                                
                                if((allTables[ta][2][dpw][hpd] == 0) && (table[dpw][hpd] != 0)){    //if allTable slots is free and time table slot is buusy then copy that slot to allTable
                                    allTables[ta][2][dpw][hpd] = table[dpw][hpd];
                                }

                            }
                        }

                    }else if(allTables[ta][1] == classRooms[cl][0]){
                        let count = 0;
                        for(let s = 0; s < allTables.length; s++){
                            if(allTables[s][0] == classes[cls][0]){
                                count++;
                            }
                        }
                        if(count == 0){
                            allTables.push([classes[cls][0], classRooms[cl][0], table]);   //pushing current room name, class name and table to all table array 
                        }
                    }

                }else{
                    
                    allTables.push([classes[cls][0], classRooms[cl][0], table]);    //pushing current room name, class name and table to all table array
                }
            }

            //freeing timrTable for furthor use
            for(let o = 0; o < daysPerWeek; o++ ){
                for(p = 1; p < hoursPerDay; p++){
                    timeTable[o][p] = 0;
                }
            }
        }
        cl++;
        
    }
}


router.post('/', async(req, res) => {
    classRooms = req.body.classRooms;
    classes = req.body.classes;
    courses = req.body.courses;
    teachers = req.body.teachers;
    generateTimeTable();
    console.log(courses);
    res.send(allTables)
    allTables = [];
})

module.exports = router;