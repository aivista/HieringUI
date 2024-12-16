export interface ApiResponse {
    result: QuestionResponse[];
  }
  
  export interface QuestionResponse {
    id: number;
    question: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    correctOption?: string;
  }
  
  export interface Question {
    id: number;
    question: string;
    options: string[];
  }