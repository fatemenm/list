export interface Item {
  id: string;
  title: string;
  subtitle: string;
  createdAt: Date;
  editedAt?: Date;
}

export interface FormInputs {
  title: string;
  subtitle: string;
}
