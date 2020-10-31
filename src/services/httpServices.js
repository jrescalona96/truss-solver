import axios from "axios";

// TODO: Move to .env
var port = 5000;
axios.defaults.baseURL = "http://localhost:" + port;
// axios.defaults.baseURL = "https://truss-solver-server.herokuapp.com/";

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
