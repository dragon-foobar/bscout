import { MongoClient } from "mongodb";
import * as argon2 from "argon2";
import { faker } from "@faker-js/faker";
import dotenv from "dotenv";

dotenv.config();

const setup = async () => {
  let client;
  console.log("about to try connecting");
  try {
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    console.log("connected");
    const count = await client
      .db("test")
      .collection("users")
      .countDocuments();
    if (count > 0) {
      return;
    }
    console.log("about to make records");
    const records = await Promise.all(
      [...Array(50)].map(async (_num, index) => {
        const [fName, lName] = faker.name.fullName().split(" ");
        const username = faker.internet.userName(fName, lName);
        const email = `${index}admin@gmail.com`;
        const image = faker.image.avatar();
        const info = "I'm a bitcoiner, so sue me. (p.s. you can edit this if you're logged in and this is your profile.";
        const password = await argon2.hash("password");
        const nostrPublicKey =
          "npub16c0nh3dnadzqpm76uctf5hqhe2lny344zsmpm6feee9p5rdxaa9q586nvr";
        const githubUsername = "dragon-foobar";
        const linkedInUsername = "miljan";
        const xUsername = "miljan";

        return {
          name: `${fName} ${lName}`,
          username,
          email,
          password,
          image,
          followers: 1,
          emailVerified: null,
          bio: info,
          availability: info,
          contact: info,
          skillsAndExperience: info,
          nostrPublicKey,
          githubUsername,
          linkedInUsername,
          xUsername,
        };
      })
    );
    console.log("about to insert data");
    const insert = await client
      .db("test")
      .collection("users")
      .insertMany(records);

    if (insert.acknowledged) {
      console.log("Successfully inserted records");
    }
  } catch (error) {
    return "Database is not ready yet";
  } finally {
    if (client) {
      await client.close();
    }
  }
};

try {
  setup();
} catch {
  console.warn("Database is not ready yet. Skipping seeding...");
}

export { setup };
