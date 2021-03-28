import { Router } from 'express';

import subscriberRouter from '../../../../modules/pessoas/infra/http/routes/subscriber.routes';
import contactSiteRouter from '../../../../modules/pessoas/infra/http/routes/contactSite.routes';
import usersRouter from '../../../../modules/users/infra/http/routes/users.routes';
import sessionsRouter from '../../../../modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '../../../../modules/users/infra/http/routes/password.routes';
import profileRouter from '../../../../modules/users/infra/http/routes/profile.routes';

// import contasReceberRouter from '../../../../../modules/contasReceber/infra/http/routes/contasReceber.routes';

const routes = Router();


routes.use('/subscriber', subscriberRouter);
routes.use('/contactSite', contactSiteRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);


export default routes;
