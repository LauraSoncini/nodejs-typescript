import { Request, Response } from 'express';

import { getEnvVar } from '../config';

const VERIFY_TOKEN = getEnvVar('VERIFY_TOKEN', 'avhealth2025-whatsapp');

export const verifyWebhook = (req: Request, res: Response) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  } else {
    return res.sendStatus(403);
  }
};

export const handleWebhook = (req: Request, res: Response) => {
  console.log('🔔 Evento recebido:', JSON.stringify(req.body, null, 2));
  return res.sendStatus(200);
};
