import React from 'react';

function Header({ setIsAdding }) {
    return (
        <header>
            <h1 style={{textAlign: "center"}}>نظام إدارة الطلاب الوافدين</h1>
            <div style={{marginTop: '3px', marginBottom: '18px'}}>
                <button style={{backgroundColor: 'green'}} onClick={() => setIsAdding(true)} className='round-button'>to excel "in Header.js"</button>
            </div>

            <div style={{marginTop: '30px'}}>
                <input
                    style={{marginLeft: '12px'}}
                    className="muted-button"
                    type="button"
                    value="رجوع"
                    onClick={() => setIsAdding(false)}
                />
            </div>
        </header>
    );
}

export default Header;
