import React, { useCallback, useRef, useState } from "react";
import styles from './Serach.module.scss'
import { ReactComponent as SearchSVG } from './search_icon.svg'
import { ReactComponent as CloseSVG } from './close_icon.svg'
import { useContext } from "react";
import { SearchContext } from "../../App";
import debounce from "lodash.debounce";





export function Search() {
    const [value, setValue] = useState('')
    const { setSearchValue } = useContext(SearchContext)
    const inputRef = useRef()
    const onClickClear = () => {
        setSearchValue('')
        setValue('')
        inputRef.current.focus()
    }


    const updateSearchValue = useCallback(
        debounce((str)=> {
            setSearchValue(str)
        }, 500), []
    )
    const onChangeInput = e => {
        setValue(e.target.value)
        updateSearchValue(e.target.value)
    }

    return (
        <div className={styles.root}>
            <SearchSVG className={styles.icon} />
            <input
                ref={inputRef}
                className={styles.input}
                placeholder="Поиск пиццы..."
                value={value}
                onChange={onChangeInput} />
            {value && <CloseSVG onClick={onClickClear} className={styles.close_icon} />}
        </div>
    )
}