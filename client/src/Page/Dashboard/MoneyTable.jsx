import { employeesData } from '../../data';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
let book_count =0;
let pay_count=0;
let pay1_count=0;
let debts_count =0;
let sertotal_count =0;
let debt_count =0;
let totaldebt_count =0;
function List2({ employees }) {

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: null
    });
    const [view, setView] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchQuery1, setSearchQuery1] = useState('');
    const [searchQuery2, setSearchQuery2] = useState('');
    const [searchQuery3, setSearchQuery3] = useState('');

    const [nameFilter, setNameFilter] = useState('');
    const [stateFilter, setStateFilter] = useState('');
    const [genderFilter, setGenderFilter] = useState('');
    const [gradeFilter, setGradeFilter] = useState('');
    const [passFilter, setPassFilter] = useState('');
    const [majorFilter, setMajorFilter] = useState('');
    const [startDateFilter, setStartDateFilter] = useState('');
    const [endDateFilter, setEndDateFilter] = useState('');
    const [startDateFilter2, setStartDateFilter2] = useState('');
    const [endDateFilter2, setEndDateFilter2] = useState('');
    const [optionFilter, setOptionFilter] = useState('');
    const [addressFilter, setAdressFilter] = useState('');

    const [employeeNames, setEmployeeNames] = useState([]);
    const [employeeGenders, setEmployeeGenders] = useState([]);
    const [employeeStates, setEmployeeStates] = useState([]);
    const [employeeGrades, setEmployeeGrades] = useState([]);
    const [employeePasses, setEmployeePasses] = useState([]);
    const [employeeMajors, setEmployeeMajors] = useState([]);
    const [employeeOptions, setEmployeeOptions] = useState([]);
    const [employeeAdresses, setEmployeeAdresses] = useState([]);

    useEffect(() => {
        const uniqueNames = [...new Set(employees.map(employee => employee.firstName))];
        setEmployeeNames(uniqueNames);
        const uniqueGenders = [...new Set(employees.map(employee => employee.gender))];
        setEmployeeGenders(uniqueGenders);
        const uniqueStates = [...new Set(employees.map(employee => employee.state))];
        setEmployeeStates(uniqueStates);
        const uniqueGrades = [...new Set(employees.map(employee => employee.grade))];
        setEmployeeGrades(uniqueGrades);
        const uniquePass = [...new Set(employees.map(employee => employee.pass))];
        setEmployeePasses(uniquePass);
        const uniqueMajor = [...new Set(employees.map(employee => employee.major))];
        setEmployeeMajors(uniqueMajor);
        const uniqueOptions = [...new Set(employees.map(employee => employee.option))];
        setEmployeeOptions(uniqueOptions);
        const uniqueEmployeeAdresses = [...new Set(employees.map(employee => employee.address))];
        setEmployeeAdresses(uniqueEmployeeAdresses);
        axios.get("http://localhost:3000/auth/tableview1")
        .then(res => {
          setView(res.data);
          setFilteredData(res.data);
        })
        .catch(err => console.log(err));

      }, [employees]);

