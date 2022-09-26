import React from 'react'
import {Alert} from 'react-bootstrap'

const Message = ({variant, children}) => {            //children - tekst koji hocemo
  return (
    <Alert variant={variant}>
      {children}
    </Alert>
  )
}


Message.defaultProps = {
    variant: 'info'
}

export default Message
