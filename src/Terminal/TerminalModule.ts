import { TerminalController } from "./TerminalController";
import { TerminalRepository } from "./TerminalRepository";
import { TerminalAdapter } from "./TerminalAdapter";
import { TerminalService } from "./TerminalService";
import { ProviderToken } from "src/ProviderToken";
import { Module } from "@nestjs/common";

@Module({
    imports: [],
    controllers: [ TerminalController ],
    providers: [
        {
            provide: ProviderToken.TERMINAL_REPOSITORY,
            useClass: TerminalRepository
        },
        {
            provide: ProviderToken.TERMINAL_ADAPTER,
            useClass: TerminalAdapter
        },
        {
            provide: ProviderToken.TERMINAL_SERVICE,
            useClass: TerminalService
        }
    ]
})
export class TerminalModule {

}