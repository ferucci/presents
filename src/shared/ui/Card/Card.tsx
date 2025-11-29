import { clsx } from 'clsx';
import { FC, ReactNode } from 'react';
import styles from './Card.module.scss';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export const Card: FC<CardProps> = ({
  children,
  className,
  hover = false,
  glow = false
}) => {
  return (
    <div
      className={clsx(
        styles.card,
        hover && styles.hover,
        glow && styles.glow,
        className
      )}
    >
      {children}
    </div>
  );
};




