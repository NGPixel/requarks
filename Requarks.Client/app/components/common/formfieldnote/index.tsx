/// <reference path="../../../../typings/tsd.d.ts" />

import * as React from "react";
import * as ReactDOM  from "react-dom";

interface IFormFieldNoteProps extends React.Props<any> {
  reqtype: string;
  custom: boolean;
  message: string;
}

class FormFieldNote extends React.Component<IFormFieldNoteProps, any> {

  constructor(props: IFormFieldNoteProps) {
      super(props);
  }

  render() {

    let typeColor = 'color-red';
    let typeText;

    switch(this.props.reqtype) {
        case 'required':
          typeColor = 'color-red';
          typeText = <FormattedMessage id="form_field_note.required" />
        break;
        case 'optional':
          typeColor = 'color-orange';
          typeText = <FormattedMessage id="form_field_note.optional" />
        break;
        case 'info':
          typeColor = 'color-blue';
          typeText = <FormattedMessage id="form_field_note.info" />
        break;
    }

    return(

      <div className="note">
        <strong className={typeColor}>{typeText}</strong> | {(this.props.custom) ? this.props.message : <FormattedMessage id={this.props.message} />}
      </div>

    );

  }

}

export = FormFieldNote;
