import { useRef } from 'react';
import styles from './FABs.module.scss';

export default function FABs({
  style = 'standard',
  color = 'surface',
  icon = 'edit',
  label = 'Label',
}) {
  const stateOverlayRef = useRef(null);
  const stateLayerRef = useRef(null);
  return (
    <div
      className={`${styles.FAB} ${
        color === 'surface' ? 'surface-container-high' : color + '-container'
      } ${
        color === 'surface' ? 'primary-text' : 'on-' + color + '-container-text'
      }`}
      style={{
        borderRadius:
          style === 'small'
            ? '0.75rem'
            : style === 'large'
            ? '1.75rem'
            : '1rem',
      }}
      onMouseDown={() => {
        if (style === 'extended') {
          stateLayerRef.current.style.background = `color-mix(in srgb, var(${
            color === 'surface'
              ? '--md-sys-color-primary'
              : '--md-sys-color-on-' + color + '-container'
          }) 12%, transparent)`;
        } else {
          stateOverlayRef.current.style.opacity = '0.12';
          stateOverlayRef.current.style.width = '260%';
          stateOverlayRef.current.style.height = '260%';
        }
      }}
      onMouseUp={() => {
        if (style === 'extended') {
          stateLayerRef.current.style.background = '';
        } else {
          stateOverlayRef.current.style.opacity = '0';
          stateOverlayRef.current.style.width = '0';
          stateOverlayRef.current.style.height = '0';
        }
      }}
      onTouchStart={() => {
        if (style === 'extended') {
          stateLayerRef.current.style.background = `color-mix(in srgb, var(${
            color === 'surface'
              ? '--md-sys-color-primary'
              : '--md-sys-color-on-' + color + '-container'
          }) 12%, transparent)`;
        } else {
          stateOverlayRef.current.style.opacity = '0.12';
          stateOverlayRef.current.style.width = '260%';
          stateOverlayRef.current.style.height = '260%';
        }
      }}
      onTouchEnd={() => {
        if (style === 'extended') {
          stateLayerRef.current.style.background = '';
        } else {
          stateOverlayRef.current.style.opacity = '0';
          stateOverlayRef.current.style.width = '0';
          stateOverlayRef.current.style.height = '0';
        }
      }}
    >
      <div
        className={`${styles.state_layer} ${
          color === 'surface'
            ? styles.surface
            : color === 'primary'
            ? styles.primary
            : style === 'secondary'
            ? styles.secondary
            : styles.tertiary
        }`}
        style={{
          padding:
            style === 'small'
              ? '0.5rem'
              : style === 'standard'
              ? '1rem'
              : style === 'large'
              ? '1.875rem'
              : style === 'extended' && '1rem 1.25rem 1rem 1rem',
        }}
        ref={stateLayerRef}
      >
        <span
          className='material-symbols-outlined'
          style={{ fontSize: style === 'large' ? '2.25rem' : '1.5rem' }}
        >
          {icon}
        </span>
        {style !== 'extended' && (
          <div
            className={`${styles.state_overlay} ${
              color === 'surface' ? 'primary' : 'on-' + color + '-container'
            }`}
            ref={stateOverlayRef}
          ></div>
        )}
        {style === 'extended' && <p className='label-large'>{label}</p>}
      </div>
    </div>
  );
}
