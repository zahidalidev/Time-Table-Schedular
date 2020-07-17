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


checkTeacher = (currentCourse, i, j, cr) => {

    if((currentCourse.crHouurs[cr] == 0) || currentCourse.crHouurs.length == 0){
        return [false];
        // return [true, 1];
    }

    for(let t = 0; t < teachers.length; t++){
        
        if(currentCourse.teacher === teachers[t][0]){
            let tHour = j;
            for(let l = 0; l < currentCourse.crHouurs[cr]; l++){

                if(teachers[t][1][i][tHour] == 0){
                    tHour++;
                }else{
                    return [false];
                    // return [true, t];
                }
                if(l == currentCourse.crHouurs[cr] - 1){
                    return [true, t];
                }
            }
        }
    }
}

checkCourse = (currentCourse, i, j, cr, cls) => {
    let count = 0;

    if (currentCourse.crHouurs[cr] == 3 && j >=  6){
        count--;
    }

    if (currentCourse.crHouurs[cr] == 2 && j >=  7){
        count--;
    }

    if(classes[cls][0] == currentCourse.session){
        count++;
    }

    let chTeacher = checkTeacher(currentCourse, i, j, cr);
    if (chTeacher[0]){
        count++;
    }

    if (count == 2)
        return chTeacher;

    return [false];
}

let allTables = new Array;

generateTimeTable = () => {
    let cl = 0;
    while(cl < classRooms.length ){
        
        for(let cls = 0; cls < classes.length; cls++){
            
            for(let i = 0; i < daysPerWeek; i++){
                
                let y = 0;
                let j = 1;

                while(j < hoursPerDay && j <= courses.length){

                    if((timeTable[i][j] == 0) && (classRooms[cl][1][i][j] == 0) && (classes[cls][1][i][j] == 0)) {

                        if(y >= courses.length){
                            y = 0;
                            j++;
                        }

                        let chCourse = checkCourse(courses[y], i, j, 0, cls);
                        
                        if (chCourse[0]){

                            for(let m = 0; m < courses[y].crHouurs[0]; m++){

                                timeTable[i][j] = courses[y].name + ', ' + courses[y].teacher + ', ' + classRooms[cl][0];
                                classRooms[cl][1][i][j] = 1;
                                classes[cls][1][i][j] = 1;
                                teachers[chCourse[1]][1][i][j] = 1;
                                j++

                            }
                            courses[y].crHouurs.splice(0, 1);         //removing credit used credit hours
                            
                            if(courses[y].crHouurs.length == 0){
                                courses.splice(y, 1)     //removing course if its all credit hours is used
                            }
                            else{
                                y++;
                            }
                            
                        }else{
                            y++;
                        }

                    }else{
                        j++;
                    }
                }
            }
           
            var table = []; 
            for (var k = 0; k < timeTable.length; k++) {
                table[k] = timeTable[k].slice();    //to copy array by value
            }
            // console.log(classes[cls][0], classRooms[cl][0])
            // console.table(table)
            //sessions(class) wise table 
            for(let ta = 0; ta < allTables.length || allTables.length == 0; ta++){
                if(allTables.length != 0){
                    
                    if(classes[cls][0] == allTables[ta][0]){

                        for(let dpw = 0; dpw < daysPerWeek; dpw++){
                            for(let hpd = 1; hpd < hoursPerDay; hpd++){
                                
                                if((allTables[ta][2][dpw][hpd] == 0) && (table[dpw][hpd] != 0)){
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
                            allTables.push([classes[cls][0], classRooms[cl][0], table]);    
                        }
                    }

                }else{
                    
                    allTables.push([classes[cls][0], classRooms[cl][0], table]);    
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
    console.table(allTables[2]);
    res.send(allTables)
})

module.exports = router;