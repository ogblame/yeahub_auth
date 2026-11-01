import type { ComponentProps } from "react";
import styles from "./Input.module.css";

type InputProps = ComponentProps<"input">;

export function Input({ type = "text", ...props }: InputProps) {
  return <input {...props} type={type} className={styles.input} />;
}
