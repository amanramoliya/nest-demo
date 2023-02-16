import { Body, Controller, Get, Post } from '@nestjs/common';
import { Pokemon } from '@prisma/client';
import { createPokemonDto } from './dto/create-pokemon.dto';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}
  @Get()
  getAllPokemon(): Promise<Pokemon[]> {
    return this.pokemonService.findAllPokemon();
  }

  @Post()
  createPokemon(@Body() createPokemonDto: createPokemonDto): Promise<Pokemon> {
    return this.pokemonService.savePokemon(createPokemonDto);
  }
}
