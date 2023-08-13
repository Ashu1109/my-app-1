'use client';
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios';
import toast from "react-hot-toast";
export default function LoginPage(){
    const router = useRouter();
    const [user,setUser] = useState({
        email:"",
        password:"",
    })
    const [buttonDisabled,setButtonDisabled]=useState(false);
    const [loading,setLoading]=useState(false);
    const onLoginUp = async () =>{
        try { 
            setLoading(true);
            const res = await axios.post("api/users/login",user);
            console.log("Login success",res.data);
            router.push("/profile");
        } catch (error:any) {
            console.log("Login failed",error.message);
            toast.error(error.message)
        }finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0){
            setButtonDisabled(false);
        }
        else{
            setButtonDisabled(true);
        }
    },[user])
    return(
        <div className="flex  flex-col justify-center items-center min-h-screen py-2">
        <h1 className="text-2xl m-5">{loading?"Processing":"Login"}</h1>
        <label htmlFor="Email">Email</label>
        <input id="Email" type="text" value={user.email} onChange={(e)=>{setUser({...user,email:e.target.value})}} placeholder="Email" className="p-3 text-black m-1 focus:ring-offset-blue-700 "/>
        <label htmlFor="Password">Password</label>
        <input id="Password" type="password" value={user.password} onChange={(e)=>{setUser({...user,password:e.target.value})}} placeholder="Password" className="text-black p-3 m-1 focus:ring-offset-blue-700"/>
        <button onClick={onLoginUp} className="p-2 border border-amber-100 rounded-lg mb-4 focus:outline-none focus: border-x-amber-200 ">Sign Up</button>
        <Link href={'/signup'}>Sign Up</Link>
        </div>
    ) 
}