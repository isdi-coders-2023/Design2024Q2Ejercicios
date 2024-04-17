import { StoryDialog } from "./stories";

export class DialogOption {
  question: string;
  answer: string;

  followUps: DialogOption[];

  constructor(question: string, answer: string) {
    this.question = question;
    this.answer = answer;
    this.followUps = [];
  }

  addFollowUp(followUp: DialogOption) {
    this.followUps.push(followUp);
  }

  getFollowUps() {
    return this.followUps;
  }
}

export class Dialog {
  initial: string;
  continuation: string;
  final: string;

  initialOptions: DialogOption[];
  currentOption?: DialogOption;

  constructor(initial: string, continuation: string, final: string) {
    this.initial = initial;
    this.continuation = continuation;
    this.final = final;
    this.initialOptions = [];
  }

  addOption(option: DialogOption) {
    this.initialOptions.push(option);
  }

  getOptions() {
    const optionList = this.currentOption
      ? this.currentOption.getFollowUps()
      : this.initialOptions;

    return optionList.map((option) => option.question);
  }

  askQuestion(question: string) {
    const option = this.initialOptions.find(
      (option) => option.question === question
    );

    if (option) {
      this.currentOption = option;
      return option.answer;
    }
  }

  startDialog() {
    this.currentOption = undefined;
    return this.initial;
  }

  endDialog() {
    this.currentOption = undefined;
    return this.final;
  }
}

export const loadDialog = (dialog: StoryDialog) => {
  const newDialog = new Dialog(
    dialog.initial,
    dialog.continuation,
    dialog.final
  );

  dialog.options.forEach((option) => {
    const newOption = new DialogOption(option.question, option.answer);

    option.options?.forEach((followUp) => {
      const newFollowUp = new DialogOption(followUp.question, followUp.answer);

      newOption.addFollowUp(newFollowUp);
    });

    newDialog.addOption(newOption);
  });

  return newDialog;
};
