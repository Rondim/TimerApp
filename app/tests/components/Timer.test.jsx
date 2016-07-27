var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var Timer = require('Timer');

describe('Timer', () => {
  it('should exist', () => {
    expect(Timer).toExist();
  });

  describe('handleSetCountdown', () => {
    it('should set state to started and timer on', (done) => {
      var timer = TestUtils.renderIntoDocument(<Timer/>);
      timer.handleStatusChange('started');
      expect(timer.state.timerStatus).toBe('started');

      setTimeout(() => {
        expect(timer.state.count).toBe(1);
        done();
      }, 1001);
    });

    it('should pause timer on paused status', (done) => {
      var timer = TestUtils.renderIntoDocument(<Timer/>);
      timer.handleStatusChange('started');
      timer.handleStatusChange('paused');

      setTimeout(() => {
        expect(timer.state.count).toBe(0);
        expect(timer.state.timerStatus).toBe('paused');
        done();
      }, 1001);
    });

    it('should stop timer on stopped status', (done) => {
      var timer = TestUtils.renderIntoDocument(<Timer/>);
      timer.handleStatusChange('started');

      setTimeout(() => {
        timer.handleStatusChange('stopped');
      }, 1001);
      setTimeout(() => {
        expect(timer.state.timerStatus).toBe('stopped');
        expect(timer.state.count).toBe(0);
        done();
      }, 2000);
    });
  });
});
