import axios from "axios";

const tablesAPI = axios.create({
  baseURL: "http://localhost:8081/api/v1/tables",
  headers: {
    Accept: "application/json",
  },
});

export default tablesAPI;
