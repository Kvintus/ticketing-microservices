import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server'

let mongo: MongoMemoryServer;

beforeAll(async () => {
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri()
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
})

beforeEach(async () => {
  process.env.JWT_KEY = 'peterlaurojefrajer'

  const collections = await mongoose.connection.db.collections()
  for(let collection of collections) {
    await collection.deleteMany({});
  }
})

afterAll(async () => {
  await mongo.stop()
  await mongoose.connection.close()
})