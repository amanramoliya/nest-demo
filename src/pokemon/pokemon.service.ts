import { Injectable } from '@nestjs/common';
import { Pokemon } from '@prisma/client';
import { PrismaSerivce } from './../prisma/prisma.service';
import { createPokemonDto } from './dto/create-pokemon.dto';

@Injectable()
export class PokemonService {
  constructor(private readonly prismaService: PrismaSerivce) {}

  findAllPokemon(): Promise<Pokemon[]> {
    return this.prismaService.pokemon.findMany();
  }

  savePokemon(createPokemonDto: createPokemonDto) {
    const { name, imageUrl, power } = createPokemonDto;
    return this.prismaService.pokemon.create({
      data: {
        name,
        imageUrl,
        PokemonPower: {
          createMany: {
            data: power.map((powerId) => {
              return { powerId };
            }),
          },
        },
      },
    });
  }
}
