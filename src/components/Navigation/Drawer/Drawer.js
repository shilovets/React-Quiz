import React, {Component} from "react";
import {NavLink} from "react-router-dom";

import "./Drawer.scss";
import Backdrop from "../../UI/Backdrop/Backdrop";

const links = [
    {to: '/', label: 'Quiz list', exact: true},
    {to: '/auth', label: 'Authorization', exact: false},
    {to: '/quiz-creator', label: 'Create new quiz', exact: false}
];

class Drawer extends Component {

    renderLinks() {
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

        return (
            <React.Fragment>
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks()}
                    </ul>
                </nav>
                {this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null}
            </React.Fragment>
        )
    }
};

export default Drawer;