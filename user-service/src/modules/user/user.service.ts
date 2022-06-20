import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { User } from "@src/entities/user.entity";
import { UserErrors, UserSuccess } from "../../globals/enums/errors";
import { UserCat } from "@src/globals/enums/logger";
import { CreateUserDto } from "@src/interfaces/dto/create-user.dto";
import { Exception } from "../exception/exception";
import { ErrorUtil } from "@src/utils";
import { LoggerService } from "../core/logger/logger.service";
import { CacheService } from "../cache/cache.service";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private exception: Exception,
    private logger: LoggerService,
    private cache: CacheService,
  ) {}

  public async getById(id: string): Promise<User> {
    try {
      const cached = await this.cache.get<User>(id);

      if (cached) {
        return cached;
      }

      const res = await this.userRepo.findOneBy({ id });

      await this.cache.set<User>(res.id, res);

      this.logger.log(UserSuccess.Get, { category: UserCat.GetSuccess, extra: id });

      return res;
    } catch (error) {
      throw this.exception.notFound(UserErrors.GetFail, UserCat.GetFail, {
        reason: error.message,
        payload: id,
      });
    }
  }

  public async create(user: CreateUserDto): Promise<User> {
    try {
      const newUser: User = this.userRepo.create(user);

      await this.userRepo.insert(newUser);

      this.logger.log(UserSuccess.Create, { category: UserCat.CreateSuccess, extra: newUser });

      return newUser;
    } catch (error) {
      if (ErrorUtil.isSqlConflict(error)) {
        throw this.exception.conflict(UserErrors.Conflict, UserCat.CreateFail, {
          reason: error.message,
          payload: user,
        });
      }
      throw this.exception.badRequest(UserErrors.CreateFail, UserCat.CreateFail, {
        reason: error.message,
        payload: user,
      });
    }
  }

  public async delete(id: string): Promise<{ id: string }> {
    try {
      await this.cache.del(id);
      await this.userRepo.delete(id);

      this.logger.debug(UserSuccess.Delete, { category: UserCat.DeleteSuccess, extra: id });

      return { id };
    } catch (error) {
      throw this.exception.badRequest(UserErrors.DeleteFail, UserCat.DeleteFail, {
        reason: error.message,
        payload: id,
      });
    }
  }
}
