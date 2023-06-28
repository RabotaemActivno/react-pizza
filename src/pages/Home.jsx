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
import qs from 'qs'
import { sortList } from '../components/Sort'
import { fetchPizzas, setItems } from '../redux/slice/pizzasSlice';

export function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSearch = useRef(false);
    const { searchValue } = useContext(SearchContext);
    const isMounted = useRef(false);
    const { categoryId, sort, currentPage } = useSelector(state => state.filter);
    const { status, items } = useSelector(state => state.pizza);

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id));
    }

    const onChangePage = number => {
        dispatch(setCurrentPage(number));
    }

    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            const sort = sortList.find(obj => obj.sortProperty === params.sortProperty);

            dispatch(setFilters({
                ...params,
                sort
            }));
            isSearch.current = true;
        }
    }, []);

    const getPizzas = async () => {

        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const sortBy = sort.sortProperty.replace('-', '');
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        const data = await dispatch(fetchPizzas({
            order,
            sortBy,
            category,
            search,
            currentPage
        }));
        // dispatch(setItems(data.payload));
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        getPizzas();
    }, [categoryId, sort.sortProperty, searchValue, currentPage]);

    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage
            });

            navigate(`?${queryString}`);
        }

        isMounted.current = true;
    }, [categoryId, sort.sortProperty, currentPage]);

    const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
    const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onChangeCategory} />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {
                status === 'error' ? (
                    <div className='content__error-info'>
                        <h2>Произошла ошибка</h2>
                        <p>Попробуй перезагрузить</p>
                    </div>) : <div className="content__items"> {status === 'loading' ? skeletons : pizzas}
                </div>
            }

            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>
    )
}
