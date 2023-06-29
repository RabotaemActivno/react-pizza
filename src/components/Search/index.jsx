import React, { useCallback, useRef, useState } from "react";
import styles from './Serach.module.scss'
import { ReactComponent as SearchSVG } from './search_icon.svg'
import { ReactComponent as CloseSVG } from './close_icon.svg'
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/slice/filterSlice";





export function Search() {
    const dispatch = useDispatch()
    const [value, setValue] = useState('')
    const inputRef = useRef()

    const onClickClear = () => {
        dispatch(setSearchValue(''))
        setValue('')
        inputRef.current.focus()
    }


    const updateSearchValue = useCallback(
        debounce((str)=> {
            dispatch(setSearchValue(str))
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