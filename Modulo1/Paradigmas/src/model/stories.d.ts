export interface StoryClue {
  name: string;
  description: string;
  requisites: string[];
}

export interface StoryLocation {
  name: string;
  image: string;
  description: string;
  connections: string[];
  clues: StoryClue[];
  characters: string[];
}

export interface StoryDialogOption {
  question: string;
  answer: string;
  single?: boolean;
  clue?: string[];

  options?: StoryDialogOption[];
}

export interface StoryDialog {
  initial: string;
  final: string;
  continuation: string;

  options: StoryDialogOption[];
}

export interface StoryCharacter {
  id: string;
  name: string;
  description: string;
  location: string;
  dialog: StoryDialog;
}

export interface Story {
  title: string;
  initialDescription: string;
  locations: StoryLocation[];
  characters: StoryCharacter[];
  initialLocation: string;
  finalClue: string;
}
