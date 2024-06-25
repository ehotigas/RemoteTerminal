import { TerminalLog } from "./TerminalLog/TerminalLog";
import { ApiProperty } from "@nestjs/swagger";
import { spawn } from "child_process";

export class Terminal {
    @ApiProperty({ type: Number })
    id: number;

    @ApiProperty({ type: [TerminalLog] })
    logs: TerminalLog[];

    @ApiProperty({ type: String })
    command: string;

    @ApiProperty({ type: Date })
    createdAt: Date;

    @ApiProperty({ type: String })
    createdBy: string;

    instanceSubProcess?: () => Promise<void>

    public constructor(terminal?: Partial<Terminal>) {
        this.id = terminal?.id;
        this.logs = terminal?.logs;
        this.command = terminal?.command;
        this.createdAt = terminal?.createdAt;
        this.createdBy = terminal?.createdBy;
        this.instanceSubProcess = async () => {
            console.log("start");
            const cmd = spawn('powershell.exe', ['-Command', this.command]);
            cmd.stdout.on('data', (data) => {
                this.logs.push(new TerminalLog({
                    date: new Date(),
                    message: `[LOG] ${data}`,
                    terminalId: this.id
                }));
            });

            cmd.stderr.on('data', (data) => {
                this.logs.push(new TerminalLog({
                    date: new Date(),
                    message: `[ERROR] ${data}`,
                    terminalId: this.id
                }));
            });

            cmd.on('error', (err) => {
                this.logs.push(new TerminalLog({
                    date: new Date(),
                    message: `[ERROR] ${err.message}`,
                    terminalId: this.id
                }));
            });

            cmd.on('close', (code) => {
                console.log(`child process exited with code ${code}`);
            });
        }
        this.instanceSubProcess();
    }
}