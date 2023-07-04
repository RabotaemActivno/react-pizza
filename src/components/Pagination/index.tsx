import React from "react";
import ReactPaginate from "react-paginate";
import styles from './Pagination.module.scss'

type PaginationPropsType = {
    currentPage: number;
    onChangePage: (page: number) => void
}

export const Pagination: React.FC<PaginationPropsType> = ({currentPage, onChangePage})=>{
    return (
        <ReactPaginate
            className={styles.root}
            breakLabel='...'
            nextLabel='>'
            onPageChange={e => onChangePage(e.selected+1)}
            pageRangeDisplayed={4}
            pageCount={3}
            forcePage={currentPage-1}
            previousLabel='<'
            renderOnZeroPageCount={null}
        />
    )
}