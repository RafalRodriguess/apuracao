import { handleApi } from '../server/api';

export const config = { runtime: 'edge' };

export default function handler(request: Request) {
  return handleApi(request);
}
