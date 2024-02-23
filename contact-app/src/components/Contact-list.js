import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { InfinitySpin } from "react-loader-spinner";
import './Contact-list.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



const Contactlist = () => {

    // window.addEventListener("load",function(){
    //     this.alert('loading');
    // });

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState('');
    const url = '/Update?'
    const [show, setShow] = useState(false);
 const [column,setColumn]=useState('name');
 const [order,setOrder]=useState(1);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    window.addEventListener("load", async function () {
        try {
            const response = await fetch('http://localhost:8000/api/Contact/ContactList', {
                method: 'POST',
                body: JSON.stringify({
                    "column_name": 'name',
                    "orderby": 1,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();
            if (result.statusCode === 200) {
                setData(result.data);
                setLoading(false);
            }
            else {
                console.log(data);
                this.alert(data.message)
            }
        }

        //     const response = await fetch('http://localhost:8000/api/Contact/ContactList');
        //     const data = await response.json();
        //     if (data.statusCode == 200) {
        //         setData(data.data);
        //         setLoading(false)
        //     }
        //     else {
        //         console.log(data);
        //         this.alert(data.message)
        //     }
        // }

        catch (error) {
            console.log(error)
            this.alert('catch error:', error);
        }
        // .then(res=>{setData(res.data)});
    }, [])

    const handleOrder = async (col, orderby) => {
        setShow(false)
        console.log(col);
        console.log(orderby)
        try {
            const response = await fetch('http://localhost:8000/api/Contact/ContactList', {
                method: 'POST',
                body: JSON.stringify({
                    "column_name": col,
                    "orderby": orderby,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();
            if (result.statusCode === 200) {
                setData(result.data);
                setLoading(false);
            }
            else {
                console.log(data);
                this.alert(data.message)
            }
        }
        catch (error) {
            console.log(error)
            this.alert('catch error:', error);
        }
    }
    // const modal= () => {
    //     dialog.showModal();
    //   }
    //   const closeModal=()=>{
    //     dialog.close();
    //   }


    // try {
    //     setLoading(false);
    //     const response = await fetch('http://localhost:8000/api/Contact/AddContact', {
    //         method: 'POST',
    //         body: JSON.stringify({
    //             "name": name,
    //             "company": company,
    //             "Title": title,
    //             "mobileNumber": mobileNumber,
    //             "Email": email,
    //             "profilepath": img
    //         }),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     });
    //     debugger;
    //     const result = await response.json();
    //     if (result.statusCode ===201) {
    //         window.location = '/';
    //     }
    //     else {
    //         alert(result.message);
    //     }
    // }
    // catch (error) {
    //     setLoading(true);
    //     alert(error)
    // }

    const handleUpdate = (e) => {
        let id = e;
        window.location.href = url + 'Id=' + id;
    }
    const [search, setSearch] = useState('');
    const strAscending = [...data]
    //     a.name > b.name ? 1 : -1,
    // );
    if (loading) {

        return <div className="d-flex justify-content-center pt-5">
            <InfinitySpin
                visible={true}
                width="200"
                color="#4fa94d"
                ariaLabel="infinity-spin-loading"
            />
        </div>
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row d-flex justify-content-center">
                    <div className="" style={{ height: "50px" }}></div>
                    <div className="col-lg-2"></div>
                    <div className="col-lg-8">
                        <div className="form-outline input-group w-auto py-4">
                            <span className="input-group-text"><FaSearch /></span>
                            <input id="form1" type="search" onChange={(e) => setSearch(e.target.value)} className="form-control" autoComplete="new-off" />
                            <span className="dropdown input-group-text">
                                {/* <button className="btn btn-secondary dropleft dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" data-bs-target="dropdownMenuLink" aria-haspopup="true" aria-expanded="false">
                                    Order By
                                </button> */}
                                 <Button variant="primary" onClick={handleShow}>
                            Orderby
                        </Button>
                                      <Modal show={show} onHide={handleClose}>
                            {/* <Modal.Header closeButton>
                                <Modal.Title>Modal heading</Modal.Title>
                            </Modal.Header> */}
                            <Modal.Body>
                            <h6>Column</h6>
                                <div className="d-flex">
                                   
                                <div className="form-check">
                                <input className="form-check-input" type="radio" name="name" value="option1" id="name" onClick={()=>setColumn('name')}/>
                                    <label className="form-check-label pe-2" htmlFor="name">
                                        Name
                                    </label>
                                   
                                </div>
                                <div className="form-check">
                                <input className="form-check-input" type="radio" name="name" value="option2" id="Email" onClick={()=>setColumn('Email')} />
                                    <label className="form-check-label pe-2" htmlFor="name">
                                        Email
                                    </label>
                               
                                </div>
                                <div className="form-check">
                                <input className="form-check-input" type="radio" name="name" value="option3" id="company" onClick={()=>setColumn('company')} />
                                    <label className="form-check-label pe-2" htmlFor="name">Company</label>
                                   
                                </div>
                                <div className="form-check">
                                <input className="form-check-input" type="radio" name="name" value="option4" id="Title" onClick={()=>setColumn('Title')} />
                                    <label className="form-check-label pe-2" htmlFor="name">Title</label>
                                   
                                </div>
                                <div className="form-check">
                                <input className="form-check-input" type="radio" name="name" value="option4" id="mobileNumber" onClick={()=>setColumn('mobileNumber')} />
                                    <label className="form-check-label pe-2" htmlFor="name">Mobile Number</label>
                                </div>
                                </div>
                                <h6>Orderby</h6>
                                <div className="d-flex">
                                   
                                <div className="form-check">
                                
                                <input className="form-check-input" type="radio" name="order" value="option1" id="name"  onClick={()=>setOrder(1)}/>
                                    <label className="form-check-label pe-2" htmlFor="name">
                                        Ascending
                                    </label>
                                   
                                </div>
                                <div className="form-check">
                                <input className="form-check-input" type="radio" name="order" value="option2" id="Email" onClick={()=>setOrder(-1)} />
                                    <label className="form-check-label pe-2" htmlFor="name">
                                        Descending
                                    </label>
                               
                                </div>
                                </div>

                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={()=>handleOrder(column,order)}>
                                    Submit
                                </Button>
                            </Modal.Footer>
                        </Modal>
                               
                            </span>
                        </div>

                        <table className="table table-hover table-secondary table-striped table-responsive " >
                            <thead>
                                <tr className="border border-white">
                                    <th ></th>
                                    <th >Basic Info</th>
                                    <th >Company</th>
                                    <th>Title</th>
                                    <th>Mobile Number</th>
                                </tr>
                            </thead>
                            <tbody>
                                {strAscending.filter(post => {
                                    if (search === '') {
                                        return post;
                                    } else if (post.name.toLowerCase().includes(search.toLowerCase()) || post.Email.toLowerCase().includes(search.toLowerCase()) ||
                                        post.company.toLowerCase().includes(search.toLowerCase()) || post.Title.toLowerCase().includes(search.toLowerCase) ||
                                        post.mobileNumber.includes(search)) {
                                        return post;
                                    }
                                }).map((data) =>
                                    <tr onClick={() => { handleUpdate(data._id) }} className="bg-light rounded border border-5 border-white align-middle" key={data._id}>
                                        <td className="text-center">{data.profilepath ? <img src={data.profilepath} style={{ "width": "35px", "height": "35px" }} alt="img" className='rounded-circle' /> : <FaUserCircle className="text-secondary" style={{ "width": "35px", "height": "35px" }} />}</td>
                                        <td>{data.name}<br />{data.Email}</td>
                                        <td>{data.company}</td>
                                        <td>{data.Title}</td>
                                        <td>{data.mobileNumber}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                    </div>
                    <div className="col-lg-2">
                       

                  

                        {/* <button id="openModal" onClick={modal}>Open the modal</button>
                        <dialog id="modal" className="modal">
                            <button id="closeModal" onClick={closeModal} className="modal-close-btn">Close</button>
                        </dialog> */}

                        {/* <div className="dropdown">
                            <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown button
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <li><a className="dropdown-item" href="#">Action</a></li>
                            </ul>
                        </div> */}
                    </div>
                </div>
                <a href="/Newcontact" className="sticky-bottom float-end px-4 py-4">
                    <h1 className=""><FaPlusCircle className="text-primary" /></h1>
                </a>
            </div>
        </>
    )
}
export default Contactlist;


{/* <div className="col-lg-8">
                        <img src="./img/img5.jpg" alt="home-screen" className="w-100" />
                    </div> */}
{/* <div className="col-lg-4">
                        <div className="h-25">
                            <div className="text-center">
                                <img src="./img/google.png" alt="google" />
                            </div>
                        </div>
                        <div className="card w-100" style={{ height: "480px" }}>
                            <div className="card-body overflow-scroll">
                                <div className="form-outline input-group w-auto">
                                    <span className="input-group-text"><FaSearch /></span>
                                    <input id="form1" type="search" placeholder={`${data.length} contacts`} onChange={(e) => setSearch(e.target.value)} className="form-control" autoComplete="new-off" />
                                </div>
                                {strAscending.filter(post => {
                                    if (search === '') {
                                        return post;
                                    } else if (post.name.toLowerCase().includes(search.toLowerCase())) {
                                        return post;
                                    }
                                }).map((data) => {
                                    return (
                                        <ul className="list-unstyled px-2" key={data._id}>
                                            <li className="px-2 py-2">{data.profilepath ? <img src={data.profilepath} style={{ "width": "20px", "height": "20px" }} alt="img" className='rounded-circle' /> : <FaUserCircle className="text-secondary" style={{ "width": "20px", "height": "20px" }} />}
                                                <a href="#contactlist" className="text-decoration-none text-dark px-2" onClick={() => { handleUpdate(data._id) }}>
                                                    {data.name}</a></li>
                                        </ul>)
                                })
                                } */}
{/* <ul className="list-unstyled px-2">
                                    <li className="px-2 py-2"><FaUserCircle className="text-secondary" /><a href="#contactlist" className="text-decoration-none text-dark px-2">Durga</a></li>
                                    <li className="px-2 py-2"><FaUserCircle className="text-secondary" /><a href="#contactlist" className="text-decoration-none text-dark px-2">Divya</a></li>
                                    <li className="px-2 py-2"><FaUserCircle className="text-secondary" /><a href="#contactlist" className="text-decoration-none text-dark px-2">Afrin</a></li>
                                    <li className="px-2 py-2"><FaUserCircle className="text-secondary" /><a href="#contactlist" className="text-decoration-none text-dark px-2">Afrin</a></li>
                                    <li className="px-2 py-2"><FaUserCircle className="text-secondary" /><a href="#contactlist" className="text-decoration-none text-dark px-2">Banu</a></li>
                                    <li className="px-2 py-2"><FaUserCircle className="text-secondary" /><a href="#contactlist" className="text-decoration-none text-dark px-2">Dharshini</a></li>
                                    <li className="px-2 py-2"><FaUserCircle className="text-secondary" /><a href="#contactlist" className="text-decoration-none text-dark px-2">Priya</a></li>
                                    <li className="px-2 py-2"><FaUserCircle className="text-secondary" /><a href="#contactlist" className="text-decoration-none text-dark px-2">Durga</a></li>
                                    <li className="px-2 py-2"><FaUserCircle className="text-secondary" /><a href="#contactlist" className="text-decoration-none text-dark px-2">Divya</a></li>
                                    <li className="px-2 py-2"><FaUserCircle className="text-secondary" /><a href="#contactlist" className="text-decoration-none text-dark px-2">Afrin</a></li>
                                    <li className="px-2 py-2"><FaUserCircle className="text-secondary" /><a href="#contactlist" className="text-decoration-none text-dark px-2">Afrin</a></li>
                                    <li className="px-2 py-2"><FaUserCircle className="text-secondary" /><a href="#contactlist" className="text-decoration-none text-dark px-2">Banu</a></li>
                                    <li className="px-2 py-2"><FaUserCircle className="text-secondary" /><a href="#contactlist" className="text-decoration-none text-dark px-2">Dharshini</a></li>
                                    <li className="px-2 py-2"><FaUserCircle className="text-secondary" /><a href="#contactlist" className="text-decoration-none text-dark px-2">Priya</a></li>
                                    <li className="px-2 py-2"><FaUserCircle className="text-secondary" /><a href="#contactlist" className="text-decoration-none text-dark px-2">Durga</a></li>
                                    <li className="px-2 py-2"><FaUserCircle className="text-secondary" /><a href="#contactlist" className="text-decoration-none text-dark px-2">Divya</a></li>
                               s  
                                </ul> */}
{/* <a href="/Newcontact" className="sticky-bottom float-end">
                                    <h1 className=""><FaPlusCircle className="text-primary" />
                                    </h1>
                                </a>
                            </div>
                        </div>
                    </div> */}

                //     <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
                //     <tbody>
                //         <tr><td className="dropdown-item" href="#">Name</td><td><button className="btn btn-primary" onClick={() => handleOrder('name', 1)}>asc</button></td><td><button className="btn btn-success" onClick={() => handleOrder('name', -1)}>desc</button></td></tr>
                //         <tr><td className="dropdown-item" href="#">Email</td><td><button className="btn btn-primary" onClick={() => handleOrder('Email', 1)}>asc</button></td><td><button className="btn btn-success" onClick={() => handleOrder('Email', -1)}>desc</button></td></tr>
                //         <tr><td className="dropdown-item" href="#">Company</td><td><button className="btn btn-primary" onClick={() => handleOrder('company', 1)}>asc</button></td><td><button className="btn btn-success" onClick={() => handleOrder('company', -1)}>desc</button></td></tr>
                //         <tr><td className="dropdown-item" href="#">Title</td><td><button className="btn btn-primary" onClick={() => handleOrder('Title', 1)}>asc</button></td><td><button className="btn btn-success" onClick={() => handleOrder('Title', -1)}>desc</button></td></tr>
                //         <tr><td className="dropdown-item" href="#">Mobile Number</td><td><button className="btn btn-primary" onClick={() => handleOrder('mobileNumber', 1)}>asc</button></td><td><button className="btn btn-success" onClick={() => handleOrder('mobileNumber', -1)}>desc</button></td></tr>
                //     </tbody>
                // </div>

