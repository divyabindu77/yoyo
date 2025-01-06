import React, {useEffect, useState} from 'react';
import axios from 'axios';
const App =()=>{
  const [patients,setPatients] = useState([]);
  const [data,setData] = useState({});
  const [editId, setEditId] = useState(null);
  const fetchPatients = async()=>{
    const response = await axios.get('http://localhost:5050/patients');
    setPatients(response.data);
  };
  useEffect(()=>{
    fetchPatients();
  },[]);
  const handleSubmit = async(e) =>{
    e.preventDefault();
    if (editId){
      await axios.put('http://localhost:5050/patients/${editId}',data);
      setEditId(null);
    }
    else{
      await axios.put('http://localhost:5050/patients',data);
    }
    setData({name:'',age:'',condition:''});
    fetchPatients();
  };
  const handleEdit = async(e) =>{
    setEditId(patients._id);
    setData({name:patients.name,age:patients.age,condition:patients.condition});
  };
  const handleDelete = async(e)=>{
    await axios.delete('http://localhost:5050/${id}');
    fetchPatients();
  };
  return(
    <div style={{padding: '20px'}}>
      <h1>***Patient Management***</h1>
      <form onSubmit={handleSubmit}>
        <input
            type="text"
            placeholder='Name'
            value={data.name}
            onChange={(e)=>setData({...data,name:e.target.value})}
            required/>
            <input
                type='number'
                placeholder='Age'
                value={data.age}
                onChange={(e)=>setData({...data, age:e.target.value})}
                required/>
                <input 
                    type='text'
                    placeholder='Condition'
                    value = {data.condition}
                    onChange={(e)=>setData({...data,condition:e.target.value})}
                    required/>
                    <button type="submit">{editId ? 'Update' : 'Add'}Patient</button>
      </form>
      <h2> Patient List</h2>
      <ul>
        {patients.map((patient)=>(
          <li key={patient._id}>
            {patient.name}-{patient.age}-{patient.condition}
            <button onClick={()=> handleEdit(patient)}>Edit</button>
            <button onClick={()=> handleDelete(patient._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default App;