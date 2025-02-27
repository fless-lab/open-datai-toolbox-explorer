
export interface Tool {
  name: string;
  description: string;
  source: string;
  keywords: string[];
}

export interface Category {
  id: number;
  name: string;
  description: string;
  keywords: string[];
  tools: Tool[];
}

export interface ToolsData {
  categories: Category[];
}
