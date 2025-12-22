import { test, expect } from '@playwright/test';

test('should get all products', async ({ request }) => {
  const response = await request.get('/products');
  expect(response.ok()).toBeTruthy();

  const responseBody = await response.json();
  console.log(responseBody);
});
