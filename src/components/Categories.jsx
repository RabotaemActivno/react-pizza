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

    const onClickCategory = (index) => {
        setActiveIndex(index)
    }

    return (
        <div className="categories">
            <ul>
                {
                    categories.map((value, index) => {
                        return <li className={activeIndex === index ? "active" : ''} onClick={() => onClickCategory(index)}>{value}</li>
                    })
                }
            </ul>
        </div>
    )
}