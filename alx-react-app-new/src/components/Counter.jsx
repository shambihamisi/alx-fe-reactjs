import React, { useState } from "react";


const Counter = () => {
    const [count, setCount] = useState(0);

    function increaseCounter() {
        setCount(count + 1);
    };

    function decreaseCounter() {
        setCount(count - 1);
    }

    function reset() {
        setCount(0);
    };
    
return (
    <div>
        <h1>Count: {count}</h1>
        <button onClick={increaseCounter}>Increase</button>
        <button onClick={reset}>Reset</button>
        <button onClick={decreaseCounter}>Decrease</button>
    </div>
);    
}


export default Counter;