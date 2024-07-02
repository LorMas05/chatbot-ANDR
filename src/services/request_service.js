const axios = require('axios');

const magentoUrl = 'https://www.andronico.it';
const token = 'q8gvkfflbuhsbncege4ld26ty9umjf51';

export default async function getCatalog(){
  try {
    const response = await axios.get(`${magentoUrl}/rest/V1/search`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      params: {
        searchCriteria: {
          requestName: 'quick_search_container',
          filterGroups: [
            {
              filters: [
                {
                  field: 'category_id',
                  value: "3599",
                  condition_type: 'eq' // Condizione di uguaglianza per category_id
                }
              ]
            }
          ],
          pageSize: 10, // Numero massimo di prodotti per pagina
          current_page: 1, // Pagina corrente dei risultati
          sortOrders: [ // Opzionale: ordinamento dei risultati
            {
              field: 'created_at',
              direction: 'DESC'
            }
          ]
        }
      }
    });

    console.log('Total Products:', response.data.total_count);
    console.log('Products:', response.data.items);

    return response.data.items; // Ritorna l'elenco dei prodotti
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error; // Rilancia l'errore per gestirlo altrove se necessario
  }
};

