import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel'
import { NextRequest,NextResponse } from 'next/server';
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken'
connect();
export async function POST(request:NextRequest) {
    try {
        
        const {email,password} = await request.json();
        console.log(email,password);

        //check if user exist;
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({error:"User does not exist"},{status:400});
        }
        //check if password is correct
        const isMatch = await bcryptjs.compare(password,user.password);
        //check if password is correct
        if(!isMatch){
            return NextResponse.json({error:"Invalid password"},{status:400});
        }
        //create token data
        const tokenData={
            id:user.id,
            username:user.username,
            email:user.email,
        }
        //create token
        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:"1d"});

        //cookies created
        const response = NextResponse.json({message:"Login successfully",success:true})
        response.cookies.set("token",token,{httpOnly:true});

        return response;

    } catch (error:any) {
        console.log(error);
        NextResponse.json({message:error.message},{status:500})
    }
}