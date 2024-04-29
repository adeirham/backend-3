const express = require('express')
const mysql = require("mysql2")
const app = express();
const port = 5000

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'mahasiswa1'
});

connection.connect(error =>{
    if(error) throw error;
    console.log("database sudah terhubung")
})

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.post('/', (req, res) => {
    const mahasiswabaru = req.body;

    connection.query("INSERT INTO siswa SET ?", mahasiswabaru,(err) => {
        if (err) {
            console.log("error : ", err);
            res.status(500).send({
                message : err.message || "terjadi kesalahan saat insert data"
            });
        }
        else
        res.send(mahasiswabaru)
    })
})

app.get('/', (req, res) => {
    const qstring = "SELECT * FROM siswa";
    connection.query(qstring, (err,siswa) => {
        if (err) {
            console.log("error : ", err);
            res.status(500).send({
                message : err.message || "terjadi kesalahan saat insert data"
            });
        }
        else
        res.send(siswa)
    })
})

app.get('/:nim', (req, res) => {
    const qstring = `SELECT * FROM siswa WHERE nim = '${req.params.nim}'`;
    connection.query(qstring, (err,siswa) => {
        if (err) {
            console.log("error : ", err);
            res.status(500).send({
                message : err.message || "terjadi kesalahan saat insert data"
            });
        }
        else
        res.send(siswa)
    })
})

app.put('/:nim', (req, res) => {
    const nim = req.params.nim;
    const mhs = req.body;
    const qstring = `UPDATE siswa SET nama = '${mhs.nama}', angkatan = '${mhs.angkatan}', prodi = '${mhs.prodi}' WHERE nim = '${nim}'`
    connection.query(qstring, (err, siswa) =>{
        if (err){
            res.status(500).send({
                message : "error dalam UPDATE mahasiswa dengan nim" + nim
            });
        }
        else if (siswa.affectedRows == 0){
            res.status(404).send({
                message : `Not Found mahasiswa dengan nim ${nim}.`
            });
        }
        else {
            console.log("updating mahasiswa: ", {nim: nim, ...mhs});
            res.send({nim : nim, ... mhs});
        }
    })
})

app.delete('/:nim', (req, res) => {
    const nim = req.params.nim
    const qstring = `DELETE FROM siswa WHERE nim = '${nim}'`
    connection.query(qstring, (err,siswa) => {
        if (err) {
            console.log("error : ", err);
            res.status(500).send({
                message : "error dalam menghapus data mahasiswa dengan nim"
            });
        }
        else
        res.send(`mahasiswa dengan nim = ${nim} telah dihapus`)
    })
})

app.get('/', (req, res) => {
    res.send('Server Page')
})

app.listen(port, () => {
    console.log(`server berjalan pada localhost:${port}`)
});