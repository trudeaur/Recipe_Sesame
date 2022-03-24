import React, { useState } from "react";
import './QuantityAdjuster.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const QuantityAdjuster = (props) => {
    const [quantity, setQuantity] = useState(props.initialQuantity);
    const floatRegExp = new RegExp('^([0-9]+([.][0-9]*)?|[.][0-9]+)$');

    const updateItem = () => {
        let currentIngredients = props.savedIngredients.slice();
        let currentIng = props.ingredient;

        //const indexOfIng = currentIngredients.indexOf(currentIng);
        //if (indexOfIng !== -1) currentIngredients.splice(indexOfIng, 1);

        //localStorage.setItem('savedIngredients', JSON.stringify(currentIngredients));
        //props.setSavedIngredients(currentIngredients);
    }

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
        updateItem();
    }

    const onQuantityBlur = (event) => {
        if(!event.target.value.match(floatRegExp)) setQuantity(0);
        updateItem();
        // TODO - update value saved in state and localStorage
    }

    const roundToQuarter = (num) => {
        return (Math.round(num * 4) / 4);
    }

    const incrementQuantity = () => {
        const currentQuantity = Number(quantity);
        let newQuantity = 0.0;

        if (currentQuantity >= 5.0) {
            newQuantity = currentQuantity + 1.0;
        } else if (currentQuantity >= 1.0) {
            newQuantity = currentQuantity + 0.5;
        } else {
            newQuantity = currentQuantity + 0.25;
        }

        setQuantity(roundToQuarter(newQuantity));
        updateItem();
    }

    const decrementQuantity = () => {
        const currentQuantity = Number(quantity);
        let newQuantity = 0.0;
        if (currentQuantity > 5.0) {
            newQuantity = currentQuantity - 1.0;
        } else if (currentQuantity > 1.0) {
            newQuantity = currentQuantity - 0.5;
        } else {
            newQuantity = currentQuantity - 0.25;
        }
        if (newQuantity < 0.0) setQuantity(0); // Catch any negatives
        else setQuantity(roundToQuarter(newQuantity));
        updateItem();
    }

    return (
        <div className="quantityAdjuster">
            <div className="servingsArrows quantityArrows">
                <FontAwesomeIcon icon={faAngleDown} onClick={decrementQuantity} size="lg"/>
                <div className="servings quantity">
                    <input className="input" type="text" onChange={handleQuantityChange} onBlur={onQuantityBlur} value={quantity}></input>
                </div>
                <FontAwesomeIcon icon={faAngleUp} onClick={incrementQuantity} size="lg"/>
            </div>
        </div>
    )
}

export default QuantityAdjuster;