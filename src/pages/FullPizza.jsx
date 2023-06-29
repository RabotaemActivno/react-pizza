import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const FullPizza = () => {
    const [pizza, setPizza] = useState()
    const { id } = useParams()

    useEffect(() => {
        async function fetchGethPizza() {
            try {
                const { data } = await axios.get(`https://648086cff061e6ec4d49700f.mockapi.io/items/` + id)
                setPizza(data)
            } catch (error) {
                alert('ошибка при получении пиццы')
            }
        }

        fetchGethPizza()
    }, [])

    return (
        <div className="content">
            {pizza && <>
                <img src={pizza.imageUrl} />
                <h2>{pizza.title}</h2>
                <h4>{pizza.price} p</h4>
            </>}
        </div>
    )
}