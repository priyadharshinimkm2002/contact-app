import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { InfinitySpin } from "react-loader-spinner";

function Update() {
    const [data, setData] = useState('');
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [title, setTitle] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');
    const [img, setImage] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    window.addEventListener("load", function () {
        const query_data = window.location.search;
        const urlParams = new URLSearchParams(query_data);
        const user_id = urlParams.get('Id');
        //  console.log(query_data)

        // this.alert(user_id);
        // const value =  localStorage.setItem('Id',user_id);

        //   const value = localStorage.getItem('Id');
        // this.alert(value);

        //  fetch('http://localhost:8000/api/find_contact/'+user_id)
        // .then((res)=>res.json())
        // .then((res)=>(setName(res.data.name)),[])
        // alert(name)
        if (!user_id) {
            this.window.location = '/';
        }
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/Contact/ContactDetails/' + user_id);
                const data = await response.json();
                //   setData(data);
                console.log(data)
                if (data.statusCode === 200) {
                    // this.alert('200')
                    // this.alert(data.data.mobileNumber)
                    // this.alert(data.data.name)
                    setData(data.data._id)
                    setName(data.data.name);
                    setCompany(data.data.company);
                    setTitle(data.data.Title);
                    setMobileNumber(data.data.mobileNumber);
                    setEmail(data.data.Email);
                    setImage(data.data.profilepath);
                    //this.alert(data.data._id)
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleSelectImage = (event) => {
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.addEventListener("load", () => {
            setImage(fileReader.result);
        });
        fileReader.readAsDataURL(file);
    }

    const handleSubmit = async (e) => {
        // const query_data=window.location.search;
        // const urlParams=new URLSearchParams(query_data);
        //console.log(query_data)+
        //  const  user_id=urlParams.get('Id')
        //alert(data);
        // const value = localStorage.getItem('Id');
        e.preventDefault();
      
        if (name === '') {
            alert('Name must be required');
        }
        else if (mobileNumber === '') {
            alert('Mobile number must be required');
        }
        else if (!emailPattern.test(email)) {
            alert('Enter a valid email');
        }
        else if (mobileNumber.length != 10) {
            alert('MobileNumber must be 10 digit');
        }
        else {
            try {
                setLoading(false);
                const response = await fetch(`http://localhost:8000/api/Contact/UpdateContact/${data}`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        "name": name,
                        "company": company,
                        "Title": title,
                        "mobileNumber": mobileNumber,
                        "Email": email,
                        "profilepath": img
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                debugger;
                const result = await response.json();
                if (result.statusCode === 200) {
                    // alert('yes');
                    setLoading(false);
                    window.location = '/';
                }
            } catch (error) {
                alert(error)
            }
        }
        //console.log(result);
    }
    const handleDelete = async (e) => {
        //alert(data);
        e.preventDefault();
        const check = window.confirm("Are you sure you want to delete this Number?")
        if (check) {
            const response = await fetch(`http://localhost:8000/api/Contact/DeleteContact/${data}`, {
                method: 'DELETE',
            })
            const result = await response.json();
            setData('')
            setName('');
            setCompany('');
            setTitle('');
            setMobileNumber('');
            setEmail('');
            setImage('');
            if (result.statusCode === 200) {
                window.location = '/';
            }
            //   console.log(result);
            //const response= await fetch(`/api/Contact/DeleteContact/${}`);
        }

    }
    if (loading) {

        return <div className="d-flex justify-content-center pt-5">   <InfinitySpin
            visible={true}
            width="200"
            color="#4fa94d"
            ariaLabel="infinity-spin-loading"
        />
        </div>
    }
    return (
        <>
            <div className="container">
                <div className="row pt-5 d-flex justify-content-center align-items-center">
                    <div className="col-lg-5">
                        <div className="card">
                            <div className="text-center py-2">
                                {img ?
                                    <label htmlFor="file"><img src={img} style={{ "width": "70px", "height": "70px" }} alt="img" className='rounded-circle' /></label> :
                                    <label htmlFor="file"><FaUserCircle className="text-secondary" style={{ "width": "70px", "height": "70px" }} /></label>}
                                <input type="file" id="file" style={{ display: "none" }} onChange={handleSelectImage} />
                            </div>
                            <div className="card-body">
                                <form className="px-4">
                                    <div className="form-group py-1">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="new-off" className="form-control" />
                                    </div>
                                    {/* <div class="form-outline input-group py-3 w-auto">
                                            <span className="input-group-text w-25">Company</span><input id="form1" type="search" class="form-control" />
                                        </div>
                                 

                                    <div class="form-outline input-group w-auto py-3">
                                        <span className="input-group-text w-25">Title</span><input id="form1" type="search" class="form-control" />

                                    </div> */}
                                    <div className="form-group py-1">
                                        <label htmlFor="Company" className="form-label">Company</label>
                                        <input type="text" id="Company" name="Company" value={company} onChange={(e) => setCompany(e.target.value)} autoComplete="new-off" className="form-control" />
                                    </div>
                                    <div className="form-group py-1">
                                        <label htmlFor="Title" className="form-label">Title</label>
                                        <input type="text" id="Title" autoComplete="new-off" value={title} onChange={(e) => setTitle(e.target.value)} name="Title" className="form-control" />
                                    </div>
                                    <div className="form-group py-1">
                                        <label htmlFor="mobile" className="form-label">Mobile Number</label>
                                        <div className="form-outline input-group w-auto">
                                            <span className="input-group-text">+91</span>
                                            <input type="text" id="mobile" readOnly onChange={(e) => setMobileNumber(e.target.value)} name="mobileNumber" value={mobileNumber} autoComplete="new-off" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="form-group py-1">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="text" id="email" onChange={(e) => setEmail(e.target.value)} value={email} name="email" autoComplete="new-off" className="form-control" />
                                    </div>
                                    <div className="form-group float-end d-flex py-1">
                                        <div className="px-2">
                                            <a href="/" className="btn btn-primary px-2">Cancel</a>
                                        </div>
                                        <div >
                                            <button className="btn btn-success px-2" onClick={handleSubmit}>Submit</button>
                                        </div>
                                    </div>
                                    <div className="pt-5 form-group">
                                        <h6><a href="#" className="text-decoration-none text-danger" onClick={handleDelete}>Remove From contact?</a></h6>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Update;