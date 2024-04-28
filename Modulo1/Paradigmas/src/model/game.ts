import { loadMap } from "./location";
import { Story } from "./stories";
import { Map, Location } from "./location";
import { Character } from "./characters";

export interface GameOptionDescription {
  name: string;
}

export interface ConversationHistory {
  character: string;

  lines: string[];
}

export class GameOption {
  optionDescription: GameOptionDescription;
  game: Game;

  constructor(name: string, game: Game) {
    this.optionDescription = {
      name,
    };
    this.game = game;
  }

  getType() {
    return "base";
  }

  applyOption() {}

  getDescription() {
    return this.optionDescription;
  }
}

class LocationOption extends GameOption {
  location: Location;

  constructor(name: string, game: Game, location: Location) {
    super(name, game);
    this.location = location;
  }

  applyOption(): void {
    this.game.map.changeLocation(this.location);
  }

  getType() {
    return "location";
  }
}

class CharacterOption extends GameOption {
  character: Character;

  constructor(name: string, game: Game, character: Character) {
    super(name, game);
    this.character = character;
  }

  getType() {
    return "character";
  }

  applyOption() {
    this.game.state = "talking";
    const initialLine = this.character.getDialog().startDialog();
    this.game.newDialogHistory(this.character.getDescription().name, [
      initialLine,
    ]);

    this.game.currentCharacter = this.character;
    return initialLine;
  }
}

class DialogOption extends GameOption {
  question: string;
  character: Character;

  constructor(
    name: string,
    game: Game,
    question: string,
    character: Character
  ) {
    super(name, game);
    this.question = question;
    this.character = character;
  }

  applyOption() {
    const answer = this.character.dialog.askQuestion(this.question);
    this.game.addToHistory(this.question);
    this.game.addToHistory(answer || "");
    return answer;
  }

  getType(): string {
    return "dialog";
  }
}

class ExitOption extends GameOption {
  applyOption() {
    this.game.state = "moving";
  }

  getType(): string {
    return "exit";
  }
}

class EndGameOption extends GameOption {
  applyOption() {
    this.game.state = "end";
  }

  getType(): string {
    return "end";
  }
}

export class Game {
  map: Map;
  state: "moving" | "talking" | "end";
  currentCharacter?: Character;
  observers: ((game: Game) => void)[] = [];
  history: ConversationHistory[] = [];

  constructor(story: Story) {
    this.map = loadMap(story);
    this.state = "moving";
    this.observers = [];
  }

  getLocationDescription() {
    return this.map.getLocation().getDescription();
  }

  notifyObservers() {
    this.observers.forEach((observer) => observer(this));
  }

  #getLocationOptions() {
    const options: GameOption[] = this.map
      .getLocation()
      .connections.map(
        (location) =>
          new LocationOption(location.getDescription().name, this, location)
      );

    const characterOptions = this.map
      .getLocation()
      .getCharacters()
      .map(
        (character) =>
          new CharacterOption(character.getDescription().name, this, character)
      );

    options.push(...characterOptions);

    return options;
  }

  #getTalkingOptions() {
    const options: GameOption[] =
      this.currentCharacter?.dialog
        .getOptions()
        .map(
          (question) =>
            new DialogOption(
              question,
              this,
              question,
              this.currentCharacter as Character
            )
        ) || [];

    options.push(new ExitOption("Exit", this));

    return options;
  }

  getOptions() {
    const options =
      this.state === "moving"
        ? this.#getLocationOptions()
        : this.#getTalkingOptions();

    options.push(new EndGameOption("End Game", this));

    return options;
  }

  chooseOption(option: GameOption) {
    const answer = option.applyOption();
    this.notifyObservers();
    return answer;
  }

  isGameEnded() {
    return this.state === "end";
  }

  getCharacterDescription() {
    return this.currentCharacter?.getDescription();
  }

  addObserver(observer: (game: Game) => void) {
    this.observers.push(observer);
  }

  newDialogHistory(character: string, lines: string[]) {
    this.history.push({ character, lines });
  }

  addToHistory(line: string) {
    this.history[this.history.length - 1].lines.push(line);
  }

  getHistory() {
    return this.history;
  }
}
