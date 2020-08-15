import { v4 as uuidv4 } from 'uuid';

let search = window.location.search;
let params = new URLSearchParams(search);
export const PROJECT_ID = params.get('projectId');

export const RLAPI = "https://api.irll.net/next";
export const USER_ID = uuidv4();
export const WS_URL = `wss://${USER_ID}.irll.net:5000`;