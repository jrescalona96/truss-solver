import axios from "axios";

var port = 5000;
axios.defaults.baseURL = "http://localhost:" + port;

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
