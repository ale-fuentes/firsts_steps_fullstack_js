import accountModel, { IAccountModel } from './accountModel'
import { IAccount } from './account'
import { DestroyOptions } from 'sequelize';


function findAll() {
    return accountModel.findAll<IAccountModel>();
}

function findById(id: number) {
    return accountModel.findByPk<IAccountModel>(id);
}

function findByEmail(emailFilter: string) {
    return accountModel.findOne<IAccountModel>({ where: { email: emailFilter } });
}

function add(account: IAccount) {
    return accountModel.create(account);
}

async function set(id: number, account: IAccount) {
    const origianlAccount = await accountModel.findByPk<IAccountModel>(id);
    if (origianlAccount !== null) {
        origianlAccount.name = account.name;
        origianlAccount.domain = account.domain;
        account.status = account.status
        if (!account.password)
            origianlAccount.password = account.password;

        await origianlAccount.save();
        return origianlAccount;
    }
    throw new Error(`Account not found.`);
}

function remove(id: number) {
    return accountModel.destroy({ where: { id: id } } as DestroyOptions<IAccount>)
}

function removeByEmail(email: string) {
    return accountModel.destroy({ where: { email: email } } as DestroyOptions<IAccount>)
}

export default {
    findAll,
    findById,
    findByEmail,
    add,
    set,
    remove,
    removeByEmail
}