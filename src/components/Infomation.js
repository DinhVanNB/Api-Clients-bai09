import axios from 'axios';
import {useParams, useNavigate} from 'react-router-dom';
import {useEffect,useState} from 'react';


export default function Infomation(){
    let navigate = useNavigate();
    let [contacts,setContacts]= useState({});
    let {contactId} = useParams();
    useEffect(()=>{
        if(contactId){
            axios.get(`https://63d3f1efa93a149755b6945d.mockapi.io/api/users/${contactId}`)
            .then(res=>setContacts(res.data))
            .catch(e=>alert(e))
        }
    }
    ,[])

    const onChange=(e)=>{
        setContacts({...contacts,[e.target.name]:e.target.value});
    }
    const onClick=(e)=>{
        e.preventDefault();
        if(contactId){
            axios.put(`https://63d3f1efa93a149755b6945d.mockapi.io/api/users/${contacts.id}`,contacts)
            .then(res=>{alert(`Sửa thành công tại id: ${res.data.id}`)
                navigate('/');
            })
            .catch(e=>console.log(e))
        }
        else{
            axios.post('https://63d3f1efa93a149755b6945d.mockapi.io/api/users/',contacts)
            .then(res=>{alert(`Thêm mới thành công : "${res.data.name}"`)
                navigate('/');
            })
            .catch(e=>console.log(e))
        }
    
    }

    const getPic= ({target})=>{
        if(target.files[0]){
            const reader = new FileReader();
            reader.addEventListener("load",function(){
                setContacts({...contacts,'image': this.result});
            });
            reader.readAsDataURL(target.files[0])
         }
    }


    return(
        <div className='container pt-5'>
            <h3>{contactId? 'Edit': 'Add Contact'}</h3>
            <div className='w-25 mt-5'>
                <form onSubmit={onClick} >
                    <div className='hstack'>
                        <div>
                                <img 
                                width="50px" 
                                height="50px" 
                                className='rounded-circle 
                                    list-group-item-dark
                                    d-inline-block' 
                                    src= { contacts.image|| ""}/>
                        </div>
                        <div className='d-inline-block w-25 mx-2'>
                        <input 
                            onChange={getPic}
                            type="file" 
                            name="file" 
                            className="form-control
                                        inline-block "  />
                        </div>
                    </div>
                    <label className='mt-3'>Name</label>
                    <input 
                        onChange={onChange}
                        name="name"
                        required  
                        type="text" 
                        defaultValue={contactId? contacts.name:''} 
                        className="form-control" />
                    <label className='mt-3' >Email</label>
                    <input 
                        onChange={onChange}
                        name="email"
                        required 
                        type="email" 
                        defaultValue={contactId? contacts.email : ''}
                        className="form-control" />
                    <label className='mt-3' >Phone</label>
                    <input 
                        onChange={onChange}
                        name="phone"
                        required 
                        type="tel" 
                        defaultValue={contactId? contacts.phone : ''}
                        className="form-control" />
                    <div className='text-center'>
                        <button 
                            className='btn btn-success mt-3 ' 
                            type='submit'>
                            {!contactId? 'Add':'Save'}
                        </button>
                    </div>
                </form>
               
            </div>
        </div>
    )
}