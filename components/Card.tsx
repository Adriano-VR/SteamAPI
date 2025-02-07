import { Game } from "@/interface/interface";
import { Card, CardBody, Image } from "@heroui/react";
import { FC } from "react";
import { useRouter } from "next/navigation"; // Importando 'useRouter' de 'next/navigation' no Next.js 13+

export const CardComponent: FC<{ game: Game }> = ({ game }) => {
  const router = useRouter(); // Usando o hook 'useRouter' para navegação

  const handlePress = (game: Game) => {
    // Navega para a página de detalhes usando 'game.id' como parâmetro
    router.push(`/gameDetails/${game.id}`); // A URL será /gameDetails/[gameId]
  };

  return (
    <Card
      isPressable
      shadow="sm"
      onPress={() => handlePress(game)} // Ao pressionar, chama a navegação
      className="relative hover:scale-105"
    >
      <div className="z-50 absolute flex-col inset-0 flex items-center justify-center bg-black bg-opacity-50 hover:bg-opacity-90 opacity-0 hover:opacity-100 transition duration-300 ease-in-out rounded">
        <span className="text-sm md:text-lg font-extrabold px-2 text-center">
          {game.name}
        </span>
      </div>

      <CardBody className="overflow-visible p-0">
        <Image
          alt={game.cover.url}
          className="w-full object-cover h-full"
          radius="lg"
          shadow="sm"
          src={game.cover.url.replace("t_thumb", "t_720p")}
          width="100%"
        />
      </CardBody>
    </Card>
  );
};
