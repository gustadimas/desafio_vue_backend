import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AlunoService } from './aluno.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';

@ApiTags('Alunos') // Agrupa as rotas no Swagger sob a aba "alunos"
@Controller('aluno')
export class AlunoController {
  constructor(private readonly alunoService: AlunoService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo aluno' })
  @ApiResponse({ status: 201, description: 'Aluno criado com sucesso.' })
  create(@Body() createAlunoDto: CreateAlunoDto) {
    return this.alunoService.create(createAlunoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os alunos' })
  findAll() {
    return this.alunoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um aluno pelo ID' })
  @ApiResponse({ status: 404, description: 'Aluno não encontrado.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.alunoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar dados de um aluno' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAlunoDto: UpdateAlunoDto,
  ) {
    return this.alunoService.update(id, updateAlunoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um aluno' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.alunoService.remove(id);
  }
}
