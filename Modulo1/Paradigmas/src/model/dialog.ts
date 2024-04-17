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

  options: DialogOption[];

  constructor(initial: string, continuation: string, final: string) {
    this.initial = initial;
    this.continuation = continuation;
    this.final = final;
    this.options = [];
  }

  addOption(option: DialogOption) {
    this.options.push(option);
  }

  getOptions() {
    return this.options;
  }

  askQuestion(question: string) {
    return this.options.find((option) => option.question === question);
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
