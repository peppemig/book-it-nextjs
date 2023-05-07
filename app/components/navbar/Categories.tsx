'use client'

import Container from "../Container"
import CategoryBox from "../CategoryBox"
import { usePathname, useSearchParams } from "next/navigation"
import { categoriesData } from "./categoriesData"

const Categories = () => {
    const params = useSearchParams()
    const category = params?.get('category')
    const pathname = usePathname()

    const isMainPage = pathname === '/'

    // dont show categories bar if not on index page
    if (!isMainPage) {return;}

    return (
        <Container>
            <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
                {categoriesData.map((item) => (
                    <CategoryBox 
                        key={item.label} 
                        label={item.label} 
                        description={item.description} 
                        icon={item.icon}
                        selected={category === item.label}
                    />
                ))}
            </div>
        </Container>
    )
}

export default Categories