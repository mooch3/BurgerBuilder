import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {
    // this could be a functional component. Just used for testing life cycle
    componentDidUpdate() {
        console.log('[OrderSummary] didUpdate')
    }

    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map((igKey, index) => {
            return <li key={index}><span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}</li>
        });
        return (
            <Aux>
            <h3>Your Order</h3>
            <p>Your burger has:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Total: <strong>${this.props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" click={this.props.purchaseCancel}>CANCEL</Button>
            <Button btnType="Success" click={this.props.purchaseContinue}>PLACE ORDER</Button>
        </Aux>
        )
    } 
}

export default OrderSummary