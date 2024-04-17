import { Dialog } from "./dialog";

export interface CharacterDescription {
  id: string;
  name: string;
  description: string;
}

export class Character {
  description: CharacterDescription;
  dialog: Dialog;

  constructor(id: string, name: string, description: string) {
    this.description = {
      id,
      name,
      description,
    };
    this.dialog = new Dialog("", "", "");
  }

  getDescription() {
    return this.description;
  }

  getDialog() {
    return this.dialog;
  }
}
