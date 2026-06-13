import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { AlertSeverity } from '../../../domain/patient-alert/alert-severity.enum';
import { AlertType } from '../../../domain/patient-alert/alert-type.enum';

export class UpdateAlertDto {
  @IsOptional()
  @IsEnum(AlertType)
  type?: AlertType;

  @IsOptional()
  @IsEnum(AlertSeverity)
  severity?: AlertSeverity;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  message?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
