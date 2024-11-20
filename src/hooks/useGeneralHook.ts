"use client";
import { ChangeEvent, useEffect, useRef, useState } from "react";


export default function useGeneralHook() {
    //TOGGLE PASSWORD
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
    const elementRef = useRef<HTMLDivElement | null>(null);
    const [isOpen, setIsOPen] = useState(true);
    const [openProfileMenu, setOpenProfileMenu] = useState(false);
    const [selectedValue, setSelectdValue] = useState<string>("");
    const handleOnSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectdValue(e.target.value);

    }
    //Toggle a profle menu
    const handleDropDownToggle = () => {
        setOpenProfileMenu((prev) => !prev);
    };

    //click to open the side bar menu
    const handleToggleOPenMenu = () => {
        setIsOPen(true);
    };

    //close the side bar menu 
    const handleCloseSideBarMenu = () => {
        setIsOPen(false);
    };
    useEffect(() => {

        const handleResize = () => {
            if (window.innerWidth < 750) {
                setIsOPen(false);
            }

        };

        handleResize();

        //handle when a person click outside the box
        const handelClcikOutSide = (event: MouseEvent) => {
            if (
                elementRef.current &&
                !elementRef.current.contains(event.target as Node)
            ) {
                setIsOPen(false);
                setOpenProfileMenu(false);
            }
        };

        window.addEventListener("mousedown", handelClcikOutSide);
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("mousedown", handelClcikOutSide);
            window.removeEventListener("resize", handleResize);
        };
    }, [elementRef]);

    //Handle the toggel password when the user click on the toggle password
    const handleTogglePassword = () => {
        setIsPasswordVisible(prev => !prev);
    }

    return { isPasswordVisible, handleTogglePassword, handleOnSelect, selectedValue, handleCloseSideBarMenu, handleToggleOPenMenu, handleDropDownToggle, elementRef, isOpen, openProfileMenu };
}
