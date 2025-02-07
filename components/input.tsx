"use client";


import { Kbd } from '@heroui/kbd';
import React from 'react';
import { SearchIcon } from './icons';
import {Input} from "@heroui/input";
import Link from 'next/link';
import { useRouter } from "next/navigation";


const InputComponent = () => {

  const router = useRouter();


  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      router.push("/results");
    }
  };

    return (
      <Input
      onKeyUp={handleKeyUp}
      size='lg'
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-lg",
        
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          Enter
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Informe sua Steam Id..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
    )
};

export default InputComponent;