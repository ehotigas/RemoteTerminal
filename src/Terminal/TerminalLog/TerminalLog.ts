import { ApiProperty } from "@nestjs/swagger";

export class TerminalLog {
    @ApiProperty({ type: Number })
    id: number;

    @ApiProperty({ type: Date })
    date: Date;

    @ApiProperty({ type: String })
    message: string;

    @ApiProperty({ type: Number })
    terminalId: number;

    public constructor(
        log?: Partial<TerminalLog>
    ) {
        this.id = log?.id;
        this.date = log?.date;
        this.message = log?.message;
        this.terminalId = log?.terminalId;
    }
}