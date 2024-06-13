import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { employeesData } from '../../data';
import { Navigate, useNavigate } from 'react-router-dom';
let service1_count =0;
let service2_count =0;
let service3_count =0;
function List3({ employees}) {

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
    const [searchQuery, setSearchQuery] = useState('');
    const [passFilter, setPassFilter] = useState('');
    const [startDateFilter, setStartDateFilter] = useState('');
    const [endDateFilter, setEndDateFilter] = useState('');
    const [startSer1DateFilter, setStartSer1DateFilter] = useState('');
    const [endSer1DateFilter, setEndSer1DateFilter] = useState('');

    const [startSer2DateFilter, setStartSer2DateFilter] = useState('');
    const [endSer2DateFilter, setEndSer2DateFilter] = useState('');

    const [startSer3DateFilter, setStartSer3DateFilter] = useState('');
    const [endSer3DateFilter, setEndSer3DateFilter] = useState('');
    const [execuseFilter, setExecuseFilter] = useState('');
    const [employeeExecuses, setEmployeeExecuses] = useState([]);
    useEffect(() => {
      const uniqueExecuse = [...new Set(employees.map(employee => employee.execuse))];
        setEmployeeExecuses(uniqueExecuse); 
        axios.get("http://localhost:3000/auth/tableview1")
        .then(res => {
          setView(res.data);
          setFilteredData(res.data);
        })
        .catch(err => console.log(err));

      }, [employees]);

      const filteredEmployees = employees.filter((employee) => {

        const employeeDate = parseDate(employee.date1);
        const employeeDate2 = parseDate(employee.date2);
        const employeeBookDate = parseDate(employee.dateBook);
        const employeeSer1Date = parseDate(employee.dateSer1);
        const employeeSer2Date = parseDate(employee.dateSer2);
        const employeeSer3Date = parseDate(employee.dateSer3);
        const employeeExecuse = employee.execuse;
        const fullName = `${employee.firstName}`.toLowerCase();
        const telephone =`${employee.telephone}`;
        const pass =`${employee.pass}`;
        const full = `${employee.firstName}`.toLowerCase()&& `${employee.telephone}`&&`${employee.pass}`;
        // Check if the student's date falls within the selected interval
        const startDate = parseDate(startDateFilter);
        const endDate = parseDate(endDateFilter);
        const isInInterval =
          (startDateFilter === '' || employeeDate >= startDate) &&
          (endDateFilter === '' || employeeDate <= new Date(endDate.getTime() +16400000));
          // Check if the student's date falls within the selected interval
const startSer1Date = parseDate(startSer1DateFilter);
const endSer1Date = parseDate(endSer1DateFilter);
const isInInterval4 =
  (startSer1DateFilter === '' || employeeSer1Date>= startSer1Date) &&
  (endSer1DateFilter === '' || employeeSer1Date <= new Date(endSer1Date.getTime() + 16400000));

  // Check if the student's date falls within the selected interval
const startSer2Date = parseDate(startSer2DateFilter);
const endSer2Date = parseDate(endSer2DateFilter);
const isInInterval5 =
  (startSer2DateFilter === '' || employeeSer2Date>= startSer2Date) &&
  (endSer2DateFilter === '' || employeeSer2Date <= new Date(endSer2Date.getTime() + 16400000));

  // Check if the student's date falls within the selected interval
const startSer3Date = parseDate(startSer3DateFilter);
const endSer3Date = parseDate(endSer3DateFilter);
const isInInterval6 =
  (startSer3DateFilter === '' || employeeSer3Date>= startSer3Date) &&
  (endSer3DateFilter === '' || employeeSer3Date <= new Date(endSer3Date.getTime() + 16400000));

  

// Function to parse date strings in the format 'yy-mm-dd'
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
    telephone.includes(searchQuery2) &&
    pass.includes(searchQuery1) &&
    full.includes(searchQuery3) &&
    (execuseFilter === '' || employeeExecuse.includes(execuseFilter))&&
    isInInterval &&isInInterval4 &&  isInInterval5 && isInInterval6
    // Add similar conditions for other columns
);
});
const handleSearch = (e) => {
    const query = e.target.value;
    
    setSearchQuery(query);
  
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
        item.pay2.toLowerCase().includes(query.toLowerCase())||
        item.pay3.toLowerCase().includes(query.toLowerCase())||
        item.option.toLowerCase().includes(query.toLowerCase())||
        item.address.toLowerCase().includes(query.toLowerCase())||
        item.telephone.toLowerCase().includes(query.toLowerCase())||
        item.book.toLowerCase().includes(query.toLowerCase())||
        item.dateBook.toLowerCase().includes(query.toLowerCase())||
        item.notes.toLowerCase().includes(query.toLowerCase())||
        item.service1.toLowerCase().includes(query.toLowerCase())||
        item.service2.toLowerCase().includes(query.toLowerCase())||
        item.service3.toLowerCase().includes(query.toLowerCase())||
        item.dateSer1.toLowerCase().includes(query.toLowerCase())||
        item.dateSer2.toLowerCase().includes(query.toLowerCase())||
        item.dateSer3.toLowerCase().includes(query.toLowerCase())||
        item.debt.toLowerCase().includes(query.toLowerCase())||
        item.debts.toLowerCase().includes(query.toLowerCase())||
        item.totaldebt.toLowerCase().includes(query.toLowerCase())||
        item.sertotal.toLowerCase().includes(query.toLowerCase())||
        item.image.toLowerCase().includes(query.toLowerCase())||
        item.execuse.includes(query.toLowerCase())||
        item.payyys.includes(query.toLowerCase())
      
      );
    });
  
    setFilteredData(filtered);
  };
  const handleSearch1 = (e) => {
    const query1 = e.target.value;
    setSearchQuery1(query1);
  
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
              item.image.toLowerCase().includes(query1.toLowerCase())||
              item.execuse.includes(query1.toLowerCase())||
              item.payyys.includes(query1.toLowerCase())
       
      );
    });
  
    setFilteredData(filtered);
  };

  const handleSearch2 = (e) => {
    const query2 = e.target.value;
    setSearchQuery2(query2);
  
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
        item.image.toLowerCase().includes(query2.toLowerCase())||
        item.execuse.includes(query2.toLowerCase())||
        item.payyys.includes(query2.toLowerCase())
       
      );
    });
  
    setFilteredData(filtered);
  };
  
  let service1 = 0;
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


  function generatePDF(tableData) {
    const fonts = {
      Roboto: {
        normal: 'node_modules/pdfmake/build/vfs_fonts.js',
        bold: 'node_modules/pdfmake/build/vfs_fonts.js',
        italics: 'node_modules/pdfmake/build/vfs_fonts.js',
        bolditalics: 'node_modules/pdfmake/build/vfs_fonts.js',
      },
    };
  
    const printer = new PdfPrinter(fonts);
  
    const docDefinition = {
      content: [
        {
          table: {
            headerRows: 1,
            widths: ['auto', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
            body: tableData,
          },
        },
      ],
    };
  
    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(fs.createWriteStream('output.pdf'));
    pdfDoc.end();
  }

  const handleExtractPDF = () => {
    const tableData = []; // Populate tableData with the necessary data for the PDF table

    // Call the function to generate the PDF
    generatePDF(tableData);
  };


  const handleDelete = (id) => {
    axios.delete("http://localhost:3000/delete3/" + id)
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
                <button onClick={handleExtractPDF}>Extract as PDF</button>
             

            {/* ************************ */}

        <div className='contain-table'>
            <table className='striped-table'>  {/**className='striped-table' */}
            <div> 
                <thead > {/**className='row' */}
                    <tr>
                        <th className='cell' style={{textAlign:"center"}}>م.</th>
                        <th className='cell' style={{textAlign:"center" , width: '6%'}}>اسم الطالب
                        <input className='contain-table' style={{textAlign:"center" , width: '100px'}}
                  type="text"
                  placeholder="بحث"
                  value={searchQuery}
                  onChange={handleSearch}
                />
                        </th>
                        <th className='cell' style={{textAlign:"center" , width: '5%'}}>رقم جواز السفر
                        <input className='contain-table' style={{textAlign:"center" , width: '100px'}}
                  type="text"
                  placeholder="بحث"
                  value={searchQuery1}
                  onChange={handleSearch1}
                />
                        </th>
                        <th className='cell' style={{textAlign:"center" , width:'5%' }}>تاريخ القيد
                        <div className='n' style={{ direction: 'rtl' }} >

<label htmlFor="pay2"  style={{ direction: 'rtl' }} >من : </label>
<label className='n1111' htmlFor="pay3"  style={{ direction: 'rtl' }}> إلى : </label>

</div>

<div className='pay'>
<input
type="date"
value={startDateFilter}
onChange={(e) => setStartDateFilter(e.target.value)}
style={{ direction: 'rtl'}}
/>

<input className='pay'
type="date"
value={endDateFilter}
onChange={(e) => setEndDateFilter(e.target.value)}
style={{ direction: 'rtl'}}
/>
</div>
                        </th>
                        

                        <th className='cell' style={{width:'50000px'}}> <tr>   
                            <th style={{textAlign:"center", width:'500px'}} colspan="3">  خدمات  </th>
                        </tr>
                        <tr>
                            <th> عذر</th>
                            <th> كشف طبى </th>
                            <th>  إفادة </th>
                        </tr>
                        </th>

                        
                         
                        <th  className='cell' style={{width:'50000px'}}> <tr>   
                            <th style={{textAlign:"center" , width:'500px'}} colspan="3">  تاريخ سدادها  </th>
                        </tr>
                        <tr>
                            <td style={{background: '#f5e9f8' }}> عذر
 </td>
                            <td style={{background: '#f5e9f8' }}> كشف طبى 

                            </td>
                            <td style={{background: '#f5e9f8' }}>  إفادة 
                         
                    </td>
                        </tr>
                        </th>

                        <th className='cell' style={{textAlign:"center" , width:'5%' }}>عذر عن 
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
                        
  value={execuseFilter}
  onChange={(e) => setExecuseFilter(e.target.value)}
>
  <option  value="">All</option>
  {employeeExecuses.map(execuse => (
    <option key={execuse} value={execuse}>{execuse}</option>
  ))}
</select>
                        </th>

                        <th  className='cell' style={{width:'50000px'}}> <tr>   
                            <th style={{textAlign:"center" , width:'500px'}} colspan="3">  صور   </th>
                        </tr>
                        <tr>
                            <td style={{background: '#f5e9f8' }}> عذر</td>
                            <td style={{background: '#f5e9f8' }}> كشف طبى </td>
                            <td style={{background: '#f5e9f8' }}>  إفادة </td>
                        </tr>
                        </th>

                        <th className='cell' style={{textAlign:"center", width: '5%'}}>ملاحظات</th>
                       <th className='cell' style={{textAlign:"center" , width: '10%' }}>اضغط</th>   
                       
                     

                    </tr>
                </thead>

                <tbody className='tbody'>
               
                {filteredEmployees && filteredEmployees.length > 0 ? (

filteredEmployees.map((employee, index) => (
    <tr key={index}>
        <td>{index + 1}</td>
                           
                                <td>{employee.firstName}</td>  
                                <td>{employee.pass} </td>
                                <td>{employee.date1} </td>
                                <td>
                               <tr>
                                  <td style={{textAlign:"center" , width:'75px' ,height:100}}>{employee.service1} </td>
                                  <td style={{textAlign:"center" , width:'75px' ,height:100}}>{employee.service2} </td>
                                  <td style={{textAlign:"center" , width:'75px' ,height:100}}>{employee.service3} </td>  
                               </tr>
                               <tr colSpan={27}>
          {calculateTotalService1(filteredEmployees) !== null && service1_count===5 && (
          <td className="total" style={{border: "2px solid #75ebeb"}}>{calculateTotalService1(filteredEmployees)}</td>
          )}
           {calculateTotalService2(filteredEmployees) !== null && service2_count===5 && (
          <td className="total" style={{border: "2px solid #75ebeb"}}>{calculateTotalService1(filteredEmployees)}</td>
           )}
          {calculateTotalService3(filteredEmployees) !== null && service3_count===5 && (
          <td className="total" style={{border: "2px solid #75ebeb"}}>{calculateTotalService3(filteredEmployees)}</td>
          )}
          </tr>
                            </td>
                            <td>
                                <tr>
                                    <td style={{textAlign:"center" , width: '330px', height: '100%'}}>{employee.dateSer1} </td>
                                    <td style={{textAlign:"center" , width: '410px', height: '100%'}}>{employee.dateSer2} </td>
                                    <td style={{textAlign:"center" , width: '280px', height:'100%' }}>{employee.dateSer3} </td>
                                </tr>
                            </td>
                            <td>{employee.execuse}</td>
                            <td>
                              <tr>
                                <td>
                                  <img src={employee.image1} alt="عذر" />
                                </td>

                                <td>
                                  <img src={employee.image2} alt="كشف طبى" />
                                </td>

                                <td>
                                  <img src={employee.image3} alt="إفادة" />
                                </td>

                              </tr>
                            </td>

                            
                                <td>{employee.notes} </td>

  
                           <td>
                            <tr className='c'> 
                                <td className="text-right">
                                <Link to={`/search3/${employee.pass}`}>
                                                <button   className='round-button'>
                                                    تعديل
                                                </button>
                                </Link>
                                </td>

                                <td className="text-left">
                              
                              <button onClick={() => handleDelete(employee.pass)}className='round-button'>
                                                  حذف
                                              </button>
                                             

                              </td>

                            </tr> 
                            </td>
                        </tr>
                         ))
                         
                       )   : (
                        <tr>
                             <td colSpan={27}>لا يوجد أى طالب بهذه البيانات</td>
                        </tr>

                      
                    ) 
                    
                     }
                </tbody>  </div>            


            </table>

        </div>  </div>
    );
}

export default List3;
