import { ImageInfoType, ResultsImageFetchType } from '@/types';

const mapImages = (data: ResultsImageFetchType): ImageInfoType[] => {
  const results = 'results' in data ? data.results : data;
  return results.map((item) => ({
    id: item.id,
    alt: item.alt_description,
    src: item.urls.small,
    orientation: item.width >= item.height ? 'horizontal' : 'vertical',
  }));
};

export default mapImages;
