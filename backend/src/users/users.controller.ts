import { Controller, Get, Param, UseGuards, Patch, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../common/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Get all users (Protected)
   */
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUsers() {
    return this.usersService.findAll();
  }

  /**
   * Get user by ID (Protected)
   */
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  /**
   * Update user role (Protected, requires admin rights)
   */
  @UseGuards(JwtAuthGuard)
  @Patch(':id/role')
  async updateUserRole(
    @Param('id') id: string,
    @Body() updateData: { role: string }
  ) {
    return this.usersService.updateRole(id, updateData.role);
  }
}
