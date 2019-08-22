import { Controller, Get, Post, Body } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  index(): string {
    return 'admin'
  }

  @Post('login')
  login(@Body() body) {
    return this.adminService.findAll();
  }

  @Post()
  logout(): string {
    return 'logout'
  }

  

}
