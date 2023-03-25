export class Node<T> {
    value: T
    next: Node<T> | null
    constructor(value: T, next?: Node<T> | null) {
        this.value = value;
        this.next = (next === undefined ? null : next);
    }
}

interface ILinkedList<T> {
    append: (element: T) => void;
    insertAt: (element: T, position: number) => void;
    getSize: () => number;
    print: () => void;
}

export class LinkedList<T> implements ILinkedList<T> {
    private head: Node<T> | null;
    private size: number;
    constructor() {
        this.head = null;
        this.size = 0;
    }

    insertAt(element: T, index: number) {
        if (index < 0 || index > this.size) {
            console.log('Enter a valid index');
            return;
        } else {
            const node = new Node(element);

            if (index === 0) {
                let lastHead = this.head;
                this.head = node;
                this.head.next = lastHead;
            } else {
                let curr = this.head;
                let currIndex = 0;

                if (curr !== null) {
                    while (currIndex < index - 1 && curr.next !== null) {
                        curr = curr.next;
                        currIndex += 1;
                    }

                    let lastNext = curr.next;
                    curr.next = node;
                    node.next = lastNext;
                } else {
                    this.head = node;
                }

            }

            this.size++;
        }
    }

    append(element: T) {
        const node = new Node(element);
        let current;

        if (this.head === null) {
            this.head = node;
        } else {
            current = this.head;
            while (current.next) {
                current = current.next;
            }

            current.next = node;
        }
        this.size++;
    }

    delete() {
        if (this.size !== 0 && this.head !== null) {
            let current = this.head;
            while (current.next !== null && current.next.next) {
                current = current.next;
            }
            current.next = null;
        }
        this.size--;
    }

    deleteAt(index: number) {
        if (index < 0 || index > this.size) {
            console.log('Enter a valid index');
            return;
        } else {
            if (index === 0 && this.head !== null) {
                this.head = this.head.next;
                this.size--;
            } else {
                let curr = this.head;
                let currIndex = 0;
                if (curr !== null) {
                    while (currIndex < index - 1 && curr.next !== null) {
                        curr = curr.next;
                        currIndex += 1;
                    }
                    if (curr.next) {
                        curr.next = curr.next?.next;
                        this.size--;
                    }
                }
            }
        }
    }

    getSize() {
        return this.size;
    }

    print() {
        let curr = this.head;
        let res = '';
        while (curr) {
            res += `${curr.value} `;
            curr = curr.next;
        }
        console.log(res);
    }

    innerArr() {
        let curr = this.head;
        let res: Array<T> = [];
        while (curr) {
            res.push(curr.value);
            curr = curr.next;
        }
        return res;
    }

    pointers() { return { head: this.head } }
}
