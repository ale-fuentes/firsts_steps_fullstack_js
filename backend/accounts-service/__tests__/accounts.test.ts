import request from 'supertest'
import { expect, beforeAll, afterAll, describe, it } from '@jest/globals';


import app from '../src/core/app'
import { IAccount } from '../src/models/account'
import repository from '../src/models/accountRepository'
import auth from '../src/core/auth'
import expectCt from 'helmet/dist/middlewares/expect-ct'

//mock
const testEmail = 'jest@jest.com';
const testEmailNewUSer = 'jestnew@jest.com';
const hashPassword = '$2a$10$6rPAU7jtU1sWPmVhfYha3.aHx6Vwbfhr.OZnYQeXIchZCwvJMQ3bq';
const testPassword = '123456';
let jwt: string;

const payload: IAccount = {
    name: 'jest NEW',
    email: testEmailNewUSer,
    password: testPassword,
    domain: 'jestnew.com'
};

beforeAll(async () => {
    const testAccount: IAccount = {
        name: 'jest',
        email: testEmail,
        password: hashPassword,
        domain: 'jest.com'
    };

    await repository.removeByEmail(testEmail);
    const result = await repository.add(testAccount);
    jwt = auth.sign(result.id!);
});

afterAll(async () => {
    const result = await repository.removeByEmail(testEmail);
});


describe('testing router accounts', () => {

    it('GET  SUCCESS : /accounts/ : must return status 200 : listing all itens', async () => {

        //mock

        //test
        const res = await request(app)
            .get('/accounts/')
            .set('x-access-token', jwt);

        expect(res.status).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();

    });

    it('POST SUCCESS : /accounts/ : must return status 201 : create a new item', async () => {

        //mock

        //test
        const res = await request(app)
        .post('/accounts/')
        .set('x-access-token', jwt)
        .send(payload);
        
        expect(res.status).toEqual(201);

        const result = await repository.removeByEmail(testEmailNewUSer);
        expect(result).toBeTruthy()
        
    });
    
    it('GET  SUCCESS : /accounts/:id : must return status 200 : get item by ID', async () => {
        
        //mock
        const resultPayload = await repository.add(payload);

        //test
        const res = await request(app)
        .get(`/accounts/${resultPayload.id}`)
        .set('x-access-token', jwt)
        
        expect(res.status).toEqual(200);
        expect(res.body.id).toEqual(resultPayload.id);
        
        const result = await repository.removeByEmail(testEmailNewUSer);
        expect(result).toBeTruthy()
        
    });
    
    it('GET  ERROR : /accounts/:id : must return status 404 : get item by wrong ID', async () => {
        
        //mock
        const idWrong = -1;
        
        //test
        const res = await request(app)
        .get(`/accounts/${idWrong}`)
        .set('x-access-token', jwt)
        
        expect(res.status).toEqual(404);
        
    });
    
    it('PATCH  SUCCESS : /accounts/:id : must return status 200 : update name of item', async () => {
        
        //mock
        const resultPayload = await repository.add(payload);
        resultPayload.name += 'name Update';
        
        
        console.log(`PATCH data : with data -> ${JSON.stringify(resultPayload)}`);
        
        //test
        const res = await request(app)
        .patch(`/accounts/${resultPayload.id}`)
        .set('x-access-token', jwt)
        .send(resultPayload);
        
        expect(res.status).toEqual(200);
        expect(res.body.id).toEqual(resultPayload.id);
        
        const result = await repository.removeByEmail(testEmailNewUSer);
        expect(result).toBeTruthy()
    });

    // it('PATCH /accounts/:id - ERROR : must return status 404', async () => {

    //     const res = await requestSTest(app)
    //         .patch(`/accounts/${idWrong}`)
    //         .send(payload);

    //     expect(res.status).toEqual(404);

    // });

    // it('PATCH /accounts/:id - ERROR : must return status 400', async () => {

    //     const res = await requestSTest(app)
    //         .patch(`/accounts/abc`)
    //         .send(payload);

    //     expect(res.status).toEqual(400);

    // });
})


