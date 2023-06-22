import { Sort } from '../components/Sort';
import { Categories } from '../components/Categories';
import { useState, useEffect } from 'react';
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

export function Home({searchValue}) {

    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [categoryId, setCatigoryId] = useState(0)
    const [sortType, setSortType] = useState({
        name: 'популярности',
        sortProperty: 'rating'
    })



    useEffect(() => {
        setIsLoading(true)

        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
        const sortBy = sortType.sortProperty.replace('-','')
        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''
        
        fetch(`https://648086cff061e6ec4d49700f.mockapi.io/items?${category
            }&sortBy=${sortBy}&order=${order}${search}`)
            .then(res => res.json())
            .then(json => {
                setItems(json)
                setIsLoading(false)
            });
        window.scrollTo(0, 0)
    }, [categoryId, sortType, searchValue])

    const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj}/>)
    const skeletons =[...new Array(6)].map((_, i) => <Skeleton key={i} />)

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={(i) => setCatigoryId(i)} />
                <Sort value={sortType} onChangeSort={(i) => setSortType(i)} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading ? skeletons : pizzas
                }
            </div>
        </div>
    )
}