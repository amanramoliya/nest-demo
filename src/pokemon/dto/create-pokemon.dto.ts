import { IsNotEmpty } from 'class-validator';

export class createPokemonDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  imageUrl: string;
  @IsNotEmpty()
  power: number[];
}
