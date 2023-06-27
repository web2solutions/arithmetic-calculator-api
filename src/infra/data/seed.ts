/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { dbConnection, users, operations, records } from '../../model';
import { initialUsersRecords } from '../../../tests/users.mock';
import { initialOperationsRecords } from '../../../tests/operations.mock';
import { initialRecordsRecords } from '../../../tests/records.mock';

(async (): Promise<void> => {
  console.log(dbConnection);
  let collectionName = 'Users';
  console.info(`===========> Seeding - ${collectionName}`);
  console.log(`     >> deleting all records from ${collectionName} collection`);
  await users.deleteMany({});
  for (const record of initialUsersRecords) {
    try {
      console.log(`     >> creating ${record._id}`);
      await users.create(record);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
  console.info(`<===========> ${collectionName} is done.`);

  collectionName = 'Operations';
  console.info(`===========> Seeding - ${collectionName}`);
  console.log(`     >> deleting all records from ${collectionName} collection`);
  await operations.deleteMany({});
  for (const record of initialOperationsRecords) {
    try {
      console.log(`     >> creating ${record._id}`);
      await operations.create(record);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
  console.info(`<===========> ${collectionName} is done.`);

  collectionName = 'Records';
  console.info(`===========> Seeding - ${collectionName}`);
  console.log(`     >> deleting all records from ${collectionName} collection`);
  await records.deleteMany({});
  for (const record of initialRecordsRecords) {
    try {
      console.log(`     >> creating ${record._id}`);
      await records.create(record);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
  console.info(`<===========> ${collectionName} is done.`);

  process.exit(0);
})();
