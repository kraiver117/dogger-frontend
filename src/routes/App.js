import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Layout } from '../components/Layout';

import { Login } from '../views/Login';
import { Register } from '../views/Register';
import { ListUsers } from '../views/ListUsers';
import { UserDetails } from '../views/UserDetails';
import { CreatePet } from '../views/CreatePet';
import { ListWalkers } from '../views/ListWalkers';
import { WalkerDetails } from '../views/WalkerDetails';
import { CreateWalk } from '../views/CreateWalk';

export const App = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route exact path='/' component={Login} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/owners' component={ListUsers} />
                    <Route exact path='/walkers' component={ListWalkers} />
                    <Route exact path='/user/:id/details' component={UserDetails} />
                    <Route exact path='/walker/:id/details' component={WalkerDetails} />
                    <Route exact path='/addpet/user/:id' component={CreatePet} />
                    <Route exact path='/addwalk/walker/:id' component={CreateWalk} />
                </Switch>
            </Layout>
        </BrowserRouter>
    );
}
