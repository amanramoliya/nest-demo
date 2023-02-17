import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Pokemon, Power } from '@prisma/client';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}
  @Get()
  getAllPokemon(): Promise<Pokemon[]> {
    return this.pokemonService.findAllPokemon();
  }

  @Post()
  createPokemon(@Body() createPokemonDto: CreatePokemonDto): Promise<Pokemon> {
    return this.pokemonService.savePokemon(createPokemonDto);
  }

  @Get('/:id')
  getPokemonById(@Param('id') id: string) {
    return this.pokemonService.findPokemonById(id);
  }

  @Delete('/:id')
  deletePokemonById(@Param('id') id: string) {
    return this.pokemonService.deletePokemonById(id);
  }

  @Get('/:id/power')
  getPowerByPokemonI(@Param('id') id: string): Promise<Power[]> {
    return this.pokemonService.findPowerByPokemonId(id);
  }

  @Delete('/:id/power/:powerId')
  deletePokemonPowerId(
    @Param('id') id: string,
    @Param('powerId') powerId: string,
  ): void {
    this.pokemonService.deletePokemonPower(id, powerId);
  }
}
