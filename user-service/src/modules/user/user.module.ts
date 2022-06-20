import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { User } from "../../entities/user.entity";
import { ExceptionModule } from "../exception/exception.module";
import { CoreModule } from "../core/core.module";
import { CacheModule } from "../cache/cache.module";

@Module({
  imports: [CoreModule, CacheModule, TypeOrmModule.forFeature([User]), ExceptionModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
