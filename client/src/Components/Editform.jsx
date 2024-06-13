import React, { useState, useRef, useEffect } from 'react'
//import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios'
import cover from '../logo.png'
import Swal from 'sweetalert2';

import '../App.css'
import { Link, useNavigate } from 'react-router-dom'
import {useParams} from 'react-router-dom'

function Editform() {
    const [isSaved, setIsSaved] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [ID, setID] = useState('');
    const [state, setState] = useState('');
    const [pass, setPass] = useState('');
    const [gender, setGender] = useState('');
    const [grade, setGrade] = useState('');
    const [major, setMajor] = useState('');
    const [date1, setDate1] = useState('');
    const [type, setType] = useState('');
    const [pay, setPay] = useState('');
    const [pay1, setPay1] = useState('');
    const [date2, setDate2] = useState('');
    const [pay2, setPay2] = useState('');
    const [pay3, setPay3] = useState('');
    const [service1, setService1] = useState('');
    const [service2, setService2] = useState('');
    const [service3, setService3] = useState('');

    const [dateSer1, setDateSer1] = useState('');
    const [dateSer2, setDateSer2] = useState('');
    const [dateSer3, setDateSer3] = useState('');
    const [address, setAddress] = useState('');
    
    const [telephone, setTelephone] = useState('');
    const [book, setBook] = useState('');
    const [dateBook, setDateBook] = useState('');
    const [notes, setNotes] = useState('');
    const [option, setOption] = useState('');
    const textInput = useRef(null);
    const [discount, setDiscount] = useState('');
    const navigate = useNavigate();
    const {id}=useParams();
    axios.defaults.withCredentials = true;



    useEffect(()=>{
axios.get("http://localhost:3000/editform/"+id)
.then(res=>{
    setFirstName(res.data[0].firstName);
    setID(res.data[0].id);
    setState(res.data[0].state);
    setPass(res.data[0].firstName);
    setGender(res.data[0].gender);
    setGrade(res.data[0].grade);
    setMajor(res.data[0].major);
    setDate1(res.data[0].date1);
    setType(res.data[0].type1);
    setPay(res.data[0].pay);
    setPay1(res.data[0].pay1);
    setDate2(res.data[0].date2);
    setPay2(res.data[0].pay2);
    setPay3(res.data[0].pay3);

    setService1(res.data[0].service1);
    setService2(res.data[0].service2);
    setService3(res.data[0].service3);

    setAddress(res.data[0].address);
    setTelephone(res.data[0].telephone);
    setBook(res.data[0].book);
    setDateBook(res.data[0].dateBook);
    setOption(res.data[0].options);
    setDiscount(res.data[0].discount);
    setNotes(res.data[0].dateBook);
    setNotes(res.data[0].dateBook);
    setNotes(res.data[0].dateBook);
})
.catch(err=>console.log(err));
    },[])
    
    /* Swal.fire({
       icon: 'success',
       title: 'Added!',
       text: `${firstName} ${state}'s data has been added.`,
       showConfirmButton: false,
       timer: 1500
     });*/

    axios.defaults.withCredentials = true;
    const handleLogout = () => {
        axios.get("http://localhost:3000/logout")
            .then(res => {
                if (res.data.status) {
                    navigate('/login')
                }
            }).catch(err => {
                console.log(err)
            });
    }









    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put("http://localhost:3000/editform/"+id, {
            firstName,
            ID,
            state,
            pass,
            gender,
            major,
            grade,
            date1,
            type,
            discount,
            pay,
            pay1,
            date2,
            pay2,
            pay3,
            service1,
            service2,
            service3,
            dateSer1,
            dateSer2,
            dateSer3,
            option,
            address,
            telephone,
            dateBook,
            book,
            notes
        })
            .then(res => {
                if(res.data.updated){
                    setIsSaved(true);
                    navigate("/home")
                }
                else{
                    alert("Not updated");
                }

            }).catch(err => {
                console.log(err)
            });
    }






    return (


        <div className="small-container" >
            <div style={{ marginTop: '30px', marginBottom: '18px' }}>
                <h1 style={{ textAlign: "center" }}>تعديل بيانات طالب  </h1>
                {/* Button to navigate to TableView1 */}
                <Link to="/tableview1" className="round-button">
                    عرض بيانات الطلاب بأكملها
                </Link>
            </div>
            <button onClick={handleLogout}>Logout</button>
            {/*    <h3 style={{textAlign:"center"}}>  " إضافة طالب وافد "</h3>   */}

            {/**  ======================================= */}
            <form onSubmit={handleSubmit} className="form">
                <div className="user-details">
                    <label htmlFor="firstName" style={{ direction: 'rtl' }}> اسم الطالب :</label>
                    <input
                        id="firstName"
                        type="text"
                        placeholder=" ادخل اسم الطالب الوافد بالكامل"
                        required
                        ref={textInput}
                        name="firstName"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        style={{ direction: 'rtl' }}
                    />

                    <label htmlFor="ID" style={{ direction: 'rtl' }}>ID :</label>
                    <input
                        id="ID"
                        type="number"
                        name="ID"
                        placeholder=" ادخل ال ID الخاص بالطالب"
                        required
                        value={ID}
                        onChange={e => setID(e.target.value)}
                        style={{ direction: 'rtl' }}
                    />

                    <label htmlFor="state" style={{ direction: 'rtl' }}> الدولة الوافد منها : </label>
                    <input
                        id="state"
                        type="text"
                        name="state"
                        placeholder=" ادخل الدولة الوافد منها الطالب"
                        required
                        value={state}
                        onChange={e => setState(e.target.value)}
                        style={{ direction: 'rtl' }}
                    />

                    <label htmlFor="pass" style={{ direction: 'rtl' }} >رقم جواز السفر : </label>
                    <input
                        id="pass"
                        type="text"
                        name="pass"
                        placeholder="ادخل رقم جواز السفر الخاص بالطالب   "
                        required
                        value={pass}
                        onChange={e => setPass(e.target.value)}
                        style={{ direction: 'rtl' }}
                    />

                    <label htmlFor="gender" style={{ direction: 'rtl' }} >النوع   : </label>
                    <div className="gender" style={{ direction: 'rtl' }}>
                        <label className='radio1' htmlFor="male">ذكر </label>
                        <input className='radio'
                            id="male"
                            type="radio"
                            name="gender"
                            value="male"
                            checked={gender === 'male'}
                            onChange={() => setGender('male')}
                        />

                        <label className='radio1' htmlFor="female">أنثى </label>
                        <input className='radio'
                            id="female"
                            type="radio"
                            name="gender"
                            value="female"
                            checked={gender === 'female'}
                            onChange={() => setGender('female')}
                        />
                    </div>


                    <label htmlFor="major" style={{ direction: 'rtl' }} > التخصص-القسم  : </label>
                    <input
                        id="major"
                        type="text"
                        name="major"
                        placeholder="ادخل تخصص الطالب       "
                        required
                        value={major}
                        onChange={e => setMajor(e.target.value)}
                        style={{ direction: 'rtl' }}
                    />
                    <label htmlFor="grade" style={{ direction: 'rtl' }}>الفرقة:</label>
                    <div class="select-box">
                        <select id="grade" required value={grade} onChange={e => setGrade(e.target.value)}>
                            <option value="" hidden>اختر من فضلك</option>
                            <option value="الأولى">الأولى</option>
                            <option value="الثانية">الثانية</option>
                            <option value="الثالثة">الثالثة</option>
                            <option value="الرابعة">الرابعة</option>
                        </select>
                    </div>




                    <label htmlFor="date1" style={{ direction: 'rtl' }}>تاريخ القيد :</label>
                    <input
                        id="date1"
                        type="date"
                        name="date1"
                        value={date1}
                        onChange={e => setDate1(e.target.value)}
                        style={{ direction: 'rtl' }}
                    />


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
                        onChange={e => setDiscount(e.target.value)}
                        style={{ direction: 'rtl' }}
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
                            name="pay3"             /** المصروفات المتبقية (بالجنيه المصرى)  */
                            value={pay3}
                            onChange={e => setPay3(e.target.value)}
                            style={{ direction: 'rtl' }}
                        />

                        <input
                            id="pay2"
                            type="number"
                            name="pay2"           /** المصروفات المتبقية ($)  */
                            value={pay2}
                            onChange={e => setPay2(e.target.value)}
                            style={{ direction: 'rtl' }}
                        />

                    </div>



                    <br></br>
                    <h4> <label style={{ fontFamily: 'Arial , sans-serif', direction: 'rtl' }}> خدمات </label> </h4>
                    <label htmlFor="service1" style={{ direction: 'rtl' }} > عذر   : </label>
                    <input
                        id="service1"
                        type="number"
                        name="service1"
                        value={service1}
                        onChange={e => setService1(e.target.value)}
                        style={{ direction: 'rtl' }}
                    />

                    <label htmlFor="service2" style={{ direction: 'rtl' }} > كشف طبى   : </label>
                    <input
                        id="service2"
                        type="number"
                        name="service2"
                        value={service2}
                        onChange={e => setService2(e.target.value)}
                        style={{ direction: 'rtl' }}
                    />

                    <label htmlFor="service3" style={{ direction: 'rtl' }} > إفادة   : </label>
                    <input
                        id="service3"
                        type="number"
                        name="service3"
                        value={service3}
                        onChange={e => setService3(e.target.value)}
                        style={{ direction: 'rtl' }}
                    />
                    <br></br>

                    <h4> <label style={{ fontFamily: 'Arial , sans-serif', direction: 'rtl' }}> تاريخ سدادها  </label> </h4>

                    <label htmlFor="dateSer1" style={{ direction: 'rtl' }}> عذر :</label>
                    <input
                        id="dateSer1"
                        type="date"
                        name="dateSer1"
                        value={dateSer1}
                        onChange={e => setDateSer1(e.target.value)}
                        style={{ direction: 'rtl' }}
                    />

                    <label htmlFor="dateSer2" style={{ direction: 'rtl' }}> كشف طبى  :</label>
                    <input
                        id="dateSer2"
                        type="date"
                        name="dateSer2"
                        value={dateSer2}
                        onChange={e => setDateSer2(e.target.value)}
                        style={{ direction: 'rtl' }}
                    />

                    <label htmlFor="dateSer3" style={{ direction: 'rtl' }}>إفادة :</label>
                    <input
                        id="dateSer3"
                        type="date"
                        name="dateSer3"
                        value={dateSer3}
                        onChange={e => setDateSer3(e.target.value)}
                        style={{ direction: 'rtl' }}
                    />
                    <br></br> <br></br> <br></br>
                    {/* ******************************** */}


                    <input
                        id="option"
                        type="text"
                        placeholder="محول من / تأجيل قيد / إيقاف قيد"
                        required
                        value={option}
                        name="option"
                        onChange={e => setOption(e.target.value)}
                        style={{ direction: 'rtl' }}
                    />

                    <label htmlFor="address" style={{ direction: 'rtl' }} >العنوان : </label>
                    <input
                        id="address"
                        type="text"
                        name="address"
                        placeholder=" ادخل عنوان الطالب     "
                        required
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        style={{ direction: 'rtl' }}
                    />

                    <label htmlFor="telephone" style={{ direction: 'rtl' }} >التليفون : </label>
                    <input
                        id="telephone"
                        type="number"
                        name="telephone"
                        placeholder=" ادخل رقم تليفون الطالب   "
                        required
                        value={telephone}
                        onChange={e => setTelephone(e.target.value)}
                        style={{ direction: 'rtl' }}
                    />



                    <div className='n' style={{ direction: 'rtl' }} >
                        <label htmlFor="book" style={{ direction: 'rtl' }} >  رسم الكتاب الجامعى : </label>
                        <label className='n111' htmlFor="dateBook" style={{ direction: 'rtl' }}>تاريخ سداد رسم الكتاب الجامعى :</label>

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
                            placeholder="إن وجد"
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
                        required
                        value={notes}
                        onChange={e => setNotes(e.target.value)}
                        style={{ direction: 'rtl' }}
                    />
                    <br></br><br></br><br></br>



                    <div style={{ marginTop: '30px' }}>
                        <input type="submit" value="حفظ" />
                        {/*  <input
                        style={{ marginLeft: '12px' }}
                        className="muted-button"
                        type="button"
                        value="Cancel"
                        onClick={() => setIsAdding(false)}  
                    />  */}
                        {/* Conditional rendering to display message */}
                        {isSaved && <div className="message">تم اضافة الطالب بنجاح</div>}

                    </div>

                </div>
            </form>
        </div>






    )
}


export default Editform
