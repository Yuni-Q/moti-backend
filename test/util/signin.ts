import request from 'supertest';

export const signin = async (req: request.SuperTest<request.Test>) => {
  const snsType = 'apple';
  const token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwcGxlaWQuYXBwbGUuY29tIiwiYXVkIjoiY29tLm1hc2h1cC5haG9ic3UuQWhvYnN1IiwiZXhwIjoxNjE2MTYzNjE5LCJpYXQiOjE1ODEyNTQxOTAsInN1YiI6IjAwMTgxMy43MWY5N2JlZjQ4MzI0ZmIyOTQ1MWEzM2UwNWQyY2Y1ZC4wOTA4IiwiY19oYXNoIjoiS0IwVzc1enZJRkVjWTl6Vy03OXV4USIsImVtYWlsIjoiajV2dmQ5eHRyYkBwcml2YXRlcmVsYXkuYXBwbGVpZC5jb20iLCJlbWFpbF92ZXJpZmllZCI6InRydWUiLCJpc19wcml2YXRlX2VtYWlsIjoidHJ1ZSIsImF1dGhfdGltZSI6MTU4MTI1NDE5MCwianRpIjoiYzJmYzUxYTItYzJjOS00MzkzLWJmNWEtNjI1MzcxYmNiZTA4In0.gvLaeAtvyXLHqicQ9eWw3G6Kia9HJr03hzS2NWkJz-8';
  return req.post('/api/v1/signin').set('Authorization', token).send({ snsType });
};

// {
//   // eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwcGxlaWQuYXBwbGUuY29tIiwiYXVkIjoiY29tLm1hc2h1cC5haG9ic3UuQWhvYnN1IiwiZXhwIjoxNjE2MTYzNjE5LCJpYXQiOjE1ODEyNTQxOTAsInN1YiI6IjAwMTgxMy43MWY5N2JlZjQ4MzI0ZmIyOTQ1MWEzM2UwNWQyY2Y1ZC4wOTA4IiwiY19oYXNoIjoiS0IwVzc1enZJRkVjWTl6Vy03OXV4USIsImVtYWlsIjoiajV2dmQ5eHRyYkBwcml2YXRlcmVsYXkuYXBwbGVpZC5jb20iLCJlbWFpbF92ZXJpZmllZCI6InRydWUiLCJpc19wcml2YXRlX2VtYWlsIjoidHJ1ZSIsImF1dGhfdGltZSI6MTU4MTI1NDE5MCwianRpIjoiYzJmYzUxYTItYzJjOS00MzkzLWJmNWEtNjI1MzcxYmNiZTA4In0.gvLaeAtvyXLHqicQ9eWw3G6Kia9HJr03hzS2NWkJz-8
//   iss: 'https://appleid.apple.com',
//   // "iss": "https://accounts.google.com",
//   aud: 'com.mashup.ahobsu.Ahobsu',
//   exp: 1581254790,
//   iat: 1581254190,
//   sub: '001813.71f97bef48324fb29451a33e05d2cf5d.090822',
//   c_hash: 'KB0W75zvIFEcY9zW-79uxQ',
//   email: 'j5vvd9xtrb@privaterelay.appleid.com',
//   email_verified: 'true',
//   is_private_email: 'true',
//   auth_time: 1581254190,
// }
