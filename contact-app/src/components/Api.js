import React from "react";

function Api(){
const getData=()=>{
    fetch('http://localhost:8000/api')
    .then(res=>res.json())
    .then(res=>{console.log(res)});
}
    return(
        <>
        <button className="btn btn-primary" onClick={getData}>click me</button>
        </>
    )
}
export default Api;