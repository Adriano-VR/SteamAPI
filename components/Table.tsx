"use client"
import { GameDetails } from "@/interface/interface";
import { Button, Link, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import Image from "next/image";
  
export default function TableComponent({ games, navigate }: { games: GameDetails[]; navigate: (url: string) => void }) {
 

    const columns = [
      { name: "Game Name", uid: "name" },
      { name: "Hype", uid: "hype" },
      { name: "Release", uid: "Release" },
   
    ];
 
    const handlePress = (game: GameDetails) => {
      navigate(`/gameDetails/${game.id}`); // Agora usa a função passada via prop
    };

  const renderCell = (game: GameDetails, columnKey: string) => {
    switch (columnKey) {
      case "name":
        return (
          <div className="flex items-center gap-3">
            <Image
              src={`https:${game.cover.url}`} // Ajuste para a propriedade correta da imagem
              alt={game.name}
              width={40}
              height={40}
              className="rounded-full"
            />
            <Button onPress={() => handlePress(game)} variant="ghost">{game.name}</Button>
          </div>
        );
      case "hype":
        return game.hypes;
      case "Release":
        return new Date(game.first_release_date * 1000).toLocaleDateString('pt-BR', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric'
        });
     
      default:
        return null;
    }
  };

  

  return (
    <Table aria-label="Game details table">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={games}>
        {(game) => (
          <TableRow key={game.id} >
            {(columnKey:any) => <TableCell className="cursor-pointer">{renderCell(game, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
