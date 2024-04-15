export interface OptionType {
  type: "conversation" | "location" | "end";
  text: string;
  handler: () => void;
}
