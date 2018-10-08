import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

class ToggleBtn extends React.Component {
  render() {
    const {
      onActive,
      onDeactive,
      activeLabel,
      deactiveLabel,
      isActive
    } = this.props;
    return (
      <FormControlLabel
        control={
          <Switch
            checked={isActive}
            onChange={isActive ? onDeactive : onActive}
            value="checkedB"
            color="primary"
          />
        }
        label={isActive ? deactiveLabel : activeLabel}
      />
    );
  }
}

ToggleBtn.prototypes = {};

export default ToggleBtn;
