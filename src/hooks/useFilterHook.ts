"use client"
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';

function useFilterHook() {
    const [activeIndex, setActiveIndex] = useState(0);
    const router = useRouter();
    const pathname = usePathname();
    const search = useSearchParams();
    const filterTags = (tag: string, index: number) => {
        const params = new URLSearchParams(search);
        params.set("filter", tag);
        router.push(`${pathname}?${params}`);

        setActiveIndex(index);
    };
    return { activeIndex, filterTags }
}

export default useFilterHook