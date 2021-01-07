import request from 'supertest';
import { expect, beforeAll, afterAll, describe } from '@jest/globals';

import app from '../src/core/app'
import { IAccount } from '../src/models/account';
import repository from '../src/models/accountRepository'

const testEmail = 'jest@jest.com';
const hashPassword = '$2a$10$6rPAU7jtU1sWPmVhfYha3.aHx6Vwbfhr.OZnYQeXIchZCwvJMQ3bq';
const testPassword = '123456';

beforeAll(async () => {
    const testAccount: IAccount = {
        name: 'jest',
        email: testEmail,
        password: hashPassword,
        domain: 'jest.com'
    };

    const result = await repository.add(testAccount);
    console.log(`beforeAll ... ${ JSON.stringify(result)}`);
});

afterAll(async () => {
    const result = await repository.removeByEmail(testEmail);
    console.log(`beforeAll ... ${result}`);
});

describe('Testing routes to authentication', () => {

    it('POST /account/login - SUCCESS : 200 Ok', async () => {

        // mock
        const payload = {
            email: testEmail,
            password: testPassword
        }
        
        // test
        const result = await request(app)
        .post('/accounts/login')
        .send(payload);
        
        expect(result.status).toEqual(200);
        expect(result.body.auth).toBeTruthy();
        expect(result.body.token).toBeTruthy();
        
        
    });
    
    it('POST /account/login - ERROR : 422 Unprocessable Entity (WebDAV)', async () => {
        
        // mock
        const payload = {
            email: testEmail,
        }
        
        // test
        const result = await request(app)
        .post('/accounts/login')
        .send(payload);
        
        expect(result.status).toEqual(422);
        
    });
    
    it('POST /account/login - ERROR : 401 Unauthorized', async () => {
        
        // mock
        const payload = {
            email: testEmail,
            password: testPassword + '1'
        }
        
        // test
        const result = await request(app)
        .post('/accounts/login')
        .send(payload);
        
        expect(result.status).toEqual(401);
        
    });
    
    it('POST /account/logout - SUCCESS : 200 Ok', async () => {
        
        // mock
       
        // test
        const result = await request(app)
        .post('/accounts/logout');
        
        expect(result.status).toEqual(200);
        
    });

})