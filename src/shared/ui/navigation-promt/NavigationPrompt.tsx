import styles from "./NavigationPrompt.module.css";

type NavigationPromptProps = {
  text: string;
  linkText: string;
  href: string;
};

export function NavigationPrompt({
  text,
  linkText,
  href,
}: NavigationPromptProps) {
  return (
    <div className={styles.prompt}>
      <span>{text}</span>

      <a className={styles.link} href={href}>
        {linkText}
      </a>
    </div>
  );
}
