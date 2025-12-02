import { Controller, Get, Res } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('service.wsdl')
  getWsdl(@Res() res: any): void {
    try {
      // Try multiple paths - development and production
      let wsdlPath = path.join(__dirname, '..', '..', 'service.wsdl');
      if (!fs.existsSync(wsdlPath)) {
        wsdlPath = path.join(process.cwd(), 'service.wsdl');
      }
      if (!fs.existsSync(wsdlPath)) {
        wsdlPath = path.join(__dirname, '..', 'service.wsdl');
      }
      
      const wsdlContent = fs.readFileSync(wsdlPath, 'utf8');
      res.type('application/xml').send(wsdlContent);
    } catch (error) {
      res.status(500).send('WSDL file not found');
    }
  }
}
