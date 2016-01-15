/// <reference path="../../../typings/tsd.d.ts" />

import * as React from "react";
import * as ReactDOM  from "react-dom";

interface INewRequestProps extends React.Props<any> {
  intl: any;
}

class NewRequest extends React.Component<INewRequestProps, any> {

  constructor(props: INewRequestProps) {
      super(props);

      this.state = {
        form_category: 0,
        form_type: 0,
        modal_type_help: false,
        modal_project_help: false,
        modal_files_help: false,
        modal_description_help: false,
        uploadbox_dragover: false,
        uploadbox_files: []
      }
  }

  componentDidMount() {

    EE.emit('setHeaderNav', 'new');

    // Define custom properties

    let tempState = {};
    AppStore.data.properties.map((p) => {

      let fieldValue = "";
      let fieldValueKey = "form_customproperty_" + p.CategoryId + "_" + p.PropertyDefinition.PropertyDefinitionKey;

      switch(p.PropertyFieldType) {
        case 'text':
          fieldValue = '';
        break;
        case 'dropdown':
          fieldValue = p.PropertyFieldDataDefault;
        break;
      }

      tempState[fieldValueKey] = fieldValue;
    });
    this.setState(tempState);

    // Initialize drag counters

    AppStore.events.dragcounter = 0;

  };

  componentWillUnmount() {
  };

  // =============================================
  // HANDLERS
  // =============================================

  onCategorySelect = (nCatId) => {

    let default_type = _.find(AppStore.data.types, { CategoryId: nCatId, RequestTypeIsDefault: true });

    this.setState({
      form_category: nCatId,
      form_type: (default_type != null) ? default_type.RequestTypeId : 0
    });
  }

  onTypeSelect = (ev,idx,key) => {
    this.setState({
      form_type: key
    });
  }

  onCustomPropertySelect = (ev,idx,key) => {
    let tempState = {};
    tempState[ev.target.dataset.fieldtarget] = key;
    this.setState(tempState);
  }

  onFileBrowse = () => {
    let self = this;
    AppStore.browse_files({
  		title: "Select file(s) to attach to the request",
      defaultPath: AppConfig.static.path_desktop,
  		properties: [ 'openFile', 'multiSelections' ]
  	}).then(function(res) {
      if(res.length == 0) return;
      self.setState({
        uploadbox_files: AppStore.process_files(self.state.uploadbox_files, res)
      });
    });
  }
  onFileImport = () => {
    let self = this;
    let res = AppStore.import_files();
    if(res.length == 0) return;
    self.setState({
      uploadbox_files: AppStore.process_files(self.state.uploadbox_files, res)
    });
  }
  onFileDragEnter = (ev) => {
    AppStore.events.dragcounter++;
    this.setState({
      uploadbox_dragover: true
    });
  }
  onFileDragOver = (ev) => {
    ev.dataTransfer.dropEffect = 'copy';
    ev.stopPropagation();
    ev.preventDefault();
    return false;
  };
  onFileDragLeave = (ev) => {
    AppStore.events.dragcounter--;
    if(AppStore.events.dragcounter === 0) {
      this.setState({
        uploadbox_dragover: false
      });
    }
  };
  onFileDrop = (ev) => {
    ev.stopPropagation();
    ev.preventDefault();

    let self = this;

    AppStore.events.dragcounter = 0;
    self.setState({
      uploadbox_dragover: false
    });

    let res = _.values(ev.dataTransfer.files).map(function(f) {
      return f.path;
    });
    if(res.length == 0) return;
    self.setState({
      uploadbox_files: AppStore.process_files(self.state.uploadbox_files, res)
    });

    return false;
  };
  onFileRemove = (p) => {
    this.setState({
      uploadbox_files: _.reject(this.state.uploadbox_files, 'filepath', p)
    });
  }

  onDisplayTypeHelp = () => {
    this.setState({
      modal_type_help: true
    });
  }
  onDismissTypeHelp = () => {
    this.setState({
      modal_type_help: false
    });
  }

  onDisplayProjectHelp = () => {
    this.setState({
      modal_project_help: true
    });
  }
  onDismissProjectHelp = () => {
    this.setState({
      modal_project_help: false
    });
  }

  onDisplayDescriptionHelp = () => {
    this.setState({
      modal_description_help: true
    });
  }
  onDismissDescriptionHelp = () => {
    this.setState({
      modal_description_help: false
    });
  }

