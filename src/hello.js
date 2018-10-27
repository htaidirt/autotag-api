import response from '../lib/response';

export async function success(event) {
  return response('Hi', 200);
}
