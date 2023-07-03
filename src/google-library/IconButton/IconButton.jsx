import { useRef } from 'react';
import styles from './IconButton.module.scss';

export default function IconButton({ style = 'standard', icon = 'settings', onClick }) {
  const stateLayerRef = useRef(null);
  return (
    <div className={styles.icon_button}>
      <div
        className={`${
          style === 'standard'
            ? styles.container_standard
            : style === 'filled'
            ? styles.container_filled
            : style === 'tonal'
            ? styles.container_tonal
            : style === 'outlined' && styles.container_outlined
        }`}
        onMouseDown={() =>
          (stateLayerRef.current.style.background = `color-mix(in srgb, var(${
            style === 'filled'
              ? '--md-sys-color-on-primary'
              : style === 'tonal'
              ? '--md-sys-color-on-secondary'
              : '--md-sys-color-on-surface-variant'
          }) 12%, transparent)`)
        }
        onMouseUp={() => (stateLayerRef.current.style.background = '')}
        onTouchStart={() =>
          (stateLayerRef.current.style.background = `color-mix(in srgb, var(${
            style === 'filled'
              ? '--md-sys-color-on-primary'
              : style === 'tonal'
              ? '--md-sys-color-on-secondary'
              : '--md-sys-color-on-surface-variant'
          }) 12%, transparent)`)
        }
        onTouchEnd={() => (stateLayerRef.current.style.background = '')}
        onClick={onClick}
      >
        <div className={styles.state_layer} ref={stateLayerRef}>
          <span
            className='material-symbols-outlined'
            style={{ fontSize: '1.5rem' }}
          >
            {icon}
          </span>
        </div>
      </div>
    </div>
  );
}
