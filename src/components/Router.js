import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import Login from "../pages/Login";
import Destination from "../pages/Destination";
import Create from "../pages/create/Create";
import StreetMap from "../pages/StreetMap";
import Register from "../pages/Register";
import Error from "../pages/Error";
import ResetPassword from "../pages/ResetPassword";
import ListPointOfInterest from "../pages/edit/ListPointOfInterest";
import EditPointOfInterest from "../pages/edit/EditPointOfInterest";
import Header from "./Header";
import Footer from "./Footer";

export default function Router() {

    return (
        <BrowserRouter>
            <Header />
            <div id="main-content">
                <Switch>

                    <Route exact path="/login" render={() => {
                        return localStorage.getItem("user") ?
                            <Redirect to="/" /> :
                            <Login />;
                    }} />

                    <Route exact path="/register" render={() => {
                        return localStorage.getItem("user") ?
                            <Redirect to="/" /> :
                            <Register />;
                    }} />

                    <Route exact path="/destination" component={Destination} />

                    <Route exact path="/create" render={() => {
                        return localStorage.getItem("user") ?
                            <Create /> :
                            <Redirect to="/login?redirect=/create" />;
                    }} />

                    <Route exact path="/points-of-interest" render={() => {
                        const authenticatedUser = localStorage.getItem("user");

                        return authenticatedUser ?
                            <ListPointOfInterest /> : 
                            <Redirect to="/login?redirect=/points-of-interest" />;
                    }} />

                    <Route exact path="/edit/:id" render={() => {
                        const authenticatedUser = localStorage.getItem("user");

                        return authenticatedUser ?
                            <EditPointOfInterest /> :
                            <Redirect to="/login?redirect=/points-of-interest" />;
                    }} />

                    <Route exact path="/map" render={() => {
                        return localStorage.getItem("center") ?
                            <StreetMap /> :
                            <Redirect to="/" />;
                    }} />
                    <Route exact path="/reset-password" component={ResetPassword} />

                    <Route exact path="/">
                        <Redirect to="/destination" />
                    </Route>

                    <Route component={Error} />
                </Switch>
            </div>
            <Footer />
        </BrowserRouter>
    )
}