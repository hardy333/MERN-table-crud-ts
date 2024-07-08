import axios from "axios";

const tablesAPI = axios.create({
  baseURL: "https://table-proj.onrender.com/api/v1/tables",
  headers: {
    Accept: "application/json",
  },
});

export default tablesAPI;
