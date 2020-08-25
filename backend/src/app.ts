import { app } from './server'
import { Config } from './config';

// start the Express server
app.listen(Config.PORT, () => {
    // es-lint-disable  no-console
    console.log(`server started at http://localhost:${Config.PORT}`);
});