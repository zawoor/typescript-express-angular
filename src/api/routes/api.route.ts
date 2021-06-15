import { Router } from 'express';
import ApiController from '../controllers/api.controller';
import Route from '../interfaces/routes.interface';

class ApiRoute implements Route {
    public path = '/api';
    public router = Router();
    public apiController = new ApiController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.apiController.getCustomers);
    }
}

export default ApiRoute;
