import axios from 'axios';
import { baseUrl } from './constants';

vi.mock('axios');
const apiInstance = axios.create({
  baseURL: baseUrl,
});

describe('apiInstance', () => {
  it('should create an axios instance with the correct baseURL', () => {
    expect(axios.create).toHaveBeenCalledWith({ baseURL: baseUrl });
  });

});
