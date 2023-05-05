import { OnModuleInit } from '@nestjs/common';
import NextServer from 'next/dist/next-server/server/next-server';
export declare class ViewsService implements OnModuleInit {
    private server;
    onModuleInit(): Promise<void>;
    getNextServer(): NextServer;
}
