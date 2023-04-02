interface IQueue<T> {
    enqueue: (item: T) => void;
    dequeue: () => void;
    peak: () => T | null;
}

export class Queue<T> implements IQueue<T> {
    private container: (T | null)[] = [];
    private head = 0;
    private tail = 0;
    private readonly size: number = 0;
    private length: number = 0;

    constructor(size: number) {
        this.size = size;
        this.container = Array(size);
    }

    enqueue = (item: T) => {
        if (this.length >= this.size) {
            throw new Error("Maximum length exceeded");
        }
        if (!this.isEmpty()) {
            this.tail = (this.tail + 1) % this.size;
        }
        this.container[this.tail] = item;
        this.length += 1;
    };

    dequeue = () => {
        if (this.isEmpty()) {
            throw new Error("No elements in the queue");
        }

        this.container[this.head] = null;
        this.head += 1;
        this.length -= 1;
    };

    peak = (): T | null => {
        if (this.isEmpty()) {
            throw new Error("No elements in the queue");
        }
        return this.container[this.head];
    };

    clear = () => {
        this.container = Array(this.size);
        this.head = 0;
        this.tail = 0;
        this.length = 0;
    };

    isEmpty = () => this.length === 0;

    innerArr = (): Array<T | null> => this.container;

    pointers = () => { return { head: this.head, tail: this.tail } }

}