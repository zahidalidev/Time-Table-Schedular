const cTable = require('console.table');

let timeTable = [
    ["Monday", 0, 0, 0, 0, 0, 0, 0, 0],
    ["Tuesday", 0, 0, 0, 0, 0, 0, 0, 0],
    ["Wednesday", 0, 0, 0, 0, 0, 0, 0, 0],
    ["Thursday", 0, 0, 0, 0, 0, 0, 0, 0],
    ["Friday", 0, 0, 0, 0, 0, 0, 0, 0],
];

let classRooms = [
    ["class_1", [
    ["Monday", 0, 0, 0, 0, 0, 0, 0, 0],
    ["Tuesday", 0, 0, 0, 0, 0, 0, 0, 0],
    ["Wednesday", 0, 0, 0, 0, 0, 0, 0, 0],
    ["Thursday", 0, 0, 0, 0, 0, 0, 0, 0],
    ["Friday", 0, 0, 0, 0, 0, 0, 0, 0],
]],
    ["class_2", [
    ["Monday", 0, 0, 0, 0, 0, 0, 0, 0],
    ["Tuesday", 0, 0, 0, 0, 0, 0, 0, 0],
    ["Wednesday", 0, 0, 0, 0, 0, 0, 0, 0],
    ["Thursday", 0, 0, 0, 0, 0, 0, 0, 0],
    ["Friday", 0, 0, 0, 0, 0, 0, 0, 0],
]],
    ["class_3", [
    ["Monday", 0, 0, 0, 0, 0, 0, 0, 0],
    ["Tuesday", 0, 0, 0, 0, 0, 0, 0, 0],
    ["Wednesday", 0, 0, 0, 0, 0, 0, 0, 0],
    ["Thursday", 0, 0, 0, 0, 0, 0, 0, 0],
    ["Friday", 0, 0, 0, 0, 0, 0, 0, 0],
]],
    ["class_4", [
    ["Monday", 0, 0, 0, 0, 0, 0, 0, 0],
    ["Tuesday", 0, 0, 0, 0, 0, 0, 0, 0],
    ["Wednesday", 0, 0, 0, 0, 0, 0, 0, 0],
    ["Thursday", 0, 0, 0, 0, 0, 0, 0, 0],
    ["Friday", 0, 0, 0, 0, 0, 0, 0, 0],
]],
    ["class_5", [
    ["Monday", 0, 0, 0, 0, 0, 0, 0, 0],
    ["Tuesday", 0, 0, 0, 0, 0, 0, 0, 0],
    ["Wednesday", 0, 0, 0, 0, 0, 0, 0, 0],
    ["Thursday", 0, 0, 0, 0, 0, 0, 0, 0],
    ["Friday", 0, 0, 0, 0, 0, 0, 0, 0],
]],
];

let classes = [
    ["session_19", [
    ["Monday", 0, 0, 0, 0, 0, 0, 0, 0],
    ["Tuesday", 0, 0, 0, 0, 0, 0, 0, 0],
    ["Wednesday", 0, 0, 0, 0, 0, 0, 0, 0],
    ["Thursday", 0, 0, 0, 0, 0, 0, 0, 0],
    ["Friday", 0, 0, 0, 0, 0, 0, 0, 0],
]],
    ["session_18", [
    ["Monday", 0, 0, 0, 0, 0, 0, 0, 0],
    ["Tuesday", 0, 0, 0, 0, 0, 0, 0, 0],
    ["Wednesday", 0, 0, 0, 0, 0, 0, 0, 0],
    ["Thursday", 0, 0, 0, 0, 0, 0, 0, 0],
    ["Friday", 0, 0, 0, 0, 0, 0, 0, 0],
]],
    ["session_17", [
    ["Monday", 0, 0, 0, 0, 0, 0, 0, 0],
    ["Tuesday", 0, 0, 0, 0, 0, 0, 0, 0],
    ["Wednesday", 0, 0, 0, 0, 0, 0, 0, 0],
    ["Thursday", 0, 0, 0, 0, 0, 0, 0, 0],
    ["Friday", 0, 0, 0, 0, 0, 0, 0, 0],
]],
    ["session_16", [
    ["Monday", 0, 0, 0, 0, 0, 0, 0, 0],
    ["Tuesday", 0, 0, 0, 0, 0, 0, 0, 0],
    ["Wednesday", 0, 0, 0, 0, 0, 0, 0, 0],
    ["Thursday", 0, 0, 0, 0, 0, 0, 0, 0],
    ["Friday", 0, 0, 0, 0, 0, 0, 0, 0],
]],
];


