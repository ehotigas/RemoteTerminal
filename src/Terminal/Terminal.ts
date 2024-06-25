import { TerminalLog } from "./TerminalLog/TerminalLog";
import { TerminalStatus } from "./TerminalStatus";
import { ApiProperty } from "@nestjs/swagger";
import { spawn } from "child_process";

export class Terminal {
    @ApiProperty({ type: Number })
    id: number;

    @ApiProperty({ type: [TerminalLog] })
    logs: TerminalLog[];

    @ApiProperty({ type: String })
    title: string;

    @ApiProperty({ type: String })
    command: string;

    @ApiProperty({
        type: String,
        enum: TerminalStatus
    })
    status: TerminalStatus;

    @ApiProperty({ type: Date })
    createdAt: Date;

    @ApiProperty({ type: String })
    createdBy: string;

    instanceSubProcess?: () => Promise<void>

    kill?: () => Promise<void>

    public constructor(terminal?: Partial<Terminal>) {
        this.id = terminal?.id;
        this.logs = terminal?.logs;
        this.title = terminal?.title;
        this.command = terminal?.command;
        this.status = terminal?.status;
        this.createdAt = terminal?.createdAt;
        this.createdBy = terminal?.createdBy;

        this.instanceSubProcess = async () => {
            const cmd = spawn('powershell.exe', ['-Command', `cd $env:USERPROFILE; ${this.command}`]);
            this.status = TerminalStatus.RUNNING;

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
                this.status = TerminalStatus.ERROR;
                
            });

            cmd.on('error', (err) => {
                this.logs.push(new TerminalLog({
                    date: new Date(),
                    message: `[ERROR] ${err.message}`,
                    terminalId: this.id
                }));
                this.status = TerminalStatus.ERROR;
            });

            cmd.on('close', (code) => {
                if (!code) {
                    this.status = TerminalStatus.FINISHED;
                }
                else {
                    this.status = TerminalStatus.ERROR;
                }
            });

            this.kill = async () => {
                cmd.kill('SIGKILL');
                this.status = TerminalStatus.KILLED;
            }
        }
        this.instanceSubProcess();
    }
}