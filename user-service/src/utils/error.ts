import { QueryFailedError } from "typeorm";
import { TypeOrmErrors } from "../globals/enums/errors";

export class ErrorUtil {
  static isSqlConflict(error: QueryFailedError): boolean {
    return error instanceof QueryFailedError && error.driverError?.code === TypeOrmErrors.Conflict;
  }
}
