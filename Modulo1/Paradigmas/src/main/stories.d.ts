export interface Clue {
  name: string;
  description: string;
  requisites: string[];
}

export interface Location {
  name: string;
  image: string;
  description: string;
  connections: string[];
  clues: Clue[];
}

export interface DialogOption {
  question: string;
  answer: string;
  single?: boolean;
  clue?: string[];

  options?: DialogOption[];
}

export interface Dialog {
  initial: string;
  final: string;
  continuation: string;

  options: DialogOption[];
}

export interface Character {
  id: string;
  name: string;
  description: string;
  location: string;
  dialog: Dialog;
}

export interface Story {
  title: string;
  initialDescription: string;
  locations: Location[];
  characters: Character[];
  initialLocation: string;
  finalClue: string;
}
