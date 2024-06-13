import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { useParams } from 'react-router-dom';
import axios from 'axios'



function Edit2() {
    const {pass} = useParams();
    console.log(pass);
    
    //const id = selectedEmployee ? selectedEmployee.id : null;
    const [firstName, setfirstName] = useState();
    const [state, setstate] = useState();
    const [pay, setPay] = useState();
    //const [pass, setPass] = useState();
    const [grade, setGrade] = useState();
    const [date1, setDate1] = useState();
    const [Type1, setType1] = useState();
    const [type, setType] = useState();
    const [discount, setDiscount] = useState();
    const [pay1, setPay1] = useState();
    const [pay2, setPay2] = useState();
    const [pay3, setPay3] = useState();
    const [date2, setDate2] = useState();
    const [sertotal, setSertotal] = useState();
    const [debt, setDebt] = useState();
    const [totaldebt, setTotalDebt] = useState();
    const [debts, setDebts] = useState();
    const [totaldebts, setTotaldebts] = useState();
    const [option, setOption] = useState();
    const [telephone, setTelephone] = useState();
    const [notes, setNotes] = useState();
    const [book, setBook] = useState();
    const [dateBook, setDateBook] = useState();
    useEffect(() => {
        axios.get("http://localhost:3000/search2/" +pass)
            .then(
                res => {
                    setfirstName(res.data[0].firstName);
                    setGrade(res.data[0].grade);
                    setDate1(res.data[0].date1);
                    setType1(res.data[0].Type1);
                    setType(res.data[0].type);
                    setDiscount(res.data[0].discount);
                    setPay(res.data[0].pay);
                    setPay1(res.data[0].pay1);
                    setPay2(res.data[0].pay2);
                    setPay3(res.data[0].pay3);
                    setstate(res.data[0].state);
                    //setPass(res.data[0].pass);
                    setDate2(res.data[0].date2);
                    setBook(res.data[0].book);
                    setDateBook(res.data[0].dateBook);
                  
                    setTelephone(res.data[0].telephone);

                    setOption(res.data[0].option);


                    setNotes(res.data[0].notes);

                })
            .catch(err => console.log(err));
    }, [pass]);
    /*
    const [firstName, setFirstName] = useState(selectedEmployee?.firstName || '');
    const [ID, setID] = useState(selectedEmployee?.ID || '');
    const [state, setState] = useState(selectedEmployee?.state || '');
    const [gender, setGender] = useState(selectedEmployee?.gender || '');
    const [pass, setPass] = useState(selectedEmployee?.pass || '');
    const [email, setEmail] = useState(selectedEmployee?.email || '');
    const [grade, setGrade] = useState(selectedEmployee?.grade || '');
    const [major, setMajor] = useState(selectedEmployee?.major || '');
    const [date1, setDate1] = useState(selectedEmployee?.date1 || '');
    const [type1, setType1] = useState(selectedEmployee?.type1 || '');
    const [type, setType] = useState(selectedEmployee?.type || '');
    const [discount, setDiscount] = useState(selectedEmployee?.discount || '');
    const [pay, setPay] = useState(selectedEmployee?.pay || '');
    const [pay1, setPay1] = useState(selectedEmployee?.pay1 || '');
    const [date2, setDate2] = useState(selectedEmployee?.date2 || '');
    const [pay2, setPay2] = useState(selectedEmployee?.pay2 || '');
    const [pay3, setPay3] = useState(selectedEmployee?.pay3 || '');
    const [address, setAddress] = useState(selectedEmployee?.address || '');
    const [telephone, setTelephone] = useState(selectedEmployee?.telephone || '');
    const [book, setBook] = useState(selectedEmployee?.book || '');
    const [dateBook, setDateBook] = useState(selectedEmployee?.dateBook || '');
    const [notes, setNotes] = useState(selectedEmployee?.notes || '');
    const [option, setOption] = useState(selectedEmployee?.option || '');
    const [debts, setDebts] = useState(selectedEmployee?.debts || '');
    const [debt, setDebt] = useState(selectedEmployee?.debt || '');
    const [totaldebt, setTotalDebt] = useState(selectedEmployee?.totaldebt || '');
    const [sertotal, setSertotal] = useState(selectedEmployee?.sertotal || '');
    const [service1, setService1] = useState(selectedEmployee?.service1 || '');
    const [service2, setService2] = useState(selectedEmployee?.service2 || '');
    const [service3, setService3] = useState(selectedEmployee?.service3 || '');
    const [dateSer1, setDateSer1] = useState(selectedEmployee?.dateSer1 || '');
    const [dateSer2, setDateSer2] = useState(selectedEmployee?.dateSer2 || '');
    const [dateSer3, setDateSer3] = useState(selectedEmployee?.dateSer3 || '');
    const [execuse, setExecuse] = useState(selectedEmployee?.execuse || '');
*/
    const navigate = useNavigate();

    const handleCancel = () => {
        navigate(-1);
    };
    /*
        const handleUpdate = e => {
            e.preventDefault();
    
            if (!firstName || !state || !option || !pass || !grade || !telephone) {
                return Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'All fields are required.',
                    showConfirmButton: true
                });
            }
    
            if (!/^\d{11}$/.test(telephone)) {
                return Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Telephone number should be 11 digits.',
                    showConfirmButton: true,
                });
            }
    
            if (isNaN(Number(telephone))) {
                return Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Telephone number should be a valid number.',
                    showConfirmButton: true,
                });
            }
    
            const employee = {
                id,
                firstName,
                state,
                ID,
                pass,
                email,
                gender,
                grade,
                major,
                date1,
                type1,
                type,
                discount,
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
                notes,
                sertotal,
                debts,
                execuse,
                debt,
                totaldebt,
                service1,
                service2,
                service3,
                dateSer1,
                dateSer2,
                dateSer3
            };*/
    /*
            const updatedEmployees = employees.map(emp => (emp.id === id ? employee : emp));
    
            setEmployees(updatedEmployees);
            setIsEditing(false);
    
            Swal.fire({
                icon: 'success',
                title: 'Updated!',
                text: `${employee.firstName}'s data has been updated.`,
                showConfirmButton: false,
                timer: 1500
            });*/

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put("http://localhost:3000/update2/" + pass, { state, grade, date1, pay,pay1,pay3, date2,  book, option, telephone, notes })
            .then(res => {
                if (res.data.updated) {
                    if (!firstName  || !state || !option  || !pass|| !grade ||  !telephone) {
                        return Swal.fire({
                            icon: 'error',
                            title: 'Error!',
                            text: 'All fields are required.',
                            showConfirmButton: true
                        });
                    }
                    if (!/^\d{11}$/.test(telephone)) {
                        return Swal.fire({
                          icon: 'error',
                          title: 'Error!',
                          text: 'Telephone number should be 11 digits.',
                          showConfirmButton: true,
                        });
                      }
                    
                      if (isNaN(Number(telephone))) {
                        return Swal.fire({
                          icon: 'error',
                          title: 'Error!',
                          text: 'Telephone number should be a valid number.',
                          showConfirmButton: true,
                        });
                    }
                    Swal.fire({
                        icon: 'success',
                        title: 'Updated!',
                        text: `${firstName}'s data has been updated.`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/moneyTable')
                }
                else {
                    alert("Not updated");
                }


            }).catch(err => console.log(err));
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
              
                <label htmlFor="pass" style={{ direction: 'rtl' }} >رقم جواز السفر : </label>
                <input
                    id="pass"
                    type="text"
                    name="pass"
                    required
                    value={pass}
                    onChange={e => setPass(e.target.value)}
                    style={{ direction: 'rtl' }}
                />

                <label htmlFor="state" style={{ direction: 'rtl' }}> الدولة الوافد منها : </label>
                <div className="select-box">
                    <select className='hover-zoom'
                        id="state"
                        style={{ direction: 'ltr' }}
                        value={state}
                        required
                    onChange={e => setstate(e.target.value)}
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
                    onChange={e =>  setGrade(e.target.value)}
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

                <div className='n' style={{ direction: 'rtl' }} >
                    <label htmlFor="pay" style={{ direction: 'rtl' }} > متحصلات المصروفات الدراسية ($) : </label>

                    <label className='n1' htmlFor="pay1" style={{ direction: 'rtl' }} >  متحصلات المصروفات الدراسية (بالجنيه المصرى) : </label>
                </div>

                <div className='pay'>
                    <input
                        id="pay"
                        type="number"
                        name="pay"
                        value={pay}
                        onChange={e => setPay(e.target.value)}
                        style={{ direction: 'rtl' }}
                    />

                    <input
                        id="pay1"
                        type="number"
                        name="pay1"
                        value={pay1}
                        onChange={e => setPay1(e.target.value)}
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


                <label htmlFor="book" style={{ direction: 'rtl' }} >  متحصلات الخدمات ($) : </label>
                <input
                    id="book"
                    type="number"
                    name="book"
                    value={sertotal}
                    onChange={e => setSertotal(e.target.value)}
                    style={{ direction: 'rtl' }}
                />

                <label htmlFor="book" style={{ direction: 'rtl' }} > متحصلات الكتب ($) : </label>
                <input
                    id="book"
                    type="number"
                    name="book"
                    value={book}
                    onChange={e => setBook(e.target.value)}
                    style={{ direction: 'rtl' }}
                />

                <div className='n' style={{ direction: 'rtl' }} >
                    <label htmlFor="pay2" style={{ direction: 'rtl' }} >مديونيات المصروفات الدراسية ($): </label>
                    <label className='n11' htmlFor="pay3" style={{ direction: 'rtl' }} >مديونيات المصروفات الدراسية (بالجنيه المصرى): </label>
                </div>


                <div className='pay'>
                    <input
                        id="pay3"
                        type="number"
                        name="pay3"
                        value={debts}
                        onChange={e => setDebts(e.target.value)}
                        style={{ direction: 'rtl' }}
                    />

                    <input
                        id="pay2"
                        type="number"
                        name="pay2"
                        value={debt}
                        onChange={e => setDebt(e.target.value)}
                        style={{ direction: 'rtl' }}
                    />

                </div>


                <br></br>
                {/** *********************************************************************************************** */}

                <label htmlFor="book" style={{ direction: 'rtl' }} > مديونيات مصرى : </label>
                <input
                    id="book"
                    type="number"
                    name="book"
                    value={totaldebt}
                    onChange={e => setTotaldebts(e.target.value)}
                    style={{ direction: 'rtl' }}
                />

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

                <label htmlFor="telephone" style={{ direction: 'rtl' }} >التليفون : </label>
                <input
                    id="telephone"
                    type="tel"
                    name="telephone"
                    placeholder=" ادخل رقم تليفون الطالب   "
                    required
                    value={telephone}
                    onChange={e => setTelephone(e.target.value)}
                    style={{ direction: 'rtl' }}
                />

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

export default Edit2;