const filteredEmployees = employees ? employees.filter((employee) => {
        const fullName = `${employee.firstName}`.toLowerCase();
        const telephone =`${employee.telephone}`;
        const id =`${employee.ID}`;
        const pass =`${employee.pass}`;
        const email =`${employee.email}`;
        const employeeState = employee.state;
        const employeeGender = employee.gender;
        const employeeGrade = employee.grade;
        const employeePass = employee.pass;
        const employeeMajor = employee.major;
        const employeeOption = employee.option;
        const employeeAdress = employee.address;
        const employeeDate = parseDate(employee.date1);
        const employeeDate2 = parseDate(employee.date2);
        const employeeBookDate = parseDate(employee.dateBook);
        const employeeSer1Date = parseDate(employee.dateSer1);
        const employeeSer2Date = parseDate(employee.dateSer2);
        const employeeSer3Date = parseDate(employee.dateSer3);
        // Check if the student's date falls within the selected interval
const startDate = parseDate(startDateFilter);
const endDate = parseDate(endDateFilter);
const isInInterval =
  (startDateFilter === '' || employeeDate >= startDate) &&
  (endDateFilter === '' || employeeDate <= new Date(endDate.getTime() + 16400000));
// Check if the student's date falls within the selected interval
const startDate2 = parseDate(startDateFilter2);
const endDate2 = parseDate(endDateFilter2);
const isInInterval2 =
  (startDateFilter2 === '' || employeeDate2 >= startDate2) &&
  (endDateFilter2 === '' || employeeDate2 <= new Date(endDate2.getTime() + 16400000));
  function parseDate(dateString) {
    if (!dateString) {
      // Handle the case where dateString is undefined or empty
      return null; // Or you can return a default value or throw an error
    }
  
  
    const [year, month, day] = dateString.split('-');
    return new Date(`20${year}`, month - 1, day); // Assuming the year is in the 21st century
  }
          return (
              fullName.includes(searchQuery.toLowerCase()) &&
              id.includes(searchQuery1) &&
              telephone.includes(searchQuery2) &&
              pass.includes(searchQuery3) &&
              (nameFilter === '' || fullName.includes(nameFilter.toLowerCase())) &&
              (stateFilter === '' || employeeState.includes(stateFilter.toLowerCase())) &&
              (genderFilter === '' || employeeGender.includes(genderFilter))&&
              (gradeFilter === '' || employeeGrade.includes(gradeFilter))&&
              (passFilter === '' || employeePass.includes(passFilter))&&
              (majorFilter === '' || employeeMajor.includes(majorFilter))&&
              (optionFilter === '' || employeeOption.includes(optionFilter))&&
              (addressFilter === '' || employeeAdress.includes(addressFilter))&&
  
              isInInterval &&  isInInterval2
            );
        }):[];
        const handleSearchn = (e) => {
          const query3 = e.target.value;
          
          setSearchQuery(query3);
        
          const filtered = view.filter(item => {
            // Customize the conditions based on your filtering requirements
            return (
              item.firstName.toLowerCase().includes(query3.toLowerCase()) ||
              item.state.toLowerCase().includes(query3.toLowerCase()) ||
              item.ID.toLowerCase().includes(query3.toLowerCase()) ||
              item.pass.toLowerCase().includes(query3.toLowerCase()) ||
              item.email.toLowerCase().includes(query3.toLowerCase()) ||
              item.gender.toLowerCase().includes(query3.toLowerCase()) ||
              item.grade.toLowerCase().includes(query3.toLowerCase()) ||
              item.major.toLowerCase().includes(query3.toLowerCase()) ||
              item.date1.toLowerCase().includes(query3.toLowerCase()) ||
              item.Type1.toLowerCase().includes(query3.toLowerCase()) ||
              item.type.toLowerCase().includes(query3.toLowerCase())||
              item.discount.toLowerCase().includes(query3.toLowerCase()) ||
              item.pay.toLowerCase().includes(query3.toLowerCase())||
              item.pay1.toLowerCase().includes(query3.toLowerCase())||
              item.date2.toLowerCase().includes(query3.toLowerCase())||
              item.service1.toLowerCase().includes(query3.toLowerCase())||
              item.service2.toLowerCase().includes(query3.toLowerCase())||
              item.service3.toLowerCase().includes(query3.toLowerCase())||
              item.dateSer1.toLowerCase().includes(query3.toLowerCase())||
              item.dateSer2.toLowerCase().includes(query3.toLowerCase())||
              item.dateSer3.toLowerCase().includes(query3.toLowerCase())||
              item.pay2.toLowerCase().includes(query3.toLowerCase())||
              item.pay3.toLowerCase().includes(query3.toLowerCase())||
              item.option.toLowerCase().includes(query3.toLowerCase())||
              item.address.toLowerCase().includes(query3.toLowerCase())||
              item.telephone.toLowerCase().includes(query3.toLowerCase())||
              item.book.toLowerCase().includes(query3.toLowerCase())||
              item.dateBook.toLowerCase().includes(query3.toLowerCase())||
              item.notes.toLowerCase().includes(query3.toLowerCase())||
              item.debt.toLowerCase().includes(query3.toLowerCase())||
              item.debts.toLowerCase().includes(query3.toLowerCase())||
              item.totaldebt.toLowerCase().includes(query3.toLowerCase())||
              item.sertotal.toLowerCase().includes(query3.toLowerCase())||
              item.execuse.includes(query3.toLowerCase())||
              item.payyys.includes(query3.toLowerCase())
            );
          });
        
          setFilteredData(filtered);
        };
        const handleSearch = (e) => {
          const query = e.target.value;
          
          setSearchQuery1(query);
        
          const filtered = view.filter(item => {
            // Customize the conditions based on your filtering requirements
            return (
              item.firstName.toLowerCase().includes(query.toLowerCase()) ||
              item.state.toLowerCase().includes(query.toLowerCase()) ||
              item.ID.toLowerCase().includes(query.toLowerCase()) ||
              item.pass.toLowerCase().includes(query.toLowerCase()) ||
              item.email.toLowerCase().includes(query.toLowerCase()) ||
              item.gender.toLowerCase().includes(query.toLowerCase()) ||
              item.grade.toLowerCase().includes(query.toLowerCase()) ||
              item.major.toLowerCase().includes(query.toLowerCase()) ||
              item.date1.toLowerCase().includes(query.toLowerCase()) ||
              item.Type1.toLowerCase().includes(query.toLowerCase()) ||
              item.type.toLowerCase().includes(query.toLowerCase())||
              item.discount.toLowerCase().includes(query.toLowerCase()) ||
              item.pay.toLowerCase().includes(query.toLowerCase())||
              item.pay1.toLowerCase().includes(query.toLowerCase())||
              item.date2.toLowerCase().includes(query.toLowerCase())||
              item.service1.toLowerCase().includes(query.toLowerCase())||
              item.service2.toLowerCase().includes(query.toLowerCase())||
              item.service3.toLowerCase().includes(query.toLowerCase())||
              item.dateSer1.toLowerCase().includes(query.toLowerCase())||
              item.dateSer2.toLowerCase().includes(query.toLowerCase())||
              item.dateSer3.toLowerCase().includes(query.toLowerCase())||
              item.pay2.toLowerCase().includes(query.toLowerCase())||
              item.pay3.toLowerCase().includes(query.toLowerCase())||
              item.option.toLowerCase().includes(query.toLowerCase())||
              item.address.toLowerCase().includes(query.toLowerCase())||
              item.telephone.toLowerCase().includes(query.toLowerCase())||
              item.book.toLowerCase().includes(query.toLowerCase())||
              item.dateBook.toLowerCase().includes(query.toLowerCase())||
              item.notes.toLowerCase().includes(query.toLowerCase())||
              item.debt.toLowerCase().includes(query.toLowerCase())||
              item.debts.toLowerCase().includes(query.toLowerCase())||
              item.totaldebt.toLowerCase().includes(query.toLowerCase())||
              item.sertotal.toLowerCase().includes(query.toLowerCase())||
              item.execuse.includes(query.toLowerCase())||
              item.payyys.includes(query.toLowerCase())
            );
          });
        
          setFilteredData(filtered);
        };
        const handleSearch2 = (e) => {
          const query2 = e.target.value;
          
          setSearchQuery3(query2);
        
          const filtered = view.filter(item => {
            // Customize the conditions based on your filtering requirements
            return (
              item.firstName.toLowerCase().includes(query2.toLowerCase()) ||
              item.state.toLowerCase().includes(query2.toLowerCase()) ||
              item.ID.toLowerCase().includes(query2.toLowerCase()) ||
              item.pass.toLowerCase().includes(query2.toLowerCase()) ||
              item.email.toLowerCase().includes(query2.toLowerCase()) ||
              item.gender.toLowerCase().includes(query2.toLowerCase()) ||
              item.grade.toLowerCase().includes(query2.toLowerCase()) ||
              item.major.toLowerCase().includes(query2.toLowerCase()) ||
              item.date1.toLowerCase().includes(query2.toLowerCase()) ||
              item.Type1.toLowerCase().includes(query2.toLowerCase()) ||
              item.type.toLowerCase().includes(query2.toLowerCase())||
              item.discount.toLowerCase().includes(query2.toLowerCase()) ||
              item.pay.toLowerCase().includes(query2.toLowerCase())||
              item.pay1.toLowerCase().includes(query2.toLowerCase())||
              item.date2.toLowerCase().includes(query2.toLowerCase())||
              item.pay2.toLowerCase().includes(query2.toLowerCase())||
              item.pay3.toLowerCase().includes(query2.toLowerCase())||
              item.option.toLowerCase().includes(query2.toLowerCase())||
              item.address.toLowerCase().includes(query2.toLowerCase())||
              item.telephone.toLowerCase().includes(query2.toLowerCase())||
              item.book.toLowerCase().includes(query2.toLowerCase())||
              item.dateBook.toLowerCase().includes(query2.toLowerCase())||
              item.notes.toLowerCase().includes(query2.toLowerCase())||
              item.debt.toLowerCase().includes(query2.toLowerCase())||
              item.debts.toLowerCase().includes(query2.toLowerCase())||
              item.totaldebt.toLowerCase().includes(query2.toLowerCase())||
              item.sertotal.toLowerCase().includes(query2.toLowerCase())||
              item.service1.toLowerCase().includes(query2.toLowerCase())||
              item.service2.toLowerCase().includes(query2.toLowerCase())||
              item.service3.toLowerCase().includes(query2.toLowerCase())||
              item.dateSer1.toLowerCase().includes(query2.toLowerCase())||
              item.dateSer2.toLowerCase().includes(query2.toLowerCase())||
              item.dateSer3.toLowerCase().includes(query2.toLowerCase())||
              item.execuse.includes(query2.toLowerCase())||
              item.payyys.includes(query2.toLowerCase())
              
            );
          });
        
          setFilteredData(filtered);
        };
        const handleSearch1 = (e) => {
          const query1 = e.target.value;
          setSearchQuery2(query1);
        
          const filtered = view.filter(item => {
            // Customize the conditions based on your filtering requirements
            return (
              item.firstName.toLowerCase().includes(query1.toLowerCase()) ||
              item.state.toLowerCase().includes(query1.toLowerCase()) ||
              item.ID.toLowerCase().includes(query1.toLowerCase()) ||
              item.pass.toLowerCase().includes(query1.toLowerCase()) ||
              item.email.toLowerCase().includes(query1.toLowerCase()) ||
              item.gender.toLowerCase().includes(query1.toLowerCase()) ||
              item.grade.toLowerCase().includes(query1.toLowerCase()) ||
              item.major.toLowerCase().includes(query1.toLowerCase()) ||
              item.date1.toLowerCase().includes(query1.toLowerCase()) ||
              item.Type1.toLowerCase().includes(query1.toLowerCase()) ||
              item.type.toLowerCase().includes(query1.toLowerCase())||
              item.discount.toLowerCase().includes(query1.toLowerCase()) ||
              item.pay.toLowerCase().includes(query1.toLowerCase())||
              item.pay1.toLowerCase().includes(query1.toLowerCase())||
              item.date2.toLowerCase().includes(query1.toLowerCase())||
              item.pay2.toLowerCase().includes(query1.toLowerCase())||
              item.pay3.toLowerCase().includes(query1.toLowerCase())||
              item.option.toLowerCase().includes(query1.toLowerCase())||
              item.address.toLowerCase().includes(query1.toLowerCase())||
              item.telephone.toLowerCase().includes(query1.toLowerCase())||
              item.book.toLowerCase().includes(query1.toLowerCase())||
              item.dateBook.toLowerCase().includes(query1.toLowerCase())||
              item.service1.toLowerCase().includes(query1.toLowerCase())||
              item.service2.toLowerCase().includes(query1.toLowerCase())||
              item.service3.toLowerCase().includes(query1.toLowerCase())||
              item.dateSer1.toLowerCase().includes(query1.toLowerCase())||
              item.dateSer2.toLowerCase().includes(query1.toLowerCase())||
              item.dateSer3.toLowerCase().includes(query1.toLowerCase())||
              item.notes.toLowerCase().includes(query1.toLowerCase())||
              item.debt.toLowerCase().includes(query1.toLowerCase())||
              item.debts.toLowerCase().includes(query1.toLowerCase())||
              item.totaldebt.toLowerCase().includes(query1.toLowerCase())||
              item.sertotal.toLowerCase().includes(query1.toLowerCase())||
              item.execuse.includes(query1.toLowerCase())||
              item.payyys.includes(query1.toLowerCase())
            );
          });
        
          setFilteredData(filtered);
        };

        let callCount = 0;
  function calculateTotalPay(employees) {
    callCount++;
    let total = 0;
    if (callCount >= (filteredEmployees.length)  ){
    employees.forEach((employee) => {
      total += parseInt(employee.pay, 10) || 0;
      pay_count=5;
     
    });
    return total;
  }
  else{
     return null;
  }
  }  let callCount1 = 0;
  function calculateTotalPay1(employees) {
    callCount1++;
    let total = 0;
    if (callCount1 >= (filteredEmployees.length) ){
    employees.forEach((employee) => {
      total += parseInt(employee.pay1, 10) || 0;
      pay1_count=5;
     
    });
    return total;
  }
  else{
     return null;
  }
  }let  book = 0;
  function calculateTotalBook(employees) {
    book ++;
    let total = 0;
    if (book  >= (filteredEmployees.length) ){
    employees.forEach((employee) => {
      total += parseInt(employee.book, 10) || 0;
      book_count =5;
      
    }); 
    return total;
  }
  else{
     return null;
  }
  }
  let sertotal = 0;
  function calculateTotalSerTotal(employees) {
    sertotal ++;
    let total = 0;
    if (sertotal  >= (filteredEmployees.length) ){
    employees.forEach((employee) => {
      total += parseInt(employee.sertotal, 10) || 0;
      sertotal_count =5;
    });
    return total;
  }
  else{
     return null;
  }
  }
  let depts = 0;
  function calculateTotalDepts(employees) {
    depts ++;
    let total = 0;
    if (depts  >= (filteredEmployees.length) ){
    employees.forEach((employee) => {
      total += parseInt(employee.depts, 10) || 0;
      debts_count =5;
    });
    return total;
  }
  else{
     return null;
  }
  }let dept = 0;
  function calculateTotalDept(employees) {
    dept ++;
    let total = 0;
    if (dept  >= (filteredEmployees.length) ){
    employees.forEach((employee) => {
      total += parseInt(employee.dept, 10) || 0;
      debt_count =5;
    });
    return total;
  }
  else{
     return null;
  }
  }let totaldebt = 0;
  function calculateTotal_totalDebt(employees) {
    totaldebt ++;
    let total = 0;
    if (totaldebt >= (filteredEmployees.length) ){
    employees.forEach((employee) => {
      total += parseInt(employee.totaldebt, 10) || 0;
      totaldebt_count =5;
      
    });
    return total;
  }
  else{
     return null;
  }
  }

  const handleDelete = (id) => {
    axios.delete("http://localhost:3000/delete2/" +id)
      .then(res => {
        Navigate('/tables')
      }).catch(err => console.log(err));
  };
  
  return (
    <div>

      {/* ************************ */}
      <input className='contain-table'
        type="text"

      />
      <div className='contain-table'>
        <table className='striped-table'>  {/**className='striped-table' */}
          <div>
            <thead > {/**className='row' */}
              <tr>
                <th className='cell' style={{ textAlign: "center" }}>م.</th>
                <th className='cell' style={{ textAlign: "center", width: '7%' }}>ID الخاص بالطالب
                  <input className='contain-table' style={{ textAlign: "center", width: '100px' }}
                    type="text"
                    placeholder="بحث"
                    value={searchQuery1}
                    onChange={handleSearch}
                  />
                </th>
                <th className='cell' style={{ textAlign: "center", width: '6%' }}>اسم الطالب
                  <input className='contain-table' style={{ textAlign: "center", width: '100px' }}
                    type="text"
                    placeholder="بحث"
                    value={searchQuery}
                    onChange={handleSearchn}
                  />
                </th>
                <th className='cell' style={{ textAlign: "center", width: '5%' }}>رقم جواز السفر
                  <input className='contain-table' style={{ textAlign: "center", width: '100px' }}
                    type="text"
                    placeholder="بحث"
                    value={searchQuery3}
                    onChange={handleSearch2}
                  />
                </th>
                <th className='cell' style={{ textAlign: "center", width: '5%' }}>الدولة الوافد منها
                  <select
                    style={{
                      width: '90px',
                      padding: '8px',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      appearance: 'none', // Hide the default button
                      backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'currentColor\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")', // Custom arrow icon
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 8px center',
                      backgroundSize: '12px',
                      paddingRight: '40px', // Add space for the arrow icon
                      color: '#333', // Text color
                      backgroundColor: 'transparent', // Background color
                    }}

                    value={stateFilter}
                    onChange={(e) => setStateFilter(e.target.value)}
                  >
                    <option value="">All</option>
                    {employeeStates.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </th>
                <th className='cell' style={{ textAlign: "center", width: '3%' }}>الفرقة
                  <select
                    style={{
                      width: '90px',
                      padding: '8px',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      appearance: 'none', // Hide the default button
                      backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'currentColor\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")', // Custom arrow icon
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 8px center',
                      backgroundSize: '12px',
                      paddingRight: '40px', // Add space for the arrow icon
                      color: '#333', // Text color
                      backgroundColor: 'transparent', // Background color
                    }}

                    value={gradeFilter}
                    onChange={(e) => setGradeFilter(e.target.value)}
                  >
                    <option value="">All</option>
                    {employeeGrades.map(grade => (
                      <option key={grade} value={grade}>{grade}</option>
                    ))}
                  </select>
                </th>
                <th className='cell' style={{ textAlign: "center", width: '5%' }}>تاريخ القيد
                  <div className='n' style={{ direction: 'rtl' }} >

                    <label htmlFor="pay2" style={{ direction: 'rtl', width: '10%' }} >من : </label>
                    <label className='n1111' htmlFor="pay3" style={{ direction: 'rtl', width: '90%' }}> إلى : </label>

                  </div>

                  <div className='pay'>
                    <input
                      type="date"
                      value={startDateFilter}
                      onChange={(e) => setStartDateFilter(e.target.value)}
                      style={{ direction: 'rtl' }}
                    />

                    <input className='pay'
                      type="date"
                      value={endDateFilter}
                      onChange={(e) => setEndDateFilter(e.target.value)}
                      style={{ direction: 'rtl' }}
                    />
                  </div>
                </th>
                <th className='cell' style={{ width: '5500px' }} >
                  <tr>
                    <th style={{ textAlign: "center" }} colspan="2">متحصلات المصروفات الدراسية</th>
                  </tr>
                  <tr>
                    <td style={{ background: '#f5e9f8' }} > دولار</td>
                    <td style={{ background: '#f5e9f8' }}> مصرى </td>
                  </tr>
                </th>



                <th className='cell' style={{ textAlign: "center", width: '5%' }}>تاريخ سداد المصروفات الدراسية
                  <div className='n' style={{ direction: 'rtl' }} >

                    <label htmlFor="pay2" style={{ direction: 'rtl', width: '10%' }} >من : </label>
                    <label className='n1111' htmlFor="pay3" style={{ direction: 'rtl', width: '90%' }}> إلى : </label>

                  </div>

                  <div className='pay'>
                    <input
                      type="date"
                      value={startDateFilter2}
                      onChange={(e) => setStartDateFilter2(e.target.value)}
                      style={{ direction: 'rtl' }}
                    />

                    <input className='pay'
                      type="date"
                      value={endDateFilter2}
                      onChange={(e) => setEndDateFilter2(e.target.value)}
                      style={{ direction: 'rtl' }}
                    />
                  </div>
                </th>


                <th className='cell' style={{ textAlign: "center", width: '5%' }}>متحصلات الخدمات ($)</th>
                <th className='cell' style={{ textAlign: "center", width: '5%' }}>متحصلات الكتب  ($) </th>

                <th className='cell' style={{ width: '5500px' }} >
                  <tr>
                    <th style={{ textAlign: "center" }} colspan="2">  مديونيات المصروفات الدراسية    </th>
                  </tr>
                  <tr>
                    <td style={{ background: '#f5e9f8' }} > دولار</td>
                    <td style={{ background: '#f5e9f8' }}> مصرى </td>
                  </tr>
                </th>
                <th className='cell' style={{ textAlign: "center", width: '9%' }}>مديونيات مصرى  </th>
                <th className='cell' style={{ textAlign: "center", width: '9%' }}>حالة الطالب
                  <select
                    style={{
                      width: '90px',
                      padding: '8px',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      appearance: 'none', // Hide the default button
                      backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'currentColor\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")', // Custom arrow icon
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 8px center',
                      backgroundSize: '12px',
                      paddingRight: '40px', // Add space for the arrow icon
                      color: '#333', // Text color
                      backgroundColor: 'transparent', // Background color
                    }}

                    value={optionFilter}
                    onChange={(e) => setOptionFilter(e.target.value)}
                  >
                    <option value="">All</option>
                    {employeeOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </th>
                <th className='cell' style={{ textAlign: "center", width: '6%' }}>رقم التليفون
                  <input className='contain-table' style={{ textAlign: "center", width: '100px' }}
                    type="text"
                    placeholder="بحث"
                    value={searchQuery2}
                    onChange={handleSearch1}
                  />
                </th>

                <th className='cell' style={{ textAlign: "center", width: '5%' }}>ملاحظات</th>
                <th className='cell' style={{ textAlign: "center", width: '10%' }}>اضغط</th>



              </tr>
            </thead>

            <tbody className='tbody'>
              {filteredEmployees&& filteredEmployees.length > 0 ? (

                filteredEmployees.map((employee, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{employee.ID}</td>
                    <td>{employee.firstName}</td>
                    <td>{employee.pass} </td>
                    <td>{employee.state}</td>
                    <td>{employee.grade} </td>
                    <td>{employee.date1} </td>

                    <td>
                      <tr>
                        <td style={{ textAlign: "center", width: '75px', height: 100 }}> {employee.pay}</td>
                        <td style={{ textAlign: "center", width: '75px', height: 100 }} >  {employee.pay1}</td>
                      </tr>
                      <tr colSpan={27}>

                        {calculateTotalPay(filteredEmployees) !== null && pay_count === 5 && (
                          <td className="total" style={{ border: "2px solid #75ebeb" }}>{calculateTotalPay(filteredEmployees)}</td>
                        )}{calculateTotalPay1(filteredEmployees) !== null && pay1_count === 5 && (
                          <td className="total" style={{ border: "2px solid #75ebeb" }}>{calculateTotalPay1(filteredEmployees)}</td>
                        )}
                      </tr>
                    </td>

                    <td>{employee.date2} </td>
                    
                      <td style={{ width: '90px', height: 100 }}>{employee.sertotal} </td>
                     

                    
                    <td>
                      <td style={{ width: '90px', height: 100 }}>{employee.book}</td>

                      {calculateTotalBook(filteredEmployees) !== null && book_count === 5 && (
                        <tr colSpan={27}>
                          <td className="total" style={{ border: "2px solid #75ebeb" }}>{calculateTotalBook(filteredEmployees)}</td>
                        </tr>
                      )}

                    </td>

                    <td>
                      <tr>
                        <td style={{ textAlign: "center", width: '75px', height: 100 }}> {employee.debts}</td>
                        <td style={{ textAlign: "center", width: '75px', height: 100 }} >  {employee.debt}</td>
                      </tr>
                      <tr colSpan={27}>
                        {calculateTotalDepts(filteredEmployees) !== null && debts_count === 5 && (
                          <td className="total" style={{ border: "2px solid #75ebeb" }}>{calculateTotalDepts(filteredEmployees)}</td>
                        )}
                        {calculateTotalDept(filteredEmployees) !== null && debt_count === 5 && (
                          <td className="total" style={{ border: "2px solid #75ebeb" }}>{calculateTotalDept(filteredEmployees)}</td>
                        )}

                      </tr>

                    </td>
                    <td>
                      <td style={{ textAlign: "center", width: '75px', height: 100 }}>{employee.totaldebt} </td>
                      {calculateTotal_totalDebt(filteredEmployees) !== null && totaldebt_count === 5 && (
                        <tr colSpan={27}>
                          <td className="total" style={{ border: "2px solid #75ebeb" }}>{calculateTotal_totalDebt(filteredEmployees)}</td>
                        </tr>
                      )}
                    </td>
                    <td>{employee.option} </td>
                    <td>{employee.telephone} </td>
                    <td>{employee.notes} </td>



                    <td>
                      <tr className='c'>
                        <td className="text-right">
                          <Link to={`/search2/${employee.pass}`}>
                           
                          <button   className='round-button'>
                                                    تعديل
                                                </button>
                            
                          </Link>
                          
                        </td>
                        <td className="text-left">

                          <button onClick={() => handleDelete(employee.pass)} className='round-button'>
                            حذف
                          </button>


                        </td>

                      </tr>
                    </td>
                  </tr>
                ))

              ) : (
                <tr>
                  <td colSpan={27}>لا يوجد أى طالب بهذه البيانات</td>
                </tr>
              )}
            </tbody>  </div>



        </table>

      </div>  </div>


  );
}

export default List2;
