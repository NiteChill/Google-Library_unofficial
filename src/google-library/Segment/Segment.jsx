import { useRef } from 'react';
import styles from './Segment.module.scss';
import Badge from '../Badge/Badge';

export default function Segment({
  active = false,
  style = 'standard',
  icon = 'grade',
  label = 'Label',
  badge,
  badgeStyle = 'small',
  badgeLabel,
  onClick,
}) {
  const stateLayerRef = useRef(null);
  return (
    <div
      className={`${styles.segment} ${
        active ? 'on-secondary-container-text' : 'on-surface-variant-text'
      }`}
      onMouseDown={() =>
        (stateLayerRef.current.style.background = `color-mix(in srgb, var(${
          active
            ? '--md-sys-color-on-surface'
            : '--md-sys-color-on-secondary-container'
        }) 12%, transparent)`)
      }
      onMouseUp={() => (stateLayerRef.current.style.background = '')}
      onTouchStart={() =>
        (stateLayerRef.current.style.background = `color-mix(in srgb, var(${
          active
            ? '--md-sys-color-on-surface'
            : '--md-sys-color-on-secondary-container'
        }) 12%, transparent)`)
      }
      onTouchEnd={() => (stateLayerRef.current.style.background = '')}
      onClick={onClick}
    >
      <div
        className={`${styles.icon_container} ${
          active && 'secondary-container'
        }`}
        style={{ height: style === 'extended' && 'auto' }}
      >
        <div
          className={`${styles.state_layer} ${
            active ? styles.active : styles.inactive
          }`}
          style={{ padding: style === 'extended' && '0.25rem 1rem' }}
          ref={stateLayerRef}
        >
          <span
            className='material-symbols-outlined'
            style={{ fontSize: '1.5rem' }}
          >
            {icon}
          </span>
          {badge && (
            <div
              className={styles.badge_container}
              style={{
                right:
                  badgeStyle === 'small'
                    ? '1rem'
                    : badgeStyle === 'large' && badgeLabel.length > 1
                    ? '0.375rem'
                    : '0.75rem',
                top:
                  style === 'standard' && badgeStyle !== 'small'
                    ? '0.875rem'
                    : style === 'extended' && badgeStyle !== 'small'
                    ? '0.125rem'
                    : style === 'standard' && badgeStyle === 'small'
                    ? '1rem'
                    : '0.25rem',
              }}
            >
              <Badge style={badgeStyle} label={badgeLabel} />
            </div>
          )}
          <div
            className={`${styles.state_overlay} secondary-container`}
            style={{
              width: active && '100%',
              height: (active || style === 'extended') && '100%',
              opacity: active && '1',
            }}
          ></div>
        </div>
      </div>
      {style === 'extended' && (
        <p
          className={`${styles.label} ${
            active && 'on-surface-text'
          } label-medium`}
        >
          {label}
        </p>
      )}
    </div>
  );
}
