const migrateMongo = require('migrate-mongo');
const config = require('./migrate-mongo-config');

async function runMigrations() {
  await migrateMongo.database.connect();
  await migrateMongo.up();
}

runMigrations().then(() => {
  console.log('Migrations completed successfully!');
  process.exit(0);
}).catch(error => {
  console.error('Migration error:', error);
  process.exit(1);
});
