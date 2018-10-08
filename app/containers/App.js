// @flow
import * as React from 'react';
import Appbar from './../components/Appbar';

type Props = {
  children: React.Node
};

export default class App extends React.Component<Props> {
  props: Props;

  render() {
    const { children } = this.props;
    return (
      <React.Fragment>
        <Appbar />
        {children}
      </React.Fragment>
    );
  }
}
