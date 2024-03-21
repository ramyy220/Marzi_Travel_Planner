import { Global, Module } from '@nestjs/common';
import { DecisionTreeController } from './decision-tree.controller';
import { DecisionTreeService } from './decision-tree.service';

@Global()
@Module({
  controllers: [DecisionTreeController],
  providers: [DecisionTreeService]
})
export class DecisionTreeModule {}
