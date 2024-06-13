// App.js
import React, { useState ,useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Page/Dashboard/Login';
import HomePage from './Page/Dashboard/HomePage';
import Add from './Page/Dashboard/Add';
import Tables from './Page/Dashboard/Tables';
import Info from './Page/Dashboard/Info';
import List from './Page/Dashboard/List';
import MoneyTable from './Page/Dashboard/MoneyTable';
import OtherTable from './Page/Dashboard/OtherTable';
import Edit from './Page/Dashboard/Edit';
import Edit2 from './Page/Dashboard/Edit2';
import Edit3 from './Page/Dashboard/Edit3';
import Edit4 from './Page/Dashboard/Edit4';
import './index.css';
import Signup from './Components/Signup';
import Listn from './Page/Dashboard/Info';
import List2 from './Page/Dashboard/MoneyTable';
import List3 from './Page/Dashboard/OtherTable';
import Tableview2 from './Components/Tableview2';
import Editform from './Components/Editform';
import ProtectedRoute from './Components/ProtectedRoute';
import axios from 'axios';
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [employes, setEmployes] = useState();
    const [employeslist, setEmployeslist] = useState();
    const [employesmon, setEmployesmon] = useState();
    const [employesother, setEmployesother] = useState();
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [selectedEmployee1, setSelectedEmployee1] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isEditing1, setIsEditing1] = useState(false);
    const [view, setView] = useState([]);
    useEffect(() => {

      axios.get("http://localhost:3000/info")
          .then(res => {
              setEmployes(res.data);
              
          })
          .catch(err => console.log(err));
          axios.get("http://localhost:3000/list")
          .then(res => {
              setEmployeslist(res.data);
              
          })
          .catch(err => console.log(err));
          axios.get("http://localhost:3000/moneyTable")
          .then(res => {
              setEmployesmon(res.data);
              
          })
          .catch(err => console.log(err));
          axios.get("http://localhost:3000/otherTable")
          .then(res => {
              setEmployesother(res.data);
              
          })
          .catch(err => console.log(err));
  }, []);

 
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/" element={<Signup />} />

        {/* Protected routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <HomePage/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/add"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Add/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/tables"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Tables />
            </ProtectedRoute>
          }
        /> 
        <Route
          path="/info"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Listn employees={employes} />
            </ProtectedRoute>
          }
  
        />
          <Route
          path="/list"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <List employees={employeslist} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/moneyTable"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
             <List2 employees={employesmon} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/otherTable"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
             <List3 employees={employesother} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/filteredData"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Info/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/search/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Edit4/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/search1/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Edit/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/search2/:pass"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Edit2/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/search3/:pass"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Edit3/>
            </ProtectedRoute>
          }
        />
       
      
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;
  