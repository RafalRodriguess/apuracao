import { handleApi } from '../server/api';

export const config = { runtime: 'edge', regions: ['gru1'] };

export default function handler(request: Request) {
  return handleApi(request);
}
