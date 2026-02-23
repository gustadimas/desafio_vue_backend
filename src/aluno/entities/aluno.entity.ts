import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Aluno {
  @ApiProperty({ description: 'ID autoincrementado do aluno' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'João Silva', description: 'Nome completo do aluno' })
  @Column()
  nome: string;

  @ApiProperty({
    example: 'joao@email.com',
    description: 'E-mail único do aluno',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: 20, description: 'Idade do aluno' })
  @Column()
  idade: number;

  @ApiProperty({
    example: 'Engenharia de Software',
    description: 'Curso atual',
  })
  @Column()
  curso: string;
}
