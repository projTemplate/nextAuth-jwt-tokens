import axios, {CreateAxiosDefaults} from "axios";

const BASE_URL = "http://localhost:3000/api";

const options: CreateAxiosDefaults = <CreateAxiosDefaults<any>>{
    baseURL: BASE_URL,
    headers: {"Content-Type": "application/json"},
}

export default axios.create(options);
export const axiosAuth = axios.create(options);
