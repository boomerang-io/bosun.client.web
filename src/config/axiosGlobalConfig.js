// Setup global config for Axios requests so they work with ICP
import axios from "axios";
import { BASE_SERVICE_ENV_URL } from "./servicesConfig";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = BASE_SERVICE_ENV_URL;
