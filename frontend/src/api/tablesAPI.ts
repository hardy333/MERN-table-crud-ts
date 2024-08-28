import axios from "axios";

const localUrl = "http://localhost:8081/api/v1/tables";
const globalUrl = "https://table-proj.onrender.com/api/v1/tables";

const tablesAPI = axios.create({
  baseURL: localUrl,
  headers: {
    Accept: "application/json",
  },
});

export default tablesAPI;
