import React, { useCallback, useRef, useState } from "react";
import styles from './Serach.module.scss'
import searchSVG from './search_icon.svg'
import closeSVG  from './close_icon.svg'
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/slice/filterSlice";





export const Search: React.FC = () => {
    const dispatch = useDispatch()
    const [value, setValue] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    const onClickClear = () => {
        dispatch(setSearchValue(''))
        setValue('')
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }


    const updateSearchValue = useCallback(
        debounce((str)=> {
            dispatch(setSearchValue(str))
        }, 500), []
    )
    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
        updateSearchValue(e.target.value)
    }

    return (
        <div className={styles.root}>
            <img src={searchSVG} className={styles.icon} />
            <input
                ref={inputRef}
                className={styles.input}
                placeholder="Поиск пиццы..."
                value={value}
                onChange={onChangeInput} />
            {value && <img onClick={onClickClear} src={closeSVG} className={styles.close_icon} />}
        </div>
    )
}