import React, { useState, useEffect } from 'react';
import fetchCatData from './fetchCatData';
import './App.css';
import { Cat } from './components/Cat';
import Navbar from './components/navBar';

const App = () => {
    const [cat, setCat] = useState([]);
    const [catInfo, setCatInfo] = useState([]);
    const [basketItems, setBasketItems] = useState([]);

    const addToBasket = (item) => {
        setBasketItems([...basketItems, item]);
    };

    const removeItemFromBasket = (item) => {
        const remainingBasketItems = basketItems.filter(
            (cat) => cat.id !== item.id,
        );
        setBasketItems(remainingBasketItems);
    };

    useEffect(() => {
        (async () => {
            const res = await fetch('https://api.thecatapi.com/v1/breeds?limit=20');
            const data = await res.json();
            const info = fetchCatData();

            setCatInfo(info);
            setCat(data);
        })();
    }, []);

    return (
        <div>
            <Navbar
                basketItems={basketItems}
                removeItemFromBasket={removeItemFromBasket}
            />
            <div className="catlist">
                {cat.map((cat, i) => (
                    <Cat
                        key={cat.id}
                        id={cat.id}
                        catName={catInfo[i]?.name}
                        image={cat.image?.url} // Make sure cat.image is defined before accessing its url property
                        name={cat.name}
                        temperament={cat.temperament}
                        price={catInfo[i]?.price} // Make sure catInfo[i] is defined before accessing its price property
                        addToBasket={addToBasket}
                    />
                ))}
            </div>
        </div>
    );
};

export default App;
