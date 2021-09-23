import React from "react";
import renderer from "react-test-renderer";
import Link from './Link.react.js';

it("renders correctly", () => {
  const tree = renderer
    .create(<Link page="http://www.facebook.com">Facebook</Link>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
