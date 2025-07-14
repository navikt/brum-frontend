import { http, HttpResponse } from 'msw';
import { testData } from './mocks';

export const handlers = [
//   http.get('/api/data', ({ request }) => {
//     const url = new URL(request.url);
//     const dataset = url.searchParams.get('dataset');

//     if (dataset === 'brum') {
//       return HttpResponse.json(testData);
//     }

//     return HttpResponse.json(
//       { error: `Dataset '${dataset}' not found` },
//       { status: 404 }
//     );
//   }),

//  http.get('/api/userInfo', () => {
//     return new HttpResponse(JSON.stringify({
//       NAVident: 'Z123456',
//       email: 'test.user@nav.no',
//       name: 'Test User',
//     }), {
//       status: 200,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//   }),

];
