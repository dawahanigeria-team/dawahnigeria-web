import React from "react";
import {FaLightbulb} from 'react-icons/fa'
import Container from "../../components/container/Container";
import { useNavigate } from "react-router-dom";

const Buzz = () => {
    const navigate = useNavigate()
    return (
        <Container>
        <div className="relative w-full h-[100vw] min-[615px]:h-[70vw]">

            <div className="absolute inset-0 m-auto bg-[#1E1E1E] py-6 space-y-6 flex-col text-white rounded-md w-[80%] min-[615px]:w-[350px] h-fit flex items-center justify-center">
                <div className="min-[615px]:text-3xl text-2xl">
                     Coming soon
                </div>
                <FaLightbulb className="text-[#ddff2b] text-4xl min-[615px]:text-5xl"/>

                <button
                   onClick={() => {
                    navigate(-1)
                }}
                className="text-sm text-gray-200 transform ease hover:text-zinc-700 hover:bg-gray-200 p-2 rounded-md border border-gray-200">Go Back</button>
            </div>


        </div>
        </Container>
    )
}

export default Buzz