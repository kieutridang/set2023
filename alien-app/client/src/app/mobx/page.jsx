"use client";

import React from "react";
import { observer } from "mobx-react-lite";
import counterStore from "./store";

const App = observer(() => {
    return (
        <div className="mt-20">
            <h1>Counter App using React+MobX</h1>
            <p>Count: {counterStore.count}</p>
            <button
                onClick={() => {
                    counterStore.increment();
                }}
            >
                Increment
            </button>
            <button
                onClick={() => {
                    counterStore.decrement();
                }}
            >
                Decrement
            </button>
        </div>
    );
});

export default App;
