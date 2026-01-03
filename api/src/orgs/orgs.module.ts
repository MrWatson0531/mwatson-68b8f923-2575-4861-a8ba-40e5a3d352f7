import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Org } from './org.entity';
import { OrgsService } from './orgs.service';
import { OrgsController } from './orgs.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Org])],
    providers: [OrgsService],
    controllers: [OrgsController],
exports: [OrgsService],})

export class OrgsModule {}