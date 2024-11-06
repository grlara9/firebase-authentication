import React, {useState} from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Message from "./Message";

export default function Root({message}) {
   

    return (
        <>
            <Header/>
            {message && <Message type={message}/>}
            <main>
                <Outlet/>
            </main>
        </>
    )
}