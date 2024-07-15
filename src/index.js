import {ServerApi} from './server/Server.js';
import env from 'dotenv';
env.config()
const server = new ServerApi();

server.listen();

'trafficlly-db.clsd7qbcglcc.us-east-1.rds.amazonaws.com'
