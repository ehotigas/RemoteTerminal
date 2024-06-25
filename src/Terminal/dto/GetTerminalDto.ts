import { ApiProperty } from "@nestjs/swagger";
import { Terminal } from "../Terminal";

export class GetTerminalDto {
    @ApiProperty({ type: [Terminal] })
    terminais: Terminal[];
}