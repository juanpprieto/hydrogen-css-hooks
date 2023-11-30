import {createHooks, recommended} from '@css-hooks/react';

const [css, hooks] = createHooks({
  ...recommended,
  p: '> p &',
  li: '> li &',
  targetAside: '.overlay:target &',
  img: '* img &',
  large: '@media (min-width: 45em)',
});

export default hooks;
export {css};
