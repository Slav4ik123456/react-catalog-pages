import { Component } from 'react';

export default class LegacyNote extends Component {
    render() {
        return (
            <aside className="note">
                {this.props.text}
            </aside>
        );
    }
}
