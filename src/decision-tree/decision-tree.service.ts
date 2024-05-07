import { Injectable } from '@nestjs/common';
import {
  DecisionTreeNode,
  DecisionTreeNodeResponse,
} from './interface/decision-tree.interface';

const decision_tree: DecisionTreeNode = {
  question: 'Quelle est votre nationalité?',
  answers: {
    EU: {
      question: 'Avez-vous besoin d\'un visa pour vos destinations souhaitées?',
      answers: {
        no: {
          question: 'Quel est votre âge?',
          answers: {
            under_30: {
              question: 'Quel type de vacances recherchez-vous?',
              answers: {
                adventure: {
                  question: 'Quel type d\'aventure recherchez-vous?',
                  answers: {
                    nature: {
                      question: 'Préférez-vous explorer les forêts, les montagnes, ou les rivières?',
                      answers: {
                        forests: {
                          question: 'Aimez-vous la randonnée ou le camping?',
                          answers: {
                            hiking: { result: 'Des destinations comme les parcs nationaux des États-Unis ou les Alpes suisses seraient parfaites pour vous.' },
                            camping: { result: 'Considérez des lieux comme le parc national de Yellowstone ou la forêt noire en Allemagne.' }
                          }
                        },
                        mountains: {
                          question: 'Êtes-vous intéressé par l\'escalade ou le ski?',
                          answers: {
                            climbing: { result: 'Des destinations comme le Colorado ou la Patagonie pourraient vous captiver.' },
                            skiing: { result: 'Explorez les pistes de ski de Chamonix en France ou de Vail aux États-Unis.' }
                          }
                        },
                        rivers: {
                          question: 'Recherchez-vous à faire du rafting ou de la pêche?',
                          answers: {
                            rafting: { result: 'Des rivières comme le Colorado ou le Zambèze sont idéales pour le rafting.' },
                            fishing: { result: 'Des destinations comme la Norvège ou le Canada sont excellentes pour la pêche.' }
                          }
                        }
                      }
                    },
                    extreme: {
                      question: 'Préférez-vous le parachutisme, la plongée sous-marine, ou le surf?',
                      answers: {
                        parachuting: { result: 'Des endroits comme Dubaï ou la Californie offrent des expériences de parachutisme exaltantes.' },
                        diving: { result: 'Explorez les sites de plongée en Australie ou aux Maldives.' },
                        surfing: { result: 'Des plages comme celles de Bali ou de Hawaï sont parfaites pour le surf.' }
                      }
                    }
                  }
                },
                cultural: {
                  question: 'Quel aspect de la culture vous intéresse le plus?',
                  answers: {
                    history: {
                      question: 'Voulez-vous explorer des ruines anciennes ou des musées historiques?',
                      answers: {
                        ruins: { result: 'Des lieux comme Machu Picchu ou Rome seraient idéaux pour vous.' },
                        museums: { result: 'Visitez le Louvre en France ou le British Museum au Royaume-Uni.' }
                      }
                    },
                    arts: {
                      question: 'Êtes-vous attiré par les arts visuels ou les performances?',
                      answers: {
                        visual_arts: { result: 'Des villes comme Paris et New York sont célèbres pour leurs galeries d\'art.' },
                        performances: { result: 'Découvrez des spectacles à Broadway ou assistez à l\'opéra de Sydney.' }
                      }
                    },
                    culinary: {
                      question: 'Recherchez-vous des expériences gastronomiques ou des cours de cuisine?',
                      answers: {
                        gastronomic_experiences: { result: 'Dégustez des plats locaux en Italie ou au Japon.' },
                        cooking_classes: { result: 'Apprenez à cuisiner avec des chefs locaux en Thaïlande ou en France.' }
                      }
                    },
                    festivals: {
                      question: 'Préférez-vous les festivals de musique, de film ou les carnavals?',
                      answers: {
                        music: { result: 'Profitez de festivals comme Glastonbury au Royaume-Uni ou Coachella aux États-Unis.' },
                        film: { result: 'Visitez le Festival de Cannes en France ou le Festival de Venise en Italie.' },
                        carnivals: { result: 'Participez au Carnaval de Rio au Brésil ou à la Mardi Gras à la Nouvelle-Orléans.' }
                      }
                    }
                  }
                },
                relaxation: {
                  question: 'Quel type de relaxation recherchez-vous?',
                  answers: {
                    beach: {
                      question: 'Préférez-vous les plages animées ou les retraites isolées?',
                      answers: {
                        lively: { result: 'Des plages comme Miami Beach ou Ibiza correspondent à vos attentes.' },
                        secluded: { result: 'Des endroits comme les Seychelles ou les plages de Fiji vous offriront tranquillité et isolement.' }
                      }
                    },
                    spa: {
                      question: 'Recherchez-vous des spas en ville ou en milieu naturel?',
                      answers: {
                        urban: { result: 'Des spas urbains à New York ou Tokyo peuvent vous offrir une pause bienvenue.' },
                        nature: { result: 'Des retraites comme celles en Islande ou à Bali sont parfaites pour se détendre dans un cadre naturel.' }
                      }
                    },
                    parks: {
                      question: 'Aimez-vous les grands parcs nationaux ou les jardins urbains?',
                      answers: {
                        national_parks: { result: 'Explorez le parc national de Yellowstone ou celui de Banff au Canada.' },
                        urban_gardens: { result: 'Profitez des jardins comme le Central Park à New York ou le Hyde Park à Londres.' }
                      }
                    }
                  }
                }
              }
            },
            '31-50': {
              question: 'Comment préférez-vous passer vos vacances?',
              answers: {
                active: {
                  question: 'Êtes-vous intéressé par des activités physiques ou préférez-vous des découvertes culturelles?',
                  answers: {
                    physical_activities: {
                      question: 'Souhaitez-vous faire du vélo, de la randonnée ou peut-être de la plongée?',
                      answers: {
                        biking: { result: 'Les pistes cyclables de l\'Amsterdam ou de Copenhague seraient parfaites pour vous.' },
                        hiking: { result: 'Considérez des randonnées dans les Dolomites en Italie ou le parc national de Yosemite.' },
                        diving: { result: 'La Grande Barrière de corail en Australie ou les îles Galápagos seraient des choix idéaux pour la plongée.' }
                      }
                    },
                    cultural_discoveries: {
                      question: 'Souhaitez-vous visiter des théâtres, des opéras ou des musées?',
                      answers: {
                        theaters: { result: 'Les théâtres de Londres ou les cabarets de Paris vous attendent.' },
                        operas: { result: 'L\'opéra de Vienne ou celui de Milan offre des spectacles inoubliables.' },
                        museums: { result: 'Explorez des musées comme le Prado à Madrid ou le musée d\'Orsay à Paris.' }
                      }
                    }
                  }
                },
                relaxing: {
                  question: 'Préférez-vous vous détendre à la plage, dans un spa ou peut-être lors une croisière?',
                  answers: {
                    beach: { result: 'Les plages des Caraïbes ou celles des îles grecques sont idéales pour se détendre.' },
                    spa: { result: 'Des spas en Suisse ou en Autriche pourraient être ce que vous recherchez.' },
                    cruise: { result: 'Une croisière sur la Méditerranée ou dans les fjords norvégiens pourrait être parfaite pour vous.' }
                  }
                }
              }
            },
            '51_and_over': {
              question: 'Quelles activités recherchez-vous principalement en voyage?',
              answers: {
                leisure: {
                  question: 'Aimez-vous les visites tranquilles, les dégustations de vin ou les excursions en bateau?',
                  answers: {
                    quiet_visits: { result: 'Les visites tranquilles de petites villes européennes comme en Toscane ou en Provence.' },
                    wine_tasting: { result: 'Explorez les vignobles de Bordeaux en France ou de Napa Valley aux États-Unis.' },
                    boat_tours: { result: 'Faites des excursions en bateau autour des îles grecques ou sur le Nil en Égypte.' }
                  }
                },
                health_focused: {
                  question: 'Êtes-vous intéressé par des retraites de santé, des spas thermaux ou du yoga?',
                  answers: {
                    health_retreats: { result: 'Des retraites de santé en Thaïlande ou à Bali vous aideront à vous ressourcer.' },
                    thermal_spas: { result: 'Visitez des spas thermaux en Islande ou en Hongrie.' },
                    yoga: { result: 'Participez à des retraites de yoga en Inde ou au Costa Rica.' }
                  }
                },
                cultural: {
                  question: 'Recherchez-vous à enrichir vos connaissances historiques, artistiques ou littéraires?',
                  answers: {
                    historical: { result: 'Explorez des sites historiques à Jérusalem ou à Rome.' },
                    artistic: { result: 'Découvrez art à Florence ou à Saint-Pétersbourg.' },
                    literary: { result: 'Visitez des lieux célèbres dans la littérature à Dublin ou à Londres.' }
                  }
                }
              }
            }
          }
        },
        yes: {
          question: 'Veuillez spécifier le type de visa dont vous disposez:',
          answers: {
            tourist: {
              result: 'Vous êtes éligible pour des destinations touristiques sans restrictions supplémentaires.'
            },
            business: {
              result: 'Considérez des destinations qui soutiennent également les voyageurs d\'affaires.'
            },
            other: {
              result: 'Veuillez vérifier les destinations spécifiques qui acceptent votre type de visa.'
            }
          }
        }
      }
    },
    nonEU: {
      question: 'Quelles sont les principales raisons de votre voyage?',
      answers: {
        tourism: {
          question: 'Recherchez-vous des expériences principalement culturelles, aventurières ou de détente?',
          answers: {
            cultural: { result: 'Les villes riches en culture comme Paris ou Kyoto pourraient vous fasciner.' },
            adventurous: { result: 'Considérez des activités aventureuses en Nouvelle-Zélande ou en Afrique du Sud.' },
            relaxation: { result: 'Des destinations de détente comme les Maldives ou les îles Canaries vous attendent.' }
          }
        },
        business: {
          question: 'Votre voyage d\'affaires nécessite-t-il des installations spécifiques comme des salles de conférence ou un accès facile aux centres d\'affaires?',
          answers: {
            conferences: { result: 'Des villes comme Singapour ou Hong Kong offrent d\'excellentes facilités pour les conférences.' },
            easy_access: { result: 'Des centres d\'affaires accessibles à New York ou à Londres peuvent faciliter votre séjour.' }
          }
        },
        study: {
          question: 'Êtes-vous intéressé par des programmes d\'échange, des séminaires ou des opportunités de recherche?',
          answers: {
            exchange_programs: { result: 'Des programmes d\'échange sont disponibles dans des universités européennes ou américaines.' },
            seminars: { result: 'Assistez à des séminaires internationaux à Genève ou à Boston.' },
            research_opportunities: { result: 'Explorez des opportunités de recherche à Tokyo ou à Cambridge.' }
          }
        },
        other: {
          question: 'Veuillez spécifier votre besoin pour des conseils plus personnalisés.',
          answers: {
            family: { result: 'Des destinations familiales comme Orlando ou Costa Rica pourraient être idéales.' },
            health: { result: 'Des centres de santé spécialisés à Vienne ou à Mayo Clinic aux États-Unis.' },
            spiritual: { result: 'Des retraites spirituelles en Inde ou au Népal pourraient enrichir votre voyage.' }
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
