import firebase from 'firebase';
// import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: 'card-maker-a856c.appspot.com',
  // messagingSenderId: '494224300399',
  // appId: '1:494224300399:web:cf2246f03e43d8a498309a',
  // measurementId: 'G-79ZYM0Z9ZG',
};

// const analytics = getAnalytics(app)

console.log(process.env.REACT_APP_FIREBASE_API_KEY, 'apikey');
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp;
