import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel'
import { NextRequest,NextResponse } from 'next/server';
import bcryptjs from "bcryptjs";


export async function POST(request:NextRequest) {
    try { 
        await connect();
        const {username,email,password} = await request.json();
        console.log(username,email,password);
        const user = await User.findOne({email});

        if(user){
            return NextResponse.json({error:"User Already exist"},{status:400})
        }

        //hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt)

        const newUser = new User({
            username,email,password:hashedPassword
        })
        const savedUser = await newUser.save();
        console.log("hello",savedUser);
        return NextResponse.json({message:"user created successfully",success:true,savedUser})
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}