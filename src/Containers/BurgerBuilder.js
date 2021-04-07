import {React, Component} from 'react';
import Aux from '../hoc/Aux/Aux';
import Burger from '../Components/Burger/Burger';
import BuildControls from '../Components/Burger/BuildControls/BuildControls';
import Modal from '../Components/UI/Modal/Modal';
import OrderSummary from '../Components/Burger/OrderSummary/OrderSummary';
import axios from '../axios-order';
import Spinner from '../Components/UI/Spinner/Spinner';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    lettuce: .5,
    cheese: .4,
    meat: 1.3,
    bacon: 1
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 5,
        purchaseable: false,
        purchasing: false,
        loading: false
    }

    componentDidMount() {
        axios.get('https://burger-builder-66a7a-default-rtdb.firebaseio.com/Ingredients.json')
             .then(res => {
                 this.setState({ingredients: res.data})
             })
    }

    updatePurchaseable = (updatedIngredients) => {
        const ingredients = {
            ...updatedIngredients
        };
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            }).reduce((sum, el) => {
                return sum + el
            }, 0)
        this.setState({purchaseable: sum > 0})
    };

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // alert('Burger purchased!')
        // pass as second argument to post req
        this.setState({loading: true})
        const order = {
            ingredients: this.state.ingredients,
            // recalculate price on server in production
            price: this.state.totalPrice,
            customer: {
                name: 'Derek Smith',
                address: {
                    street: 'Test St.',
                    zip: '5235325'
                },
            email: 'Test@testy.test'
            },
            deliveryMethod: 'UberEats'
        }
        axios.post('/orders.json', order)
             .then(res => {
                 this.setState({ loading: false, purchasing: false })

             }).catch(err => {
                this.setState({ loading: false, purchasing: false })
             });
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

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseable(updatedIngredients);
    };

    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] > 0) {
            const oldCount = this.state.ingredients[type];
            const updatedCount = oldCount - 1;
            const updatedIngredients = {
                ...this.state.ingredients
            };
            updatedIngredients[type] = updatedCount;
            const priceSubtraction = INGREDIENT_PRICES[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - priceSubtraction;
    
            this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
            this.updatePurchaseable(updatedIngredients);
        }
       

    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        };

        let orderSummary = null
        

        let burger = <Spinner />
        
        if (this.state.ingredients) {
            burger = (
                <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchaseable={this.state.purchaseable}
                    order={this.purchaseHandler}
                />
                </Aux>
            )
            orderSummary = (
                <OrderSummary
                purchaseCancel={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}
                ingredients={this.state.ingredients}
                totalPrice={this.state.totalPrice}
                />
            );
        }
        if (this.state.loading) {
            orderSummary = <Spinner />
        }


        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
                {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);