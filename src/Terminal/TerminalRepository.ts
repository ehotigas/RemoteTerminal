import { Injectable } from "@nestjs/common";
import { Terminal } from "./Terminal";

export interface TerminalRepositoryInterface {
    find(filter?: (terminal: Terminal) => boolean): Promise<Terminal[]>
    findOne(filter: (terminal: Terminal) => boolean): Promise<Terminal | null>
    save(terminal: Omit<Terminal, 'id'>): Promise<Terminal>
    remove(terminal: Terminal): Promise<Terminal>
}

@Injectable()
export class TerminalRepository implements TerminalRepositoryInterface {
    private db: Terminal[]
    private count: number;
    public constructor() {
        this.db = [];
        this.count = 0;
    }

    public async find(
        filter: (terminal: Terminal) => boolean = () => true
    ): Promise<Terminal[]> {
        return this.db.filter(filter);
    }

    public async findOne(
        filter: (terminal: Terminal) => boolean
    ): Promise<Terminal | null> {
        const arr = this.db.filter(filter);
        if (arr.length > 0) {
            return arr[0];
        }
        return null;
    }

    public async save(
        terminal: Omit<Terminal, 'id'>
    ): Promise<Terminal> {
        this.count++;
        const record = {
            ...terminal,
            id: this.count
        };
        this.db.push(new Terminal(record));
        return record;
    }

    public async remove(
        terminal: Terminal
    ): Promise<Terminal> {
        const index = this.db.indexOf(terminal);
        const record = this.db.splice(index, 1);
        return record[0];
    }
}