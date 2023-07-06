import { useEffect, useRef, useState } from 'react';
import { IconButton, ListItem } from '../index';
import styles from './Search.module.scss';

export default function ({
  leadingIcon = 'menu',
  leadingIconClick,
  supportingText = 'Hinted search text',
  trailingIcon = 'search',
  trailingIconClick,
  avatar = true,
  initial = 'A',
  avatarClick,
  fullscreenMinSize = 500,
}) {
  const inputRef = useRef(null),
    searchRef = useRef(null),
    listRef = useRef(null),
    [open, setOpen] = useState(false),
    [inputValue, setInputValue] = useState(''),
    [fullscreen, setFullscreen] = useState(false),
    [fullscreenContainerStyle, setFullscreenContainerStyle] = useState({
      position: 'relative',
    });
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= fullscreenMinSize && open) {
        setFullscreen(true);
        setFullscreenContainerStyle({
          position: 'absolute',
          width: '100%',
          height: '100%',
        });
      } else {
        setFullscreen(false);
        setFullscreenContainerStyle({
          position: 'relative',
          width: 'clamp(10%, 20.5rem, 100%)',
          height: '3.5rem',
        });
      }
    };
    handleResize();
  }, [open]);
  return (
    <>
      {open && fullscreen && (
        <div className={styles.fullscreen_placeholder}></div>
      )}
      {open && (
        <div className={styles.backdrop} onClick={() => setOpen(false)}></div>
      )}
      <div className={styles.container} style={fullscreenContainerStyle}>
        <div
          className={`${styles.search} ${fullscreenContainerStyle}`}
          ref={searchRef}
          style={{
            height:
              open && fullscreen
                ? '100%'
                : open && (listRef.current.offsetHeight + 1) / 16 + 3.5 + 'rem',
            borderRadius: open && fullscreen && '0',
          }}
        >
          <div className={styles.header}>
            <div className={styles.state_layer}>
              <IconButton
                icon={open ? 'arrow_back' : leadingIcon}
                onClick={
                  open
                    ? () => setOpen(false)
                    : leadingIcon === 'search'
                    ? () => inputRef.current.focus()
                    : leadingIconClick
                }
              />
              <div
                className={styles.content}
                onClick={() => inputRef.current.focus()}
              >
                <input
                  type='text'
                  value={inputValue}
                  placeholder={supportingText}
                  className={`${styles.input} body-large on-surface-text`}
                  ref={inputRef}
                  onFocus={() => setOpen(true)}
                  onInput={(e) => {
                    setInputValue(e.target.value);
                    !fullscreen &&
                      (searchRef.current.style.height =
                        (listRef.current.offsetHeight + 1) / 16 + 3.5 + 'rem');
                  }}
                />
              </div>
              {(trailingIcon || avatar) && (
                <div
                  className={styles.trailing_element}
                  style={{
                    width:
                      open && trailingIcon
                        ? '3rem'
                        : open
                        ? '0'
                        : trailingIcon && avatar
                        ? '6rem'
                        : (avatar || trailingIcon) && '3rem',
                  }}
                >
                  {trailingIcon && (
                    <IconButton
                      icon={open ? 'close' : trailingIcon}
                      onClick={
                        open
                          ? () => setInputValue('')
                          : trailingIcon === 'search'
                          ? () => inputRef.current.focus()
                          : trailingIconClick
                      }
                    />
                  )}
                  {avatar && (
                    <div className={styles.avatar_target} onClick={avatarClick}>
                      <div className={styles.avatar}>
                        <p className={styles.initial}>{initial}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
              <div className={styles.state_overlay}></div>
            </div>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.list} ref={listRef}>
            <ListItem avatar={true} />
            <ListItem avatar={true} />
            <ListItem avatar={true} />
          </div>
        </div>
      </div>
    </>
  );
}
