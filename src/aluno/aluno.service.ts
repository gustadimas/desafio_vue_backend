import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aluno } from './entities/aluno.entity';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';

@Injectable()
export class AlunoService {
  constructor(
    @InjectRepository(Aluno)
    private readonly repository: Repository<Aluno>,
  ) {}

  create(createAlunoDto: CreateAlunoDto) {
    const aluno = this.repository.create(createAlunoDto);
    return this.repository.save(aluno);
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    const aluno = await this.repository.findOneBy({ id });
    if (!aluno) throw new NotFoundException(`Aluno #${id} não encontrado`);
    return aluno;
  }

  async update(id: number, updateAlunoDto: UpdateAlunoDto) {
    const aluno = await this.repository.preload({
      id: id,
      ...updateAlunoDto,
    });
    if (!aluno) throw new NotFoundException(`Aluno #${id} não encontrado`);
    return this.repository.save(aluno);
  }

  async remove(id: number) {
    const aluno = await this.findOne(id);
    return this.repository.remove(aluno);
  }
}
