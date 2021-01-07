import bcrypt from 'bcryptjs'
import jwt, { VerifyOptions } from 'jsonwebtoken'
import fs from 'fs';
import { func } from 'joi';

//fs init from workspace root
const privateKey = fs.readFileSync('./keys/private.key', 'utf-8');
const publicKey = fs.readFileSync('./keys/public.key', 'utf-8');
const jwtExpires = parseInt(`${process.env.JWT_EXPIRES}`);
const jwtAlgorithm = "RS256";

function hashPassword(password: string) {
    return bcrypt.hashSync(password, 10);
}

function comparePassword(password: string, hasPassword: string) {
    return bcrypt.compareSync(password, hasPassword);
}

type Token = { accountId: number };

function sign(accountId: number) {
    const token = { accountId };
    return jwt.sign(token, privateKey, {
        expiresIn: jwtExpires, algorithm: jwtAlgorithm
    });
}

async function verify(token: string) {
    try {
        const decode: Token = await jwt.verify(token, publicKey, { algorithm: [jwtAlgorithm] } as VerifyOptions) as Token;
        return { accountId: decode.accountId };
    } catch (error) {
        console.log(`verify: ${error}`);
        return null;
    }

}

export default { hashPassword, comparePassword, sign, verify }