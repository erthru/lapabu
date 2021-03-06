import { initializeApp } from "firebase/app";
import {
    DB_API_KEY,
    DB_APP_ID,
    DB_AUTH_DOAMIN,
    DB_MEASUREMENT_ID,
    DB_MESSAGING_SENDER_ID,
    DB_PROJECT_ID,
    DB_STORAGE_BUCKET,
} from "../helpers/environments";

initializeApp({
    apiKey: DB_API_KEY,
    authDomain: DB_AUTH_DOAMIN,
    projectId: DB_PROJECT_ID,
    storageBucket: DB_STORAGE_BUCKET,
    messagingSenderId: DB_MESSAGING_SENDER_ID,
    appId: DB_APP_ID,
    measurementId: DB_MEASUREMENT_ID,
});
