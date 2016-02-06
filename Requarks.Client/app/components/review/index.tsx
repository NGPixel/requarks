/// <reference path="../../../typings/tsd.d.ts" />

import * as React from "react";
import * as ReactDOM  from "react-dom";

var faker = require('faker');

interface IReviewProps extends React.Props<any> {}

class Review extends React.Component<IReviewProps, any> {

  constructor(props: IReviewProps) {
    super(props);

    this.state = {
      open: false,
      data: (() => {
        let tmpData = [];
        for(let i = 0; i < 100; i++) {
          tmpData.push({
            RequestId: faker.random.number(),
            RequestTitle: faker.hacker.phrase(),
            RequestStatus: faker.helpers.randomize(['Unconfirmed', 'Under Analysis', 'Queued', 'In Progress', 'Completed', 'Rejected']),
            RequestType: faker.helpers.randomize(['Bug - Urgent', 'Bug - Normal', 'Bug - Minor', 'Enhancement', 'New Feature']),
            RequestPriority: faker.helpers.randomize(['High', 'Normal', 'Low']),
            RequestImageUrl: faker.image.avatar()
          });
        };
        tmpData = _.orderBy(tmpData, ['RequestStatus', 'RequestPriority'], ['asc', 'asc']);
        return tmpData;
      })()
    };
  }

  componentDidMount() {
    EE.emit('setHeaderUI', {
      navigation: 'review',
      loading: false
    });
  };

  componentWillUnmount() {

  };

  formatDate(d: Date) {
    return moment(d).format('YYYY/MM/DD');
  }

  changeCategory = () => {
    this.setState({open: !this.state.open});
  }

  render() {

    return (

      <div className="content-container">

        <Mui.Card style={{backgroundColor: Colors.grey100}}>
          <Flex className="list-filters">
            <Item flex={4}>

              <Mui.FlatButton label="Technical" labelPosition="after" onClick={this.changeCategory}>
                <Mui.FontIcon className="material-icons">memory</Mui.FontIcon>
              </Mui.FlatButton>

              <Mui.LeftNav
                docked={false}
                open={this.state.open}
                onRequestChange={open => this.setState({open})}
                >
                <Mui.MenuItem primaryText="Categories" disabled={true} />
                {AppStore.data.categories.map((c) => {
                  return (<Mui.MenuItem value={c.CategoryId} key={c.CategoryId} primaryText={c.CategoryName} leftIcon={
                    <Mui.FontIcon className="material-icons" color={Colors[c.CategoryColor]}>{c.CategoryIcon}</Mui.FontIcon>
                  } />)
                })}
              </Mui.LeftNav>

            </Item>
            <Item flex={8}>

            </Item>
          </Flex>
          <div className="content-datagrid" style={{borderBottom:'1px solid ' + Colors.grey300}}>

            <FlexTable
              className='list-container'
              height={800}
              headerHeight={30}
              rowHeight={30}
              rowsCount={this.state.data.length}
              rowGetter={index => this.state.data[index]}
              rowClassName={(index) => {
                if(index < 0) {
                  return 'list-header';
                }
                return 'list-row' + ((index % 2 == 0) ? ' odd' : '');
              }}
              >
              <FlexColumn
                label=''
                dataKey='RequestId'
                width={50}
                cellClassName='list-cell-id'
                headerClassName='list-header-id'
              />
              <FlexColumn
                width={30}
                label=''
                dataKey='RequestStatus'
                cellClassName='list-cell-status'
                cellRenderer={(cellData: any, cellDataKey: string, rowData: any, rowIndex: number, columnData: any) => {
                  return <div className={'status-blue'}><i className="material-icons">label</i></div>
                }}
              />
              <FlexColumn
                flexGrow={1}
                flexShrink={0}
                label='Summary'
                dataKey='RequestTitle'
                cellClassName='list-cell-title'
                cellRenderer={(cellData: any, cellDataKey: string, rowData: any, rowIndex: number, columnData: any) => {
                  return <div>
                    <ul className="list-tags">
                      <li>{rowData.RequestPriority}</li>
                      <li>{rowData.RequestType}</li>
                    </ul>
                    <ul className="list-meta">
                      {(_.random(5) == 1) ? <li><i className="li_star"></i></li> : ''}
                      {(_.random(3) == 1) ? <li><i className="li_clip"></i></li> : ''}
                      {(_.random(5) > 1) ? <li><i className="li_bubble"></i> {_.random(25)}</li> : ''}
                    </ul>
                    <span>{cellData}</span>
                  </div>
                }}
              />
              <FlexColumn
                width={70}
                label='Priority'
                dataKey='RequestPriority'
                cellClassName='list-cell-priority'
                cellRenderer={(cellData: any, cellDataKey: string, rowData: any, rowIndex: number, columnData: any) => {

                  let prColor = 'grey';
                  let prIntensity = 0;

                  switch(cellData) {
                    case 'High':
                      prColor = 'red';
                      prIntensity = 3;
                    break;
                    case 'Normal':
                      prColor = 'orange';
                      prIntensity = 2;
                    break;
                    case 'Low':
                      prColor = 'brown';
                      prIntensity = 1;
                    break;
                  }

                  return <span className={'list-badge list-badge-' + prColor}>
                    {_.times(prIntensity, () => {
                      return <i className="fa fa-circle"></i>
                    })}
                    {_.times(3 - prIntensity, () => {
                      return <i className="fa fa-circle-o"></i>
                    })}

                  </span>
                }}
              />
              <FlexColumn
                width={30}
                label=''
                dataKey='RequestImageUrl'
                cellClassName='list-cell-avatar'
                cellRenderer={(cellData: any, cellDataKey: string, rowData: any, rowIndex: number, columnData: any) => {
                  return <img src={cellData} alt="" />
                }}
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
