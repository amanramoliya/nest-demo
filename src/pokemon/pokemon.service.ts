import { Injectable } from '@nestjs/common';
import { Pokemon, Power } from '@prisma/client';
import { PrismaSerivce } from './../prisma/prisma.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';

@Injectable()
export class PokemonService {
  constructor(private readonly prismaService: PrismaSerivce) {}

  findAllPokemon(): Promise<Pokemon[]> {
    return this.prismaService.pokemon.findMany();
  }

  savePokemon(createPokemonDto: CreatePokemonDto) {
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

  findPokemonById(id: string) {
    const pid = parseInt(id);
    return this.prismaService.pokemon.findFirst({ where: { id: pid } });
  }

  async deletePokemonById(id: string) {
    const pid = parseInt(id);
    await this.prismaService.pokemonPower.deleteMany({
      where: {
        pokemonId: pid,
      },
    });
    await this.prismaService.pokemon.delete({
      include: {
        PokemonPower: {},
      },
      where: { id: pid },
    });
  }

  async findPowerByPokemonId(id: string): Promise<Power[]> {
    const pid = parseInt(id);
    const result = await this.prismaService.pokemonPower.findMany({
      where: { pokemonId: pid },
      select: {
        power: true,
      },
    });
    const powers = result.map((p) => {
      return p.power;
    });
    return powers;
  }

  async deletePokemonPower(id: string, powerId: string) {
    const iid = parseInt(id);
    const iPid = parseInt(powerId);
    await this.prismaService.pokemonPower.deleteMany({
      where: {
        pokemonId: iid,
        powerId: iPid,
      },
    });
  }
}
