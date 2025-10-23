import { fetchProductDetails } from './product.logic';
import * as api from './product.api';

jest.mock('../../utils/httpClientUtil', () => ({
  default: {},
  getAccessToken: jest.fn(),
  getRefreshToken: jest.fn(),
  setTokens: jest.fn(),
}));

// Completely mock the API module
jest.mock('./product.api', () => ({
  apiCallToTheProductsEndpoint: jest.fn()
}));



describe('Product Store Logic', () => {
  let set: jest.Mock;

  beforeEach(() => {
    set = jest.fn();
    jest.clearAllMocks();
  });

  // ---------------------- Success Case ----------------------
  test('fetchProductDetails success sets products and loading false', async () => {
    const mockProducts = [
      {
        productId: 'p1',
        productName: 'Product One',
        interestRate: 5,
        fundingWindow: 30,
        coolingPeriod: 10,
        Tenure: 12,
        description: 'Test product 1'
      },
      {
        productId: 'p2',
        productName: 'Product Two',
        interestRate: 6,
        fundingWindow: 45,
        coolingPeriod: 15,
        Tenure: 24,
        description: 'Test product 2'
      }
    ];

    // Mock API call to return products
    (api.apiCallToTheProductsEndpoint as jest.Mock).mockResolvedValue({ data: mockProducts });

    await fetchProductDetails(set);

    // First call sets loading true
    expect(set).toHaveBeenCalledWith(expect.any(Function));

    // Second call sets products
    const productsFn = set.mock.calls[1][0];
    const productsState = productsFn();
    expect(productsState).toEqual({ products: mockProducts });

    // Third call sets loading false and error false
    const finalFn = set.mock.calls[2][0];
    const finalState = finalFn();
    expect(finalState).toEqual({ loading: false, error: false });
  });

  // ---------------------- Failure Case ----------------------
  test('fetchProductDetails failure sets error true and loading false', async () => {
    // Mock API call to throw error
    (api.apiCallToTheProductsEndpoint as jest.Mock).mockRejectedValue(new Error('API failure'));

    await fetchProductDetails(set);

    // Second call (catch block) sets error
    const errorFn = set.mock.calls[1][0];
    const errorState = errorFn();
    expect(errorState).toEqual({ error: true, loading: false });
  });
});
