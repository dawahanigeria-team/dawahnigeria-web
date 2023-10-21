import React, {useState} from "react";
import { setTheme } from "../../../Redux/Actions/ActionCreators";
import { useDispatch } from "react-redux";
import { BsSun } from "react-icons/bs";

export default function ThemeDropDown() {
    const [isOpen, setOpen] = useState(false)

    function closeDropDown() {
        setOpen(!isOpen)
    }
    return  (
        <div className=" relative text-[13px] sm:text-[15px]">
            <button
            onClick={closeDropDown}
             className="rounded-md p-1 group border-text hover:border-muted border ">
                <BsSun className="text-[22px] text-text group-hover:text-muted-foreground"/>
            </button>
            {isOpen && <div
            onClick={(e) => {
                e.stopPropagation()
            }}
            className="absolute right-0 top-9">
                <div onClick={closeDropDown} className="w-full h-full fixed inset-0 z-[70] "></div>
                <div className="relative z-[90] w-[110px] shadow-lg border border-border h-fit rounded-md bg-background py-2">
                   <div className="flex flex-col w-[110px] space-y-1">
                    <ToggleButtons text={"Default"} close={closeDropDown}/>
                    <ToggleButtons text={"Dark"} close={closeDropDown}/>
                    <ToggleButtons text={"Light"} close={closeDropDown}/>

                   </div>
                </div>
            </div>}
        </div>
    )
}

function ToggleButtons({text, close}) {
    const dispatch = useDispatch()
    return (
        <div
        onClick={() => {
            close()
            dispatch(setTheme(text.toLowerCase()))
        }}
        className="cursor-pointer hover:bg-hover text-text py-2 pl-2 pr-4">
       {text}
    </div>
    )
}