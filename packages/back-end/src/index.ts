import express from 'express';
import DatabaseServiceImpl from './entities/database';
import neo4j from 'neo4j-driver';

export default function createApp() {
  const app = express();
  app.set(
    'databaseService',
    new DatabaseServiceImpl(neo4j.driver('bolt://localhost:7687'))
  );

  app.get('/', (_, res) => {
    res.json({ message: 'Hello World' });
  });

  return app;
}
