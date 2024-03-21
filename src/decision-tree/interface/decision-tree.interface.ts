
export interface DecisionTreeNode {
    question?: string;
    answers?: Record<string, DecisionTreeNode | { result: string }>;
  }
  
  export interface DecisionTreeNodeResponse extends DecisionTreeNode {
    is_final: boolean;
    preferences: string[];
    possible_values?: string[];
    result?: string;
  }
  