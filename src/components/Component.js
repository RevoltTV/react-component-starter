import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import logger                 from 'revolt-logger';
import React                  from 'react';

export class Component extends React.Component {
    constructor(props) {
        super(props);

        this.log = logger.get('Component');
        this.log.trace({ props }, 'constructed');
    }

    render() {
        return (
            <div className="component">
                <h1>Component</h1>
            </div>
        );
    }
}

Component.propTypes = {
};

function bindActions(dispatch) {
    return bindActionCreators({

    }, dispatch);
}

function bindState(state) {
    return {
        ...state.component
    };
}

export default connect(bindState, bindActions)(Component);
