import Collection from "./collection";

interface IStack<T> {
    push(item: T): void;
    pop(): T | undefined;
    peek(): T;
    size(): number;
}

export default class StackCollection<T> extends Collection<T> implements IStack<T> {
    constructor(private capacity: number = Infinity) {
        super();
    }

    push(item: T) {
        if (this.isFull()) {
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

    toArray(): T[] {
        return this.storage;
    };

    isFull(): boolean {
        return this.capacity === this.size();
    }
}
