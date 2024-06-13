
import React, { useEffect } from "react";
import { Component } from "react"
import axios from 'axios'
import { useState } from "react";
import * as XLSX from 'xlsx';
import { ReactToPrint } from 'react-to-print'
import { readFile } from 'xlsx';
import { Navigate, useNavigate } from 'react-router-dom';
import { Link} from 'react-router-dom'


const Tableview1 = ({ data }) => {
    const [view, setView] = useState([])
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: null
    });
    const [sheetData, setSheetData] = useState(null);
    useEffect(() => {
        axios.get("http://localhost:3000/tableview1")
            .then(res => {
                setView(res.data);
                setFilteredData(res.data);
            })
            .catch(err => console.log(err));
    }, []);
    /*const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/auth/tableview1");
        setView(response.data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };
    useEffect(() => {
      fetchData();
    }, []);*/




    return (
        <div>
            {/* ************************ */}
            <input className='contain-table'
                type="text"
                placeholder="بحث"
            />

            {/* ************************ */}

            <div className='contain-table'>
                <table className='striped-table'>  {/**className='striped-table' */}
                    <div>
                        <thead > {/**className='row' */}
                            <tr>
                                <th className='cell' style={{ textAlign: "center" }}>م.</th>
                                <th className='cell' style={{ textAlign: "center", width: '7%' }}>ID الخاص بالطالب</th>
                                <th className='cell' style={{ textAlign: "center", width: '6%' }}>اسم الطالب</th>
                                <th className='cell' style={{ textAlign: "center", width: '5%' }}>الدولة الوافد منها</th>
                                <th className='cell' style={{ textAlign: "center", width: '5%' }}>رقم جواز السفر</th>
                                <th className='cell' style={{ textAlign: "center", width: '3%' }}>النوع</th>
                                <th className='cell' style={{ textAlign: "center", width: '3%' }}>الفرقة</th>
                                <th className='cell' style={{ textAlign: "center", width: '5%' }}>التخصص - القسم</th>
                                <th className='cell' style={{ textAlign: "center", width: '5%' }}>تاريخ القيد</th>
                                <th className='cell' style={{ textAlign: "center", width: '4%' }}>نوع المعاملة</th>
                                <th className='cell' style={{ textAlign: "center", width: '4%' }}>نسبة التخفيض</th>
                                <th className='cell' style={{ width: '5500px' }} >
                                    <tr>
                                        <th style={{ textAlign: "center" }} colspan="2">  المصروفات المدفوعة هذا العام  </th>
                                    </tr>
                                    <tr>
                                        <td > دولار</td>
                                        <td > مصرى </td>
                                    </tr>
                                </th>

                                <th className='cell' style={{ textAlign: "center", width: '5%' }}>تاريخ سداد العملة </th>

                                <th className='cell'><tr>
                                    <th style={{ textAlign: "center" }} colspan="2">  المصروفات المتبقية </th>
                                </tr>
                                    <tr>
                                        <th > دولار</th>
                                        <th > مصرى </th>
                                    </tr>
                                </th>


                                <th className='cell' style={{ width: '50000px' }}> <tr>
                                    <th style={{ textAlign: "center", width: '500px' }} colspan="3">  خدمات  </th>
                                </tr>
                                    <tr>
                                        <th> عذر</th>
                                        <th> كشف طبى </th>
                                        <th>  إفادة </th>
                                    </tr>
                                </th>



                                <th className='cell' style={{ width: '50000px' }}> <tr>
                                    <th style={{ textAlign: "center", width: '500px' }} colspan="3">  تاريخ سدادها  </th>
                                </tr>
                                    <tr>
                                        <td> عذر</td>
                                        <td> كشف طبى </td>
                                        <td>  إفادة </td>
                                    </tr>
                                </th>

                                <th className='cell' style={{ textAlign: "center", width: '9%' }}>حالة الطالب  </th>
                                <th className='cell' style={{ textAlign: "center", width: '7%' }}>العنوان</th>
                                <th className='cell' style={{ textAlign: "center", width: '6%' }}>رقم التليفون</th>
                                <th className='cell' style={{ textAlign: "center", width: '5%' }}>رسم الكتاب الجامعى </th>
                                <th className='cell' style={{ textAlign: "center", width: '5%' }}>تاريخ سداد الكتاب الجامعى </th>
                                <th className='cell' style={{ textAlign: "center", width: '5%' }}>ملاحظات</th>
                                <th className='cell' style={{ textAlign: "center", width: '10%' }}>اضغط</th>




                            </tr>
                        </thead>

                        <tbody className='tbody'>
                            {view.length > 0 ? (
                                view.map((data, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{data.id} </td>
                                        <td>{data.firstName}</td>
                                        <td>{data.state}</td>
                                        <td>{data.pass} </td>
                                        <td>{data.gender} </td>
                                        <td>{data.grade} </td>
                                        <td>{data.major} </td>
                                        <td>{data.date1} </td>
                                        <td>{data.type} </td>
                                        <td>{data.discount} </td>

                                        <tr>
                                            <td style={{ textAlign: "center", width: '75px', height: 100 }}> {data.pay}</td>
                                            <td style={{ textAlign: "center", width: '75px', height: 100 }} >  {data.pay1}</td>
                                        </tr>

                                        <td>{data.date2} </td>

                                        <tr>
                                            <td style={{ textAlign: "center", width: '75px', height: 100 }}> {data.pay2}</td>
                                            <td style={{ textAlign: "center", width: '75px', height: 100 }} >  {data.pay3}</td>
                                        </tr>
                                        <td>
                                            <tr>
                                                <td style={{ textAlign: "center", width: '75px', height: '100%' }}>{data.service1} </td>
                                                <td style={{ textAlign: "center", width: '75px', height: '100%' }}>{data.service2} </td>
                                                <td style={{ textAlign: "center", width: '75px', height: '100%' }}>{data.service3} </td>
                                            </tr>

                                        </td>
                                        <td>
                                            <tr>
                                                <td style={{ textAlign: "center", width: '75px', height: '100%' }}>{data.dateser1} </td>
                                                <td style={{ textAlign: "center", width: '75px', height: '100%' }}>{data.dateser2} </td>
                                                <td style={{ textAlign: "center", width: '75px', height: '100%' }}>{data.dateser3} </td>
                                            </tr>
                                        </td>

                                        <td>{data.options} </td>
                                        <td>{data.address} </td>
                                        <td>{data.telephone} </td>
                                        <td>{data.book} </td>
                                        <td>{data.dateBook} </td>
                                        <td>{data.notes} </td>


                                        {/**  <td>{employee.email}</td>    */}
                                        {/**  <td>{formatter.format(employee.salary)}</td>   */}


                                        <tr>
                                            <td className="text-right">
                                                <Link to={`/editform/${data.id}`}
                                                   
                                                    className="btn btn-primary"
                                                >
                                                    تعديل
                                                </Link>
                                            </td>

                                            <td className="text-left">
                                                <button
                                                    onClick={() => handleDelete(data.id)}
                                                    className="btn btn-danger ms-2"
                                                >
                                                    حذف
                                                </button>
                                            </td>

                                        </tr>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={27}>No Students</td>
                                </tr>


                            )

                            }
                        </tbody>  </div>




                </table>


            </div>  </div>
    )
}


export default Tableview1
