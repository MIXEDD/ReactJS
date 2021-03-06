import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';

class Checkout extends Component {

    checkoutCancelled = () => {
        this.props.history.goBack();
    }

    checkoutContinued = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    componentWillMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for(let param of query.entries()){
            // ['salad','1']
            if(param[0] === 'price')
                price = param[1];
            else {
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({ingredients:ingredients,totalPrice:price});
    }

    render(){
        let summary = <Redirect to="/" />;
        if(this.props.ings){
           summary = (
               <div>
                   <CheckoutSummary
                       ingredients={this.props.ings}
                       checkoutCancelled={this.checkoutCancelled}
                       checkoutContinued={this.checkoutContinued}
                    />
                   <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData}
                    />
               </div>
           )
        }
        return(
            <div>
                {summary}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients
    }
};

export default connect(mapStateToProps)(Checkout);