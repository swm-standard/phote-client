import { globalStyle, style } from '@vanilla-extract/css';

globalStyle('*', {
  margin: '0',
  padding: '0',
  boxSizing: 'border-box',
  color: 'inherit',
  textDecoration: 'none',
  listStyleType: 'none',
});

globalStyle('body, html', {
  height: '100%',
});

export const screen = style({
  width: '100%',
  height: '100%',
  backgroundColor: 'gray',
});
