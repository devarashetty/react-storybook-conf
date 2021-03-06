import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import Pagination from '../Pagination';
import { withKnobs, boolean, number, array } from '@storybook/addon-knobs';
import { orderBy } from 'lodash';
import { specs, describe, it } from 'storybook-addon-specifications';
import { mount } from 'enzyme';
import expect from 'expect';
import { withInfo } from '@storybook/addon-info';

const stories = storiesOf('Widgets/Pagination', module);

stories.addDecorator(withKnobs);

stories.add('First page selected', () => {
  return (
    <Pagination
      nbPages={10}
      currentPage={1}
      onClick={() => {}}
      pagesPadding={3}
    />
  );
});

stories.add(
  'Last page selected',
  withInfo('description')(() => {
    const story = (
      <Pagination
        nbPages={10}
        currentPage={10}
        onClick={action('refine')}
        pagesPadding={3}
      />
    );

    specs(() =>
      describe('Pagination', () => {
        it('Clicking on the showFirst button should select the first page', () => {
          const wrapper = mount(story);
          const onClick = expect.createSpy();
          wrapper.setProps({ onClick });

          const showFirst = wrapper.find(
            '.ais-Pagination__itemFirst .ais-Pagination__itemLink'
          );
          showFirst.simulate('click');

          expect(onClick).toHaveBeenCalled();
          expect(onClick).toHaveBeenCalledWith(1);
          wrapper.unmount();
        });
      })
    );

    return story;
  })
);
