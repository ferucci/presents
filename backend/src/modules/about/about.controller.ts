import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/entities/user.entity';
import { AboutStats, AboutTeam, AboutValues } from './about.entity';
import { AboutService } from './about.service';
import { CreateAboutStatsDto, CreateAboutTeamDto, CreateAboutValuesDto } from './dto/about.dto';

@ApiTags('about')
@Controller('about')
export class AboutController {
  constructor(private readonly aboutService: AboutService) { }

  // Stats endpoints
  @Public()
  @Get('stats')
  @ApiOperation({ summary: 'Получить статистику компании (публичный)' })
  @ApiResponse({ status: 200, type: [AboutStats] })
  async getStats(): Promise<AboutStats[]> {
    return this.aboutService.findAllStats();
  }

  @Post('stats')
  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Создать статистику (только admin/moderator)' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  async createStats(@Body() dto: CreateAboutStatsDto): Promise<AboutStats> {
    return this.aboutService.createStats(dto);
  }

  @Put('stats/:id')
  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Обновить статистику (только admin/moderator)' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  async updateStats(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<CreateAboutStatsDto>,
  ): Promise<AboutStats> {
    return this.aboutService.updateStats(id, dto);
  }

  @Delete('stats/:id')
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Удалить статистику (только admin)' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  async removeStats(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.aboutService.removeStats(id);
    return { message: `Stats ${id} удален` };
  }

  // Team endpoints
  @Public()
  @Get('team')
  @ApiOperation({ summary: 'Получить команду (публичный)' })
  @ApiResponse({ status: 200, type: [AboutTeam] })
  async getTeam(): Promise<AboutTeam[]> {
    return this.aboutService.findAllTeam();
  }

  @Post('team')
  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Добавить члена команды (только admin/moderator)' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  async createTeam(@Body() dto: CreateAboutTeamDto): Promise<AboutTeam> {
    return this.aboutService.createTeam(dto);
  }

  @Put('team/:id')
  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Обновить члена команды (только admin/moderator)' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  async updateTeam(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<CreateAboutTeamDto>,
  ): Promise<AboutTeam> {
    return this.aboutService.updateTeam(id, dto);
  }

  @Delete('team/:id')
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Удалить члена команды (только admin)' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  async removeTeam(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.aboutService.removeTeam(id);
    return { message: `Team member ${id} удален` };
  }

  // Values endpoints
  @Public()
  @Get('values')
  @ApiOperation({ summary: 'Получить ценности компании (публичный)' })
  @ApiResponse({ status: 200, type: [AboutValues] })
  async getValues(): Promise<AboutValues[]> {
    return this.aboutService.findAllValues();
  }

  @Post('values')
  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Добавить ценность (только admin/moderator)' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  async createValues(@Body() dto: CreateAboutValuesDto): Promise<AboutValues> {
    return this.aboutService.createValues(dto);
  }

  @Put('values/:id')
  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Обновить ценность (только admin/moderator)' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  async updateValues(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<CreateAboutValuesDto>,
  ): Promise<AboutValues> {
    return this.aboutService.updateValues(id, dto);
  }

  @Delete('values/:id')
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Удалить ценность (только admin)' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  async removeValues(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.aboutService.removeValues(id);
    return { message: `Value ${id} удален` };
  }
}

