import React, { useEffect, useState } from "react";
import { toVulgar } from 'vulgar-fractions';
import './QuantityAdjuster.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const QuantityAdjuster = (props) => {
    const [quantity, setQuantity] = useState(props.initialQuantity);
    const [startIndex] = useState(props.startingIndex);
    const [endIndex, setEndIndex] = useState(props.endingIndex);
    const floatRegExp = new RegExp('^([0-9]+([.][0-9]*)?|[.][0-9]+)$');

    useEffect(() => {
        if (props.endingIndex !== -1) {
            let currentIngredients = props.savedIngredients.slice();
            let currentIng = props.ingredient;
            let index = currentIngredients.indexOf(currentIng);
            let result = "";

            if (quantity < 1 && typeof toVulgar(quantity % 1) === 'undefined') result += 0;
            else if (quantity >= 1) result += Math.floor(quantity);
            
            if (typeof toVulgar(quantity % 1) !== 'undefined' && result.length === 0) result += toVulgar(quantity % 1);
            else if (typeof toVulgar(quantity % 1) !== 'undefined') result += " " + toVulgar(quantity % 1);
            else if (quantity % 1 > 0) result = parseInt(result) + (quantity % 1);

            const newIng = currentIng.substring(0, startIndex) + result + currentIng.substring(endIndex);
            
            if (quantity % 1 > 0 && currentIng.substring(startIndex, endIndex - 1).includes("/")) {
                // TODO - handle denominators > 9
                setEndIndex(startIndex + result.toString().length + 2);
            }

            else setEndIndex(startIndex + result.toString().length);
            currentIngredients.splice(index, 1, newIng);
            props.setSavedIngredients(currentIngredients);
        }
    }, [quantity]);

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    }

    const onQuantityBlur = (event) => {
        if(!event.target.value.match(floatRegExp)) setQuantity(0);
        //updateItem();
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
        //updateItem();
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
        //updateItem();
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