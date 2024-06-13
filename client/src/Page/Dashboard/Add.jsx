import React, { useState, useRef, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios'
import './style.css';

function Add({ employees, setEmployees, setIsAdding }) {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [ID, setID] = useState('');
    const [state, setState] = useState('');
    const [pass, setPass] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [major, setMajor] = useState('');
    const [grade, setGrade] = useState('');
    const [secondary, setSecondary] = useState('');
    const [date1, setDate1] = useState('');
    const [type, setType] = useState('');
    const [discount, setDiscount] = useState('');
    const [pay, setPay] = useState('');
    const [pay1, setPay1] = useState('');
    const [date2, setDate2] = useState('');
    const [pay2, setPay2] = useState('');
    const [pay3, setPay3] = useState('');
    const [PayType, setPayType] = useState('');
    const [payyys, setPayyys] = useState('');
    const [execuse, setExecuse] = useState('');
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

    const [Type1, setType1] = useState('');
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');
    axios.defaults.withCredentials = true;

    const getRemainEGPPay = (payyys, pay1) => {
        let dollarToEgp = 40;
        let egpremain = 0;
        let dollarpaid = 0;
        let dollarremain = 0;
        egpremain = payyys - pay1;
        setPay3(egpremain);
        dollarpaid = pay1 * dollarToEgp;
        setPay(dollarpaid);
        
        
        
        
        dollarremain = egpremain * dollarToEgp;

        setPay2(dollarremain);
       

    }
    const getDiscount = (secondary, state) => {
        let discount = 0;
        let expense = 6500;
        let sudan_expense = 5000;
        let payment = 0;
        console.log("State:", state); // Check the value of state
        console.log("Secondary:", secondary); // Check the value of secondary
        if (secondary === "فلسطين" && state === "فلسطين") {
            discount = 0.5;
            payment = expense * discount;

        }
        else if (state === "فلسطين" && (secondary === "مصر" || secondary === "السودان" || secondary === "سوريا" || secondary === "دولة أخرى")) {
            discount = 0.0;
            payment = expense;
        }
        else if (secondary === "سوريا" && state === "سوريا") {
            discount = 0.5;
            payment = expense * discount;
        }
        else if (state === "سوريا" && (secondary === "مصر" || secondary === "السودان" || secondary === "فلسطين" || secondary === "دولة أخرى")) {
            discount = 0.0;
            payment = expense;
        }
        else if (state === "السودان-قديم" && (secondary === "مصر" || secondary === "السودان" || secondary === "سوريا" || secondary === "فلسطين" || secondary === "دولة أخرى")) {
            discount = 0.1;
            payment = discount * sudan_expense;
        }
        else if (state === "السودان-جديد" && (secondary === "مصر" || secondary === "السودان" || secondary === "سوريا" || secondary === "فلسطين" || secondary === "دولة أخرى")) {
            discount = 0.3;
            payment = discount * sudan_expense;
        }
        else {
            discount = 0.0;
            payment = expense;
        }

        setDiscount(discount);
        setPayyys(payment);
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post("http://localhost:3000/add", {
            firstName,
            ID,
            state,
            pass,

            gender,
            major,
            grade,
            email,
            date1,
            Type1,
            type,
            discount,
            secondary,


            payyys,
            pay,
            pay1,
            date2,
            pay2,
            pay3,
            option,
            address,
            telephone,
            book,
            dateBook,
            service1,
            dateSer1,
            execuse,
            image1,
            service2,
            dateSer2,
            image2,
            service3,
            dateSer3,
            image3,
            notes
        })
            .then(res => {
                console.log(res)
                // setIsSaved(true);
                navigate("/home")
            }).catch(err => {
                console.log(err)
            });
    }

    const handleImageUpload = (e) => { const file = e.target.files[0]; };

    const textInput = useRef(null);

    useEffect(() => {
        textInput.current.focus();
    }, []);

    const handleAdd = e => {
        e.preventDefault();
        if (!firstName || !ID || !state || !pass || !gender || !grade || !major || !date1 || !address || !telephone) {
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'All fields are required.',
                showConfirmButton: true
            });
        }

        const id = employees.length + 1;
        const newEmployee = {
            id,
            firstName,
            state,
            ID,
            pass,
            gender,
            email,
            grade,
            major,
            date1,
            type,
            type1,
            discount,
            pay,
            pay1,
            PayType,
            date2,
            pay2,
            pay3,
            service1,
            payyys,
            service2,
            service3,
            execuse,
            dateSer1,
            dateSer2,
            dateSer3,
            option,
            address,
            telephone,
            book,
            dateBook,
            notes
        }
        employees.push(newEmployee);
        setEmployees(employees);
        setIsAdding(false);

        Swal.fire({
            icon: 'success',
            title: 'Added!',
            text: `${firstName} ${state}'s data has been Added.`,
            showConfirmButton: false,
            timer: 1500
        });
    }

    return (

        <div className="small-container" >
            <div style={{ marginTop: '30px', marginBottom: '18px' }}>
                <h1 style={{ textAlign: "center" }}>إضافة طالب وافد جديد      </h1>



                {/*    <Link to="/List">
                    <button className='round-button'>
                        Show all student data
                    </button>
                </Link>
 */}


                {/*}     <button  onClick={() => setIsAdding(true)} className='round-button' >عرض بيانات الطلاب بأكملها</button>
              */}  </div>


            <form className="form" onSubmit={handleSubmit}>

                {/*    <h3 style={{textAlign:"center"}}>  " إضافة طالب وافد "</h3>   */}

                {/**  ======================================= */}

                <div className="user-details">


                    <label htmlFor="firstName" style={{ direction: 'rtl' }}> اسم الطالب :</label>
                    <input
                        className='hover-zoom'
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
                        className='hover-zoom'
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
                    <div className="select-box">
                        <select id="state" className='hover-zoom' onChange={e => {
                            setState(e.target.value);
                            getDiscount(secondary, e.target.value);
                        }}>

                            <option hidden>اختر من فضلك</option>
                            <option>السودان-قديم</option>
                            <option>السودان-جديد</option>
                            <option>سوريا</option>
                            <option>فلسطين</option>
                            <option>دولة أخرى</option>
                        </select>
                    </div>

                    <label htmlFor="secondary" style={{ direction: 'rtl' }}> الثانوية العامه: </label>
                    <div className="select-box">
                        <select id="secondary" className='hover-zoom'
                            onChange={e => {
                                setSecondary(e.target.value);
                                getDiscount(e.target.value, state);
                            }}>
                            <option hidden>اختر من فضلك</option>
                            <option>مصر</option>
                            <option>سوريا</option>
                            <option>فلسطين</option>
                            <option>سودان</option>
                            <option>دولة أخرى</option>
                        </select>

                    </div>

                    <label htmlFor="pass" style={{ direction: 'rtl' }} >رقم جواز السفر : </label>
                    <input
                        className='hover-zoom'
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
                            id="ذكر"
                            type="radio"
                            name="gender"
                            value="ذكر"
                            checked={gender === 'ذكر'}
                            onChange={() => setGender('ذكر')}
                        />

                        <label className='radio1' htmlFor="female">أنثى </label>
                        <input className='radio'
                            id="أنثى"
                            type="radio"
                            name="gender"
                            value="أنثى"
                            checked={gender === 'أنثى'}
                            onChange={() => setGender('أنثى')}
                        />
                    </div>

                    <label htmlFor="major" style={{ direction: 'rtl' }}> التخصص-القسم : </label>
                    <div className="select-box">
                        <select id="major" className='hover-zoom' onChange={e => setMajor(e.target.value)}>
                            <option hidden>اختر من فضلك</option>
                            <option>أولى</option>
                            <option>ثانية</option>
                            <option>علوم الحاسب</option>
                            <option>نظم المعلومات</option>
                            <option>الذكاء الإصطناعي</option>
                            <option>تكنولوجيا المعلومات</option>
                        </select>
                    </div>




                    <label htmlFor="grade" style={{ direction: 'rtl' }}>الفرقة :</label>
                    <div className="select-box">
                        <select id="grade" className='hover-zoom' onChange={e => setGrade(e.target.value)}>
                            <option hidden>اختر من فضلك</option>
                            <option>الأولى</option>
                            <option>الثانية</option>
                            <option>الثالثة</option>
                            <option>الرابعة</option>
                        </select>
                    </div>



                    <label htmlFor="email" style={{ direction: 'rtl' }}>  البريد الإلكتروني: </label>
                    <input
                        className='hover-zoom'
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ direction: 'rtl' }} />


                    <label htmlFor="date1" style={{ direction: 'rtl' }}>تاريخ القيد :</label>
                    <input
                        className='hover-zoom'
                        id="date1"
                        type="date"
                        name="date1"
                        value={date1}
                        onChange={e => setDate1(e.target.value)}
                        style={{ direction: 'rtl' }}
                    />


                    <label htmlFor="Type1" style={{ direction: 'rtl' }} >  نوع النفقة : </label>
                    <div class="select-box">
                        <select className='hover-zoom'>
                            <option hidden>اختر من فضلك</option>
                            <option >خاصة</option>
                            <option >منحة بنسبة</option>
                            <option >منحة كاملة</option>
                            <option >معاملة المصريين</option>
                            onChange={e => setType1(e.target.value)}
                        </select>

                    </div>




                    <label htmlFor="type" style={{ direction: 'rtl' }} > نوع المعاملة  : </label>
                    <input
                        className='hover-zoom'
                        id="type"
                        type="text"
                        name="type"
                        value={type}
                        onChange={e => setType(e.target.value)}
                        style={{ direction: 'rtl' }}
                    />


                    <label htmlFor="discount" style={{ direction: 'rtl' }} >نسبة التخفيض   : </label>
                    <input
                        className='hover-zoom'
                        id="discount"
                        type="text"
                        name="discount"
                        value={discount}
                        disabled
                        onChange={e => setDiscount(e.target.value)}
                        style={{ direction: 'rtl' }}
                    />





                    <label htmlFor="payyys" style={{ direction: 'rtl' }} >الرسوم (المصروفات) : </label>
                    <input
                        className='hover-zoom'
                        id="type"
                        type="number"
                        name="type"
                        value={payyys}
                        onChange={e => {
                            setPayyys(e.target.value)
                            getDiscount(secondary, state)
                            getRemainEGPPay(payyys, pay1)

                        }}
                        style={{ direction: 'rtl' }}
                    />

                    <div className='n' style={{ direction: 'rtl' }} >
                        <label htmlFor="pay" style={{ direction: 'rtl' }} >المصروفات المدفوعة هذا العام ($)   : </label>

                        <label className='n1' htmlFor="pay1" style={{ direction: 'rtl' }} >المصروفات المدفوعة هذا العام (بالجنيه المصرى)   : </label>
                    </div>

                    <div className='pay'>
                        <input
                            className='hover-zoom'
                            id="pay1"
                            type="number"
                            name="pay1"
                            value={pay1}
                            onChange={e => {
                                setPay1(e.target.value)
                                //getDiscount(secondary, state)
                                getRemainEGPPay(payyys, e.target.value)
                            }}
                            style={{ direction: 'rtl' }}
                        />

                        <input
                            className='hover-zoom'
                            id="pay"
                            type="number"
                            name="pay"
                            value={pay}
                            onChange={e => {
                                setPay(e.target.value)
                                //getDiscount (secondary, state)
                                getRemainEGPPay(payyys, pay1)
                            }}
                            style={{ direction: 'rtl' }}
                        />


                    </div>


                    <label htmlFor="date2" style={{ direction: 'rtl' }}>تاريخ سداد العملة :</label>
                    <input
                        className='hover-zoom'
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
                            className='hover-zoom'
                            id="pay3"
                            type="number"
                            name="pay3"             /** المصروفات المتبقية (بالجنيه المصرى)  */
                            value={pay3}
                            onChange={e => {
                                setPay3(e.target.value)
                                //getDiscount (secondary, state)
                                getRemainEGPPay(payyys, pay1)
                            }}
                            style={{ direction: 'rtl' }}
                        />

                        <input
                            className='hover-zoom'
                            id="pay2"
                            type="number"
                            name="pay2"           /** المصروفات المتبقية ($)  */
                            value={pay2}
                            onChange={e => {
                                setPay2(e.target.value)
                                //getDiscount (secondary, state)
                                getRemainEGPPay(payyys, pay1)
                            }}
                            style={{ direction: 'rtl' }}
                        />

                    </div>

                    {/** *********************************************************************************************** */}

                    <label htmlFor="option" style={{ direction: 'rtl' }}>حالة الطالب :</label>
                    <div className="select-box">
                        <select id="option" className='hover-zoom' onChange={e => setOption(e.target.value)}>
                            <option hidden>اختر من فضلك</option>
                            <option>محول من</option>
                            <option>تأجيل قيد</option>
                            <option>إيقاف قيد</option>
                        </select>
                    </div>


                    <label htmlFor="address" style={{ direction: 'rtl' }} >العنوان : </label>
                    <input
                        className='hover-zoom'
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
                        className='hover-zoom'
                        id="telephone"
                        type="tel"
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
                            className='hover-zoom'
                            id="dateBook"
                            type="date"
                            name="dateBook"
                            value={dateBook}
                            onChange={e => setDateBook(e.target.value)}
                            style={{ direction: 'rtl' }}
                        />

                        <input
                            className='hover-zoom'
                            id="book"
                            type="number"
                            name="book"
                            placeholder="ادخل رسم الكتاب "
                            value={book}
                            onChange={e => setBook(e.target.value)}
                            style={{ direction: 'rtl' }}
                        />
                    </div>





                    <h3> <label style={{ fontFamily: 'Arial , sans-serif', direction: 'rtl' }}> خدمات </label> </h3>
                    <label htmlFor="service1" style={{ direction: 'rtl' }} > عذر   : </label>
                    <input
                        className='hover-zoom'
                        id="service1"
                        type="number"
                        name="service1"
                        value={service1}
                        onChange={e => setService1(e.target.value)}
                        style={{ direction: 'rtl' }}
                    />

                    <label htmlFor="dateSer1" style={{ direction: 'rtl' }}> تاريخ السداد :</label>
                    <input
                        className='hover-zoom'
                        id="dateSer1"
                        type="date"
                        name="dateSer1"
                        value={dateSer1}
                        onChange={e => setDateSer1(e.target.value)}
                        style={{ direction: 'rtl' }}
                    />


                    <label htmlFor="execuse" style={{ direction: 'rtl' }}> عذر عن :</label>
                    <div className="select-box">
                        <select id="execuse" className='hover-zoom' onChange={e => setExecuse(e.target.value)}>
                            <option hidden>اختر من فضلك</option>
                            <option>فصل دراسي أول</option>
                            <option>فصل دراسي ثاني</option>
                            <option>السنة الدراسية بالكامل</option>
                        </select>
                    </div>


                    <label htmlFor="image1" style={{ direction: 'rtl' }}>ادخل صورة العذر  :</label>
                    <input className='hover-zoom' type="file" accept="image/*" onChange={handleImageUpload} />
                    <br></br>
                    <br></br>
                    <label htmlFor="service2" style={{ direction: 'rtl' }} > كشف طبى   : </label>
                    <input
                        className='hover-zoom'
                        id="service2"
                        type="number"
                        name="service2"
                        value={service2}
                        onChange={e => setService2(e.target.value)}
                        style={{ direction: 'rtl' }}
                    />

                    <label htmlFor="dateSer2" style={{ direction: 'rtl' }}> تاريخ الكشف طبى  :</label>
                    <input
                        className='hover-zoom'
                        id="dateSer2"
                        type="date"
                        name="dateSer2"
                        value={dateSer2}
                        onChange={e => setDateSer2(e.target.value)}
                        style={{ direction: 'rtl' }}
                    />

                    <label htmlFor="image2" style={{ direction: 'rtl' }}>ادخل صورة الكشف الطبى :</label>
                    <input className='hover-zoom' type="file" accept="image/*" onChange={handleImageUpload} />

                    <br></br> <br></br>
                    <label htmlFor="service3" style={{ direction: 'rtl' }} > إفادة   : </label>
                    <input
                        className='hover-zoom'
                        id="service3"
                        type="number"
                        name="service3"
                        value={service3}
                        onChange={e => setService3(e.target.value)}
                        style={{ direction: 'rtl' }}
                    />



                    <label htmlFor="dateSer3" style={{ direction: 'rtl' }}>تاريخ الإفادة  :</label>
                    <input
                        className='hover-zoom'
                        id="dateSer3"
                        type="date"
                        name="dateSer3"
                        value={dateSer3}
                        onChange={e => setDateSer3(e.target.value)}
                        style={{ direction: 'rtl' }}
                    />


                    <label htmlFor="image3" style={{ direction: 'rtl' }}>ادخل صورة الإفادة :</label>
                    <input className='hover-zoom' type="file" accept="image/*" onChange={handleImageUpload} />



                    <br></br>


                    <label htmlFor="notes" style={{ direction: 'rtl' }} >ملاحظات : </label>
                    <input
                        className='hover-zoom'
                        id="notes"
                        type="text"
                        name="notes"
                        placeholder="اذا كان لديك أي ملاحظات اكتبها هنا "
                        value={notes}
                        onChange={e => setNotes(e.target.value)}
                        style={{ direction: 'rtl' }}
                    />
                    <br></br>



                    <div style={{ marginTop: '30px' }}>
                        <input className='hover-zoom' type="submit" value="إضافة" />
                        {/*  <input
                        style={{ marginLeft: '12px' }}
                        className="muted-button"
                        type="button"
                        value="Cancel"
                        onClick={() => setIsAdding(false)}  
                    />  
            */}
                        <button className='hover-zoom'> <Link style={{ color: 'white' }} to="/home"> إلغاء</Link>

                        </button>



                    </div>

                </div>
            </form>
        </div>

    );
}

export default Add;
