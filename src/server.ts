import app from './index';

const port = process.env.PORT || 3002;

const server = app.listen(port, () => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(`🛡️ Server listening on port: ${port} 🛡️`);
    console.log(
      `🛡️ API documentation available at ${process.env.BASE_URL}/api/v1/api-docs 🛡️`
    );
  }
});

const shutdown = () => {
  server.close(() => {
    console.log('🛡️ Server closed 🛡️');
    process.exit(0);
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
