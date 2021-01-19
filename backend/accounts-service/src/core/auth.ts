import bcrypt from 'bcryptjs'
import jwt, { VerifyOptions } from 'jsonwebtoken'
import fs from 'fs';
import authCommons, { Token } from 'ms-commons/api/core/auth';

//fs init from workspace root
const privateKey = fs.readFileSync('./keys/private.key', 'utf-8');
const jwtExpires = parseInt(`${process.env.JWT_EXPIRES}`);
const jwtAlgorithm = "RS256";

function hashPassword(password: string) {
    return bcrypt.hashSync(password, 10);
}

function comparePassword(password: string, hasPassword: string) {
    return bcrypt.compareSync(password, hasPassword);
}

function sign(accountId: number) {
    const token: Token = { accountId };
    return jwt.sign(token, privateKey, {
        expiresIn: jwtExpires, algorithm: jwtAlgorithm
    });
}

async function verify(token: string) {
    return authCommons.verify(token);
}

export default { hashPassword, comparePassword, sign, verify }