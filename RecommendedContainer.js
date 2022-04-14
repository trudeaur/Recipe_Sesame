import React, { useEffect } from 'react';
import RecommendedRecipe from '../RecommendedRecipe/RecommendedRecipe';
import './RecommendedContainer.css';

const RecommendedContainer = (props) => {
    useEffect(() => {
    }, [props.recommendedRecipes]);

    // Recipes will have {ingredients, instructions, picture_link, and title}

    return (
        <div className="container recommendedContainer">
            <h2>Suggested Projects</h2>
            {props.recommendedRecipes.length > 0 ? (
                <div className="recommendedScroll">
                    { props.recommendedRecipes.slice(props.resultStartingIndex, props.resultStartingIndex + 6).map((recipe, index) => (
                        <RecommendedRecipe 
                            key={index} 
                            recipe={recipe} 
                            setRecipeScreenIsOpen={props.setRecipeScreenIsOpen} 
                            setOpenRecipe={props.setOpenRecipe}
                        />
                    )) }
                </div>
            ) : (
                <div className="noRecipes">
                    <p>No projects were found.</p>
                </div>
            )}
            
        </div>
    );

}

export default RecommendedContainer;