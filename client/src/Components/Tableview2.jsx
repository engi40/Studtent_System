import React,{useEffect} from "react";
import axios from 'axios'
import{useState} from "react";
import * as XLSX from 'xlsx';
import { readFile } from 'xlsx';
import { Navigate, useNavigate } from 'react-router-dom';

const Tableview2 = () => {
    const[view,setView]=useState([])
    const[sheetData,setSheetData]=useState(null);
    useEffect(()=>{
        axios.get("http://localhost:3000/tableview2")
          .then(res => setView(res.data))
          .catch(err =>console.log(err));
      },[]);
      
      useEffect(() => {
        fetchData();
      }, []);
      
      const fetchData = async () => {
        try {
          const response = await axios.get("http://localhost:3000/tableview2");
          setView(response.data);
        } catch (error) {
          console.error('Error fetching data:', error.message);
        }
      };
      const handleExportToExcel = () => {
        // Create a new workbook and add a worksheet
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(view);
      
        // Add the worksheet to the workbook
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      
        // Save the workbook to a file
        XLSX.writeFile(wb, 'exported_data.xlsx');
      };
  return (
    <div class="container py-5">
    <header class="text-center text-white">
      <h1 class="display-4">Bootstrap Datatables</h1>
      <p class="lead mb-0">Using Bootstrap 4 and <a href="https://datatables.net/examples/styling/bootstrap4.html" class="text-white font-italic">
          <u>Datatables</u></a>, add interaction controlsto your HTML tables.</p>
      <p class="font-italic">Snippet By
        <a href="https://bootstrapious.com" class="text-white">
          <u>Bootstrapious</u>
        </a>
      </p>
    </header>
    <div class="row py-5">
      <div class="col-lg-10 mx-auto">
        <div class="card rounded shadow border-0">
          <div class="card-body p-5 bg-white rounded">
            <div class="table-responsive">

                <button className="btn btn-success" onClick={handleExportToExcel}>Excel </button>
              <table id="example" style={{ width:'100%'}} className="table table-striped table-bordered">
                <thead >
                  <tr>
                    <th dir="rtl">StudentId</th>
                    <th>StudentName</th>
                    <th>CountryOfOrigin</th>
                    <th>PassportNumber</th>
                    <th>PaidDollarsExpenses</th>
                    <th>PaidEgyptianExpenses</th>
                    <th>CurrencyRepaymentDate</th>
                    <th>Affidavit</th>
                    <th>StatementPaymentDate</th>
                    <th>MedicalExamination</th>
                    <th>MedicalExaminationPaymentDate</th>
                    <th>Excuse</th>
                    <th>ExcusePaymentDate</th>
                    <th>BookFeeDollars</th>
                    <th>UniversityBookPaymentDate</th>
                    <th>Reviews</th>
                    <th>Gender</th>
                    <th>AcademicYear</th>
                    <th>Specialization – Department</th>      
                    <th>RegistrationDate</th>  
                    <th>TransactionType</th>  
                    <th>ReductionPercentage</th>       
                    <th>ResidualDollarsExpenses</th>   
                    <th>RemainingEgyptianExpenses</th>   
                    <th>AdapterFrom - PostponingConstraint - StopConstraint	</th>   
                    <th>StudentAddress</th>    
                    <th>PhoneNumber</th>    
                    <th>الاجراء</th>       
                    </tr>
                </thead>
                <tbody>
                    {
                        view.map((data, i)=>(
                           <tr key={i}>  
                           <td>{data.StudentId}</td>
                           <td>{data.StudentName}</td>
                           <td>{data.CountryOfOrigin}</td>
                           <td>{data.PassportNumber}</td>
                           <td>{data.PaidDollarsExpenses}</td>
                           <td>{data.PaidEgyptianExpenses}</td>
                           <td>{data.CurrencyRepaymentDate}</td>
                           <td>{data.Affidavit}</td>
                          
                           <td>{data.StatementPaymentDate}</td>
                           <td>{data.MedicalExamination}</td>
                           <td>{data.MedicalExaminationPaymentDate}</td>
                           <td>{data.Excuse}</td>
                           <td>{data.ExcusePaymentDate}</td>
                           <td>{data.BookFeeDollars}</td>
                           <td>{data.UniversityBookPaymentDate}</td>
                           <td>{data.Reviews}</td>
                           <td>{data.Gender}</td>
                           <td>{data.AcademicYear}</td>
                           <td>{data.SpecializationDepartment}</td>
                           <td>{data.RegistrationDate}</td>
                           <td>{data.TransactionType}</td>
                           <td>{data.ReductionPercentage}</td>
                           <td>{data.ResidualDollarsExpenses}</td>
                           <td>{data.RemainingEgyptianExpenses}</td>
                           <td>{data.AdapterFromPostponingConstraintStopConstraint}</td>
                           <td>{data.StudentAddress}</td>
                           <td>{data.PhoneNumber}</td>
                           <td>
                           <button className="btn btn-primary">تعديل</button>
                           <button className="btn btn-danger ms-2">حذف</button>
                           </td>
                           </tr>
                        ))
                    }
                
                 
                 
                  
                 
                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


  )
}

export default Tableview2
