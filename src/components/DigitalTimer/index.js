// Write your code here
import {Component} from 'react'
import './index.css'

const mainInitialState = {
  isTimeRunning: false,
  timeInSeconds: 0,
  timersLimitMinutes: 25,
}

class DigitalTimer extends Component {
  state = mainInitialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onDecrementMinutes = () => {
    const {timersLimitMinutes} = this.state

    if (timersLimitMinutes > 1) {
      this.setState(prevState => ({
        timersLimitMinutes: prevState.timersLimitMinutes - 1,
      }))
    }
  }

  onIncrementMinutes = () => {
    const {timersLimitMinutes} = this.state

    if (timersLimitMinutes > 1) {
      this.setState(prevState => ({
        timersLimitMinutes: prevState.timersLimitMinutes + 1,
      }))
    }
  }

  renderTimerLimitController = () => {
    const {timeInSeconds, timersLimitMinutes} = this.state
    const isButtonDisabled = timeInSeconds > 0

    return (
      <div className="timer-limit-controller">
        <p className="set-timer">Set Timer limit</p>
        <div className="limit-controller-section">
          <button
            className="timer-button"
            disabled={isButtonDisabled}
            type="button"
            onClick={this.onDecrementMinutes}
          >
            -
          </button>
          <div className="timer-label-and-container">
            <p className="limit-count">{timersLimitMinutes}</p>
          </div>
          <button
            className="timer-button"
            disabled={isButtonDisabled}
            type="button"
            onClick={this.onIncrementMinutes}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(mainInitialState)
  }

  incrementElapsedSeconds = () => {
    const {timersLimitMinutes, timeInSeconds} = this.state
    const isTimerIsCompleted = timeInSeconds === timersLimitMinutes * 60

    if (isTimerIsCompleted) {
      this.clearTimerInterval()
      this.setState({isTimeRunning: false})
    } else {
      this.setState(prevState => ({
        timeInSeconds: prevState.timeInSeconds + 1,
      }))
    }
  }

  onStartPauseTimer = () => {
    const {isTimeRunning, timeInSeconds, timersLimitMinutes} = this.state
    const isTimerIsCompleted = timeInSeconds === timersLimitMinutes * 60

    if (isTimerIsCompleted) {
      this.setState({timeInSeconds: 0})
    }
    if (isTimeRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementElapsedSeconds, 1000)
    }

    this.setState(prevState => ({isTimeRunning: !prevState.isTimeRunning}))
  }

  renderControlTimer = () => {
    const {isTimeRunning} = this.state
    const imageUrls = isTimeRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const altSection = isTimeRunning ? 'pause icon' : 'play icon'

    return (
      <div className="app-container">
        <button
          className="buttons"
          type="button"
          onClick={this.onStartPauseTimer}
        >
          <img src={imageUrls} alt={altSection} className="icon" />
          <p className="details">{isTimeRunning ? 'Pause' : 'Start'}</p>
        </button>
        <button className="buttons" type="button" onClick={this.onResetTimer}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
            className="icon"
          />
          <p className="details">Reset</p>
        </button>
      </div>
    )
  }

  getTimeElapsedSecondsTime = () => {
    const {timersLimitMinutes, timeInSeconds} = this.state
    const totalRemainingSeconds = timersLimitMinutes * 60 - timeInSeconds
    const totalMinutes = Math.floor(totalRemainingSeconds / 60)
    const totalSeconds = Math.floor(totalRemainingSeconds % 60)
    const mainStringMinutes =
      totalMinutes > 9 ? totalMinutes : `0${totalMinutes}`
    const mainStringSeconds =
      totalSeconds > 9 ? totalSeconds : `0${totalSeconds}`

    return `${mainStringMinutes}:${mainStringSeconds}`
  }

  render() {
    const {isTimeRunning} = this.state
    const pauseRunning = isTimeRunning ? 'Running' : 'Paused'

    return (
      <div className="timer-app-section">
        <h1 className="main-heading">Digital Timer</h1>
        <div className="main-timer-section">
          <div className="timer-display-container">
            <div className="elapsed-time-container">
              <h1 className="elapsed-timer">
                {this.getTimeElapsedSecondsTime()}
              </h1>
              <p className="main-para">{pauseRunning}</p>
            </div>
          </div>
          <div className="total-controls-containers">
            {this.renderControlTimer()}
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
