import * as React from 'react';
import App from 'src/pages/_app';
import Index from 'src/pages';
import GNB from 'src/pages/partials/gnb';
import { render, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';
import makeStore from '../../store/config';
jest.mock('next-server/config', () => () => ({ publicRuntimeConfig: {} }));

afterEach(cleanup);

const store = makeStore({}, { asPath: 'test', isServer: false });

test('should be render Index Component', async () => {
  const props = await App.getInitialProps({
    pathname: '/',
    isServer: false,
    asPath: '/',
    store,
    // router: {
    //   location: { pathname: '/' },
    // },
    ctx: {
      router: {
        location: { pathname: '/' },
      },
      pathname: '/',
      query: { genre: '1', search: 'testKeyword' },
    },
    Component: Index,
  });

  const { getByText } = render(<App Component={Index} router={{}} {...props} />);

  expect(getByText(/Home/)).toHaveTextContent('Home');
});
test('should be render Partials Component', async () => {
  const props = await App.getInitialProps({
    pathname: '/partials/gnb',
    isServer: false,
    asPath: '/partials/gnb',
    store,
    ctx: {
      router: {
        location: { pathname: '/partials/gnb' },
      },
      pathname: '/partials/gnb',
      query: { search: 'testKeyword' },
    },
    Component: GNB,
  });

  const { container } = render(<App Component={GNB} router={{}} {...props} />);

  const input = container.getElementsByTagName('input');
  expect(input).not.toBe('null');
});
