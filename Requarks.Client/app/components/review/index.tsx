/// <reference path="../../../typings/tsd.d.ts" />

import * as React from "react";
import * as ReactDOM  from "react-dom";

interface IReviewProps extends React.Props<any> {}

class Review extends React.Component<IReviewProps, any> {

  constructor(props: IReviewProps) {
      super(props);
  }

  componentDidMount() {
    EE.emit('setHeaderNav', 'review');
  };

  componentWillUnmount() {

  };

  formatDate(d: Date) {
    return moment(d).format('YYYY/MM/DD');
  }

  render() {

    var data = [
      { id: '1', firstName: 'John', lastName: 'Bobson'},
      { id: '2', firstName: 'Bob', lastName: 'Mclaren'}
    ]
    var columns = [
      { name: 'firstName'},
      { name: 'lastName'}
    ]

      return (

          <Flex alignItems="start" className="content-container">
              <Item flex={3}>

                <Mui.Paper zDepth={2} style={{ textAlign: 'left' }}>
                  <Mui.List subheader={<FormattedMessage id="new_request.category" />}>
                    <Mui.ListItem primaryText="Content" leftIcon={<MuiIcons.ActionReceipt color={Colors.cyan500} />} />
                    <Mui.ListItem primaryText="Graphic Design" leftIcon={<MuiIcons.ContentGesture color={Colors.green500} />} />
                    <Mui.ListItem primaryText="Technical" leftIcon={<MuiIcons.HardwareMemory />} rightIcon={<MuiIcons.NavigationCheck color={Colors.red500} />} />
                    <Mui.ListItem primaryText="Templates" leftIcon={<MuiIcons.ContentSelectAll color={Colors.purple500} />} />
                  </Mui.List>
                </Mui.Paper>

              </Item>
              <Item flex={9}>

                <Mui.Card>
                  <Mui.CardHeader
                    title={<FormattedMessage id="new_request.title" />}
                    subtitle="Technical"
                    avatar={<Mui.Avatar icon={<MuiIcons.ActionLineWeight />} backgroundColor={Colors.red500} />}>
                  </Mui.CardHeader>
                  <div className="content-datagrid">

                    <DataGrid idProperty="id" dataSource={data} columns={columns} />

                  </div>
                  <Mui.CardActions style={{textAlign:'right'}}>
                    <Mui.FlatButton label={<FormattedMessage id="review.actions.refresh" defaultMessage="Refresh" />} />
                  </Mui.CardActions>
                </Mui.Card>

              </Item>
          </Flex>

      );
  }

}

export = injectIntl(Review);
