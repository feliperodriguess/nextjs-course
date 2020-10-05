import Prismic from 'prismic-javascript';

export const client = (req = null) => {
  const options = req ? { req } : null;
  return Prismic.client('https://samcrommerce.cdn.prismic.io/api/v2', options);
};
