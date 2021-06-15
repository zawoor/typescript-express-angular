import request from 'supertest';
import App from '../../app';
import IndexRoute from '../routes/api.route';
import iconv from 'iconv-lite';
import chai from "chai";
import chaiAsPromised from "chai-as-promised";

import StripeService from '../services/stripe.service';

chai.use(chaiAsPromised);
chai.should();

iconv.encodingExists('foo');

describe('Testing API', () => {
    describe('Stripe Service', () => {
        it('processCustomersAndInvoices should combine results', async () => {
            const stripeService = new StripeService();

            const customers = [{
                id: '123',
                email: 'kz@zawoor.com',
                balance: 0
            }];
            const invoices = [
                {
                    customer: '123',
                    total: '10'
                },
                {
                    customer: '123',
                    total: '21'
                }
            ];
            const results = await stripeService.processCustomersAndInvoices(customers, invoices);

            JSON.stringify(results).should.be.equal(JSON.stringify([
                {
                    id: '123',
                    email: 'kz@zawoor.com',
                    balance: 0,
                    invoices_count: 2,
                    invoices_amount: '01021'
                }
            ]));
        });
    });

    describe('[GET] /', () => {
        it('response statusCode 200', () => {
            const ordersRoute = new IndexRoute();
            const app = new App([ordersRoute]);

            return request(app.getServer()).get(`${ordersRoute.path}`).expect(200);
        });
    });
});
