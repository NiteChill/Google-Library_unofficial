import { useRef, useState } from 'react';
import styles from './Input.module.scss';

export default function Input({
  label = 'Label',
  supportingText,
  style = 'filled',
  state = 'enabled',
  leadingIcon = 'category',
  trailingIcon = 'cancel',
}) {
  const [currentState, setCurrentState] = useState(state),
    [inputValue, setInputValue] = useState(''),
    inputRef = useRef(null);
  return (
    <div className={styles.input_container}>
      <div
        className={styles.text_field}
        style={{
          paddingLeft: leadingIcon ? '0' : '1rem',
          border:
            style === 'outlined' && currentState === 'focused'
              ? '2px solid var(--md-sys-color-primary)'
              : style === 'filled' && 'none',
          borderRadius: style === 'filled' && '0.25rem 0.25rem 0 0',
          background:
            style === 'filled' &&
            'var(--md-sys-color-surface-container-highest)',
        }}
      >
        <div
          className={`${styles.state_layer} ${
            style === 'filled' && currentState === 'enabled' && styles.hover
          }`}
        >
          {leadingIcon && (
            <div
              className={styles.leading_icon}
              onClick={() => inputRef.current.focus()}
            >
              <div className={styles.container}>
                <div className={styles.state_layer}>
                  <span className='material-symbols-outlined on-surface-variant-text'>
                    {leadingIcon}
                  </span>
                </div>
              </div>
            </div>
          )}
          <div
            className={styles.content}
            onClick={() => inputRef.current.focus()}
          >
            <div
              className={`${
                style === 'outlined'
                  ? styles.label_text
                  : styles.label_text_filled
              }`}
              style={{
                top:
                  (currentState === 'focused' || inputValue !== '') &&
                  '-0.9rem',
                left:
                  (currentState === 'focused' || inputValue !== '') &&
                  (leadingIcon ? '-2.25rem' : '-0.25rem'),
                padding:
                  style === 'outlined' &&
                  (currentState === 'focused' || inputValue !== '') &&
                  '0 0.25rem',
                background:
                  style === 'outlined' &&
                  (currentState === 'focused' || inputValue !== '') &&
                  'var(--md-sys-color-surface)',
              }}
            >
              <p
                className={`${styles.label} ${
                  currentState === 'focused'
                    ? 'body-small primary-text'
                    : inputValue !== ''
                    ? 'body-small on-surface-variant-text'
                    : 'body-large on-surface-variant-text'
                }`}
              >
                {label}
              </p>
            </div>
            <div className={styles.input_text}>
              <input
                ref={inputRef}
                value={inputValue}
                type='text'
                className={`${styles.input} body-large on-surface-text`}
                onFocus={() => setCurrentState('focused')}
                onBlur={() => setCurrentState('enabled')}
                onInput={(e) => setInputValue(e.target.value)}
                style={{
                  height:
                    (currentState === 'focused' || inputValue !== '') &&
                    '1.208125rem',
                  transition:
                    style === 'filled' &&
                    'height .2s cubic-bezier(0.2, 0, 0, 1)',
                }}
              />
            </div>
          </div>
          {((trailingIcon && currentState === 'focused') ||
            inputValue !== '') && (
            <div className={styles.trailing_icon}>
              <div className={styles.container}>
                <div className={styles.state_layer}>
                  <span
                    className='material-symbols-outlined on-surface-variant-text'
                    onClick={() =>
                      trailingIcon === 'cancel' && setInputValue('')
                    }
                  >
                    {trailingIcon}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
        {style === 'filled' && (
          <div
            className={styles.active_indicator}
            style={{
              height: currentState === 'focused' && '2px',
              background:
                currentState === 'focused' && 'var(--md-sys-color-primary)',
            }}
          ></div>
        )}
      </div>
      <div className={styles.supporting_text}>
        <p className={`${styles.text} body-small`}>{supportingText}</p>
      </div>
    </div>
  );
}
