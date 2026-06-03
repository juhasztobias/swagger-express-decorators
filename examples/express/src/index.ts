import 'dotenv';
import 'reflect-metadata';
import './models/constructors/constructor.model';

import app from './app';
import carsRoutes from './routes/cars.routes';

app.use(carsRoutes)

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.info('Server is listening on port : ' + port);
});