import { Link } from "react-router-dom";
import styles from "./NavigationPrompt.module.css";

type NavigationPromptProps = {
  text: string;
  linkText: string;
  to: string;
};

export function NavigationPrompt({
  text,
  linkText,
  to,
}: NavigationPromptProps) {
  return (
    <div className={styles.prompt}>
      <span>{text}</span>

      <Link className={styles.link} to={to}>
        {linkText}
      </Link>
    </div>
  );
}
