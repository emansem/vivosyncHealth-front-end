import { useState } from "react";

export function useSubscriptionPlan() {
    const [planType, setPlanType] = useState("Basic");
    const getPlanType = (label: string) => setPlanType(label);
    const [activeIndices, setIndices] = useState<number[]>([]);
    const handleToggle = (index: number) => {
        setIndices(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index])

    }

    return { planType, getPlanType, activeIndices, handleToggle };
}

