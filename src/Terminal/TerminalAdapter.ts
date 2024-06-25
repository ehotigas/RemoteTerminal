import { TerminalRepositoryInterface } from "./TerminalRepository";
import { RequestError } from "src/types/RequestError";
import { ProviderToken } from "src/ProviderToken";
import { Terminal } from "./Terminal";
import {
    Inject,
    Injectable
} from "@nestjs/common";

export interface TerminalAdapterInterface {
    findAll: () => Promise<Terminal[] | RequestError>
    find: (id: number) => Promise<Terminal | RequestError>
    save: (input: Omit<Terminal, 'id'>) => Promise<Terminal | RequestError>
    remove: (id: number) => Promise<Terminal | RequestError>
}

@Injectable()
export class TerminalAdapter implements TerminalAdapterInterface {
    public constructor(
        @Inject(ProviderToken.TERMINAL_REPOSITORY)
        private readonly repository: TerminalRepositoryInterface
    ) {  }

    public async findAll(): Promise<Terminal[] | RequestError> {
        try {
            return await this.repository.find();
        }
        catch(error) {
            console.error(error);
            return new RequestError(error.message);
        }
    }

    public async find(id: number): Promise<Terminal | RequestError> {
        try {
            return await this.repository.findOne((terminal) => terminal.id === id);
        }
        catch(error) {
            console.error(error);
            return new RequestError(error.message);
        }
    }

    public async save(input: Omit<Terminal, 'id'>): Promise<Terminal | RequestError> {
        try {
            return await this.repository.save(input);
        }
        catch(error) {
            console.error(error);
            return new RequestError(error.message);
        }
    }

    public async remove(id: number): Promise<Terminal | RequestError> {
        try {
            const terminal = await this.repository.findOne((terminal) => terminal.id === id);
            return await this.repository.remove(terminal);
        }
        catch(error) {
            console.error(error);
            return new RequestError(error.message);
        }
    }
}