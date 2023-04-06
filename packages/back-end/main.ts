import createApp from './src';

const app = createApp();

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
