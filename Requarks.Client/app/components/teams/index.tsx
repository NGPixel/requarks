/// <reference path="../../../typings/tsd.d.ts" />

import * as React from "react";
import * as ReactDOM  from "react-dom";

interface ITeamProps extends React.Props<any> {}

class Team extends React.Component<ITeamProps, any> {

  constructor(props: ITeamProps) {
      super(props);
  }

  componentDidMount() {
    EE.emit('setHeaderNav', 'teams');
  };

  componentWillUnmount() {

  };

  render() {

      let categories = _.sortBy(AppStore.data.categories, 'CategoryName').map(function (c) {

        return (
            <Mui.ListItem
              key={c.CategoryId}
              primaryText={c.CategoryName}
              leftIcon={
                <MuiIcons.SocialGroup />
              }
            />
        );
      });

      return (

        <div className="content-container">
          <Flex alignItems="start">
              <Item flex={2}>

                <Mui.Paper zDepth={2} style={{ textAlign: 'left' }}>
                  <Mui.List subheader={<FormattedMessage id="team.title" defaultMessage="My Teams" />}>
                    {categories}
                  </Mui.List>
                </Mui.Paper>

              </Item>
              <Item flex={10}>
                --
              </Item>
          </Flex>
        </div>

      );
  }

}

export = injectIntl(Team);
