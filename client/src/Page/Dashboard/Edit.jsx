import React, { useState } from 'react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios'
function Edit() {
  
    const { id } = useParams();
    const [firstName, setfirstName] = useState();
    const [state, setState] = useState();
    const [grade, setGrade] = useState();
   
    const [date1, setDate1] = useState();
 
    const [Type1, setType1] = useState();
    const [type, setType] = useState();
    const [discount, setDiscount] = useState();
    const [pay, setPay] = useState();
    const [pay1, setPay1] = useState();
    const [date2, setDate2] = useState();
    const [pay2, setPay2] = useState();
    const [pay3, setPay3] = useState();
    const [book, setBook] = useState();
    const [dateBook, setDateBook] = useState();
   
    const [notes, setNotes] = useState();
    const[option,setOption]= useState();
   
    useEffect(() => {
        axios.get("http://localhost:3000/search1/" + id)
            .then(
                res => {
                    setfirstName(res.data[0].firstName);
                    setState(res.data[0].state);
                    setGrade(res.data[0].grade);
                    setType(res.data[0].type)
                    setDate1(res.data[0].date1);
                 
                    setType1(res.data[0].Type1)
                    setDiscount(res.data[0].discount)
                    setPay(res.data[0].pay)
                    setPay1(res.data[0].pay1)
                    setDate2(res.data[0].date2)
                    setPay2(res.data[0].pay2)
                    setPay3(res.data[0].pay3)
                    setBook(res.data[0].book)
                    setDateBook(res.data[0].dateBook)
                   
                    setNotes(res.data[0].notes);
                    setOption(res.data[0].option);


                })
            .catch(err => console.log(err));
    }, [id]);
    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put("http://localhost:3000/update1/" + id, {state,grade,date1, Type1, type, discount, pay, pay1,date2, pay2,pay3,option,book, dateBook,  notes})
            .then(res => {
                if (res.data.updated) {
                    if (!firstName || !ID || !state || !option  || !grade ) {
                        return Swal.fire({
                            icon: 'error',
                            title: 'Error!',
                            text: 'All fields are required.',
                            showConfirmButton: true
                        });
                    }
                   
                    Swal.fire({
                        icon: 'success',
                        title: 'Updated!',
                        text: `${firstName}'s data has been updated.`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/list')
                }
                else {
                    alert("Not updated");
                }
    
    
            }).catch(err => console.log(err));};
            const navigate = useNavigate();
            const handleCancel = () => {
                navigate(-1);
            };
            return (
                <div className="small-container">
                    <form onSubmit={handleUpdate}>
                        <h1 style={{ direction: 'rtl' }}>تعديل بيانات الطالب</h1>
                        <label htmlFor="firstName" style={{ direction: 'rtl' }}> اسم الطالب :</label>
                        <input
                            id="firstName"
                            type="text"
                            placeholder=" ادخل اسم الطالب الوافد بالكامل"
                            required
                            name="firstName"
                            value={firstName}
                            // onChange={e => setfirstName(e.target.value)}
                            style={{ direction: 'rtl' }}
                        />
                        <label htmlFor="ID" style={{ direction: 'rtl' }}>ID :</label>
                        <input
                            id="ID"
                            type="number"
                            name="ID"
                            required
                            value={id}
                            // onChange={e => setID(ID)}
                            style={{ direction: 'rtl' }}
                        />
        
                        <label htmlFor="state" style={{ direction: 'rtl' }}> الدولة الوافد منها : </label>
                        <div className="select-box">
                            <select className='hover-zoom'
                                id="state"
                                style={{ direction: 'ltr' }}
                                value={state}
                                required
                                onChange={e => setState(e.target.value)}
                            >
                                <option hidden>{state}</option>
                                <option>السودان-قديم</option>
                            <option>السودان-جديد</option>
                            <option>سوريا</option>
                            <option>فلسطين</option>
                            <option>دولة أخرى</option>
                            </select>
                        </div>
        
                        <label htmlFor="grade" style={{ direction: 'rtl' }}>الفرقة:</label>
                        <div className="select-box">
                            <select className='hover-zoom'
                                id="grade"
                                style={{ direction: 'ltr' }}
                                value={grade}
                                required
                                onChange={e => setGrade(e.target.value)}
                            >
                                <option hidden>{grade}</option>
                                <option>الأولى</option>
                                <option>الثانية</option>
                                <option>الثالثة</option>
                                <option>الرابعة</option>
                            </select>
                        </div>
                        <label htmlFor="date1" style={{ direction: 'rtl' }}>تاريخ القيد :</label>
                        <input
                            id="date1"
                            type="date"
                            name="date1"
                            value={date1}
                            required
                            onChange={e => setDate1(e.target.value)}
                            style={{ direction: 'rtl' }}
                        />
        
                        <label htmlFor="Type1" style={{ direction: 'rtl' }} >  نوع النفقة : </label>
                        <div className="select-box">
                            <select
                                id="Type1"
                                style={{ direction: 'ltr' }}
                                value={Type1}
                                onChange={e => setType1(e.target.value)}
                            >
                                <option hidden>{Type1}</option>
                                <option >خاصة</option>
                                <option >منحة بنسبة</option>
                                <option >منحة كاملة</option>
                                <option >معاملة المصريين</option>
                            </select>
                        </div>
        
        
        
                        <label htmlFor="type" style={{ direction: 'rtl' }} > نوع المعاملة  : </label>
                        <input
                            id="type"
                            type="text"
                            name="type"
                            value={type}
                            onChange={e => setType(e.target.value)}
                            style={{ direction: 'rtl' }}
                        />
        
                        <label htmlFor="discount" style={{ direction: 'rtl' }} >نسبة التخفيض   : </label>
                        <input
                            id="discount"
                            type="text"
                            name="discount"
                            value={discount}
                            disabled
                            style={{ direction: 'rtl' }}
                            title="This field is not editable."
                        />
        
        
                        <div className='n' style={{ direction: 'rtl' }} >
                            <label htmlFor="pay" style={{ direction: 'rtl' }} >المصروفات المدفوعة هذا العام ($)   : </label>
        
                            <label className='n1' htmlFor="pay1" style={{ direction: 'rtl' }} >المصروفات المدفوعة هذا العام (بالجنيه المصرى)   : </label>
                        </div>
        
                        <div className='pay'>
                            <input
                                id="pay1"
                                type="number"
                                name="pay1"
                                value={pay1}
                                onChange={e => setPay1(e.target.value)}
                                style={{ direction: 'rtl' }}
                            />
        
                            <input
                                id="pay"
                                type="number"
                                name="pay"
                                value={pay}
                                onChange={e => setPay(e.target.value)}
                                style={{ direction: 'rtl' }}
                            />
        
        
                        </div>
        
                        <label htmlFor="date2" style={{ direction: 'rtl' }}>تاريخ سداد العملة :</label>
                        <input
                            id="date2"
                            type="date"
                            name="date2"
                            value={date2}
                            onChange={e => setDate2(e.target.value)}
                            style={{ direction: 'rtl' }}
                        />
        
                        <div className='n' style={{ direction: 'rtl' }} >
                            <label htmlFor="pay2" style={{ direction: 'rtl' }} >المصروفات المتبقية($)   : </label>
                            <label className='n11' htmlFor="pay3" style={{ direction: 'rtl' }} >المصروفات المتبقية (بالجنيه المصرى)   : </label>
                        </div>
        
        
                        <div className='pay'>
                            <input
                                id="pay3"
                                type="number"
                                name="pay3"
                                value={pay3}
                                disabled
                                onChange={e => setPay3(e.target.value)}
                                title="This field is not editable."
                                style={{ direction: 'rtl' }}
                            />
        
                            <input
                                id="pay2"
                                type="number"
                                name="pay2"
                                value={pay2}
                                disabled
                                onChange={e => setPay2(e.target.value)}
                                title="This field is not editable."
                                style={{ direction: 'rtl' }}
                            />
        
                        </div>
        
        
        
        
                        <br></br> <br></br>
                        {/** *********************************************************************************************** */}
        
                        <label htmlFor="option" style={{ direction: 'rtl' }}>حالة الطالب :</label>
                        <div className="select-box">
                            <select className='hover-zoom'
                                id="option"
                                style={{ direction: 'ltr' }}
                                value={option}
                                required
                                onChange={e => setOption(e.target.value)}
                            >
                                <option hidden>{option}</option>
                                <option >محول من</option>
                                <option >تأجيل قيد </option>
                                <option >إيقاف قيد </option>
                            </select>
                        </div>
        
                        <div className='n' style={{ direction: 'rtl' }} >
                            <label htmlFor="book" style={{ direction: 'rtl' }} >  رسم الكتاب الجامعى : </label>
                            <label className='n111' style={{ direction: 'rtl' }}>تاريخ سداد رسم الكتاب الجامعى :</label>
        
                        </div>
        
                        <div className='pay'>
        
                            <input
                                id="dateBook"
                                type="date"
                                name="dateBook"
                                value={dateBook}
                                onChange={e => setDateBook(e.target.value)}
                                style={{ direction: 'rtl' }}
                            />
        
                            <input
                                id="book"
                                type="number"
                                name="book"
                                required
                                value={book}
                                onChange={e => setBook(e.target.value)}
                                style={{ direction: 'rtl' }}
                            />
                        </div>
        
        
                        <label htmlFor="notes" style={{ direction: 'rtl' }} >ملاحظات : </label>
                        <input
                            id="notes"
                            type="text"
                            name="notes"
                            placeholder="اذا كان لديك أي ملاحظات اكتبها هنا "
                            value={notes}
                            onChange={e => setNotes(e.target.value)}
                            style={{ direction: 'rtl' }}
                        />
        
        
        
        
                        <div style={{ marginTop: '30px' }}>
                            <input type="submit" value="تعديل" />
                            <button type="button" style={{ marginLeft: '500px', marginRight: '10px' }} className="btn btn-secondary" onClick={handleCancel}>
                                الغاء
                            </button>
                        </div>
                    </form>
                </div>
            );
        }
        
        export default Edit;
        