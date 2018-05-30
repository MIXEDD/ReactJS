import React, {Component} from 'react';

// const withClassSecond = (WrappedComponent,className) => {
//     return(props) => (
//         <div className={className}>
//             <WrappedComponent {...props}/>
//         </div>
//     );
// }

const withClassSecond = (WrappedComponent,className) => {
    const WithClassSecond = class extends Component{
        render() {
            return(
                    <div className={className}>
                        <WrappedComponent ref={this.props.forwardedRef} {...this.props}/>
                    </div>
                )
        }
    }

    return React.forwardRef((props,ref) =>  {
        return <WithClassSecond {...props} forwardRef={ref} />
    });
}


export default withClassSecond;