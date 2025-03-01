import './prelude';

import fastifyHelmet from '@fastify/helmet';
import fastifyStatic from '@fastify/static';
import fastifyUnderPressure from '@fastify/under-pressure';
import { Kita } from '@kitajs/runtime';
import closeWithGrace from 'close-with-grace';
import fp from 'fastify-plugin';
import path from 'path';

export default fp(async (app) => {
  app.register(Kita);

  app.register(fastifyUnderPressure, {
    maxEventLoopDelay: 1000,
    maxHeapUsedBytes: 1000000000,
    maxRssBytes: 1000000000,
    maxEventLoopUtilization: 0.98
  });

  app.register(fastifyHelmet, {
    global: true,
    contentSecurityPolicy: false
  });

  // console.log({ path })
  app.register(fastifyStatic, {
    root: path.resolve('public')
  });

  const closeListeners = closeWithGrace({ delay: 500 }, async ({ err }) => {
    if (err) {
      app.log.error(err);
    }

    await app.close();
  });

  // Cancelling the close listeners
  app.addHook('onClose', async () => {
    closeListeners.uninstall();
  });
});
