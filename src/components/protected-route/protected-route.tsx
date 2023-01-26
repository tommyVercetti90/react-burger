import { useSelector } from "react-redux"
import { Redirect, Route, RouteProps } from 'react-router-dom'

export const ProtectedRoute = ({ children, ...rest }: RouteProps & {children?: React.ReactNode}) => {

  const { user } = useSelector((store:any)=> store.userReducer)

  return (
    <Route
      {...rest}
      render={({location}) => 
        user ? (
          children
        ) : (
          <Redirect to={{pathname: '/login', state: {from: location}}} />
        )
      }
    />
  )
}  