/// <reference path="../../../typings/tsd.d.ts" />

import * as React from "react";
import * as ReactDOM  from "react-dom";

var faker = require('faker');

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

    var data = [];
    for(let i = 0; i < 10000; i++) {
      data.push({
        RequestId: faker.random.number(),
        RequestTitle: faker.hacker.phrase(),
        RequestStatus: faker.helpers.randomize(['Unconfirmed', 'Under Analysis', 'Queued', 'In Progress', 'Completed', 'Rejected']),
        RequestType: 'Bug - Normal',
        RequestPriority: faker.helpers.randomize(['High', 'Normal', 'Low'])
      });
    };
    data = _.sortByOrder(data, ['RequestStatus', 'RequestPriority'], ['asc', 'asc']);

    return (

      <div className="content-container">

        <Mui.Card>
          <Mui.CardHeader
            title={<FormattedMessage id="new_request.title" />}
            subtitle="Technical"
            avatar={<Mui.Avatar icon={<MuiIcons.ActionLineWeight />} backgroundColor={Colors.red500} />}>
          </Mui.CardHeader>
          <div className="content-datagrid">

          <FlexTable
            className='list-container'
            height={500}
            headerHeight={20}
            rowHeight={40}
            rowsCount={data.length}
            rowGetter={index => data[index]}
            rowClassName='list-row'
            >
            <FlexColumn
              label='#'
              dataKey='RequestId'
              width={50}
              cellClassName='list-cell-id'
            />
            <FlexColumn
              flexGrow={1}
              flexShrink={0}
              label='Summary'
              dataKey='RequestTitle'
            />
            <FlexColumn
              width={200}
              label='Type'
              dataKey='RequestType'
            />
          </FlexTable>

          </div>
          <Mui.CardActions style={{textAlign:'right'}}>
            <Mui.FlatButton label={<FormattedMessage id="review.actions.refresh" defaultMessage="Refresh" />} />
          </Mui.CardActions>
        </Mui.Card>

      </div>

    );

  }

}

export = injectIntl(Review);
