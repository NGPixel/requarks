/// <reference path="../../../typings/tsd.d.ts" />

import * as React from "react";
import * as ReactDOM  from "react-dom";
let {Component, PropTypes} = React;

const classNames = require('classnames');
const menuTree =
  [{
    id: 'dashboard',
    route: '/',
    icon: 'dashboard',
    bg: 'a'
  },
  {
    id: 'review',
    route: '/review',
    icon: 'line_weight',
    bg: 'b'
  },
  {
    id: 'projects',
    route: '/projects',
    icon: 'view_carousel',
    bg: 'c'
  },
  {
    id: 'teams',
    route: '/teams',
    icon: 'people',
    bg: 'd'
  },
  {
    id: 'settings',
    route: '/settings',
    icon: 'settings',
    bg: 'f'
  }];

interface IHeaderProps extends React.Props<any> {}

class Header extends Component<IHeaderProps, any> {

    constructor(props, context) {
        super(props);

        this.state = {
            activemenu: '',
            menu: menuTree,
            fabIcon: 'add',
            loading: false,
            snackBusyOpen: false,
            input2: []
        };

    }

    componentDidMount() {
      EE.on('setHeaderNav', this.setHeaderNav);
      EE.on('setHeaderLoading', this.setLoading);
    }

    componentWillUnmount() {
      EE.removeListener('setHeaderNav', this.setHeaderNav);
      EE.removeListener('setHeaderLoading', this.setLoading);
    }

    setHeaderNav = (nActiveMenu: string) => {
      this.setState({ activemenu: nActiveMenu });
      document.body.className = 'bg-state-' +
        (_.result(_.find(this.state.menu, ['id', nActiveMenu]), 'bg') || 'e') +
        ((!AppConfig.data.app_useadvanimations) ? ' bg-state-direct' : '');
    }
    setLoading = (nState: boolean, nFabIcon: string = 'import_export') => {
      this.setState({
        loading: nState,
        fabIcon: nFabIcon || 'import_export'
      });
    }

    render() {

        let currentActiveMenuItem = this.state.activemenu;
        let navigateToFunc = this.navigateTo;

        let headermenu = this.state.menu.map(function (menuitem) {
            let menuItemClass = classNames({
                'active': menuitem.id == currentActiveMenuItem,
            });
            let menuItemTitle = <FormattedMessage id={"header.menu." + menuitem.id} defaultMessage={menuitem.id} />;
            return (
                <li key={menuitem.id} className={menuItemClass}>
                  <Mui.FlatButton
                    label={menuItemTitle}
                    labelPosition="after"
                    onClick={(e) => navigateToFunc(e, menuitem.route)}
                    labelStyle={{color: '#FFF'}}
                    >
                    <i className="material-icons">{menuitem.icon}</i>
                  </Mui.FlatButton>
                </li>
            );
        });

        let headerLoadingElement = (this.state.loading) ? <div className={classNames({
              'header-loading': true,
              'active': this.state.loading,
            })}>
            <Mui.CircularProgress mode="indeterminate" color="rgba(255,255,255,0.6)" size={1.1} />
          </div> : null;

          let headerFABicon = (this.state.loading) ? this.state.fabIcon : 'add';

        return (
            <div id="header">
                <ul>{headermenu}</ul>
                <div className="header-search">
                <Mui.AutoComplete
                    inputStyle={{color: '#FFF'}}
                    floatingLabelText={<FormattedMessage id="header.search.title" defaultMessage="Search requests..." />}
                    floatingLabelStyle={{color: 'rgba(255,255,255,0.8)'}}
                    underlineStyle={{borderColor: 'rgba(255,255,255,0.8)'}}
                    underlineFocusStyle={{borderColor: 'rgba(255,255,255,0.9)'}}
                    hintText={<FormattedMessage id="header.search.hint_text" defaultMessage="ID or Title" />}
                    hintStyle={{color: 'rgba(255,255,255,0.4)'}}
                    dataSource={this.state.input2}
                    onUpdateInput={(t) => { console.log(t); this.setState({input2: [t, t + t, t + t + t]}); }}
                    onNewRequest={(t) => { console.log('request:' + t); }} />
                </div>
                {headerLoadingElement}
                <div className="header-add">
                  <Mui.FloatingActionButton onClick={(e) => navigateToFunc(e, '/new')} style={{backgroundColor: 'transparent', backgroundImage: 'linear-gradient(to top, rgba(255,255,255,1), rgba(255,255,255,0.9), rgba(255,255,255,0.5))'}} backgroundColor="transparent">
                    <Mui.FontIcon className="material-icons" color="rgba(0,0,0,0.6)">{headerFABicon}</Mui.FontIcon>
                  </Mui.FloatingActionButton>
                </div>

                <Mui.Snackbar
                  message={<FormattedMessage id="header.messages.loading_busy" />}
                  autoHideDuration={3000}
                  open={this.state.snackBusyOpen}
                  onRequestClose={this.onDismissBusy}
                  />

            </div>
        );

    }

    navigateTo = (e, target) => {

      if(!this.state.loading) {
        Hist.push(target);
      } else {
        this.setState({
          snackBusyOpen: true
        })
      }

    }

    onDismissBusy = () => {
      this.setState({
        snackBusyOpen: false
      })
    }

}

export = injectIntl(Header);
