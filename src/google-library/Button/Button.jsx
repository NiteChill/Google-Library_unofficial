import { useRef } from 'react';
import styles from './Button.module.scss';

export default function Button({ style = 'filled', icon, label }) {
  const stateLayerRef = useRef(null);
  return (
    <div
      className={`${
        style === 'filled'
          ? styles.button_filled
          : style === 'outlined'
          ? styles.button_outlined
          : style === 'text'
          ? styles.button_text
          : style === 'elevated'
          ? styles.button_elevated
          : style === 'tonal' && styles.button_tonal
      }`}
      onMouseDown={() =>
        (stateLayerRef.current.style.background = `color-mix(in srgb, var(${
          style === 'filled'
            ? '--md-sys-color-on-primary'
            : style === 'tonal'
            ? '--md-sys-color-on-secondary'
            : '--md-sys-color-primary'
        }) 12%, transparent`)
      }
      onMouseUp={() => (stateLayerRef.current.style.background = '')}
      onTouchStart={() =>
        (stateLayerRef.current.style.background = `color-mix(in srgb, var(${
          style === 'filled'
            ? '--md-sys-color-on-primary'
            : style === 'tonal'
            ? '--md-sys-color-on-secondary'
            : '--md-sys-color-primary'
        }) 12%, transparent`)
      }
      onTouchEnd={() => (stateLayerRef.current.style.background = '')}
    >
      <div
        className={styles.state_layer}
        style={{
          padding:
            style !== 'text'
              ? icon
                ? '0.625rem 1.5rem 0.625rem 1rem'
                : '0.625rem 1.5rem'
              : icon
              ? '0.625rem 1rem 0.625rem 0.75rem'
              : '0.625rem 0.75rem',
        }}
        ref={stateLayerRef}
      >
        {icon && (
          <div className={styles.icon}>
            <span
              className='material-symbols-outlined'
              style={{ fontSize: '1rem' }}
            >
              {icon}
            </span>
          </div>
        )}
        <p className='label-large'>{label}</p>
      </div>
    </div>
  );
}
