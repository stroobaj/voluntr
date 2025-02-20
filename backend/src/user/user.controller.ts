import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '@/common/jwt.guard';
import { RolesGuard } from '@/auth/roles.guard';
import { Roles } from '@/auth/roles.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Get all users (Protected)
   */
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUsers() {
    return this.userService.findAll();
  }

  /**
   * Get user by ID (Protected)
   */
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  /**
   * Update user role (Protected, requires admin rights)
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN') // Only admins can access this route
  @Patch(':id/role')
  async updateUserRole(
    @Param('id') id: string,
    @Body() updateData: { role: string }
  ) {
    return this.userService.updateRole(id, updateData.role);
  }
}
