import { v4 as uuidv4 } from 'uuid';

//parse the projectId from the original query string
let search = window.location.search;
let params = new URLSearchParams(search);
export const PROJECT_ID = params.get('projectId');

//api endpoint used to send GET and POST requests
export const RLAPI = "https://api.irll.net/next";

//userId generated by uuidv4
export const USER_ID = uuidv4();

//websocket server's domain name
export const WS_URL = `wss://${USER_ID}.irll.net:5000`;