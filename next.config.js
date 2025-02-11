/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.igdb.com"], // Permite carregar imagens desse domínio
  },
    async rewrites() {
        return [
          {
            source: '/auth',
            destination: 'https://id.twitch.tv/oauth2/token', // Proxy para o endpoint da API
          },
          {
            source: '/games',
            destination: 'https://api.igdb.com/v4/games', // Proxy para o endpoint da API
          },
          {
            source: '/involved_companies',
            destination: 'https://api.igdb.com/v4/involved_companies', // Proxy para o endpoint da API
          },
          {
            source: '/videos',
            destination: 'https://api.igdb.com/v4/game_videos', // Proxy para o endpoint da API
          },
          {
            source: '/companies',
            destination: 'https://api.igdb.com/v4/companies', // Proxy para o endpoint da API
          },
          {
            source: '/screenshots',
            destination: 'https://api.igdb.com/v4/screenshots', // Proxy para o endpoint da API
          },
        
          
        ];
      },
    };


module.exports = nextConfig;
