import { Injectable } from '@nestjs/common';
import {
  DecisionTreeNode,
  DecisionTreeNodeResponse,
} from './interface/decision-tree.interface';

const decision_tree: DecisionTreeNode = {
  question: 'What is your nationality?',
  answers: {
    algerian: {
      question: 'As an Algerian national, which continent would you like to travel to?',
      answers: {
        africa: {
          result: 'You can explore various destinations within Africa for your vacation!',
        },
        other: {
          result: 'You can consider traveling to destinations outside of Africa for your vacation!',
        },
      },
    },
    french: {
      question: 'As a French national, which type of vacation are you planning?',
      answers: {
        relaxation: {
          question: 'Do you prefer a beach or mountain destination?',
          answers: {
            beach: {
              result:
                'Consider a tropical beach destination for ultimate relaxation!',
            },
            mountain: {
              result:
                'Plan a mountain getaway with breathtaking landscapes!',
            },
          },
        },
        adventure: {
          question:
            'Are you seeking an adventurous or cultural experience?',
          answers: {
            adventurous: {
              result:
                'Embark on an adventure to a destination with thrilling outdoor activities!',
            },
            cultural: {
              result:
                'Explore cultural destinations with a mix of historical and modern experiences!',
            },
          },
        },
      },
    },
    other: {
      question: 'What type of vacation are you planning?',
      answers: {
        relaxation: {
          question: 'Do you prefer a beach or mountain destination?',
          answers: {
            beach: {
              result:
                'Consider a tropical beach destination for ultimate relaxation!',
            },
            mountain: {
              result:
                'Plan a mountain getaway with breathtaking landscapes!',
            },
          },
        },
        adventure: {
          question:
            'Are you seeking an adventurous or cultural experience?',
          answers: {
            adventurous: {
              result:
                'Embark on an adventure to a destination with thrilling outdoor activities!',
            },
            cultural: {
              result:
                'Explore cultural destinations with a mix of historical and modern experiences!',
            },
          },
        },
      },
    },
  },
};

@Injectable()
export class DecisionTreeService {
  private userPosition: any = null;
  private userPreferences: string[] = [];

  getNextQuestion(answer: string): DecisionTreeNodeResponse {
    if (!this.userPosition) {
      this.userPosition = decision_tree;
      this.userPreferences.push(answer);
      const nextNodePossibleValues = Object.keys(this.userPosition.answers).map(
        (key) => key,
      );
      return {
        is_final: false,
        question: this.userPosition.question,
        possible_values: nextNodePossibleValues,
        preferences: this.userPreferences,
      };
    } else {
      const nextNode = this.userPosition.answers[answer];
      this.userPreferences.push(answer);

      if (nextNode && 'question' in nextNode) {
        const nextNodePossibleValues = Object.keys(nextNode.answers).map(
          (key) => key,
        );
        this.userPosition = nextNode;
        return {
          is_final: false,
          question: nextNode.question,
          possible_values: nextNodePossibleValues,
          preferences: this.userPreferences,
        };
      } else if (nextNode && 'result' in nextNode) {
        // Reached a result node
        return {
          is_final: true,
          result: nextNode.result,
          preferences: this.userPreferences,
        };
      } else {
        throw new Error('Invalid answer. Please provide a valid answer.');
      }
    }
  }

  getFirstQuestion(): DecisionTreeNodeResponse {
    this.userPosition = null;
    this.userPreferences = [];
    const firstNodePossibleValues = Object.keys(decision_tree.answers).map(
      (key) => key,
    );
    return {
      is_final: false,
      question: decision_tree.question,
      possible_values: firstNodePossibleValues,
      preferences: this.userPreferences,
    };
  }
}