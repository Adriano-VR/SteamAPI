import { Game, GameDetails } from "@/interface/interface";
import { Card, CardBody, CardFooter, CardHeader, Image } from "@heroui/react";
import { FC } from "react";
import { useRouter } from "next/navigation"; // Importando 'useRouter' de 'next/navigation' no Next.js 13+

interface CardComponentHomeProps {
  game: GameDetails;
  label: string;
}

export const CardComponentHome: FC<CardComponentHomeProps> = ({ game,label }) => {
  const router = useRouter(); // Usando o hook 'useRouter' para navegação

  const handlePress = (game: Game) => {
    // Navega para a página de detalhes usando 'game.id' como parâmetro
    router.push(`/gameDetails/${game.id}`); // A URL será /gameDetails/[gameId]
  };

  return (
    <Card
      isPressable
      shadow="sm"
      onPress={() => handlePress(game)} 
      className="w-72"
    >
      
  
      <CardBody className="overflow-visible p-0">
        <Image
          alt={game.cover.url}
          className="w-full object-cover"
          radius="lg"
          shadow="sm"
          src={game.cover.url.replace("t_thumb", "t_720p")}
          width="100%"
        />
      </CardBody>
      <CardFooter >
  <span className="w-full truncate block overflow-hidden whitespace-nowrap">{game.name}</span>
</CardFooter>

    </Card>
  );
};
