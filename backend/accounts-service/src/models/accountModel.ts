//core
import database from '../core/db';
import Sequelize, { Model, Optional } from 'sequelize';
//app
import { IAccount } from './account';

interface AccountCreationAttributes extends Optional<IAccount, "id"> { }
export interface AccountModel extends Model<IAccount, AccountCreationAttributes>, IAccount { }

const accountModel = database.define<AccountModel>('account', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.SMALLINT.UNSIGNED,
        allowNull: true,
        defaultValue: 100
    },
    domain: {
        type: Sequelize.STRING,
        allowNull: true
    }

});

function findAll() {
    return accountModel.findAll<AccountModel>();
}
function findById(id: number) {
    return accountModel.findByPk<AccountModel>(id);
}
function add(account: IAccount) {
    return accountModel.create(account);
}
async function set(id:number, account: IAccount) {
    const origianlAccount = await accountModel.findByPk<AccountModel>(id);
    if (origianlAccount !== null) {
        origianlAccount.name = account.name;
        origianlAccount.domain = account.domain;
        account.status = account.status
        if(!account.password)
        origianlAccount.password = account.password;

        await origianlAccount.save();
        return  origianlAccount;
    }
    throw new Error(`Account not found.`);
}

export default { findAll, findById, add, set }