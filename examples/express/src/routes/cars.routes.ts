import { Router } from "express";
import { CarBulkController } from "../controllers/car.bulk.controller";
import { CarController } from "../controllers/car.controller";
import { CarsController } from "../controllers/cars.controller";
import { CarsService } from "../services/cars.service";

const carsRoutes = Router();
const carsService = new CarsService();
const carsController = new CarsController(carsService);
const carController = new CarController(carsService);
const carBulkController = new CarBulkController(carsService);

carsRoutes.get('/cars', carsController.getCars.bind(carsController));
carsRoutes.post('/cars', carsController.postCar.bind(carsController));
carsRoutes.get('/cars/:id', carController.getCar.bind(carController));
carsRoutes.post('/cars/bulk', carBulkController.postBulkCar.bind(carBulkController));

export default carsRoutes;