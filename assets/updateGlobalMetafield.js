require('dotenv').config();
const axios = require('axios');

const storeUrl = process.env.SHOPIFY_STORE_URL;
const accessToken = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN;

async function updateGlobalMetafield() {
  try {
    const metafieldsResponse = await axios.get(
      `https://${storeUrl}/admin/api/2024-07/metafields.json`,
      {
        headers: {
          'X-Shopify-Access-Token': accessToken,
          'Content-Type': 'application/json',
        },
      }
    );

    let metafield = metafieldsResponse.data.metafields.find(
      (field) => field.namespace === 'global' && field.key === 'test'
    );

    if (metafield) {
      const updatedValue = parseInt(metafield.value) + 1;
      await axios.put(
        `https://${storeUrl}/admin/api/2024-07/metafields/${metafield.id}.json`,
        {
          metafield: {
            id: metafield.id,
            value: updatedValue.toString(),
            type: 'number_integer',
          },
        },
        {
          headers: {
            'X-Shopify-Access-Token': accessToken,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(`Global metafield updated. New value: ${updatedValue}`);
    } else {
      const createdMetafield = await axios.post(
        `https://${storeUrl}/admin/api/2024-07/metafields.json`,
        {
          metafield: {
            namespace: 'global',
            key: 'test',
            value: '0',
            type: 'number_integer',
            owner_resource: 'product'
          },
        },
        {
          headers: {
            'X-Shopify-Access-Token': accessToken,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Global metafield created with value: 0');
    }
  } catch (error) {
    console.error('Error updating global metafield:', error.response ? error.response.data : error.message);
  }
}

updateGlobalMetafield();