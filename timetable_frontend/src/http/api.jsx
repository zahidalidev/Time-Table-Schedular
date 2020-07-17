import axios from "axios";

const endPoint = "http://localhost:5000/api/timetable";

export const generateTableWithPost = async(tableData) => {
    const {data} = await axios.post(endPoint, tableData);
    return data;
}