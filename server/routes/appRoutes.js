import express from 'express';

import { sendConfirmationEmail} from '../controllers/appController.js';

const appRouter = express.Router();

appRouter.post('/send-email', sendConfirmationEmail);


export default appRouter;