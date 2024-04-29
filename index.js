const express = require('express');
const app = express();
const port = 5000;

app.get('/',(req,res) =>{
    res.send(`Coba Express`)
});

app.post('/',(req,res) =>{
    res.send(`Post`)
});

app.get('/mahasiswa/:nim', (req, res) => {
    const nim = req.params.nim;
    res.send(`mahasiswa dengan nim : ${nim} ditemukan`)
})

app.get('/mahasiswa/:nim/:semester', (req, res) => {
    const nim = req.params.nim;
    const semester = req.params.semester
    res.send(`mahasiswa dengan nim : ${nim} ditemukan dengan semester : ${semester}`)
})

app.get('/mahasiswa', (req, res) => {
    const nim = req.query.nim
    const semester = req.query.semester;
    res.send(`NIM : ${nim} ditemukan dan dengan semester : ${semester}`)
})

app.use(express.json());
app.post('/mahasiswa', (req, res) => {
    const nim = req.body.nim;
    const nama = req.body.nama;
    const angkatan = req.body.angkatan;
    const prodi = req.body.prodi;

    res.send(`data mahasiswa dengan NIM : ${nim} berhasi disimpan`)
})

app.put('/',(req,res) =>{
    res.send(`Update`)
});

app.delete('/',(req,res) =>{
    res.send(`Menghapus`)
});

app.listen(port,()=>(
    console.log(`server berjalan dengan localhost:${port}`)
))