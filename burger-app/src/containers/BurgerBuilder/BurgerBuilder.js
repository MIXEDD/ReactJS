import React, {Component} from 'react';
import {connect} from 'react-redux';
import Auxillary from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';

const INGREDIENT_PRICES = {
  salad:0.5,
  cheese:0.4,
  meat:1.3,
  bacon:0.7
};

class BurgerBuilder extends Component {
    state = {
        totalPrice:4,
        purchasable: false,
        purchasing:false,
        loading:false,
        error:false
    }

    componentDidMount() {
        // axios.get('/ingredients.json')
        //     .then(resp => {
        //         this.setState({ingredients:resp.data});
        //     }).catch(error => {
        //         this.setState({error:true});
        // });
    }

    updatePurchaseState(ingredients){
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum,el) => {
                return sum + el;
            },0);
        this.setState({purchasable: sum > 0});

    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients:updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0) return;
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddition;
        this.setState({totalPrice: newPrice, ingredients:updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }


    purchaseHandler = () => {
      this.setState({purchasing:true});
    }

    purchaseContinueHandler = () => {


        const queeryParams = [];
        for(let i in this.state.ingredients){
            queeryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }

        queeryParams.push('price=' + this.state.totalPrice);
        const queryString = queeryParams.join('&');
        this.props.history.push({
            pathname:'/checkout',
            search:'?' + queryString
        });

    };

    purchaseCancelHandler = () => {
        this.setState({purchasing:false});
    }

    render() {

        const disabledInfo = {
            ...this.props.ings
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner/>;

        if(this.props.ings){
            burger = (
                <Auxillary>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                    />
                </Auxillary>
            );
            orderSummary = (
                <OrderSummary
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice.toFixed(2)}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                />
            );
        }
        if(this.state.loading){
            orderSummary = <Spinner />;
        }

        return(
            <Auxillary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}

            </Auxillary>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings:state.ingredients
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type:actionTypes.ADD_INGREDIENT,ingredientName:ingName});
        onIngredientRemove: (ingName) => dispatch({type:actionTypes.REMOVE_INGREDIENT,ingredientName:ingName});
};
};

export default connect(mapStateToProps,mapDispatchToProps) (withErrorHandler(BurgerBuilder,axios));