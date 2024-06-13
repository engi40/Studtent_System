import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import multer from 'multer'
import path from 'path'

const salt = 10;
/*
const storage = multer.diskStorage({
    destination: function (req, file, cb)  {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }

})
const upload = multer({

    storage: storage
})*/
//const session = require('express-session');
//const uuid = require('uuid');
const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}


));
app.use(cookieParser());

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: 'students'

})
/*
// Use session middleware
app.use(session({
    genid: (req) => {
        return uuid(); // Generate unique session IDs
    },
    secret: 'your_secret_key', // Secret key for session encryption
    resave: false,
    saveUninitialized: true
}));

// Middleware to log requests
app.use((req, res, next) => {
    // Check if user is authenticated
    const userId = req.session.userId || 'anonymous';
    
    // Log user's action along with their identifier
    console.log(`User ${userId} performed action: ${req.method} ${req.url}`);
    
    next();
});*/
const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ error: "You are not authenticated" });
    }
    else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) {
                return res.json({ error: "Token is not correct" });
            }
            else {
                req.email = decoded.email;
                next();
            }
        })
    }
}
app.get("/home", verifyUser, (req, res) => {
    return res.json({ status: "success", email: req.email });
});
app.get('/filteredData', (req, res) => {
    const { query1, query2, query3, query4, query5, filter1, filter2, filter3, filter4, filter5, startDate, endDate } = req.query;
    let queryString = 'SELECT * FROM studentData WHERE 1';
    let values = [];

    // Building the query string based on the provided filters and queries
    if (query1) {
        queryString += ' AND id LIKE ?';
        values.push(`%${query1}%`);
    }
    if (query2) {
        queryString += ' AND firstName LIKE ?';
        values.push(`%${query2}%`);
    }
    if (query3) {
        queryString += ' AND pass LIKE ?';
        values.push(`%${query3}%`);
    }
    if (query4) {
        queryString += ' AND email LIKE ?';
        values.push(`%${query4}%`);
    }
    if (query5) {
        queryString += ' AND telephone LIKE ?';
        values.push(`%${query5}%`);
    }
    if (filter1) {
        queryString += ' AND state = ?';
        values.push(filter1);
    }
    if (filter2) {
        queryString += ' AND gender = ?';
        values.push(filter2);
    }
    if (filter3) {
        queryString += ' AND grade = ?';
        values.push(filter3);
    }
    if (filter4) {
        queryString += ' AND major = ?';
        values.push(filter4);
    }
    if (filter5) {
        queryString += ' AND option = ?';
        values.push(filter5);
    }
    if (startDate && endDate) {
        queryString += ' AND date1 BETWEEN ? AND ? ';
        values.push(startDate, endDate);
    }
    if (startDate) {
        queryString += ' AND date1 >= ? ';
        values.push(startDate);
    }
    if (endDate) {
        queryString += ' AND date1 <= ? ';
        values.push(endDate);
    }
    pool.query(queryString, values, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

/*
app.get('/filteredData', (req, res) => {
    const { q } = req.query;
  let query = 'SELECT * FROM studentData WHERE ID LIKE ? ';
  let values = [`%${q}%`]; // Adjust column names as needed
  pool.query(query, values, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
*/
// Filter data based on request parameters
//const { firstName, ID, state, secondary, pass, email, gender, grade, major, date1, option, address, telephone,notes, startDate, endDate } = req.body;
//let query = "SELECT * FROM studentData WHERE ID LIKE ? AND  firstName LIKE ? AND pass LIKE ? AND email LIKE ? AND  telephone LIKE ? AND state = ? AND gender = ? AND  grade = ? AND major = ? AND option = ? AND address = ? AND date1 BETWEEN ? AND ?";
//let values = [`%${ID}%`, `%${firstName}%`, `%${pass}%`, `%${email}%`, `%${telephone}%`, state, gender,  grade, major, option,address, startDate, endDate];
//pool.query(query, values, (err, result) => {
//if (err) throw err;
// res.json(result);
//});


app.post('/signup', (req, res) => {
    const sql = "INSERT INTO users(`email`,`password`) VALUES(?)";
    const saltRounds = 10; // Define the number of salt rounds for bcrypt

    bcrypt.hash(req.body.password.toString(), saltRounds, (err, hash) => {
        if (err) {
            return res.status(500).json({ error: "Error in hashing the password" });
        }
        const values = [req.body.email, hash];
        pool.query(sql, [values], (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Inserting data error in server" });
            }
            return res.json({ status: "success" });
        });
    });
});
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    const sql = "SELECT * FROM users WHERE email=?";
    pool.query(sql, [email], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Login error in server" });
        }
        if (data.length === 0) {
            return res.status(401).json({ error: "No user with provided email" });
        }

        const user = data[0];
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Password comparison error" });
            }
            if (result) {
                const token = jwt.sign({ email: user.email }, "jwt-secret-key", { expiresIn: '1h' });
                res.cookie('token', token, { httpOnly: true });
                return res.status(200).json({ status: "success", token });
            } else {
                return res.status(401).json({ error: "Incorrect password" });
            }
        });
    });
});

