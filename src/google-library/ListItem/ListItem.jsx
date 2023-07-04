// work in progress, some components used in the 'List item' are not done yet

import styles from './ListItem.module.scss';

export default function ListItem({
  headline = 'List item',
  supportingText = 'Supporting line text lorem ipsum dolor sit amet, consectetur.',
  avatar,
  initial = 'A',
}) {
  return (
    <div className={styles.list_item}>
      <div className={styles.state_overlay}></div>
      <div className={styles.state_layer}>
        <div className={styles.leading_element}>
          {avatar && (
            <div
              className={`${styles.avatar} title-medium on-primary-container-text primary-container`}
            >
              <p className={styles.initial}>{initial}</p>
            </div>
          )}
        </div>
        <div className={styles.content}>
          <p className={`${styles.headline} body-large on-surface-text`}>{headline}</p>
          <p
            className={`${styles.supporting_text} body-medium on-surface-variant-text`}
          >{supportingText}</p>
        </div>
        <div className={styles.trailing_element}></div>
      </div>
    </div>
  );
}
