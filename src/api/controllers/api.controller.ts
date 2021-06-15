import { NextFunction, Request, Response } from 'express';
import StripeService from '../services/stripe.service';

class ApiController {
    public stripeService = new StripeService();

    public getCustomers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const customers = await this.stripeService.getCustomers(process.env.TOKEN);
            const invoices = await this.stripeService.getInvoices(process.env.TOKEN);
            const data = await this.stripeService.processCustomersAndInvoices(customers['data'], invoices['data']);
            res.status(200).send(data);
        } catch (error) {
            next(error);
        }
    };
}

export default ApiController;
