export class Node<T> {
    public value: T;
    public next: Node<T> | null;

    constructor(value: T) {
        this.value = value;
        this.next = null;
    }
}

export class LinkedList<T> {
    public head: Node<T> | null;
    public tail: Node<T> | null;
    public length: number;

    constructor(value?: T | T[]) {
        if (value === null || value === undefined) {
            this.head = null;
            this.tail = null;
            this.length = 0;

            return;
        }

        if (Array.isArray(value)) {
            this.head = null;
            this.tail = null;
            this.length = 0;
            return this.fromArray(value)
        }
        const node: Node<T> = new Node<T>(value);

        this.head = node;
        this.tail = node;
        this.length = 1;
    }

    public toArray = (): T[] => {
        const result: T[] = [];
        let node = this.head;
        while (node) {
            result.push(node.value);
            node = node.next;
        }
        return result;
    };

    public fromArray = (values: T[]): LinkedList<T> => {
        values.forEach(v => this.append(v));
        return this;
    };

    public append(value: T): Node<T> {
        const node: Node<T> = new Node<T>(value);

        if (!this.length) {
            this.head = node;
        } else {
            if (this.tail) this.tail.next = node;
        }

        this.tail = node;
        this.length++;

        return node;
    }

    public prepend(value: T): Node<T> {
        const node: Node<T> = new Node<T>(value);

        if (!this.length) {
            this.tail = node;
        } else {
            node.next = this.head;
        }

        this.head = node;
        this.length++;

        return node;
    }

    public shift(): Node<T> | null {
        if (this.head) {
            this.head = this.head.next;
            this.length--;
            return this.head
        }
        return null
    }

    public pop(): Node<T> | null {
        if (!this.head) return null;

        let temp: Node<T> = this.head;
        let pre: Node<T> = this.head;

        while (temp.next) {
            pre = temp;
            temp = temp.next;
        }

        this.tail = pre;
        this.tail.next = null;
        this.length--;

        if (!this.length) {
            this.head = null;
            this.tail = null;
        }

        return temp;
    }

    public get(index: number): Node<T> | null {
        if (index < 0 || index >= this.length) return null;

        let node: Node<T> | null = this.head;

        for (let i = 0; i < index; i++) {
            if (node) node = node.next;
        }

        return node;
    }

    public set(index: number, value: T): Node<T> | null {
        const node: Node<T> | null = this.get(index);

        if (node) {
            node.value = value;
            return node;
        }
        console.error(`There is no index '${index}' in LinkedList`)
        return null;
    }

    public insert(index: number, value: T): Node<T> | null {
        if (!index) return this.prepend(value);
        if (index === this.length) return this.append(value);
        if (index < 0 || index > this.length) {
            console.error(`There is no index '${index}' in LinkedList`)
            return null;
        }

        const newNode: Node<T> = new Node(value);
        const temp: Node<T> | null = this.get(index - 1);

        if (temp) {
            newNode.next = temp.next;
            temp.next = newNode;
            this.length++;
            return newNode;
        }
        return null;
    }

    public remove(index: number): Node<T> | null {
        if (index === 0) return this.shift();
        if (index === this.length - 1) return this.pop();
        if (index < 0 || index > this.length) {
            console.error(`There is no index '${index}' in LinkedList`)
            return null;
        }

        const before: Node<T> | null = this.get(index - 1);
        let node: Node<T> | null = null;
        if (before) {
            node = before.next;
            if (node) {
                before.next = node.next;
                node.next = null;
                this.length--;
                return node;
            }
        }
        return null;
    }

    public *items() {
        let node: Node<T> | null = this.head;
        while (node) {
            yield node;
            node = node.next;
        }
    }
}
