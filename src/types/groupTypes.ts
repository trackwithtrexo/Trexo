export interface AddGroupData {
  name: string;
  description?: string;
}

export interface AddGroupResult {
  success: boolean;
  code?: string;
  error?: string;
}
