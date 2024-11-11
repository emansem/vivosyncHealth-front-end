import { useState } from "react";


function usePaginationHook(totalPages: number) {
    const limit = 10;
    const numberOfPages = Math.ceil(totalPages / limit);

    const [pageNumber, setPageNumber] = useState(1)


    const pages = Array.from({ length: numberOfPages }, (_, i) => i + 1);
    console.log(numberOfPages, pages)
    const getPageNumber = (page: number) => {
        setPageNumber(page)

    }
    const handleNextButton = () => {
        if (pageNumber < numberOfPages) {
            setPageNumber(prev => prev + 1);
        }
    }
    const handlePrevButton = () => {
        if (pageNumber > 1) {
            setPageNumber(prev => prev - 1);
        }
    }
    const startIndex = (pageNumber - 1) * limit
    const endIndex = pageNumber * limit
    return { pageNumber, getPageNumber, limit, pages, handleNextButton, handlePrevButton, endIndex, startIndex }
}

export default usePaginationHook