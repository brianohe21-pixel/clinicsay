import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePatientAlertUseCase } from '../../application/patient-alert/create-patient-alert.use-case';
import { DeletePatientAlertUseCase } from '../../application/patient-alert/delete-patient-alert.use-case';
import { GetPatientAlertsUseCase } from '../../application/patient-alert/get-patient-alerts.use-case';
import { UpdatePatientAlertUseCase } from '../../application/patient-alert/update-patient-alert.use-case';
import { CreateAlertDto } from './dtos/create-alert.dto';
import { UpdateAlertDto } from './dtos/update-alert.dto';

@Controller()
export class PatientAlertController {
  constructor(
    private readonly getAlertsUseCase: GetPatientAlertsUseCase,
    private readonly createAlertUseCase: CreatePatientAlertUseCase,
    private readonly updateAlertUseCase: UpdatePatientAlertUseCase,
    private readonly deleteAlertUseCase: DeletePatientAlertUseCase,
  ) {}

  @Get('patients/:patientId/alerts')
  async getAlerts(@Param('patientId') patientId: string) {
    const alerts = await this.getAlertsUseCase.execute(patientId);
    return alerts.map((a) => a.toJSON());
  }

  @Post('patients/:patientId/alerts')
  async createAlert(
    @Param('patientId') patientId: string,
    @Body() dto: CreateAlertDto,
  ) {
    const alert = await this.createAlertUseCase.execute({
      patientId,
      type: dto.type,
      severity: dto.severity,
      message: dto.message,
      isActive: dto.isActive,
    });
    return alert.toJSON();
  }

  @Patch('patient-alerts/:alertId')
  async updateAlert(
    @Param('alertId') alertId: string,
    @Body() dto: UpdateAlertDto,
  ) {
    const alert = await this.updateAlertUseCase.execute({
      alertId,
      type: dto.type,
      severity: dto.severity,
      message: dto.message,
      isActive: dto.isActive,
    });
    return alert.toJSON();
  }

  @Delete('patient-alerts/:alertId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlert(@Param('alertId') alertId: string) {
    await this.deleteAlertUseCase.execute(alertId);
  }
}
