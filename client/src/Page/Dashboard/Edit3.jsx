import  { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import React, { useEffect } from 'react';


function Edit3() {
    const {pass } = useParams();

    const [firstName, setFirstName] = useState();
    //const [pass, setPass] = useState();
    const [execuse, setExecuse] = useState();
    const [date1, setDate1] = useState();
const [state,setState]=useState();
    const [service1, setService1] = useState();
    const [service2, setService2] = useState();
    const [service3, setService3] = useState();
    const [dateSer1, setDateSer1] = useState();
    const [dateSer2, setDateSer2] = useState();
    const [dateSer3, setDateSer3] = useState();
    const [image1, setImage1] = useState();
    const [image2, setImage2] = useState();
    const [image3, setImage3] = useState();
    const [notes, setNotes] = useState();
    ///const id = selectedEmployee ? selectedEmployee.id : null;
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

    useEffect(() => {
        axios.get("http://localhost:3000/search3/" + pass)
            .then(
                res => {
                    console.log(res.data);
                    setFirstName(res.data[0].firstName);
                    //setPass(res.data[0].pass);
                    setExecuse(res.data[0].execuse);
                    setDate1(res.data[0].date1);
                    setService1(res.data[0].service1);
                    setService2(res.data[0].service2);
                    setService3(res.data[0].service3);
                    setDateSer1(res.data[0].dateSer1);
                    setDateSer2(res.data[0].dateSer2);
                    setDateSer3(res.data[0].dateSer3);
                    setImage1(res.data[0].image1);
                    setImage2(res.data[0].image2);
                    setImage3(res.data[0].image3);
                    setNotes(res.data[0].notes);

                })
            .catch(err => console.log(err));
    }, [pass]);

    const navigate = useNavigate();

    const handleCancel = () => {
        navigate(-1);
    };

    const handleImageUpload = e => {
        const file = e.target.files[0];
        // Handle image upload logic here
    };
    /*
        const handleUpdate = e => {
            e.preventDefault();
    
            if (!firstName || !pass || !telephone) {
                return Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'All fields are required.',
                    showConfirmButton: true
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
                debt,
                totaldebt,
                execuse,
                service1,
                service2,
                service3,
                dateSer1,
                dateSer2,
                dateSer3
            };
    
            for (let i = 0; i < employees.length; i++) {
                if (employees[i].id === id) {
                    employees.splice(i, 1, employee);
                    break;
                }
            }
    
            setEmployees(employees);
            setIsEditing(false);
    
            Swal.fire({
                icon: 'success',
                title: 'Updated!',
                text: `${employee.firstName} ${employee.lastName}'s data has been updated.`,
                showConfirmButton: false,
                timer: 1500
            });*/
    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put("http://localhost:3000/update3/" + pass, { firstName,  pass, execuse, date1, service1, service2, service3, dateSer1, dateSer2, dateSer3, image1, image2, image3, notes })
            .then(res => {
                if (res.data.updated) {
                    if (!firstName ||  !pass) {
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
                    navigate('/otherTable')
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
                    onChange={e => setFirstName(e.target.value)}
                    style={{ direction: 'rtl' }}
                />

                <label htmlFor="pass" style={{ direction: 'rtl' }} >رقم جواز السفر : </label>
                <input
                    id="pass"
                    type="text"
                    name="pass"
                    required
                    value={pass}
                    //onChange={e => setPass(e.target.value)}
                    style={{ direction: 'rtl' }}
                />

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
                <label htmlFor="execuse" style={{ direction: 'rtl' }}> عذر عن  :</label>
                <div class="select-box">
                    <select className='hover-zoom'
                        id="execuse"
                        style={{ direction: 'ltr' }}
                        value={execuse}
                        required
                        onChange={e => setExecuse(e.target.value)}
                    >
                        <option hidden>{execuse}</option>
                        <option >فصل دراسى أول</option>
                        <option >فصل دراسى ثانِ </option>
                        <option >السنة الدراسية بالكامل</option>

                    </select>

                </div>

                <label htmlFor="image1" style={{ direction: 'rtl' }}>ادخل صورة العذر  :</label>
                <input className='hover-zoom' type="file" accept="image/*" onChange={handleImageUpload} />
                <br></br>
                <br></br>
                <label htmlFor="service2" style={{ direction: 'rtl' }} > كشف طبى   : </label>
                <input
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

export default Edit3;