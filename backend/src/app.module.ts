import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PatientAlertModule } from './modules/patient-alert.module';
import { HealthController } from './presentation/health/health.controller';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PatientAlertModule],
  controllers: [HealthController],
})
export class AppModule {}
