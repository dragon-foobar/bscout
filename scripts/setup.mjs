import { MongoClient } from 'mongodb';
import * as argon2 from "argon2";
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';

dotenv.config();

const setup = async () => {
  let client;
  console.log('about to try connecting')
  try {
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    console.log('connected')
    const hasData = await client
      .db('test')
      .collection('users')
      .countDocuments();
    console.log('has data',hasData)
    if (hasData) {
      console.log('Database already exists with data');
      await client.db('test').collection('users').drop()
    }
    console.log('about to make records')
    const records = await Promise.all([...Array(10)].map(async(_num,index) => {
      const [fName, lName] = faker.name.fullName().split(' ');
      const username = faker.internet.userName(fName, lName);
      const email = `${index}admin@gmail.com`;
      const image = faker.image.avatar();
      const bio = 'This is just a test bio. Sue me'
      const password = await argon2.hash("password");

      return {
        name: `${fName} ${lName}`,
        username,
        email,
        password,
        image,
        followers: 0,
        emailVerified: null,
        bio,
      };
    }));
    console.log('about to insert data')
    const insert = await client
      .db('test')
      .collection('users')
      .insertMany(records);

    if (insert.acknowledged) {
      console.log('Successfully inserted records');
    }
  } catch (error) {
    return 'Database is not ready yet';
  } finally {
    if (client) {
      await client.close();
    }
  }
} 

try {
  setup();
} catch {
  console.warn('Database is not ready yet. Skipping seeding...');
}

export { setup };
