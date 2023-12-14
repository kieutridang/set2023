import { makeAutoObservable } from "mobx";

class CounterStore {
    count = 0; // The State

    constructor() {
        makeAutoObservable(this);
    }

    increment() {
        // Action
        this.count++;
    }

    decrement() {
        // Action
        this.count--;
    }
}

export default new CounterStore();
