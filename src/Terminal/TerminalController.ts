import { TerminalServiceInterface } from "./TerminalService";
import { CreateTerminalDto } from "./dto/CreateTerminalDto";
import { GetTerminalDto } from "./dto/GetTerminalDto";
import { RequestError } from "src/types/RequestError";
import { ProviderToken } from "src/ProviderToken";
import { Terminal } from "./Terminal";
import {
    ApiBody,
    ApiParam,
    ApiResponse,
    ApiTags
} from "@nestjs/swagger";
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Inject,
    Param,
    ParseIntPipe,
    Post,
    ValidationPipe
} from "@nestjs/common";

@Controller("terminal")
@ApiTags("Terminal")
export class TerminalController {
    public constructor(
        @Inject(ProviderToken.TERMINAL_SERVICE)
        private readonly service: TerminalServiceInterface
    ) {  }

    @Get("/")
    @ApiResponse({
        status: 200,
        type: GetTerminalDto
    })
    @ApiResponse({
        status: 500,
        type: RequestError
    })
    public async getAll(): Promise<GetTerminalDto | RequestError> {
        return await this.service.findAll();
    }

    @Get("/:id")
    @ApiParam({
        name: 'id',
        type: Number
    })
    @ApiResponse({
        status: 200,
        type: Terminal
    })
    @ApiResponse({
        status: 500,
        type: RequestError
    })
    public async get(
        @Param('id', new ParseIntPipe) id: number
    ): Promise<Terminal | RequestError> {
        return await this.service.find(id);
    }

    @Post("/")
    @ApiBody({ type: CreateTerminalDto })
    @ApiResponse({
        status: 201,
        type: Terminal
    })
    @ApiResponse({
        status: 500,
        type: RequestError
    })
    @HttpCode(201)
    public async post(
        @Body(new ValidationPipe()) input: CreateTerminalDto
    ): Promise<Terminal | RequestError> {
        return await this.service.save(input);
    }

    @Delete("/:id")
    @ApiParam({
        name: 'id',
        type: Number
    })
    @ApiResponse({
        status: 204,
        type: Terminal
    })
    @ApiResponse({
        status: 500,
        type: RequestError
    })
    @HttpCode(204)
    public async delete(
        @Param('id', new ParseIntPipe) id: number
    ): Promise<Terminal | RequestError> {
        return await this.service.remove(id);
    }
}