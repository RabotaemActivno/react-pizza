import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";



export const FullPizza: React.FC = () => {
    const [pizza, setPizza] = useState<{
        imageUrl: string;
        title: string;
        price: number;
    }>()
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchGethPizza() {
            try {
                const { data } = await axios.get(`https://648086cff061e6ec4d49700f.mockapi.io/items/` + id)
                setPizza(data)
            } catch (error) {
                alert('ошибка при получении пиццы')
                navigate('/')
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
            </>
            }
        </div>
    )
}