import supertest from 'supertest'
import { Response } from 'express'

import app from '../src/app'



describe('testing router accounts', () => {
    it('POST /accounts/ - must return status 201', async () => {
        const payload = {
            id: 1,
            name: 'ale',
            email: 'ale@ale.com',
            password: '123',
            status: 1
        };

        const res = await supertest(app)
            .post('/accounts/')
            .send(payload);

        expect(res.status).toEqual(201);

    })
})