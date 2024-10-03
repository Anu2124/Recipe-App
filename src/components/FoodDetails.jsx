import { useEffect, useState } from "react";
import styles from "./foodDetails.module.css";
import ItemList from "./ItemList";

export default function FoodDetails({foodId}){
    const [food,setFood]=useState({})
    const [isLoading,setIsLoading]=useState(true)
    
    const URL=`https://api.spoonacular.com/recipes/${foodId}/information`
    const API_KEY="9bf354bf751b45b6a9ecba71af73136b"
    useEffect(()=>{
       async function fetchFood(){
            const res= await fetch(`${URL}?apiKey=${API_KEY}`)
            const data=await res.json()
            console.log(data);
            setFood(data)
            setIsLoading(false)
        }
        fetchFood();
    },[foodId])

  return (
  <div>
        <div className={styles.recipeCard}>
            <h1 className={styles.recipeName}> {food.title}</h1>
           <img className={styles.recipeImage} src={food.image}  />
         <div className={styles.recipeDetails}>
            <span>
              <strong> ⌚{food.readyInMinutes} Minutes</strong>
           </span>

           <span>
             👨‍👩‍👧‍👦<strong>Serves{food.servings}</strong>
           </span>

           <span><strong>
            {food.vegetarian ? "🥕vegetarian":"🍗non-vegetarian"}
            </strong>
          </span>

           <span><strong>
              {food.vegan ? "🐮vegan":""}
              </strong>
           </span>
           
           </div>

         <div><strong>
            $<span>{food.pricePerServing/100}per serving</span>
            </strong>
         </div>
         <h2>Ingredients</h2>
        <ItemList food={food} isLoading={isLoading}/>
         <h1>Instructions</h1>
        <div className={styles.recipeInstructions}><ol>
            {isLoading? <p>loading...</p>:food.analyzedInstructions[0].steps.map((step)=>(<li>{step.step}</li>))}
            </ol>
        </div>

        </div>
   </div>
  )
}