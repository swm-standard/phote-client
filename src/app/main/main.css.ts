import { style } from '@vanilla-extract/css';

export const main = style({
  width: '100%',
  height: '100%',
  backgroundColor: 'skyblue',
  position: 'relative',
});

export const navigation = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  position: 'fixed',
  backgroundColor: 'blue',
  color: 'white',
  left: 0,
  bottom: 0,
});

export const selectedNavigationItem = style({
  color: 'red',
});
