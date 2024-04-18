import { useState } from "react";
import { Story } from "main/stories";

const useSelectedStory = () => {
  const initialStory = JSON.parse(
    localStorage.getItem("selectedStory") || "null"
  );
  const [selectedStory, setSelectedStory] = useState<Story | null>(
    initialStory
  );

  const selectStory = (story: Story | null) => {
    if (story === null) {
      localStorage.removeItem("selectedStory");
      setSelectedStory(null);
      return;
    }

    setSelectedStory(story);
    localStorage.setItem("selectedStory", JSON.stringify(story));
  };

  return { selectedStory, selectStory };
};

export { useSelectedStory };
