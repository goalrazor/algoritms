interface IStack<T> {
    push(item: T): void;
    pop(): T | undefined;
    peek(): T;
    size(): number;
    map(callback:  (value: T, index: number, array?: T[]) => any): T[];
}

export default class Stack<T> implements IStack<T> {
    private storage: T[] = [];

    constructor(private capacity: number = Infinity) {}

    push(item: T): void {
        if (this.size() === this.capacity) {
            throw Error("Stack has reached max capacity, you cannot add more items");
        }
        this.storage.push(item);
    }

    pop(): T | undefined {
        return this.storage.pop();
    }

    peek(): T {
        return this.storage[this.size() - 1];
    }

    size(): number {
        return this.storage.length;
    }

    map(callback:  (value: T, index: number, array?: T[]) => any): T[] {
        const resultArray = [];
        for (let index = 0; index < this.storage.length; index++) {
            resultArray.push(callback(this.storage[index], index, this.storage));
        }
        return resultArray;
    }
}
