const Notification = ({ type, message }) => {
    if (message === null) {
      return null
    }

    if (type === "error"){
        return (
            <div className="error">
                {message}
            </div>
        )
    }
    return (
        <div className="notification">
            {message}
        </div>
    )
  }
  
  export default Notification