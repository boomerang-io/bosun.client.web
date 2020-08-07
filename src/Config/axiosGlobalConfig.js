// Setup global config for Axios requests so they work with ICP
import axios from "axios";
import { PRODUCT_SERVICE_ENV_URL } from "./servicesConfig";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = PRODUCT_SERVICE_ENV_URL;
