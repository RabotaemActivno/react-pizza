
type CategoriesPropsType = {
    value: number;
    onChangeCategory: (i: number) => void 
}

export const Categories: React.FC<CategoriesPropsType> = ({ value, onChangeCategory }) => {

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
                    categories.map((categoryName, index) => {
                        return <li
                            key={index}
                            className={value === index ? "active" : ''}
                            onClick={() => onChangeCategory(index)}>
                            {categoryName}
                        </li>
                    })
                }
            </ul>
        </div>
    )
}