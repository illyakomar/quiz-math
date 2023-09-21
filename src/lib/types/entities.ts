export interface TestTemplate {
  _id: string;
  title: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
  questionTemplates: Partial<Question>[];
}

export interface Question {
  _id: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}
