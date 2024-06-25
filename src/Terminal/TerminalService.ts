import { TerminalAdapterInterface } from "./TerminalAdapter";
import { CreateTerminalDto } from "./dto/CreateTerminalDto";
import { GetTerminalDto } from "./dto/GetTerminalDto";
import { RequestError } from "src/types/RequestError";
import { ProviderToken } from "src/ProviderToken";
import { TerminalStatus } from "./TerminalStatus";
import { Terminal } from "./Terminal";
import {
    Inject,
    Injectable
} from "@nestjs/common";

export interface TerminalServiceInterface {
    findAll: () => Promise<GetTerminalDto | RequestError>
    find: (id: number) => Promise<Terminal | RequestError>
    save: (input: CreateTerminalDto) => Promise<Terminal | RequestError>
    remove: (id: number) => Promise<Terminal | RequestError>
}

@Injectable()
export class TerminalService implements TerminalServiceInterface {
    public constructor(
        @Inject(ProviderToken.TERMINAL_ADAPTER)
        private readonly adapter: TerminalAdapterInterface
    ) {  }

    public async findAll(): Promise<GetTerminalDto | RequestError> {
        const data = await this.adapter.findAll();
        if (data instanceof RequestError) {
            return data;
        }
        return {
            terminais: data
        }
    }

    public async find(id: number): Promise<Terminal | RequestError> {
        return await this.adapter.find(id);
    }

    public async save(input: CreateTerminalDto): Promise<Terminal | RequestError> {
        return await this.adapter.save({
            ...input,
            createdAt: new Date,
            logs: [],
            status: TerminalStatus.NEW
        });
    }

    public async remove(id: number): Promise<Terminal | RequestError> {
        return await this.adapter.remove(id);
    }
}