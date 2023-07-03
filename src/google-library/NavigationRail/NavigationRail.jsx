import { useState } from 'react';
import FABs from '../FABs/FABs';
import IconButton from '../IconButton/IconButton';
import Segment from '../Segment/Segment';
import styles from './NavigationRail.module.scss';

export default function NavigationRail({
  alignment = 'top',
  onClick1,
  onClick2,
  onClick3,
  onClick4,
}) {
  const [active, setActive] = useState(1);
  return (
    <div
      className={styles.navigation_rail}
      style={{
        gap: alignment === 'middle' && '3.75rem',
        justifyContent: alignment === 'bottom' && 'space-between',
      }}
    >
      <div className={styles.menu_and_fab}>
        <IconButton icon='menu' />
        <div className={styles.fab_elevation_override}>
          <FABs color='tertiary' />
        </div>
      </div>
      <div className={styles.destinations}>
        <Segment
          active={active === 1 && true}
          style='extended'
          icon='home'
          label='Home'
          onClick={() => {
            setActive(1);
            onClick1;
          }}
        />
        <Segment
          active={active === 2 && true}
          style='extended'
          icon='category'
          label='Categories'
          onClick={() => {
            setActive(2);
            onClick2;
          }}
        />
        <Segment
          active={active === 3 && true}
          style='extended'
          icon='apps'
          label='Apps'
          onClick={() => {
            setActive(3);
            onClick3;
          }}
        />
        <Segment
          active={active === 4 && true}
          style='extended'
          icon='pages'
          label='Components'
          onClick={() => {
            setActive(4);
            onClick4;
          }}
        />
      </div>
    </div>
  );
}
