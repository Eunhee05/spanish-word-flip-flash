import test from '@playwright/test'

test('Create order', async ({ request }) => {
  const orderPayload = {
    customerDetails: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      address: '1234 Main St',
      city: 'Rhyolite',
      zipcode: '89003',
      country: 'United States',
    },
    items: [
      {
        productId: '504',
        quantity: 1,
      },
    ],
  }

  const orderResponse = await request.post('/orders', {
    data: orderPayload,
  })

  const orderBody = await orderResponse.json()

  console.log(orderBody)
})
