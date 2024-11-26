/* eslint-disable react-hooks/exhaustive-deps */
// import { useState } from "react"
"use client"
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../lib/redux/store'
import { ChangeEvent, useState } from 'react'

import { uploadImage } from './service/uploadImage'


// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()



//handle open and close a model
export const useOpenAndClose = () => {
    const [open, setOpen] = useState(false);
    const handle0pen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return { handleClose, handle0pen, open }
}

// Handle upload image, preview and get the image files
export const useUPloadImage = () => {
    const [previewImage, setPreviewImage] = useState<string>("");
    const [image, setImage] = useState("")
    const handlePhotoChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    setPreviewImage(e.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
        const imageFile = await uploadImage(file as File)
        setImage(imageFile)
    };
    return { previewImage, image, handlePhotoChange }
}





















