'use client'

import { useRouter } from "next/navigation"
import { AiOutlineHome } from "react-icons/ai"

const Logo = () => {
    const router = useRouter()

    return (
        <div onClick={() => router.push('/')} className="flex-row items-center gap-2 justify-center hidden md:flex cursor-pointer">
            <AiOutlineHome size={30} className="text-rose-500"/>
            <label className="text-rose-500 font-bold text-xl">BookIt!</label>
        </div>
    )
}

export default Logo