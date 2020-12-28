import requestSTest from 'supertest'

import app from '../src/app'

describe('testing router accounts', () => {

    //mock
    const id: number = 1;
    const idWrong = -1;
    const name = 'ale';
    const nameUpdate = 'alejandro'
    const payload = {
        id: id,
        name: name,
        email: 'ale@ale.com',
        password: '123456',
        status: 100
    };


    it('POST /accounts/ - ERROR : must return status 201', async () => {

        const res = await requestSTest(app)
            .post('/accounts/')
            .send(payload);

        expect(res.status).toEqual(201);

    });

    it('GET /accounts/ - SUCCESS : must return status 200', async () => {

        const res = await requestSTest(app)
            .get('/accounts/')

        expect(res.status).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();

    });

    it('GET /accounts/:id - SUCCESS : must return status 200', async () => {

        const res = await requestSTest(app)
            .get(`/accounts/${payload.id}`)

        expect(res.status).toEqual(200);
        expect(res.body.id).toEqual(payload.id);

    });

    it('GET /accounts/:id - ERROR : must return status 404', async () => {

        const res = await requestSTest(app)
            .get(`/accounts/${idWrong}`)

        expect(res.status).toEqual(404);

    });

    it('PATCH /accounts/:id - SUCCESS : must return status 200', async () => {

        payload.name = nameUpdate;

        const res = await requestSTest(app)
            .patch(`/accounts/${payload.id}`)
            .send(payload);

        expect(res.status).toEqual(200);
        expect(res.body.id).toEqual(payload.id);

    });

    it('PATCH /accounts/:id - ERROR : must return status 404', async () => {

        const res = await requestSTest(app)
            .patch(`/accounts/${idWrong}`)
            .send(payload);

        expect(res.status).toEqual(404);

    });

    it('PATCH /accounts/:id - ERROR : must return status 400', async () => {

        const res = await requestSTest(app)
            .patch(`/accounts/abc`)
            .send(payload);

        expect(res.status).toEqual(400);

    });
})


