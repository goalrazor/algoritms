export default abstract class Collection<T> {
    protected storage: T[] = [];

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

    abstract isFull(): boolean;
}
