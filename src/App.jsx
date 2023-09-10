import './App.css'
import { TodoWrapper } from './components/TodoWrapper'

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD6bVeCDqfSYBdeqLKmj5X91vK-vjOrdRU",
  authDomain: "todo-list-1c197.firebaseapp.com",
  projectId: "todo-list-1c197",
  storageBucket: "todo-list-1c197.appspot.com",
  messagingSenderId: "521888047918",
  appId: "1:521888047918:web:8869dee215267c63d090bf",
  measurementId: "G-8QM257GEWE",
  databaseURL: "https://todo-list-1c197-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const analytics = getAnalytics(app);

function App() {

  // const putData = () => {
  //   set(ref(db, "todos/"), {
  //     id: 1,
  //     name: "prince singh chouhan"
  //   });
  // };

  return (
    <>
      <div className=''>
        <TodoWrapper db={db}/>
      </div>
    </>
  )
}

export default App
