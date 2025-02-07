/** @type {import('next').NextConfig} */
const nextConfig = {
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
        
          
        ];
      },
    };


module.exports = nextConfig;
