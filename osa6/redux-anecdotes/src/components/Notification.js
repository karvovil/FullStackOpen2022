import { useSelector } from 'react-redux'
import { connect } from 'react-redux'

const Notification = (props) => {
  const notification = props.notification //useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if(notification === '')
      style.display = 'none'

  return (
    <div style={style}>
      {notification}
    </div>
  )
}
const mapStateToProps = (state) =>  {
  return{notification: state.notification}
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification
