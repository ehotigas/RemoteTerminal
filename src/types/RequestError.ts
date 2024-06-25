import { ApiProperty } from "@nestjs/swagger";

export class RequestError {
    @ApiProperty({ type: Number })
    private readonly statusCode: number;

    @ApiProperty({ type: String })
    private readonly mesage: string;

    public constructor(
        message: string,
        statusCode: number = 500
    ) {
        this.mesage = message;
        this.statusCode = statusCode;
    }
}