/*
app.post('/add', (req, res) => {
  const sql = "INSERT INTO studentData(`firstName`, `id`, `state`, `pass`, `gender`, `major`, `grade`, `date1`, `type`, `discount`, `pay`, `pay1`, `date2`, `pay2`, `pay3`, `service1`, `service2`, `service3`, `dateser1`, `dateser2`, `dateser3`, `options`, `address`, `telephone`, `dateBook`, `book`, `notes`) VALUES (?)";
  const values = [
      req.body.firstName,
      req.body.ID,
      req.body.state,
      req.body.pass,
      req.body.gender,
      req.body.major,
      req.body.grade,
      req.body.date1,
      req.body.type,
      req.body.discount,
      req.body.pay,
      req.body.pay1,
      req.body.date2,
      req.body.pay2,
      req.body.pay3,
      req.body.service1,
      req.body.service2,
      req.body.service3,
      req.body.dateSer1,
      req.body.dateSer2,
      req.body.dateSer3,
      req.body.option,
      req.body.address,
      req.body.telephone,
      req.body.dateBook,
      req.body.book,
      req.body.notes
  ];

  db.query(sql, [values], (err, data) => {
      if (err) {
          console.error("Error occurred during database query:", err);
          return res.status(500).json({ error: "An error occurred while inserting data into the database" });
      }
      console.log("Data inserted successfully into the database");
      return res.status(200).json({ success: true, message: "Data inserted successfully" });
  });
});

*/
// Route to handle POST requests to insert data into multiple tables
app.post('/add', (req, res) => {
    const sql1 = `INSERT INTO studentData (firstName, ID, state, secondary, pass, email, gender, grade, major, date1, option, address, telephone, notes) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    const sql2 = `INSERT INTO studentExpenses (payyys, Type1, type, discount, pay, pay1, date2, pay2, pay3, book, dateBook, pass, notes) VALUES (?, ?,?, ?,?, ?,?, ?,?, ?,?, ?, ?)`;
    const sql3 = `INSERT INTO studentServices (pass, service1, service2, service3, dateSer1, dateSer2, dateSer3, execuse, image1, image2, image3, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const sql4 = `INSERT INTO studentDebts (pay, pay1, date2, sertotal, book, debts, debt, totaldebt, pass, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values1 = [req.body.firstName, req.body.ID, req.body.state,req.body.secondary, req.body.pass, req.body.email, req.body.gender, req.body.grade, req.body.major, req.body.date1, req.body.option, req.body.address, req.body.telephone, req.body.notes];
    const values2 = [req.body.payyys, req.body.Type1, req.body.type, req.body.discount, req.body.pay, req.body.pay1, req.body.date2, req.body.pay2, req.body.pay3, req.body.book, req.body.dateBook, req.body.pass, req.body.notes];
    const values3 = [req.body.pass, req.body.service1, req.body.service2, req.body.service3, req.body.dateSer1, req.body.dateSer2, req.body.dateSer3, req.body.execuse, req.body.image1 || null, req.body.image2 || null, req.body.image3 || null, req.body.notes];
    const values4 = [req.body.pay, req.body.pay1, req.body.date2, req.body.sertotal || null, req.body.book, req.body.debts || null, req.body.debt || null, req.body.totaldebt || null, req.body.pass, req.body.notes];
    pool.getConnection((err, connection) => {
        if (err) {
            console.error("Error occurred while getting database connection:", err);
            return res.status(500).json({ error: "An error occurred while getting database connection" });
        }
        connection.beginTransaction(err => {
            if (err) {
                console.error("Error occurred while beginning transaction:", err);
                connection.release();
                return res.status(500).json({ error: "An error occurred while beginning transaction" });
            }
            connection.query(sql1, values1, (err, result1) => {
                if (err) {
                    console.error("Error occurred during table1 insertion:", err);
                    connection.rollback(() => {
                        connection.release();
                        return res.status(500).json({ error: "An error occurred while inserting data into table1" });
                    });
                } else {
                    connection.query(sql2, values2, (err, result2) => {
                        if (err) {
                            console.error("Error occurred during table2 insertion:", err);
                            connection.rollback(() => {
                                connection.release();
                                return res.status(500).json({ error: "An error occurred while inserting data into table2" });
                            });
                        } else {
                            connection.query(sql3, values3, (err, result3) => {
                                if (err) {
                                    console.error("Error occurred during third table insertion:", err);
                                    connection.rollback(() => {
                                        connection.release();
                                        return res.status(500).json({ error: "An error occurred while inserting data into third table" });
                                    });
                                } else {
                                    connection.query(sql4, values4, (err, result4) => {
                                        if (err) {
                                            console.error("Error occurred during third table insertion:", err);
                                            connection.rollback(() => {
                                                connection.release();
                                                return res.status(500).json({ error: "An error occurred while inserting data into third table" });
                                            });
                                        } else {
                                            connection.commit(err => {
                                                if (err) {
                                                    console.error("Error occurred while committing transaction:", err);
                                                    connection.rollback(() => {
                                                        connection.release();
                                                        return res.status(500).json({ error: "An error occurred while committing transaction" });
                                                    });
                                                } else {
                                                    console.log("Data inserted successfully into all tables");
                                                    connection.release();
                                                    return res.status(200).json({ success: true, message: "Data inserted successfully" });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        });
    });
});

app.get("/logout", (req, res) => {
    res.clearCookie('token')
});









app.post('/addform', (req, res) => {
    const { firstName, id, state, pass, gender, major, grade, date1, option, address, telephone, notes, dateBook, book, type, discount, pay, pay1, date2, pay2, pay3, service1, service2, service3, dateSer1, dateSer2, dateSer3 } = req.body;

    db.beginTransaction(function (err) {
        if (err) {
            return res.status(500).json({ error: 'Failed to start transaction' });
        }

        const studentData = { firstName, ID: id, state, pass, gender, major, grade, date1, option, address, telephone, notes };
        db.query("INSERT INTO studentData SET ?", studentData, function (err, studentDataResult) {
            if (err) {
                return rollbackAndSendError(res, db, 'studentData', err);
            }

            const studentID = studentDataResult.insertId; // Retrieve auto-generated studentID
            const studentExpenses = { studentID, dateBook, book, type, discount, pay, pay1, date2 };
            db.query("INSERT INTO studentExpenses SET ?", studentExpenses, function (err, studentExpensesResult) {
                if (err) {
                    return rollbackAndSendError(res, db, 'studentExpenses', err);
                }

                const studentServices = { studentID, service1, service2, service3, dateSer1, dateSer2, dateSer3 };
                db.query("INSERT INTO studentServices SET ?", studentServices, function (err, studentServicesResult) {
                    if (err) {
                        return rollbackAndSendError(res, db, 'studentServices', err);
                    }

                    const studentDebts = { studentID, pay2, pay3 };
                    db.query("INSERT INTO studentDebts SET ?", studentDebts, function (err, studentDebtsResult) {
                        if (err) {
                            return rollbackAndSendError(res, db, 'studentDebts', err);
                        }

                        db.commit(function (err) {
                            if (err) {
                                return rollbackAndSendError(res, db, 'transaction', err);
                            }
                            console.log('Transaction Completed Successfully.');
                            res.json({ success: true });
                        });
                    });
                });
            });
        });
    });
});

function rollbackAndSendError(res, db, tableName, err) {
    db.rollback(function () {
        res.status(500).json({ error: `Failed to insert into ${tableName}`, details: err });
    });
}

app.get('/info', (req, res) => {
    const sql = "SELECT * FROM studentData";
    pool.query(sql, (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    })
});

app.get('/list', (req, res) => {

    const sql = "SELECT studentExpenses.ID,studentExpenses.type,studentExpenses.Type1, studentData.firstName,studentData.state,studentData.grade,studentData.option, studentData.date1,studentExpenses.payyys,studentExpenses.discount,studentExpenses.pay,studentExpenses.pay1,studentExpenses.date2,(studentExpenses.payyys-studentExpenses.pay) as pay2,(studentExpenses.payyys-studentExpenses.pay1)as pay3,studentExpenses.book,studentExpenses.dateBook,studentData.notes FROM studentExpenses INNER JOIN studentData ON studentData.pass = studentExpenses.pass";
    pool.query(sql, (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    })
});
app.get('/moneyTable', (req, res) => {

    const sql = "SELECT studentData.ID,  studentData.firstName,studentData.pass,studentData.state,studentData.grade, studentData.date1,studentDebts.pay,studentDebts.pay1,studentDebts.date2,studentDebts.sertotal,studentDebts.book,studentDebts.debts,studentDebts.debt,studentDebts.totaldebt,studentData.option,studentData.telephone,studentData.notes FROM studentData INNER JOIN studentDebts ON studentData.pass = studentDebts.pass";
    pool.query(sql, (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    })
});
app.get('/otherTable', (req, res) => {

    const sql = "SELECT  studentData.firstName,studentServices.pass, studentData.date1,studentServices.service1,studentServices.service2,studentServices.service3,studentServices.dateSer1,studentServices.dateSer2,studentServices.dateSer3,studentServices.execuse,studentServices.image1,studentServices.image2,studentServices.image3,studentData.notes FROM studentData INNER JOIN studentServices ON studentData.pass = studentServices.pass";
    pool.query(sql, (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    })
});

app.get('/search/:id', (req, res) => {
    const sql = "SELECT * FROM studentData WHERE id=?";
    const id = req.params.id;
    pool.query(sql, [id], (err, result) => {
        if (err) return res.json("Error");
        return res.json(result);
    })
})
app.put('/update/:id', (req, res) => {
    const sql = "UPDATE studentData SET `firstName`=?, `state`=?, `pass`=?, `email`=?, `gender`=?, `grade`=?, `major`=?, `date1`=?, `option`=?, `address`=?, `telephone`=?, `notes`=? WHERE id=?";
    const id = req.params.id;
    const { firstName, state, pass, email, gender, grade, major, date1, option, address, telephone, notes } = req.body;
    const values = [firstName, state, pass, email, gender, grade, major, date1, option, address, telephone, notes, id];
    pool.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error inside server:", err);
            return res.status(500).json({ error: "Error updating data" });
        }
        return res.json({ updated: true });
    });
})
app.delete('/delete/:id', (req, res) => {
    const sql = "DELETE FROM studentData WHERE id=?";
    const id = req.params.id;


    pool.query(sql, [id], (err, data) => {
        if (err) {
            console.error("Error inside server:", err);
            return res.status(500).json({ error: "Error deleting data" });
        }
        return res.json("Deleted Successfully");
    });
})

app.get('/search1/:id', (req, res) => {
    const sql = "SELECT studentExpenses.ID, studentData.firstName,studentExpenses.type,studentExpenses.Type1, studentData.state, studentData.grade, studentData.option, studentData.date1, studentExpenses.payyys, studentExpenses.discount, studentExpenses.pay, studentExpenses.pay1, studentExpenses.date2, studentExpenses.pay2, studentExpenses.pay3, studentExpenses.book, studentExpenses.dateBook, studentData.notes FROM studentExpenses INNER JOIN studentData ON studentData.pass = studentExpenses.pass WHERE studentExpenses.ID = ?";
    const id = req.params.id;
    pool.query(sql, [id], (err, result) => {
        if (err) return res.json("Error");
        return res.json(result);
    })
})
app.put('/update1/:id', (req, res) => {
    const sql = `UPDATE studentExpenses AS se
        JOIN studentData AS sd ON se.ID = sd.id
        SET 
            sd.state = ?,
            sd.grade = ?,
            sd.date1 = ?,
            se.Type1 = ?,
            se.type = ?,
            se.discount = ?,
            se.pay = ?,
            se.pay1 = ?,
            se.date2 = ?,
            se.pay2 = ?,
            se.pay3 = ?,
            sd.option = ?,
            se.book = ?,
            se.dateBook = ?,
            sd.notes = ?
        WHERE se.ID = ?`;

    const id = req.params.id;
    const { state, grade, date1, Type1, type, discount, pay, pay1, date2, pay2, pay3, option, book, dateBook, notes } = req.body;
    const values = [state, grade, date1, Type1, type, discount, pay, pay1, date2, pay2, pay3, option, book, dateBook, notes, id];
    pool.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error inside server:", err);
            return res.status(500).json({ error: "Error updating data" });
        }
        return res.json({ updated: true });
    });
})
app.delete('/delete1/:id', (req, res) => {
    const sql = "DELETE studentData FROM studentData JOIN studentExpenses ON studentData.pass = studentExpenses.pass AND studentData.id=?";
    const id = req.params.id;


    pool.query(sql, [id], (err, data) => {
        if (err) {
            console.error("Error inside server:", err);
            return res.status(500).json({ error: "Error deleting data" });
        }
        return res.json("Deleted Successfully");
    });
})
app.get('/search2/:pass',(req,res)=>{
    const pass=req.params.pass;
    const sql="SELECT studentData.firstName,studentData.pass,studentData.state,studentData.grade, studentData.date1,studentDebts.pay,studentDebts.pay1,studentDebts.date2,studentDebts.book,studentData.option,studentData.telephone,studentData.notes FROM studentData JOIN studentDebts ON studentData.id = studentDebts.ID WHERE studentDebts.pass=?";
 
    pool.query(sql,[pass],(err,result)=>{
        if(err) return res.json("Error");
        return res.json(result);
    })
})
app.put('/update2/:pass', (req, res) => {
    const sql = `UPDATE studentDebts AS se
        JOIN studentData AS sd ON se.ID = sd.id
        SET 
            sd.state = ?,
            sd.grade = ?,
            sd.date1 = ?,
            sd.telephone = ?,  -- Added comma here
            se.pay = ?,
            se.pay1 = ?,
            se.date2 = ?,
            sd.option = ?,
            se.book = ?,
            sd.notes = ?
        WHERE se.pass = ?`;

    const pass = req.params.pass;
    const { state, grade, date1, pay, pay1,  date2, book, option, telephone,notes } = req.body;
    const values = [state, grade, date1, telephone, pay, pay1, date2,   option, book,  notes, pass];
    pool.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error inside server:", err);
            return res.status(500).json({ error: "Error updating data" });
        }
        return res.json({ updated: true });
    });
});

app.delete('/delete2/:pass', (req, res) => {
    const pass = req.params.pass;

    

    const sql = "DELETE studentData FROM studentData JOIN studentDebts ON studentData.pass = studentDebts.pass AND studentData.pass=?";

    pool.query(sql, [pass], (err, data) => {
        if (err) {
            console.error("Error inside server:", err);
            return res.status(500).json({ error: "Error deleting data" });
        }
        return res.json("Deleted Successfully");
    });
});


app.get('/search3/:pass', (req, res) => {
    const sql = "SELECT studentData.firstName,studentServices.pass, studentData.date1,studentServices.service1,studentServices.service2,studentServices.service3,studentServices.dateSer1,studentServices.dateSer2,studentServices.dateSer3,studentServices.execuse,studentServices.image1,studentServices.image2,studentServices.image3,studentData.notes FROM studentData INNER JOIN studentServices ON studentData.id = studentServices.ID WHERE studentServices.pass=?";
    const pass = req.params.pass;
    pool.query(sql, [pass], (err, result) => {
        if (err) return res.json("Error");
        return res.json(result);
    })
})
app.put('/update3/:pass', (req, res) => {


    const sql=`UPDATE studentServices AS se
        JOIN studentData AS sd ON se.ID = sd.id
        SET 
         
           sd.firstName=?,
            se.execuse=?,
             sd.date1=?, 
             se.service1=?,
              se.service2=?, 
              se.service3=?,
               se.dateSer1=?, 
               se.dateSer2=?,
                se.dateSer3=?,
                se.image1=?, 
                se.image2=?,
                 se.image3=?, 
                 sd.notes=?
        WHERE se.pass = ?`;
    const pass = req.params.pass;
    const { firstName, execuse, date1, service1, service2, service3, dateSer1, dateSer2, dateSer3, image1, image2, image3, notes } = req.body;
    const values = [firstName, execuse, date1, service1, service2, service3, dateSer1, dateSer2, dateSer3, image1, image2, image3, notes, pass];
    pool.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error inside server:", err);
            return res.status(500).json({ error: "Error updating data" });
        }
        return res.json({ updated: true });
    });
})
app.delete('/delete3/:pass', (req, res) => {

    const sql = "DELETE studentData FROM studentData JOIN studentServices ON studentData.pass = studentServices.pass AND studentData.pass=?";
 
    const pass = req.params.pass;

    pool.query(sql, [pass], (err, data) => {
        if (err) {
            console.error("Error inside server:", err);
            return res.status(500).json({ error: "Error deleting data" });
        }
        return res.json("Deleted Successfully");
    });
})
app.listen(3000, () => {
    console.log("Server is running");
})
