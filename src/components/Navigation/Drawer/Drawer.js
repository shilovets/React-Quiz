import React, {Component} from "react";
import {NavLink} from "react-router-dom";

import "./Drawer.scss";
import Backdrop from "../../UI/Backdrop/Backdrop";

class Drawer extends Component {


    renderLinks(links) {
        return (links.map((link, index) => {
            return (
                <li
                    key={index}
                >
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        className='Drawer__links'
                        onClick={this.props.onClose}
                    >
                        {link.label}
                    </NavLink>
                </li>
            )

        }));
    }

    render() {
        let cls = ['Drawer'];
        if (!this.props.isOpen) {
            cls.push('close');
        }

        let links = [
            {to: '/', label: 'Quiz list', exact: true}
        ];

        console.log("auth", this.props.isAuthenticated);

        if (this.props.isAuthenticated) {
            links.push(
                {to: '/quiz-creator', label: 'Create new quiz', exact: false},
                {to: 'logout', label: 'Logout', exact: false})
        } else {
            links.push({to: '/auth', label: 'Authorization', exact: false})
        }


        return (
            <React.Fragment>
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks(links)}
                    </ul>
                </nav>
                {this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null}
            </React.Fragment>
        );
    };
}

export default Drawer;