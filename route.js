import React from 'react'
import { Router, Scene, Stack } from 'react-native-router-flux'
import Login from './Screen/Login'
import Register from './Screen/Register'
import Home from './Screen/Components/Home'

const Routes = () => (
    <Router>
        <Stack key="root" hideNavBar={true}>
            <Scene key = 'login' component= {Login} title = "Login" initial = {true} />
            <Scene key = "register" component = {Register} title = "Register" />
            <Scene key = "home" component = {Home} title = "Home" />
        </Stack>
    </Router>
)
export default Routes