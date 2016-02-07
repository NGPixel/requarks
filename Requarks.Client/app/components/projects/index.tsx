/// <reference path="../../../typings/tsd.d.ts" />

import * as React from "react";
import * as ReactDOM  from "react-dom";

interface IProjectsProps extends React.Props<any> {}

class Projects extends React.Component<IProjectsProps, any> {

  constructor(props: IProjectsProps) {
      super(props);
  }

  componentDidMount() {
    EE.emit('setHeaderUI', {
      navigation: 'projects',
      loading: false
    });
  };

  componentWillUnmount() {

  };

  render() {

      return (

          <Flex alignItems="start">
              <Item flex={12}>
                  ---
              </Item>
          </Flex>

      );
  }

}

export = injectIntl(Projects);
