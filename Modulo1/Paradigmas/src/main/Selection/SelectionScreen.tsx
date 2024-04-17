import { useState } from "react";
import { Story } from "../stories";
import styles from "./SelectionScreen.module.scss";

interface SelectionScreenProps {
	start: (story: Story) => void;
	stories: Story[];
}

export const SelectionScreen: React.FC<SelectionScreenProps> = ({
	start,
	stories,
}) => {
	const [story, setStory] = useState<Story | null>();

	const startStory = (story: Story) => {
		start(story);
	};

	return (
		<>
			<section className={styles.selectionScreen}>
				<ul className={styles.availableStories}>
					{stories.map((story) => (
						<li className={`${styles.story}`} onClick={() => setStory(story)}>
							{story.title}
						</li>
					))}
					{/* TODO: styles.selected cuando un story esta seleccionado */}
				</ul>
				<p className={styles.storyDescription}>
					{story
						? story?.initialDescription
						: "Seleccione una historia para empezar a jugar"}
				</p>
			</section>
			<section className={styles.controls}>
				<button
					disabled={story ? false : true}
					className={styles.comenzar}
					onClick={() => startStory(story)}
				>
					{story ? "Comenzar" : "Selecciona una historia"}
				</button>
			</section>
		</>
	);
};
