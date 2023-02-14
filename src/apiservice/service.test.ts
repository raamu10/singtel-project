import axios from "axios";

// Mock jest and set the type
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Service API', () => {
    test('service api loaded',  () => {

    });
})

