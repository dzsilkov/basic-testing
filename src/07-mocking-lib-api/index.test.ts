// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

const path = 'users';

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const axiosCreate = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi(path);

    expect(axiosCreate).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockedAxiosGet = jest.spyOn(axios.Axios.prototype, 'get');
    await throttledGetDataFromApi(path);
    jest.runAllTimers();

    expect(mockedAxiosGet).toHaveBeenCalledWith(path);
  });

  test('should return response data', async () => {
    const users = [
      {userId: 2, name: 'John'},
      {userId: 3, name: 'Jane'},
      {userId: 4, name: 'Bob'},
    ];
    jest.spyOn(axios.Axios.prototype, 'get').mockResolvedValue({ data: users });
    const data = await throttledGetDataFromApi(path);

    expect(data).toBeDefined();
    expect(data).toStrictEqual(users);
  });
});
