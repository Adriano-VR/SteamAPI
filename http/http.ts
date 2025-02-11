require('dotenv').config();
import axios from 'axios';

const CLIENT_ID = process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_TWITCH_CLIENT_SECRET;


async function getAccessToken() {
  try {
    const response = await axios.post('/auth', null, {
      params: {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'client_credentials'
      }
    });
    return response.data.access_token;
  } catch (error) {
    console.error('Erro ao obter token:', (error as any).response?.data);
  }
}

const TODAY_TIMESTAMP = Math.floor(new Date().setUTCHours(0, 0, 0, 0) / 1000);


export async function getGamesComingSoon() {
  const token = await getAccessToken();
  if (!token) return;
  console.log('token' , token);
  

  const query = `
  fields name, cover.url, first_release_date;
       where first_release_date > ${TODAY_TIMESTAMP} & category = 0;
       sort first_release_date asc;
       limit 20;
`;


  try {
    const response = await axios.post(
      '/games',
      query,
      {
        headers: {
          'Client-ID': CLIENT_ID,
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      }
    );
    return response.data
  } catch (error) {
    console.error('Erro ao buscar jogos:', (error as any).response?.data);
    return null
  }
}

export async function getMostHypedGames() {
  const token = await getAccessToken();

  const query = `
  fields name, cover.url, hypes, first_release_date;
       where hypes > 0 & category = 0;
       sort hypes desc;
       limit 30;
`;

  try {
    const response = await axios.post(
      '/games',
      query,
      {
        headers: {
          'Client-ID': CLIENT_ID,
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      }
    );

    // console.log(response.data);
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro ao buscar os jogos mais hypados:", error.response ? error.response.data : error.message);
    } else {
      console.error("Erro ao buscar os jogos mais hypados:", error);
    }
  }
}

export async function getGameDetails({ params }: { params: { gameId: string } }) {
  const token = await getAccessToken();
  const { gameId } = params;

  if (!token) {
    console.error('Token não obtido!');
    return null;
  }

  try {
    const [gameResponse, videoResponse, devResponse, screenResponse] = await Promise.all([
      axios.post('/games', `fields name, first_release_date, cover.url,rating,summary,aggregated_rating; where id = ${gameId};`, {
        headers: { 'Client-ID': CLIENT_ID, 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
      }),
      axios.post('/videos', `fields video_id; where game = ${gameId};`, {
        headers: { 'Client-ID': CLIENT_ID, 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
      }),
      axios.post('/involved_companies', `fields company.name; where game = ${gameId} & developer = true;`, {
        headers: { 'Client-ID': CLIENT_ID, 'Authorization': `Bearer ${token}` },
      }),
      axios.post('/screenshots', `fields url; where game = ${gameId};`, {
        headers: { 'Client-ID': CLIENT_ID, 'Authorization': `Bearer ${token}` },
      }),
    ]);

    if (gameResponse.data.length === 0) {
      console.error('Jogo não encontrado!');
      return null;
    }

    return {
      game: gameResponse.data[0],
      video: videoResponse.data[0]?.video_id || null,
      developer: devResponse.data[0]?.company?.name || null,
      screenshots: screenResponse.data.map((screenshot: { url: string }) => 
        screenshot.url.replace('t_thumb', 't_original')
      ) || [],
    };
  } catch (error:any) {
    console.error('Erro ao buscar detalhes do jogo:', error.response?.data || error.message);
    return null;
  }
}
