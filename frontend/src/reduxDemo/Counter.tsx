import React, {useEffect, useState} from 'react';

export const Counter = () => {

    const [msg, setMsg] = useState('');

    useEffect(() => {

    },[]);

    const [counter, setCounter] = useState(0);

    const increment = () => {
        setCounter(prevCounter => prevCounter + 1);
    }

    const convertMsg = (text : string) => {
        console.log("function called...")
        setMsg(text);
    }

    const obj = {
        a : {
            c : 3
        },
        b : 2
    }

    const obj2 = {
        ...obj,
        a : {
            ...obj.a,
            c: 42
        }
    }

    const arr = ['a', 'b'];
    const arr2 = arr.concat('c');
    const arr3 = arr.slice();

    arr3.push('3');

    return (
        <div>
            Value : {counter}<br/>
            {JSON.stringify(obj)}<br/>
            {JSON.stringify(obj2)}<br/>
            {arr}<br/>
            {arr2}<br/>
            {arr3}<br/>
            {msg}<br/>
            <button onClick={increment}>Increment</button>
            <button onClick={() =>convertMsg('converted msg')}>Increment</button>
        </div>
    )

}