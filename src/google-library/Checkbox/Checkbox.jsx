import { useRef, useState } from 'react';
import styles from './Checkbox.module.scss';

export default function Checkbox({ type = 'unselected' }) {
  const stateOverlayRef = useRef(null),
    [currentType, setCurrentType] = useState(type),
    handleClick = (clickState, e) => {
      if (clickState === 'pressed') {
        const boundingRect = e.target.getBoundingClientRect();
        stateOverlayRef.current.style.transition =
          'height 0.2s cubic-bezier(0.2, 0, 0, 1), width 0.2s cubic-bezier(0.2, 0, 0, 1), opacity 0.1s cubic-bezier(0.2, 0, 0, 1)';
        stateOverlayRef.current.style.height = '145%';
        stateOverlayRef.current.style.width = '145%';
        stateOverlayRef.current.style.opacity = '0.12';
        stateOverlayRef.current.style.margin = `${
          e.clientY - boundingRect.height / 2 - boundingRect.top
        }px 0 0 ${e.clientX - boundingRect.width / 2 - boundingRect.left}px`;
      } else {
        stateOverlayRef.current.style.transition =
          'height 0.01s cubic-bezier(0.2, 0, 0, 1), width 0.01s cubic-bezier(0.2, 0, 0, 1), opacity 0.4s cubic-bezier(0.2, 0, 0, 1)';
        stateOverlayRef.current.style.height = '145%';
        stateOverlayRef.current.style.width = '145%';
        stateOverlayRef.current.style.opacity = '0';
        window.setTimeout(() => {
          stateOverlayRef.current.style.height = '0';
          stateOverlayRef.current.style.width = '0';
        }, 400);
      }
    };
  return (
    <div
      className={styles.checkbox}
      onMouseDown={(e) => {
        handleClick('pressed', e);
      }}
      onMouseUp={(e) => {
        handleClick('released', e);
      }}
      onTouchStart={() => {
        handleClick('pressed', e);
      }}
      onTouchEnd={() => {
        handleClick('released', e);
      }}
      onTouchCancel={(e) => {
        handleClick('released', e);
      }}
      onMouseLeave={(e) => {
        handleClick('released', e);
      }}
      onClick={() => {
        currentType === 'unselected'
          ? setCurrentType('selected')
          : currentType === 'selected'
          ? setCurrentType('unselected')
          : currentType === 'error+selected'
          ? setCurrentType('error+unselected')
          : currentType === 'error+unselected' &&
            setCurrentType('error+selected');
      }}
    >
      <div
        className={`${styles.state_layer} ${
          currentType === 'selected' || currentType === 'indeterminate'
            ? styles.primary
            : currentType === 'error+selected' ||
              currentType === 'error+indeterminate' ||
              currentType === 'error+unselected'
            ? styles.error
            : currentType === 'unselected' && styles.on_surface
        }`}
      >
        <div
          className={styles.container}
          style={{
            border:
              currentType === 'unselected'
                ? '2px solid var(--md-sys-color-on-surface-variant)'
                : currentType === 'error+unselected' &&
                  '2px solid var(--md-sys-color-error)',
            background:
              currentType === 'selected' || currentType === 'indeterminate'
                ? 'var(--md-sys-color-primary)'
                : (currentType === 'error+selected' ||
                    currentType === 'error+indeterminate') &&
                  'var(--md-sys-color-error)',
          }}
        >
          {(currentType === 'selected' ||
            currentType === 'error+selected' ||
            currentType === 'indeterminate' ||
            currentType === 'error+indeterminate') && (
            <span
              className={`material-symbols-outlined on-primary-text ${styles.icon}`}
              style={{ fontSize: '1.1rem' }}
            >
              {type === 'indeterminate' || type === 'error+indeterminate' ? 'remove' : 'check'}
            </span>
          )}
        </div>
        <div
          className={`${styles.state_overlay} ${
            currentType === 'selected' || currentType === 'indeterminate'
              ? 'primary'
              : currentType === 'error+selected' ||
                currentType === 'error+indeterminate' ||
                currentType === 'error+unselected'
              ? 'error'
              : currentType === 'unselected' && 'on-surface'
          }`}
          ref={stateOverlayRef}
        ></div>
      </div>
    </div>
  );
}
