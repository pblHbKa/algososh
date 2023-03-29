import React from 'react';
import renderer from 'react-test-renderer';

import { Button } from './button';

it('Кнопка с текстом отрисовывается правильно', () => {
  const button = renderer
    .create(<Button text={'Надпись на кнопке'}/>)
    .toJSON();
    expect(button).toMatchInlineSnapshot(`
<button
  className="text text_type_button text_color_primary button undefined false "
  type="button"
>
  <p
    className="text undefined"
  >
    Надпись на кнопке
  </p>
</button>
`);
}); 

it('Кнопка без текста отрисовывается правильно', () => {
  const button = renderer
    .create(<Button text={''}/>)
    .toJSON();
    expect(button).toMatchInlineSnapshot(`
<button
  className="text text_type_button text_color_primary button undefined false "
  type="button"
>
  <p
    className="text undefined"
  >
    
  </p>
</button>
`);
}); 

it('Заблокированная кнопка отрисовывается правильно', () => {
  const button = renderer
    .create(<Button disabled={true}/>)
    .toJSON();
    expect(button).toMatchInlineSnapshot(`
<button
  className="text text_type_button text_color_primary button undefined false "
  disabled={true}
  type="button"
>
  <p
    className="text undefined"
  />
</button>
`);
}); 

it('Кнопка с индикацией загрузки отрисовывается правильно', () => {
  const button = renderer
    .create(<Button isLoader={true}/>)
    .toJSON();
    expect(button).toMatchInlineSnapshot(`
<button
  className="text text_type_button text_color_primary button undefined loader "
  disabled={true}
  type="button"
>
  <img
    alt="Загрузка."
    className="loader_icon"
    src="loader.svg"
  />
</button>
`);
}); 