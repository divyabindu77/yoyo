const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const hello = express();

// Middleware
hello.use(cors());
hello.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/patientsDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const patientSchema = new mongoose.Schema({
    name: String,
    age: Number,
    condition: String,
});

const Patient = mongoose.model('Patient', patientSchema);

// Routes
hello.get('/patients', async (req, res) => {
    const patients = await Patient.find();
    res.json(patients);
});

hello.post('/patients', async (req, res) => {
    const patient = new Patient(req.body);
    await patient.save();
    res.json({ message: 'Patient added successfully' });
});

hello.put('/patients/:id', async (req, res) => {
    const { id } = req.params;
    await Patient.findByIdAndUpdate(id, req.body);
    res.json({ message: 'Patient updated successfully' });
});

hello.delete('/patients/:id', async (req, res) => {
    const { id } = req.params;
    await Patient.findByIdAndDelete(id);
    res.json({ message: 'Patient deleted successfully' });
});

const PORT = 5050;
hello.listen(PORT, () => console.log(`Server running on port ${PORT}`));
