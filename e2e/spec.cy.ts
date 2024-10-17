import "../controller/v1/UserController"
import {UserController} from "../controller/v1/UserController";
import {UserService} from "../service/UserService";
import {UserLoginRes} from "../model/user/UserLoginRes";

describe('template spec', () => {

    let userService = new UserService();

    before(async () => {
        await userService.login();
    });

    it('When we assign a student to a corner stop that was not a stop for the same school and ' +
        'then we assign that stop to an existing run in the Morning', async function () {
        console.log('token env', Cypress.env('token'));
    });

    it('When we assign a student to a corner stop that was not a stop for the same school and ' +
        'then we assign that stop to an existing run in the Morning', async function () {

        console.log('token env', Cypress.env('token'));
        let res = await userService.list();
        console.log('res', res);
        expect('token').eq('tok',"Hello Miss Fatemeh")
    });
});