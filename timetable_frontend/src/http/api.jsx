import axios from "axios";

// this is end point use to connect with backend 
const endPoint = "http://localhost:5000/api/timetable";

export const generateTableWithPost = async(tableData) => {
    
    //using axios for post reqest
    const {data} = await axios.post(endPoint, tableData);  // Object Destructuring {data} to get reponce in data constant
    return data;    //getting result as a response and returning it
}