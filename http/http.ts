require('dotenv').config();
import axios from 'axios';
import { NextResponse } from 'next/server';

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

export async function getGames() {
  const token = await getAccessToken();
  if (!token) return;

  try {
    const response = await axios.post(
      '/games',
      `fields name, hypes, cover.url, genres.name;
        sort hypes desc;
        where hypes > 10;
        limit 12;`,
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



export async function getGamesById({ params }: { params: { gameId: string } }) {
  // Obtém o token de acesso
  const token = await getAccessToken();
  const { gameId } = params;

  console.log("Game ID:", gameId); // Para depuração

  if (!token) {
    console.error('Token não obtido!');
    return null; // Retorna null se o token não estiver disponível
  }

  try {
    // Fazendo a requisição para a API do IGDB para buscar os detalhes do jogo pelo gameId
    const response = await axios.post(
      '/games', // URL correta da API do IGDB
      `fields name, cover.url,first_release_date, franchise,platforms,screenshots,videos,websites,involved_companies, summary; where id = ${gameId};`, // Query para buscar o jogo
      {
        headers: {
          'Client-ID': CLIENT_ID,
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        }
      }
    );

    // Verificando se há dados na resposta
    if (response.data.length === 0) {
      console.error('Jogo não encontrado!');
      return null; // Retorna null se o jogo não for encontrado
    }

    return response.data[0]; // Retorna o primeiro jogo encontrado
  } catch (error) {
    console.error('Erro ao buscar jogo:', (error as any).response?.data);
    return null; // Retorna null caso haja algum erro na requisição
  }
}

