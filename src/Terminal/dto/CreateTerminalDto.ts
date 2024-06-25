import { ApiProperty } from "@nestjs/swagger";

export class CreateTerminalDto {
    @ApiProperty({ type: String })
    command: string;

    @ApiProperty({ type: String })
    createdBy: string;
}