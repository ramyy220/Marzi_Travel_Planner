import { Controller, Get, Post, Body } from '@nestjs/common';
import { DecisionTreeService } from './decision-tree.service';
import { DecisionTreeNodeResponse } from './interface/decision-tree.interface';

@Controller()
export class DecisionTreeController {
  constructor(private readonly decisionTreeService: DecisionTreeService) {}

  @Get('/decision-tree/start')
  startDecisionTree(): DecisionTreeNodeResponse {
    return this.decisionTreeService.getFirstQuestion();
  }

  @Post('/decision-tree/answer')
  answerQuestion(@Body() answer: { answer: string }): DecisionTreeNodeResponse {
    return this.decisionTreeService.getNextQuestion(answer.answer);
  }
}
