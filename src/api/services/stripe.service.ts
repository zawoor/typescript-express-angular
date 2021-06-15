
import fetch from 'node-fetch';

class StripeService {

    /**
     * Method returns customers from stripe api
     *
     * @param {string} token Authorization token.
     */
    public async getCustomers(token: string): Promise<any> {
        const baseUrl = 'https://api.stripe.com';
        const queryString = `/v1/customers?limit=100`;

        const response = await fetch(baseUrl + queryString, {
            method: 'get',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data;
    }

    /**
     * Method returns invoices from stripe api
     *
     * @param {string} token Authorization token.
     */
    public async getInvoices(token: string): Promise<any> {
        const baseUrl = 'https://api.stripe.com';
        const queryString = `/v1/invoices?limit=100`;

        const response = await fetch(baseUrl + queryString, {
            method: 'get',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data;
    }

    /**
     * Method combines customers and invoices and produce array of:
     *  {
     *      id: any,
     *      email: any,
     *      balance: any,
     *      invoices_count: any,
     *      invoices_amount: any
     *  }
     *
     * @param {any} customers output of getCustomers.data.
     * @param {any} invoices output of getInvoices.data.
     */
    public async processCustomersAndInvoices(customers: any, invoices: any): Promise<any> {
        let data = [];
        for (let customer in customers) {
            let customerInvoices = invoices.filter((element: any) => element['customer'] == customers[customer]['id']);
            let invoicesSum = 0
            if (typeof customerInvoices != 'undefined' && customerInvoices.length) {
                customerInvoices.forEach((invoice: any) => {
                    invoicesSum = invoicesSum + invoice['total'];
                });
            }
            let customerObj = {
                id: customers[customer]['id'],
                email: customers[customer]['email'],
                balance: customers[customer]['balance'],
                invoices_count: customerInvoices.length,
                invoices_amount: invoicesSum,
            }
            data.push(customerObj)
        }
        return data.sort((n1: any, n2: any) => {
            if (n1.invoices_amount > n2.invoices_amount) {
                return -1;
            }
            if (n1.invoices_amount < n2.invoices_amount) {
                return 1;
            }
            return 0;
        });
    }
}

export default StripeService;