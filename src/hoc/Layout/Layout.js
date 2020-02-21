import React, {Component} from 'react';
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
import Drawer from "../../components/Navigation/Drawer/Drawer";

import './Layout.scss';
import {connect} from "react-redux";

class Layout extends Component {

    state = {
        menu: false
    };

    toggleMenuHandler = () => {
        this.setState({
            menu: !this.state.menu
        });
    };

    render() {

        return (
            <div className='Layout'>

                <Drawer
                    isOpen={this.state.menu}
                    onClose={this.toggleMenuHandler}
                    isAuthenticated={this.props.isAuthenticated}
                />
                {
                    !this.state.menu
                        ?
                        <MenuToggle
                            isOpen={this.state.menu}
                            onToggle={this.toggleMenuHandler}
                        />
                        :
                        null
                }


                <main>
                    {this.props.children}
                </main>
            </div>
        );
    };
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.auth.token
    };
}

export default connect(mapStateToProps)(Layout);