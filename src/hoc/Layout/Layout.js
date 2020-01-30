import React, {Component} from 'react';
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
import Drawer from "../../components/Navigation/Drawer/Drawer";

import './Layout.scss';

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
        )
    }
}

export default Layout;