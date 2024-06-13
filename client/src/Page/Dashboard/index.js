import React, { useState } from 'react'
import Swal from 'sweetalert2';

import Add from './Add'
import MoneyTable from './MoneyTable'
import OtherTable from './OtherTable'
import NoPage from './noPage'
import List from './List';
import Home from './Home';
import Login from './Login';
import Tables from './tables'
import Info from './Info.js'
import Listn from './Info';
import Edit from './Edit'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { employeesData } from '../../data';
import List2 from './MoneyTable.jsxoneyTable';
import List3 from './OtherTable.jsxtherTable';
import Edit2 from './Edit2';
import Edit3 from './Edit3';
import Edit4 from './Edit4';

function Dashboard() {

    const [employees, setEmployees] = useState(employeesData);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = (id) => {
        const [employee] = employees.filter(employee => employee.id === id);

        setSelectedEmployee(employee);
        setIsEditing(true);
    }
    const handleDelete = (id) => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        }).then(result => {
            if (result.value) {
                const [employee] = employees.filter(employee => employee.id === id);

                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: `${employee.firstName}'s data has been deleted.`,
                    showConfirmButton: false,
                    timer: 1500,
                });

                setEmployees(employees.filter(employee => employee.id !== id));
            }
        });
    }

    return (
        <div>
          <BrowserRouter>
            <Routes>
              <Route index element={<Login />} />    
              <Route path="/Home"  element={<Home />} />
              <Route
        path="/Add"
        element={<Add employees={employees} setEmployees={setEmployees} setIsAdding={setIsAdding} />}
      />
              <Route path="/Tables"  element={<Tables />} />

      <Route
        path="/Info"
        element={<Listn employees={employees} handleEdit={handleEdit} handleDelete={handleDelete} />}
      />

              <Route
        path="/MoneyTable"
        element={<List2 employees={employees} handleEdit={handleEdit} handleDelete={handleDelete} />}
      />
              <Route
        path="/OtherTable"
        element={<List3 employees={employees} handleEdit={handleEdit} handleDelete={handleDelete} />}
      />
              <Route path="*"  element={<NoPage/>} />
              <Route
        path="/list"
        element={<List employees={employees} handleEdit={handleEdit} handleDelete={handleDelete} />}
      />
              <Route path="/Login"  element={<Login />} />
              <Route 
              path="/Edit"  
              element={<Edit employees={employees} selectedEmployee={selectedEmployee} setEmployees={setEmployees} setIsEditing={setIsEditing} />} />
              <Route 
              path="/Edit2"  
              element={<Edit2 employees={employees} selectedEmployee={selectedEmployee} setEmployees={setEmployees} setIsEditing={setIsEditing} />} />
              <Route 
              path="/Edit3"  
              element={<Edit3 employees={employees} selectedEmployee={selectedEmployee} setEmployees={setEmployees} setIsEditing={setIsEditing} />} />
             
             <Route 
              path="/Edit4"  
              element={<Edit4 employees={employees} selectedEmployee={selectedEmployee} setEmployees={setEmployees} setIsEditing={setIsEditing} />} />
             
           </Routes>
           
           
          </BrowserRouter>
        </div>
      
        
       
    )
}

export default Dashboard; 
