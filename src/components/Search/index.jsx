import React from "react";
import styles from './Serach.module.scss'
import { ReactComponent as SearchSVG } from './search_icon.svg'
import { ReactComponent as CloseSVG } from './close_icon.svg'
import { useContext } from "react";
import { SearchContext } from "../../App";

export function Search() {

    const {searchValue, setSearchValue} = useContext(SearchContext)

    return (
        <div className={styles.root}>
            <SearchSVG className={styles.icon} />
            <input
                className={styles.input}
                placeholder="Поиск пиццы..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)} />
            {searchValue && <CloseSVG onClick={() => setSearchValue('')} className={styles.close_icon} />}
        </div>
    )
}