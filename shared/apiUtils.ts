// shared/apiUtils.ts
import { faker } from '@faker-js/faker';

// Generate a user with random values (manual randomization)
export async function registerRandomUser(request: any, apiBaseUrl: string) {
  const randomEmail = 'tripinasuser' + Math.floor(Math.random() * 10000) + Date.now() + '@email.com';
  const newUser = {
    firstName: 'Regie',
    lastName: 'Test',
    username: 'regie' + Math.floor(Math.random() * 10000),
    email: randomEmail,
    password: process.env.TRIPINAS_PASSWORD
  };

  const response = await request.post(apiBaseUrl + '/register', {
    data: newUser,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return { response, newUser };
}

// Generate a user with faker.js
export async function registerFakerUser(request: any, apiBaseUrl: string) {
  const newUser = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    username: faker.internet.userName().replace(/[^a-zA-Z0-9]/g, ''), // avoid invalid chars
    email: faker.internet.email(),
    password: process.env.TRIPINAS_PASSWORD
  };

  const response = await request.post(apiBaseUrl + '/register', {
    data: newUser,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return { response, newUser };
}
