import { Sort } from '../components/Sort';
import { Categories } from '../components/Categories';
import { useState, useEffect } from 'react';
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

export function Home() {

    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch('https://648086cff061e6ec4d49700f.mockapi.io/items')
            .then(res => res.json())
            .then(json => {
                setItems(json)
                setIsLoading(false)
            });
            window.scrollTo(0,0)
    }, [])


    return (
        <div className="container">
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
                        : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
                }
            </div>
        </div>
    )
}