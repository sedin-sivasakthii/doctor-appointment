const fs = require('fs');
const path = require('path');

const apiUrl = 'https://doctor-appointment-f9cc.onrender.com';

const targetPath = path.join(__dirname, '..', 'src', 'environments', 'environment.prod.ts');

const envConfigFile = `export const environment = {
  production: true,
  apiUrl: '${apiUrl}'
};
`;

fs.writeFileSync(targetPath, envConfigFile, { encoding: 'utf8' });
console.log(`Wrote environment.prod.ts with apiUrl=${apiUrl}`);
