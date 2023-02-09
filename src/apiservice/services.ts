import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = process.env.REACT_APP_DOG_API;

export function getDogBreeds() {
    return axios.get(API_URL + '/v1/breeds', {headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
    }})
};

export function getBreedsByPageLimit(limit: number, pageNum: number) {
    return axios.get(API_URL + `/v1/breeds?limit=${limit}&page=${pageNum}`, {headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
    }})
};