  onDisplayFilesHelp = () => {
    this.setState({
      modal_files_help: true
    });
  }
  onDismissFilesHelp = () => {
    this.setState({
      modal_files_help: false
    });
  }

  // =============================================
  // RENDER
  // =============================================

  render() {

      let self = this;

      // CATEGORIES
      // -------------------------------------

      let categories = _.sortBy(AppStore.data.categories, 'CategoryName').map(function (c) {

        let catSelectedColor = (self.state.form_category == c.CategoryId) ? Colors.red500 : Colors.grey100;

        return (
            <Mui.ListItem
              key={c.CategoryId}
              primaryText={c.CategoryName}
              secondaryText={<div style={{fontSize:'12px'}}>{c.CategoryDescription}</div>}
              secondaryTextLines={2}
              leftIcon={
                <Mui.FontIcon className="material-icons" color={Colors[c.CategoryColor]}>{c.CategoryIcon}</Mui.FontIcon>
              }
              rightIcon={
                <MuiIcons.NavigationCheck color={catSelectedColor} />
              }
              onClick={() => self.onCategorySelect(c.CategoryId)}
            />
        );
      });

      let category = _.find(AppStore.data.categories, 'CategoryId', self.state.form_category) || {};

      // RENDER
      // -------------------------------------

      return (

        <div className="content-container">
          <Flex alignItems="start" justifyContent="center">
              <Item flex={2} style={{maxWidth:'40%'}}>

                <Mui.Paper zDepth={2} style={{ textAlign: 'left' }}>
                  <Mui.List subheader={<FormattedMessage id="new_request.category" />}>
                    {categories}
                  </Mui.List>
                </Mui.Paper>

              </Item>
              <Item flex={7} className={classNames({
                'hidden': this.state.form_category == 0
              })}>

                <Mui.Card>
                  <Mui.CardHeader
                    title={<FormattedMessage id="new_request.title" />}
                    subtitle={category.CategoryName}
                    avatar={<Mui.Avatar icon={
                      <Mui.FontIcon className="material-icons">{category.CategoryIcon}</Mui.FontIcon>
                    } backgroundColor={Colors[category.CategoryColor]} />}>
                  </Mui.CardHeader>
                  <div className="content-box">

                    <Flex alignItems={'flex-start'}>
                      <Item flex={8}>


                          <Flex alignItems={'flex-start'}>
                            <Item flex={6}>

                              {/* REQUEST TYPE */}

                              <section>
                                <div className="fab-right">
                                  <Mui.FloatingActionButton mini={true} backgroundColor={Colors.red500} onClick={self.onDisplayTypeHelp}>
                                    <MuiIcons.ActionHelpOutline />
                                  </Mui.FloatingActionButton>
                                </div>
                                <label><FormattedMessage id="new_request.fields.type.title" defaultMessage="Type" /></label>
                                <Mui.SelectField value={this.state.form_type} onChange={this.onTypeSelect} fullWidth={true}>
                                  {_.chain(AppStore.data.types).filter('CategoryId', category.CategoryId).sortBy('RequestTypeSortIndex').value().map((t) => {
                                    return (<Mui.MenuItem value={t.RequestTypeId} key={t.RequestTypeId} primaryText={t.RequestTypeName} />)
                                  })}
                                </Mui.SelectField>
                                <Common.FormFieldNote reqtype="required" message="new_request.fields.type.info" />
                              </section>

                              <Mui.Dialog
                                actions={[
                                  <Mui.FlatButton
                                    label={<FormattedMessage id="new_request.actions.dismiss" />}
                                    primary={true}
                                    keyboardFocused={true}
                                    onTouchTap={this.onDismissTypeHelp} />
                                ]}
                                open={this.state.modal_type_help}>
                                <ul className="new-request-typeinfo">
                                  {_.chain(AppStore.data.types).filter('CategoryId', category.CategoryId).sortBy('RequestTypeSortIndex').value().map((t, idx) => {
                                    return (
                                      <li key={idx}>
                                        <strong><MuiIcons.ActionLabel color={Colors[t.RequestTypeColor]} /> {t.RequestTypeName}</strong>
                                        <span>{t.RequestTypeDescription}</span>
                                      </li>
                                    )
                                  })}
                                </ul>
                              </Mui.Dialog>

                            </Item>
                            <Item flex={6}>

                              {/* PROJECT */}

                              <section>
                                <div className="fab-right">
                                  <Mui.FloatingActionButton mini={true} backgroundColor={Colors.red500} onClick={self.onDisplayProjectHelp}>
                                    <MuiIcons.ActionHelpOutline />
                                  </Mui.FloatingActionButton>
                                </div>
                                <label><FormattedMessage id="new_request.fields.project.title" defaultMessage="Project" /></label>
                                <Mui.SelectField value="none" fullWidth={true} disabled={true}>
                                  <Mui.MenuItem value="none" key="0" primaryText="None" />
                                </Mui.SelectField>
                                <Common.FormFieldNote reqtype="optional" message="new_request.fields.project.info" />
                              </section>

                              <Mui.Dialog
                                actions={[
                                  <Mui.FlatButton
                                    label={<FormattedMessage id="new_request.actions.dismiss" />}
                                    primary={true}
                                    keyboardFocused={true}
                                    onTouchTap={this.onDismissProjectHelp} />
                                ]}
                                open={this.state.modal_project_help}>
                                <div>
                                  -- Coming soon --
                                </div>
                              </Mui.Dialog>

                            </Item>
                          </Flex>


                        {/* REQUEST SUMMARY */}

                        <section>
                          <label><FormattedMessage id="new_request.fields.summary.title" defaultMessage="Summary" /></label>
                          <Mui.TextField
                            hintText={<FormattedMessage id="new_request.fields.summary.hint" />}
                            fullWidth={true} />
                          <Common.FormFieldNote reqtype="required" message="new_request.fields.summary.info" />
                        </section>

                        {/* REQUEST DESCRIPTION */}

                        <section>
                          <div className="fab-right">
                            <Mui.FloatingActionButton mini={true} backgroundColor={Colors.red500} onClick={self.onDisplayDescriptionHelp}>
                              <MuiIcons.ActionHelpOutline />
                            </Mui.FloatingActionButton>
                          </div>
                          <label><FormattedMessage id="new_request.fields.description.title" defaultMessage="Description" /></label>
                          <MediumEditor
                            tag="div"
                            className="medium-editor"
                            options={{
                              placeholder: {
                                text: this.props.intl.formatMessage({id:'new_request.fields.description.hint'})
                              },
                              buttonLabels: 'fontawesome',
                              autoLink: true,
                              imageDragging: false,
                              targetBlank: true,
                              toolbar: {buttons: ['bold', 'italic', 'underline', 'anchor', 'unorderedlist', 'orderedlist', 'indent', 'outdent', 'quote', 'pre']}
                            }}
                          />
                          <Common.FormFieldNote reqtype="required" message="new_request.fields.description.info" />
                        </section>

                        <Mui.Dialog
                          actions={[
                            <Mui.FlatButton
                              label={<FormattedMessage id="new_request.actions.dismiss" />}
                              primary={true}
                              keyboardFocused={true}
                              onTouchTap={this.onDismissDescriptionHelp} />
                          ]}
                          open={this.state.modal_description_help}>
                          <div>
                            You can include special formatting in your description. Simply highlight the portion of the text you wish to format. A toolbar will appear just above with various formatting options. Links are automatically recognized and converted.
                          </div>
                        </Mui.Dialog>

                      </Item>
                      <Item flex={4}>

                        {/* REQUEST CUSTOM PROPERTIES */}

                        {_.chain(AppStore.data.properties).filter('CategoryId', category.CategoryId).sortBy('PropertyFieldSortIndex').value().map((p, p_idx) => {
                          let fieldRequired = (p.PropertyIsRequired) ? "required" : "optional";
                          let fieldElement = null;
                          let fieldValueKey = "form_customproperty_" + p.CategoryId + "_" + p.PropertyDefinition.PropertyDefinitionKey;

                          switch(p.PropertyFieldType) {
                            case 'text':
                              fieldElement =
                                <Mui.TextField
                                  hintText={p.PropertyFieldPlaceholder}
                                  fullWidth={true} />;
                            break;
                            case 'dropdown':

                              if(!Validator.isJSON(p.PropertyFieldDataValues)) {
                                Winston.error('Invalid Custom Field: ID' + p.PropertyId + ' has invalid data values JSON.');
                                EE.emit('showError', 'Invalid Custom Field: ID' + p.PropertyId + ' has invalid data values JSON.');
                              }
                              let fieldDDValues = JSON.parse(p.PropertyFieldDataValues);

                              fieldElement =
                                <Mui.SelectField value={self.state[fieldValueKey]} onChange={self.onCustomPropertySelect} fullWidth={true}>
                                  {fieldDDValues.map((v, idx) => {
                                    return (<Mui.MenuItem value={v} key={idx} primaryText={<div data-fieldtarget={fieldValueKey}>{v}</div>} />)
                                  })}
                                </Mui.SelectField>;
                            break;
                          }

                          return (
                            <section key={p_idx}>
                              <label>{p.PropertyDefinition.PropertyDefinitionName}</label>
                              {fieldElement}
                              <Common.FormFieldNote reqtype={fieldRequired} custom={true} message={p.PropertyDefinition.PropertyDefinitionDescription} />
                            </section>
                          )
                        })}

                        {/* REQUEST DEADLINE */}

                        <section>
                          <label><FormattedMessage id="new_request.fields.requested_deadline.title" defaultMessage="Requested Deadline" /></label>
                          <Mui.DatePicker
                            hintText="YYYY/MM/DD"
                            formatDate={this.formatDate}
                            minDate={new Date()}
                            autoOk={true}
                            fullWidth={true}
                            mode="landscape"/>
                          <Common.FormFieldNote reqtype="optional" message="new_request.fields.requested_deadline.info" />
                        </section>

                        {/* FILES */}

                        <section>
                          <div className="fab-right">
                            <Mui.FloatingActionButton mini={true} backgroundColor={Colors.red500} onClick={self.onDisplayFilesHelp}>
                              <MuiIcons.ActionHelpOutline />
                            </Mui.FloatingActionButton>
                          </div>
                          <div className="fab-right">
                            <Mui.FloatingActionButton mini={true} backgroundColor={Colors.deepPurple500} onClick={self.onFileImport}>
                              <MuiIcons.FileFileUpload />
                            </Mui.FloatingActionButton>
                          </div>
                          <div className="fab-right">
                            <Mui.FloatingActionButton mini={true} backgroundColor={Colors.deepPurple500} onClick={self.onFileBrowse}>
                              <MuiIcons.FileAttachment />
                            </Mui.FloatingActionButton>
                          </div>
                          <label><FormattedMessage id="new_request.fields.files.title" defaultMessage="Files" /></label>
                          <div
                            className={classNames({
                              "upload-box": true,
                              "dragover": self.state.uploadbox_dragover
                            })}
                            onDrop={self.onFileDrop}
                            onDragEnter={self.onFileDragEnter}
                            onDragEnd={self.onFileDragLeave}
                            onDragLeave={self.onFileDragLeave}
                            onDragOver={self.onFileDragOver}>
                            <span>Drag &amp; Drop files here</span>
                          </div>
                          <ul className={classNames({
                            'upload-list': true,
                            'hidden': self.state.uploadbox_files.length == 0
                            })}>
                            {self.state.uploadbox_files.map(function(f, f_idx) {
                              return(
                                <li key={f_idx}>
                                  <i className="material-icons" onClick={() => self.onFileRemove(f.filepath)}>clear</i>
                                  <em>{f.filetype}</em>
                                  <strong><EllipsisText text={f.filename} length={30} tooltip={true} /></strong>
                                  <span>{f.fileprop.join(', ')}</span>
                                </li>
                              )
                            })}
                          </ul>
                          <Common.FormFieldNote reqtype="optional" message="new_request.fields.files.info" />
                        </section>

                        <input type="file" className="hidden" />

                        <Mui.Dialog
                          actions={[
                            <Mui.FlatButton
                              label={<FormattedMessage id="new_request.actions.dismiss" />}
                              primary={true}
                              keyboardFocused={true}
                              onTouchTap={this.onDismissFilesHelp} />
                          ]}
                          open={this.state.modal_files_help}>
                          <div>
                            Files such as documents, screenshots, etc. can be attached to requests. There're 3 ways to add files:
                          </div>
                        </Mui.Dialog>

                      </Item>
                    </Flex>

                  </div>
                  <Mui.CardActions style={{textAlign:'right'}}>
                    <Mui.RaisedButton label={<FormattedMessage id="new_request.actions.save_draft" />} primary={true} backgroundColor={Colors.grey600} />
                    <Mui.RaisedButton label={<FormattedMessage id="new_request.actions.submit_request" />} primary={true} backgroundColor={Colors.green600} />
                  </Mui.CardActions>
                </Mui.Card>

              </Item>
          </Flex>
        </div>

      );
  }

  // =============================================
  // HELPERS
  // =============================================

  formatDate(d: Date) {
    return moment(d).format('YYYY/MM/DD');
  }

}

export = injectIntl(NewRequest);
