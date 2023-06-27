import { Sort } from '../components/Sort';
import { Categories } from '../components/Categories';
import { useState, useEffect, useRef } from 'react';
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { Pagination } from '../components/Pagination';
import { useContext } from 'react';
import { SearchContext } from '../App';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slice/filterSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs'
import { sortList } from '../components/Sort'


export function Home() {
    
    const navigate = useNavigate() 
    const dispatch = useDispatch()
    const isSearch = useRef(false)
    const { categoryId, sort, currentPage } = useSelector(state => state.filter)
    const sortType = sort.sortProperty
    const { searchValue } = useContext(SearchContext)
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const isMounted = useRef(false)

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const onChangePage = number => {
        dispatch(setCurrentPage(number))
    }
    
        useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))
    
            const sort = sortList.find(obj => obj.sortProperty === params.sortProperty)
    
            dispatch(
                setFilters({
                    ...params,
                    sort
                })
            )
            isSearch.current = true
        }
    }, []) 

    const fetchPizzas = () => {
        setIsLoading(true)
        
        const order = sortType.includes('-') ? 'asc' : 'desc'
        const sortBy = sortType.replace('-', '')
        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''

        
        axios
        .get(
                `https://648086cff061e6ec4d49700f.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
                )
            .then((res) => {
                setItems(res.data)
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    }

    
    useEffect(() => {

        if (!isSearch.current) {
            fetchPizzas()
        }
        
        isSearch.current = false
        
    }, [categoryId, sort.sortProperty, searchValue, currentPage])

    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage
            })

            navigate(`?${queryString}`)
        }
        
        isMounted.current = true
    }, [categoryId, sort.sortProperty, currentPage])
    

     
    const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
    const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />)



    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onChangeCategory} />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading ? skeletons : pizzas
                }
            </div>
            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>
    )
}