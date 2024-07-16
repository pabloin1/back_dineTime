import {ServerApi} from './server/Server.js';
import env from 'dotenv';

env.config()

const server = new ServerApi();

server.listen();