import axios from 'axios';
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';


export default function Home(){
   let [contacts, getContact] = useState([]);
   let navigate = useNavigate();
   useEffect(
    ()=>{
        axios.get("https://my-json-server.typicode.com/codegym-vn/mock-api-contacts/contacts")
    .then(res=>getContact(res.data))
    .catch(e=>alert(e))
    }
   ,[])

   const onClick=(e)=>{
        e.target.id ? navigate(`/edit/${e.target.id}`): navigate(`/add`)
   }
    
   const onDelete=(e)=>{
        if(window.confirm(`Bạn có chắc chắn muốn xóa : ${e.target.id}`)){
            getContact(contacts.filter(contact=> +contact.id!==+e.target.id));
        }
   }

    return(
        <div className='container p-5'>
            <h4 className='d-inline-block'>Contacts</h4>
            <button onClick={onClick} 
                    className='btn btn-success float-end'>Add Contact</button>
            <div className='container mt-5'>
                <table 
                    className="table 
                                table-striped table-inverse 
                                table-responsive">
                    <thead className="thead-inverse">
                        <tr>
                            <th >Name</th>
                            <th  className='text-center'>Email</th>
                            <th className='text-center'>Phone</th>
                            <th style={{width:"15%"}}  
                                className='text-center'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            contacts.map(contact=>(
                                <tr key={contact.id}>
                                    <td 
                                        className='' >
                                        <img 
                                            className='rounded-5'
                                            width="35px" 
                                            height="35px" 
                                            src={contact.image||''}
                                            alt="" />
                                        {contact.name}
                                    </td>
                                    <td 
                                        className='text-center'>
                                        {contact.email}
                                    </td>
                                    <td 
                                        className='text-center'>
                                        {contact.phone}
                                    </td>
                                    <td  
                                        className=' btn-group 
                                                    d-flex flex-row 
                                                    justify-content-center'>
                                        <button id={contact.id} 
                                                onClick={onClick}
                                                className=' btn btn-warning '>
                                                 Edit
                                        </button>
                                        <button id={contact.id} 
                                                onClick={onDelete}
                                                 className=' btn btn-danger'
                                                >Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                
                </table>
            </div>
        </div>
    )
}