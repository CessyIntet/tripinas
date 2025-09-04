import { faker } from '@faker-js/faker';

export async function registerRandomUser(request: any, apiBaseUrl: string) {
    const randomEmail = 'tripinasuser' + Math.floor(Math.random() * 10000) + Date.now() + '@email.com';
    const newUser = {
        firstName: 'Regie',
        lastName: 'Test',
        username: 'regietest' + Math.floor(Math.random() * 10000),
        email: randomEmail,
        password: process.env.TRIPINAS_PASSWORD
    };
    const response = await request.post(apiBaseUrl + 'http://localhost:5173/sign-up', {
        data: newUser,
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return { response, newUser };
}

export async function registerFakerUser(request: any, apiBaseUrl: string) {
    const newUser = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        username: faker.internet.userName(),
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