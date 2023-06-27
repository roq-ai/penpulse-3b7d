import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { publisherValidationSchema } from 'validationSchema/publishers';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getPublishers();
    case 'POST':
      return createPublisher();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getPublishers() {
    const data = await prisma.publisher
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'publisher'));
    return res.status(200).json(data);
  }

  async function createPublisher() {
    await publisherValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.topic?.length > 0) {
      const create_topic = body.topic;
      body.topic = {
        create: create_topic,
      };
    } else {
      delete body.topic;
    }
    const data = await prisma.publisher.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
