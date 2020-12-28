import { Request, Response } from 'express';
import { IAccount } from '../models/account';
import repository from '../models/accountModel';
import auth from '../core/auth';

const accounts: IAccount[] = [];

const msgErroFormatID = 'ID is invalid format.';


async function getAccounts(req: Request, res: Response, next: any) {
    const accounts = await repository.findAll();
    res.json(accounts.map(item => {
        item.password = '';
        return item;
    }))
}

async function getAccount(req: Request, res: Response, next: any) {
    try {
        const id = parseInt(req.params.id);
        if (!id) throw new Error(msgErroFormatID);

        const account = await repository.findById(id);
        if (account == null)
            return res.status(404).end();
        else
            account.password = '';
        res.json(account);

    } catch (error) {
        console.log(error);
        res.status(400).end();
    }
}

async function addAccount(req: Request, res: Response, next: any) {
    try {
        const newAccount = req.body as IAccount;
        newAccount.password = auth.hashPassword(newAccount.password);

        const result = await repository.add(newAccount);
        newAccount.id = result.id;
        newAccount.password = '';
        res.status(201).json(newAccount);
    } catch (error) {
        console.log(error);
        res.status(400).end();
    }
}

async function setAccount(req: Request, res: Response, next: any) {

    try {
        const accountId = parseInt(req.params.id);
        if (!accountId) throw new Error(msgErroFormatID);

        const accountParams = req.body as IAccount;

        const updateAccount = await repository.set(accountId, accountParams);
        updateAccount.password = '';

        // const index = accounts.findIndex(item => item.id === accountId);
        // if (index === -1) return res.status(404).end();

        // const originalAccount = accounts[index];

        // if (accountParams.name) originalAccount.name = accountParams.name;
        // if (accountParams.password) originalAccount.password = accountParams.password;

        // accounts[index] = originalAccount;

        res.status(200).json(updateAccount);

    } catch (error) {
        console.log('Error setAccount : ', error);
        res.status(400).end();
    }

}

function loginAccount(req: Request, res: Response, next: any) {
    try {
        const loginParams = req.body as IAccount;

        const index = accounts.findIndex(item => item.email === loginParams.email && item.password === loginParams.password);
        if (index === -1) return res.status(401).end();

        res.json({ auth: true, token: {} })
    } catch (error) {
        console.log(error);
        res.status(400).end();
    }

}

function logoutAccount(req: Request, res: Response, next: any) {
    res.json({ auth: false, token: null })
}

export default {
    getAccounts,
    getAccount,
    addAccount,
    setAccount,
    loginAccount,
    logoutAccount
}