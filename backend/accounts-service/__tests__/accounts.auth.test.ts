import request from 'supertest';
import app from '../src/app'

describe('Testing routes to authentication', () => {

    //mock data
    const password = '123456';
    const passwordWrong = 'abc123';
    const passwordShort = '123';
    const payload = {
        email: 'ale@ale.com',
        password: password,
    };
    const payloadNewUser = {
        id: 1,
        name: 'alejandro',
        email: 'ale@ale.com',
        password: '123456',
        status: 100
    };

    it('POST /account/login - 200 Ok', async () => {

        // mock
        await request(app)
        .post('/accounts/')
        .send(payloadNewUser);

        // test
        const result = await request(app)
            .post('/accounts/login')
            .send(payload);

        expect(result.status).toEqual(200);
        expect(result.body.auth).toBeTruthy();
        expect(result.body.token).toBeTruthy();


    });

    it('POST /account/login - 422 Unprocessable Entity (WebDAV)', async () => {

        payload.password =  passwordShort;

        const result = await request(app)
            .post('/accounts/login')
            .send(payload);

        expect(result.status).toEqual(422);

    });

    it('POST /account/login - 401 Unauthorized', async () => {

        payload.password = passwordWrong;

        const result = await request(app)
            .post('/accounts/login')
            .send(payload);

        expect(result.status).toEqual(401);

    });

    it('POST /account/logout - 200 Ok', async () => {

        const result = await request(app)
            .post('/accounts/logout');

        expect(result.status).toEqual(200);

    });

})