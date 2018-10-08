import React, { Component } from 'react';
import Toggle from './Toggle';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import styles from './terminal.css';

import * as childProcess from 'child_process';

var Convert = require('ansi-to-html');
var convert = new Convert();

const STAGES = {
  IDLE: 'IDLE',
  RUNNING: 'RUNNING',
  ERROR: 'ERROR',
  COMPLETED: 'COMPLETED'
};

export default class Terminal extends Component {
  state = {
    stdout: '',
    stage: STAGES.IDLE
  };

  runTask = () => {
    //const child = childProcess.spawn('ls', ['-lh', '/usr']);
    const process = (this.process = childProcess.spawn('ping', [
      'www.google.com'
    ]));

    this.setState({ stage: STAGES.RUNNING });

    process.stdout.on('data', data => {
      const text = data.toString();
      this.setState({ stdout: this.state.stdout + text });
      console.log(`stdout: ${data}`);
    });

    process.stderr.on('data', data => {
      console.log(`stderr: ${data}`);
      this.setState({ stage: STAGES.ERROR });
    });

    process.on('close', code => {
      this.setState({
        stdout: this.state.stdout + `child process exited with code ${code}`,
        stage: STAGES.COMPLETED
      });
      console.log(`child process exited with code ${code}`);
    });

    process.on('exit', code => {
      this.setState({
        stdout:
          this.state.stdout + `child process exited main with code ${code}`,
        stage: STAGES.COMPLETED
      });
    });
  };

  killTask = () => {
    if (this.process) {
      this.process.kill();
    }
  };

  clearTerminal = () => {
    this.setState({ stdout: '' });
  };

  renderTerminal = () => {
    const { stage } = this.state;
    const isTaskRunning = stage === STAGES.RUNNING;
    return (
      <Card>
        <CardContent>
          <section className={styles.terminal_actions}>
            <Toggle
              onActive={this.runTask}
              onDeactive={this.killTask}
              activeLabel="Run"
              deactiveLabel="Stop"
              isActive={isTaskRunning}
            />
            <IconButton aria-label="Clear" onClick={this.clearTerminal}>
              <DeleteIcon />
            </IconButton>
          </section>
          <div
            className={styles.terminal}
            dangerouslySetInnerHTML={{
              __html: convert.toHtml(this.state.stdout)
            }}
          />
        </CardContent>
      </Card>
    );
  };

  render() {
    const { stage } = this.state;
    return this.renderTerminal();
  }
}
