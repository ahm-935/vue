import { defineStore } from "pinia";
export const useCounterState = defineStore("counter", {
    state: () => ({
        count: 5,
        id: 0
    }),
    getters: {
        doubleCount: (state) => state.count * 2,
        tripleCount: (state) => state.count * 3,
        squareCount: (state) => state.count * state.count
    },
    actions: {
        increment() {
            this.count++
        },
        decrement() {
            this.count--
        },
        reset() {
            this.count = 0
        },
        setId(id: number) {
            this.id = id
        },
       randomId() {
            this.id = Math.floor(Math.random() * 100)
        }
    }
     
})