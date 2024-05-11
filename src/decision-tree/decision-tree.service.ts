import { Injectable } from '@nestjs/common';
import {
  DecisionTreeNode,
  DecisionTreeNodeResponse,
} from './interface/decision-tree.interface';

const decision_tree: DecisionTreeNode = {
  question: 'Bienvenue sur notre plateforme de planification de voyage! Pour commencer, pourriez-vous nous indiquer votre nationalité?',
  answers: {
    EU: {
      question: 'Les destinations en dehors de l\'UE vous intéressent-elles pour ce voyage?',
      answers: {
        yes: {
          question: 'Disposez-vous d’un visa valide pour voyager en dehors de l’UE ou avez-vous besoin d’assistance pour obtenir un visa?',
          answers: {
            valid_visa: {
              question: 'Fantastique! Quel type de vacances envisagez-vous?',
              answers: {
                adventure: {
                  question: 'Quelle sorte d’aventures recherchez-vous?',
                  answers: {
                    thrill_seeking: {
                      question: 'Êtes-vous attiré par les sensations fortes ou par des expériences d\'aventure plus douces?',
                      answers: {
                        high_thrill: { result: 'nature' },
                        moderate_adventure: { result: 'urban' }
                      }
                    },
                    exploration: {
                      question: 'Souhaitez-vous explorer des destinations naturelles ou culturelles?',
                      answers: {
                        nature: { result: 'nature' },
                        culture: { result: 'cultural' }
                      }
                    }
                  }
                },
                relaxation: {
                  question: 'Préférez-vous des vacances pour vous détendre?',
                  answers: {
                    beach: { result: 'relaxation' },
                    spa: { result: 'relaxation' }
                  }
                }
              }
            },
            need_visa: {
              question: 'Nous pouvons vous aider avec le processus de visa. Quel type de vacances préférez-vous en attendant?',
              answers: {
                sightseeing: { result: 'cultural' },
                hiking: { result: 'nature' }
              }
            }
          }
        },
        no: {
          question: 'Quelles activités préférez-vous pour vos vacances au sein de l\'UE?',
          answers: {
            cultural_tours: { result: 'cultural' },
            outdoor_adventures: { result: 'adventure' },
            relaxation: { result: 'sea' }
          }
        }
      }
    },
    nonEU: {
      question: 'Avez-vous besoin d’un visa pour visiter l’Union européenne ou d’autres destinations internationales?',
      answers: {
        yes: {
          question: 'Quel type de visa est requis pour votre voyage?',
          answers: {
            tourism: { result: 'cultural' },
            business: { result: 'urban' }
          }
        },
        no: {
          question: 'Quelles sont vos préférences pour les vacances?',
          answers: {
            exploration: {
              question: 'Préférez-vous explorer la nature ou la culture des destinations que vous visitez?',
              answers: {
                nature: { result: 'nature' },
                culture: { result: 'cultural' }
              }
            },
            relaxation: { result: 'sea' }
          }
        }
      }
    }
  }
};




@Injectable()
export class DecisionTreeService {
  private userPosition: any = null;
  private userPreferences: string[] = [];

  getNextQuestion(answer: string): DecisionTreeNodeResponse {
    if (!this.userPosition) {
      this.userPosition = decision_tree;
      this.userPreferences.push(answer);
      const nextNodePossibleValues = Object.keys(this.userPosition.answers).map((key) => key);
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
        const nextNodePossibleValues = Object.keys(nextNode.answers).map((key) => key);
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
    const firstNodePossibleValues = Object.keys(decision_tree.answers).map((key) => key);
    return {
      is_final: false,
      question: decision_tree.question,
      possible_values: firstNodePossibleValues,
      preferences: this.userPreferences,
    };
  }
}
