/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/extensions */

// Reference: https://github.com/sequelize/umzug/tree/master/examples/1.sequelize-typescript
require('ts-node/register');
require('dotenv').config();

console.log(process.env.POSTGRES_HOST);

require('./umzug').migrator.runAsCLI();
