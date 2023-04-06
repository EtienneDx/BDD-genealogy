import createApp from './src';
import DatabaseServiceImpl from './src/entities/database';
import neo4j from 'neo4j-driver';

const databaseService = new DatabaseServiceImpl(
  neo4j.driver('bolt://localhost:7687')
);
const app = createApp(databaseService);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
