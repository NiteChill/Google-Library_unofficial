import styles from './Badge.module.scss';

export default function Badge({ style = 'small', label }) {
  return (
    <div
      className={`${
        style === 'small'
          ? styles.badge_small
          : style === 'large' && styles.badge_large
      } error`}
      style={{
        padding: label?.length > 1 && style !== 'small' && '0rem 0.25rem',
        width: label?.length > 1 && style !== 'small' && 'auto',
      }}
    >
      {style !== 'small' && (
        <p className={`${styles.badge_label} label-small on-error-text`}>
          {label}
        </p>
      )}
    </div>
  );
}
