import React from "react";

import "./MenuToggle.scss";

const MenuToggle = props => {
    let clsBtn = ['MenuToggle'],
        clsIcon = ['MenuToggle__icon fa'];

    if (props.isOpen) {
        clsBtn.push('open');
        clsIcon.push('fa-times');
    } else {
        clsIcon.push('fa-bars')
    }

    return (
        <button className={clsBtn.join(' ')} onClick={props.onToggle}>
            <i
                className={clsIcon.join(' ')}
            >

            </i>
        </button>

    )
}
export default MenuToggle;

//
// class MenuToggle extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             isOpen: this.props.isOpen
//         }
//
//         console.log(this.state.isOpen, 'menu-cons');
//     };
//
//     onToggleHandler = () => {
//         this.setState({
//             isOpen: !this.state.isOpen
//         });
//     };
//
//
//     render() {
//
//         let clsBtn = ['MenuToggle'];
//         let clsIconBar = 'MenuToggle__icon fa fa-bars';
//         let clsIconClose = 'MenuToggle__icon fa fa-times';
//         let clsIcon = this.state.isOpen ? clsIconClose : clsIconBar;
//
//         console.log(this.state.isOpen, 'menu1');
//
//         if (this.state.isOpen) {
//             console.log(this.state.isOpen, 'menu2');
//             clsBtn.push('open');
//         }
//
//
//
//         return (
//             <button className={clsBtn.join(' ')} onClick={this.onToggleHandler}>
//                 <i
//                     className={clsIcon}
//                 >
//
//                 </i>
//             </button>
//
//         )
//     }
// }