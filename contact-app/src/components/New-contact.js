import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { InfinitySpin } from "react-loader-spinner";
import InputMask from 'react-input-mask';


function NewContact() {
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [title, setTitle] = useState('');
    const [mobileNumber, setMobilenumber] = useState("");
    const [email, setEmail] = useState('');
    const [img, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleMobilenum = event => {
        event.preventDefault();
        console.log("target value", event.target.value);
        const result = event.target.value.replace(/\D/g, '');
        console.log("result", result);
        setMobilenumber(result);
        console.log("mobile", mobileNumber);
    };

    const handleSelectImage = (event) => {
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.addEventListener("load", () => {
            setImage(fileReader.result);
        });
        fileReader.readAsDataURL(file);
    }
    const handleSubmit = async (e) => {
        // alert(company);
        // alert(title);
        e.preventDefault();
        //   if(name.length>0&&mobileNumber.length>0&&emailPattern.test(email)){
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
                const response = await fetch('http://localhost:8000/api/Contact/AddContact', {
                    method: 'POST',
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
                if (result.statusCode ===201) {
                    window.location = '/';
                }
                else {
                    alert(result.message);
                }
            }
            catch (error) {
                setLoading(true);
                alert(error)
            }
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

                                {/* <FaUserCircle className="text-secondary" /> */}
                            </div>
                            <div className="card-body">
                                <form className="px-4">

                                    <div className="form-group py-1">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input type="text" id="name" name="name" onChange={(e) => setName(e.target.value)} autoComplete="new-off" className="form-control" />
                                    </div>
                                    <div className="form-group py-1">
                                        <label htmlFor="Company" className="form-label">Company</label>
                                        <input type="text" id="Company" name="Company" onChange={(e) => setCompany(e.target.value)} autoComplete="new-off" className="form-control" />
                                    </div>
                                    <div className="form-group py-1">
                                        <label htmlFor="Title" className="form-label">Title</label>
                                        <input type="text" id="Title" onChange={(e) => setTitle(e.target.value)} autoComplete="new-off" name="Title" className="form-control" />
                                    </div>
                                    <div className="form-group py-1">
                                        <label htmlFor="mobile" className="form-label">Mobile Number</label>
                                        <div className="form-outline input-group w-auto">
                                            <span className="input-group-text">+91</span><InputMask type="text" minLength={10} onChange={handleMobilenum} mask="9999999999"
                                                maskChar={null} id="mobile" name="mobile" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="form-group py-1">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="text" id="email" onChange={(e) => setEmail(e.target.value)} name="email" autoComplete="new-off" className="form-control" />
                                    </div>
                                    <div className="form-group float-end d-flex py-4">

                                        <div className="px-2">
                                            <a href="/" className="btn btn-primary px-2">Cancel</a>
                                        </div>
                                        <div>
                                            <button className="btn btn-success px-2" onClick={handleSubmit}>Submit</button>

                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    {/* onChange={(e)=>setMobilenumber(e.target.value)} */}
                </div>
            </div>
        </>
    )
}
export default NewContact;