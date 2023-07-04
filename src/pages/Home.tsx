import { Sort } from '../components/Sort';
import { Categories } from '../components/Categories';
import { useEffect, useRef } from 'react';
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { Pagination } from '../components/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilter, setCategoryId, setCurrentPage, setFilters } from '../redux/slice/filterSlice';
import { useNavigate, Link } from 'react-router-dom';
import qs from 'qs'
import { sortList } from '../components/Sort'
import { fetchPizzas, selectPizzaData, setItems } from '../redux/slice/pizzasSlice';

export const Home: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSearch = useRef(false);
    const isMounted = useRef(false);
    const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
    const { status, items } = useSelector(selectPizzaData);

    const onChangeCategory = (id: number) => {
        dispatch(setCategoryId(id));
    }

    const onChangePage = (page: number) => {
        dispatch(setCurrentPage(page));
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

        const data = await dispatch(
            //@ts-ignore
        fetchPizzas({
            order,
            sortBy,
            category,
            search,
            currentPage
        }));
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

    const pizzas = items.map((obj: any) => (
        <Link to={`/pizza/${obj.id}`} key={obj.id} >
            <PizzaBlock {...obj} />
        </Link>));
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
