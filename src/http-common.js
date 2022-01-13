import axios from "axios";

export default axios.create({
  baseURL: "https://backendag.herokuapp.com/api",
  headers: {
    "Content-type": "application/json"
  }
});