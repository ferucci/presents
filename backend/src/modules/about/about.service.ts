import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AboutStats, AboutTeam, AboutValues } from './about.entity';
import { CreateAboutStatsDto, CreateAboutTeamDto, CreateAboutValuesDto } from './dto/about.dto';

@Injectable()
export class AboutService {
  constructor(
    @InjectRepository(AboutStats)
    private readonly statsRepository: Repository<AboutStats>,
    @InjectRepository(AboutTeam)
    private readonly teamRepository: Repository<AboutTeam>,
    @InjectRepository(AboutValues)
    private readonly valuesRepository: Repository<AboutValues>,
  ) {}

  // Stats (Advantages)
  async findAllStats(): Promise<AboutStats[]> {
    return await this.statsRepository.find({ order: { order: 'ASC' } });
  }

  async createStats(dto: CreateAboutStatsDto): Promise<AboutStats> {
    const stats = this.statsRepository.create(dto);
    return await this.statsRepository.save(stats);
  }

  async updateStats(id: number, dto: Partial<CreateAboutStatsDto>): Promise<AboutStats> {
    const stats = await this.statsRepository.findOne({ where: { id } });
    if (!stats) throw new NotFoundException(`Stats с ID ${id} не найден`);
    Object.assign(stats, dto);
    return await this.statsRepository.save(stats);
  }

  async removeStats(id: number): Promise<void> {
    const stats = await this.statsRepository.findOne({ where: { id } });
    if (!stats) throw new NotFoundException(`Stats с ID ${id} не найден`);
    await this.statsRepository.remove(stats);
  }

  // Team
  async findAllTeam(): Promise<AboutTeam[]> {
    return await this.teamRepository.find({ order: { order: 'ASC' } });
  }

  async createTeam(dto: CreateAboutTeamDto): Promise<AboutTeam> {
    const team = this.teamRepository.create(dto);
    return await this.teamRepository.save(team);
  }

  async updateTeam(id: number, dto: Partial<CreateAboutTeamDto>): Promise<AboutTeam> {
    const team = await this.teamRepository.findOne({ where: { id } });
    if (!team) throw new NotFoundException(`Team с ID ${id} не найден`);
    Object.assign(team, dto);
    return await this.teamRepository.save(team);
  }

  async removeTeam(id: number): Promise<void> {
    const team = await this.teamRepository.findOne({ where: { id } });
    if (!team) throw new NotFoundException(`Team с ID ${id} не найден`);
    await this.teamRepository.remove(team);
  }

  // Values
  async findAllValues(): Promise<AboutValues[]> {
    return await this.valuesRepository.find({ order: { order: 'ASC' } });
  }

  async createValues(dto: CreateAboutValuesDto): Promise<AboutValues> {
    const values = this.valuesRepository.create(dto);
    return await this.valuesRepository.save(values);
  }

  async updateValues(id: number, dto: Partial<CreateAboutValuesDto>): Promise<AboutValues> {
    const values = await this.valuesRepository.findOne({ where: { id } });
    if (!values) throw new NotFoundException(`Values с ID ${id} не найден`);
    Object.assign(values, dto);
    return await this.valuesRepository.save(values);
  }

  async removeValues(id: number): Promise<void> {
    const values = await this.valuesRepository.findOne({ where: { id } });
    if (!values) throw new NotFoundException(`Values с ID ${id} не найден`);
    await this.valuesRepository.remove(values);
  }
}