let courses = [
    {name: 'c8', session: 'session_19', teacher: 't2', crHouurs: [3]},
    {name: 'c9', session: 'session_19', teacher: 't2', crHouurs: [3]},
    {name: 'c10', session: 'session_19', teacher: 't3', crHouurs: [1, 2]},
    {name: 'c11', session: 'session_19', teacher: 't4', crHouurs: [2, 1]},
    {name: 'c12', session: 'session_19', teacher: 't3', crHouurs: [1, 1]},
    {name: 'c13', session: 'session_19', teacher: 't6', crHouurs: [3]},
    {name: 'c14', session: 'session_19', teacher: 't3', crHouurs: [1, 1, 1]},
    {name: 'c15', session: 'session_19', teacher: 't4', crHouurs: [1, 1, 1]},
    {name: 'c16', session: 'session_19', teacher: 't4', crHouurs: [1, 1, 1]},

    {name: 'c1', session: 'session_18', teacher: 't1', crHouurs: [1, 2]},
    {name: 'c2', session: 'session_18', teacher: 't4', crHouurs: [1, 1, 1]},
    {name: 'c3', session: 'session_18', teacher: 't1', crHouurs: [3]},
    {name: 'c4', session: 'session_18', teacher: 't5', crHouurs: [2]},
    {name: 'c5', session: 'session_18', teacher: 't2', crHouurs: [2, 1]},
    {name: 'c6', session: 'session_18', teacher: 't2', crHouurs: [2]},
    {name: 'c7', session: 'session_18', teacher: 't6', crHouurs: [1, 1, 1]},
    {name: 'c17', session: 'session_18', teacher: 't4', crHouurs: [1, 1, 1]},
    {name: 'c18', session: 'session_18', teacher: 't5', crHouurs: [2, 1]},
    {name: 'c19', session: 'session_18', teacher: 't5', crHouurs: [1, 2]},
    {name: 'c20', session: 'session_18', teacher: 't6', crHouurs: [1, 2]},
    
    {name: 'c21', session: 'session_17', teacher: 't3', crHouurs: [1, 1, 1]},
    {name: 'c22', session: 'session_17', teacher: 't4', crHouurs: [1, 1, 1]},
    {name: 'c23', session: 'session_17', teacher: 't4', crHouurs: [1, 1, 1]},
    {name: 'c24', session: 'session_17', teacher: 't4', crHouurs: [1, 1, 1]},
    {name: 'c25', session: 'session_17', teacher: 't5', crHouurs: [2, 1]},
    {name: 'c26', session: 'session_17', teacher: 't5', crHouurs: [1, 2]},
    {name: 'c27', session: 'session_17', teacher: 't6', crHouurs: [1, 2]},
    
    {name: 'c28', session: 'session_16', teacher: 't3', crHouurs: [1, 1, 1]},
    {name: 'c29', session: 'session_16', teacher: 't4', crHouurs: [1, 1, 1]},
    {name: 'c30', session: 'session_16', teacher: 't4', crHouurs: [1, 1, 1]},
    {name: 'c31', session: 'session_16', teacher: 't4', crHouurs: [1, 1, 1]},
    {name: 'c32', session: 'session_16', teacher: 't5', crHouurs: [2, 1]},
    {name: 'c33', session: 'session_16', teacher: 't5', crHouurs: [1, 2]},
    {name: 'c34', session: 'session_16', teacher: 't6', crHouurs: [1, 2]},

];

let teachers = [
    ["t1", [
    ["Monday", 0, 0, 0, 1, 1, 1, 1, 1],
    ["Tuesday", 1, 0, 0, 1, 1, 0, 0, 1],
    ["Wednesday", 0, 0, 1, 1, 0, 1, 1, 1],
    ["Thursday", 1, 0, 0, 1, 1, 0, 0, 1],
    ["Friday", 0, 0, 0, 1, 1, 1, 1, 1],
]],
    ["t2", [
    ["Monday", 1, 1, 1, 0, 0, 1, 1, 1],
    ["Tuesday", 0, 1, 1, 0, 0, 1, 1, 0],
    ["Wednesday", 1, 1, 0, 0, 1, 0, 0, 1],
    ["Thursday", 0, 1, 1, 0, 0, 1, 1, 0],
    ["Friday", 1, 1, 1, 0, 0, 1, 1, 1],
]],
    ["t3", [
    ["Monday", 1, 1, 1, 1, 1, 0, 0, 0],
    ["Tuesday", 1, 0, 0, 1, 1, 0, 0, 1],
    ["Wednesday",0, 0, 1, 1, 0, 1, 1, 1],
    ["Thursday", 1, 0, 0, 1, 1, 0, 0, 1],
    ["Friday", 1, 1, 1, 1, 1, 0, 0, 0],
]],
    ["t4", [
    ["Monday", 0, 0, 0, 1, 1, 1, 1, 1],
    ["Tuesday", 0, 1, 1, 0, 0, 1, 1, 0],
    ["Wednesday", 1, 1, 0, 0, 1, 0, 0, 1],
    ["Thursday", 0, 1, 1, 0, 0, 1, 1, 0],
    ["Friday", 0, 0, 0, 1, 1, 1, 1, 1],
]],
    ["t5", [
    ["Monday", 1, 1, 1, 0, 0, 1, 1, 1],
    ["Tuesday", 1, 0, 0, 1, 1, 0, 0, 1],
    ["Wednesday", 0, 0, 1, 1, 0, 1, 1, 1],
    ["Thursday", 1, 0, 0, 1, 1, 0, 0, 1],
    ["Friday", 1, 1, 1, 0, 0, 1, 1, 1],
]],
    ["t6", [
    ["Monday", 1, 1, 1, 1, 1, 0, 0, 0],
    ["Tuesday", 0, 1, 1, 0, 0, 1, 1, 0],
    ["Wednesday", 1, 1, 0, 0, 1, 0, 0, 1],
    ["Thursday", 0, 1, 1, 0, 0, 1, 1, 0],
    ["Friday", 1, 1, 1, 1, 1, 0, 0, 0],
]],
];

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


finalTables = () => {
    generateTimeTable();

    for(let ta = 0; ta < allTables.length; ta++){
        console.table(allTables[ta][0])
        console.table(allTables[ta][2])
    }

}

finalTables();
