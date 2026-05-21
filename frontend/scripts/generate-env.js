const fs = require('fs');
const path = require('path');

const apiUrl =
  process.env.API_URL ||
  process.env.BACKEND_API_URL ||
  'http://localhost:5000';

const targetPath = path.join(__dirname, '..', 'src', 'environments', 'environment.prod.ts');

const envConfigFile = `export const environment = {
  production: true,
  apiUrl: '${apiUrl}'
};
`;

fs.writeFileSync(targetPath, envConfigFile, { encoding: 'utf8' });
console.log(`Wrote environment.prod.ts with apiUrl=${apiUrl}`);
