import { employeesData } from '../../data';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
let book_count =0;
let service1_count =0;
let service2_count =0;
let service3_count =0;
let pay_count=0;
let pay1_count=0;
let pay2_count=0;
let pay3_count=0;
function List({ employees }) {
 
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: null
    });
    

    
    const [view, setView] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery1, setSearchQuery1] = useState('');
    const [searchQuery2, setSearchQuery2] = useState('');
    const [searchQuery3, setSearchQuery3] = useState('');
    const [searchQuery4, setSearchQuery4] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
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
    const [startBookDateFilter, setStartBookDateFilter] = useState('');
    const [endBookDateFilter, setEndBookDateFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [type1Filter, setType1Filter] = useState('');
    const [discountFilter, setDiscountFilter] = useState('');
    const [optionFilter, setOptionFilter] = useState('');
    const [addressFilter, setAdressFilter] = useState('');
    const [payyys, setPayyys] = useState('');
    const [treat, setTreatype] = useState('');
    const [PayType, setPayType] =useState('');

    const [employeeNames, setEmployeeNames] = useState([]);
    const [employeeGenders, setEmployeeGenders] = useState([]);
    const [employeeStates, setEmployeeStates] = useState([]);
    const [employeeGrades, setEmployeeGrades] = useState([]);
    const [employeePasses, setEmployeePasses] = useState([]);
    const [employeeMajors, setEmployeeMajors] = useState([]);
    const [employeePayTypes, setEmployeePayTypes] = useState([]);
    const [employeeTreats, setEmployeeTreatTypes] = useState([]);
    const [employeeTypes, setEmployeeTypes] = useState([]);
    const [employeeTypes1, setEmployeeTypes1] = useState([]);
    const [employeeDiscounts, setEmployeeDiscounts] = useState([]);
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
        const uniqueTypes1 = [...new Set(employees.map(employee => employee.Type1))];
        setEmployeeTypes1(uniqueTypes1);
        
        

        const uniqueTypes = [...new Set(employees.map(employee => employee.type))];
        setEmployeeTypes(uniqueTypes);
        const uniqueDiscounts= [...new Set(employees.map(employee => employee.discount))];
        setEmployeeDiscounts(uniqueDiscounts);
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
        const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
        const telephone =`${employee.telephone}`;
        const id =`${employee.ID}`;
        const email =`${employee.email}`;
        const pass =`${employee.pass}`;
        const employeeState = employee.state;
        const employeeGender = employee.gender;
        const employeeGrade = employee.grade;
        const employeePass = employee.pass;
        const employeeMajor = employee.major;

        const employeeType1 = employee.Type1;
        const employeeEmail = employee.email;
        const employeeType = employee.type;
        const employeeDiscount = employee.discount;
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

// Check if the student's date falls within the selected interval
const startBookDate = parseDate(startBookDateFilter);
const endBookDate = parseDate(endBookDateFilter);
const isInInterval3 =
  (startBookDateFilter === '' || employeeBookDate>= startBookDate) &&
  (endBookDateFilter === '' || employeeBookDate <= new Date(endBookDate.getTime() + 16400000));

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
              email.includes(searchQuery3) &&
              pass.includes(searchQuery4) &&
              (nameFilter === '' || fullName.includes(nameFilter.toLowerCase())) &&
              (stateFilter === '' || employeeState.includes(stateFilter.toLowerCase())) &&
              (genderFilter === '' || employeeGender.includes(genderFilter))&&
              (gradeFilter === '' || employeeGrade.includes(gradeFilter))&&
              (passFilter === '' || employeePass.includes(passFilter))&&
              (majorFilter === '' || employeeMajor.includes(majorFilter))&&
              (type1Filter === '' || employeeType1.includes(type1Filter))&&
              (typeFilter === '' || employeeType.includes(typeFilter))&&
              (discountFilter === '' || employeeDiscount.includes(discountFilter))&&
              (optionFilter === '' || employeeOption.includes(optionFilter))&&
              (addressFilter === '' || employeeAdress.includes(addressFilter))&&
  
              isInInterval &&  isInInterval2 && isInInterval3
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
              item.service1.toLowerCase().includes(query1.toLowerCase())||
              item.service2.toLowerCase().includes(query1.toLowerCase())||
              item.service3.toLowerCase().includes(query1.toLowerCase())||
              item.dateSer1.toLowerCase().includes(query1.toLowerCase())||
              item.dateSer2.toLowerCase().includes(query1.toLowerCase())||
              item.dateSer3.toLowerCase().includes(query1.toLowerCase())||
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

        const handleSearch4 = (e) => {
          const query4 = e.target.value;
          setSearchQuery4(query4);
        
          const filtered = view.filter(item => {
            // Customize the conditions based on your filtering requirements
            return (
              item.firstName.toLowerCase().includes(query4.toLowerCase()) ||
              item.state.toLowerCase().includes(query4.toLowerCase()) ||
              item.ID.toLowerCase().includes(query4.toLowerCase()) ||
              item.pass.toLowerCase().includes(query4.toLowerCase()) ||
              item.email.toLowerCase().includes(query4.toLowerCase()) ||
              item.gender.toLowerCase().includes(query4.toLowerCase()) ||
              item.grade.toLowerCase().includes(query4.toLowerCase()) ||
              item.major.toLowerCase().includes(query4.toLowerCase()) ||
              item.date1.toLowerCase().includes(query4.toLowerCase()) ||
              item.Type1.toLowerCase().includes(query4.toLowerCase()) ||
              item.type.toLowerCase().includes(query4.toLowerCase())||
              item.discount.toLowerCase().includes(query4.toLowerCase()) ||
              item.pay.toLowerCase().includes(query4.toLowerCase())||
              item.pay1.toLowerCase().includes(query4.toLowerCase())||
              item.date2.toLowerCase().includes(query4.toLowerCase())||
              item.pay2.toLowerCase().includes(query4.toLowerCase())||
              item.pay3.toLowerCase().includes(query4.toLowerCase())||
              item.option.toLowerCase().includes(query4.toLowerCase())||
              item.address.toLowerCase().includes(query4.toLowerCase())||
              item.telephone.toLowerCase().includes(query4.toLowerCase())||
              item.book.toLowerCase().includes(query4.toLowerCase())||
              item.dateBook.toLowerCase().includes(query4.toLowerCase())||
              item.notes.toLowerCase().includes(query4.toLowerCase())||
              item.service1.toLowerCase().includes(query4.toLowerCase())||
              item.service2.toLowerCase().includes(query4.toLowerCase())||
              item.service3.toLowerCase().includes(query4.toLowerCase())||
              item.dateSer1.toLowerCase().includes(query4.toLowerCase())||
              item.dateSer2.toLowerCase().includes(query4.toLowerCase())||
              item.dateSer3.toLowerCase().includes(query4.toLowerCase())||
              item.debt.toLowerCase().includes(query4.toLowerCase())||
              item.debts.toLowerCase().includes(query4.toLowerCase())||
              item.totaldebt.toLowerCase().includes(query4.toLowerCase())||
              item.sertotal.toLowerCase().includes(query4.toLowerCase())||
              item.execuse.includes(query4.toLowerCase())||
              item.payyys.includes(query4.toLowerCase())
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
              item.service1.toLowerCase().includes(query2.toLowerCase())||
              item.service2.toLowerCase().includes(query2.toLowerCase())||
              item.service3.toLowerCase().includes(query2.toLowerCase())||
              item.dateSer1.toLowerCase().includes(query2.toLowerCase())||
              item.dateSer2.toLowerCase().includes(query2.toLowerCase())||
              item.dateSer3.toLowerCase().includes(query2.toLowerCase())||
              item.debt.toLowerCase().includes(query2.toLowerCase())||
              item.debts.toLowerCase().includes(query2.toLowerCase())||
              item.totaldebt.toLowerCase().includes(query2.toLowerCase())||
              item.sertotal.toLowerCase().includes(query2.toLowerCase())||
              item.execuse.includes(query2.toLowerCase())||
              item.payyys.includes(query2.toLowerCase())
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
  }let callCount2 = 0;
  function calculateTotalPay2(employees) {
    callCount2++;
    let total = 0;
    if (callCount >= (filteredEmployees.length)){
    employees.forEach((employee) => {
      total += parseInt(employee.pay2, 10) || 0;
      pay2_count=5;
     
    });
    return total;
  }
  else{
     return null;
  }
  }let callCount3 = 0;
  function calculateTotalPay3(employees) {
    callCount3++;
    let total = 0;
    if (callCount >= (filteredEmployees.length) ){
    employees.forEach((employee) => {
      total += parseInt(employee.pay3, 10) || 0;
      pay3_count=5;
     
    });
    return total;
  }
  else{
     return null;
  }
  }let service1 = 0;
  function calculateTotalService1(employees) {
    service1 ++;
    let total = 0;
    if (service1  >= (filteredEmployees.length) ){
    employees.forEach((employee) => {
      total += parseInt(employee.service1, 10) || 0;
      service1_count =5;
    });
    return total;
  }
  else{
     return null;
  }
  }let service2 = 0;
  function calculateTotalService2(employees) {
    service2 ++;
    let total = 0;
    if (service2  >= (filteredEmployees.length) ){
    employees.forEach((employee) => {
      total += parseInt(employee.service2, 10) || 0;
      service2_count =5;
    });
    return total;
  }
  else{
     return null;
  }
  }let service3 = 0;
  function calculateTotalService3(employees) {
    service3 ++;
    let total = 0;
    if (service3  >= (filteredEmployees.length) ){
    employees.forEach((employee) => {
      total += parseInt(employee.service3, 10) || 0;
      service3_count =5;
      
    });
    return total;
  }
  else{
     return null;
  }
  }
  let  book = 0;
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
  const handleDelete = (id) => {
    axios.delete("http://localhost:3000/delete1/" + id)
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
                {/*     <th className='cell' style={{textAlign:"center" , width: '5%'}}>رقم جواز السفر
                <input className='contain-table' style={{textAlign:"center" , width: '100px'}}
          type="text"
          placeholder="بحث"
          value={searchQuery4}
          onChange={handleSearch4}
        />
                </th>
                */}
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
                <th className='cell' style={{ textAlign: "center", width: '4%' }}>الرسوم </th>
                <th className='cell' style={{ textAlign: "center", width: '4%' }}>نوع النفقة
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

                    value={type1Filter}
                    onChange={(e) => setType1Filter(e.target.value)}
                  >
                    <option value="">All</option>
                    {employeeTypes1.map(type1 => (
                      <option key={type1} value={type1}>{type1}</option>
                    ))}
                  </select>
                </th>
                <th className='cell' style={{ textAlign: "center", width: '4%' }}>نوع المعاملة
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

                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                  >
                    <option value="">All</option>
                    {employeeTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </th>
                <th className='cell' style={{ textAlign: "center", width: '4%' }}>نسبة التخفيض
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

                    value={discountFilter}
                    onChange={(e) => setDiscountFilter(e.target.value)}
                  >
                    <option value="">All</option>
                    {employeeDiscounts.map(discount => (
                      <option key={discount} value={discount}>{discount}</option>
                    ))}
                  </select>
                </th>
                <th className='cell' style={{ width: '5500px' }} >
                  <tr>
                    <th style={{ textAlign: "center" }} colspan="2">  المصروفات المدفوعة هذا العام  </th>
                  </tr>
                  <tr>
                    <td style={{ background: '#f5e9f8' }} > دولار</td>
                    <td style={{ background: '#f5e9f8' }}> مصرى </td>
                  </tr>
                </th>



                <th className='cell' style={{ textAlign: "center", width: '5%' }}>تاريخ سداد العملة
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

                <th className='cell'><tr>
                  <th style={{ textAlign: "center" }} colspan="2">  المصروفات المتبقية </th>
                </tr>
                  <tr>
                    <th > دولار</th>
                    <th > مصرى </th>
                  </tr>
                </th>


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

                <th className='cell' style={{ textAlign: "center", width: '5%' }}>رسم الكتاب الجامعى </th>
                <th className='cell' style={{ textAlign: "center", width: '5%' }}>تاريخ سداد الكتاب الجامعى
                  <div className='n' style={{ direction: 'rtl' }} >

                    <label htmlFor="pay2" style={{ direction: 'rtl', width: '10%' }} >من : </label>
                    <label className='n1111' htmlFor="pay3" style={{ direction: 'rtl', width: '90%' }}> إلى : </label>

                  </div>

                  <div className='pay'>
                    <input
                      type="date"
                      value={startBookDateFilter}
                      onChange={(e) => setStartBookDateFilter(e.target.value)}
                      style={{ direction: 'rtl' }}
                    />

                    <input className='pay'
                      type="date"
                      value={endBookDateFilter}
                      onChange={(e) => setEndBookDateFilter(e.target.value)}
                      style={{ direction: 'rtl' }}
                    />
                  </div>
                </th>
                <th className='cell' style={{ textAlign: "center", width: '5%' }}>ملاحظات</th>
                <th className='cell' style={{ textAlign: "center", width: '10%' }}>اضغط</th>



              </tr>
            </thead>

            <tbody className='tbody'>
              {filteredEmployees && filteredEmployees.length > 0 ? (

                filteredEmployees.map((employee, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{employee.ID} </td>
                    <td>{employee.firstName}</td>
                    <td>{employee.state}</td>
                    {/*   <td>{employee.pass} </td>  */}
                    <td>{employee.grade} </td>
                    <td>{employee.date1} </td>
                    <td>{employee.payyys} </td>

                    <td>{employee.Type1} </td>
                    <td>{employee.type} </td>
                    <td>{employee.discount} </td>

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

                    <td>
                      <tr >
                        <td style={{ textAlign: "center", width: '75px', height: 100 }}> {employee.pay2}</td>

                        <td style={{ textAlign: "center", width: '75px', height: 100 }} >  {employee.pay3}</td>

                      </tr>
                      <tr colSpan={27}>
                        {calculateTotalPay2(filteredEmployees) !== null && pay2_count === 5 && (
                          <td className="total" style={{ border: "2px solid #75ebeb" }}>{calculateTotalPay2(filteredEmployees)}</td>
                        )}{calculateTotalPay3(filteredEmployees) !== null && pay3_count === 5 && (
                          <td className="total" style={{ border: "2px solid #75ebeb" }}>{calculateTotalPay3(filteredEmployees)}</td>
                        )}
                      </tr>
                    </td>
                    <td>{employee.option} </td>
                    <td>
                      <td style={{ width: '90px', height: 100 }}>{employee.book}</td>

                      {calculateTotalBook(filteredEmployees) !== null && book_count === 5 && (
                        <tr colSpan={27}>
                          <td className="total" style={{ border: "2px solid #75ebeb" }}>{calculateTotalBook(filteredEmployees)}</td>
                        </tr>
                      )}

                    </td>
                    <td>{employee.dateBook} </td>
                    <td>{employee.notes} </td>


                    {/**  <td>{employee.email}</td>    */}
                    {/**  <td>{formatter.format(employee.salary)}</td>   */}

                    <td>
                      <tr className='c'>
                        <td className="text-right">
                          {/*   <button
                                onClick={() => handleEdit(employee.id)}
                                className="button muted-button"
                            >
                                تعديل
                            </button>  */}

                          <Link className='round-button' to={`/search1/${employee.ID}`}>


                          <button   className='round-button'>
                                                    تعديل
                                                </button>

                          </Link>

                        </td>

                        <td className="text-left">

                          <button onClick={() => handleDelete(employee.ID)} className='round-button'>
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


      </div > </div >
  );
}

export default List;
