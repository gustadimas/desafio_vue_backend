import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateAlunoDto {
  @ApiProperty({ example: 'João Silva' })
  @IsString()
  @IsNotEmpty({ message: 'O nome não pode estar vazio' })
  nome: string;

  @ApiProperty({ example: 'joao@email.com' })
  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;

  @ApiProperty({ example: 20 })
  @IsInt()
  @Min(16, { message: 'O aluno deve ter no mínimo 16 anos' })
  idade: number;

  @ApiProperty({ example: 'Engenharia de Software' })
  @IsString()
  @IsNotEmpty()
  curso: string;
}
