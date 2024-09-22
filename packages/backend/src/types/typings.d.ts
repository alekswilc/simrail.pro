import { RedisClientType } from 'redis'
import { SimrailClient } from '../util/SimrailClient.ts'
/* eslint no-var: off */
declare global
{
    declare var redis: RedisClientType, 
        client: SimrailClient;

}