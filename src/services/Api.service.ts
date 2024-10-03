import { mapParams } from '@/utils';
import { ResultsImageFetchType } from '@/types/ResultsImageFetchType';

const IMAGES_PER_PAGE = 10;
const RAW_URL = 'https://api.unsplash.com';
const URL_PAGES = {
  searchImages: '/search/photos',
  randomImages: '/photos/random',
};

class Api {
  static async fetchImagesByQuery(
    query: string,
  ): Promise<ResultsImageFetchType> {
    const options: RequestInit = {
      headers: {
        Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_API_KEY}`,
      },
    };
    const params: { [key: string]: string } = {
      query: query,
      count: IMAGES_PER_PAGE.toString(),
    };
    const stringParams = mapParams(params);
    const urlPage = query ? URL_PAGES.searchImages : URL_PAGES.randomImages;

    const url = encodeURI(RAW_URL + urlPage + stringParams);

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        return Promise.reject(
          'Network response was not ok ' + response.statusText,
        );
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.log('There was a problem with the fetch operation:', error);
      return Promise.reject('There was a problem with the fetch operation');
    }
  }
}

export default Api;
