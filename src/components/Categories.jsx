import { useState } from "react"

export function Categories() {

    const [activeIndex, setActiveIndex] = useState(1)
    const categories = [
        'Все',
        'Мясные',
        'Вегетарианская',
        'Гриль',
        'Острые',
        'Закрытые',
    ]

    return (
        <div className="categories">
            <ul>
                {
                    categories.map((value, index) => {
                        return <li key={index} className={activeIndex === index ? "active" : ''} onClick={() => setActiveIndex(index)}>{value}</li>
                    })
                }
            </ul>
        </div>
    )
}