import { useEffect, useState } from "react";
import Card from "../UI/Card/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./mealItem/MealItem";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];
const DUMMY_MEALS = [];
const fetchMeals = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('something went wrong')
  }
  // try {
    const meals = await response.json();
    console.log(meals);
    for (let key in meals) {
      DUMMY_MEALS.push({
        id: key,
        name: meals[key].name,
        description: meals[key].description,
        price: meals[key].price,
      });
     }
  // } catch (error) {
  //   console.log(error);
  // }
};

const AvailableMeals = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [httpError,setError]=useState(null)

  useEffect(() => {
    fetchMeals(
      "https://dummy-ordering-app-default-rtdb.firebaseio.com/meals.json"
    ).then(() => {
      setIsLoaded(true);
    }).catch(error=>{setError(error.message)});
  }, []);

  if (httpError) {
    return (
      <section>
        <p>{httpError}</p>
      </section>
    )
  }

  const MealsList = DUMMY_MEALS.map((meal) => (
    <MealItem items={meal} key={meal.id} />
  ));
  return (
    <Card className={classes.meals}>
      <ul>{!isLoaded ? <p> loading...</p> : MealsList}</ul>
    </Card>
  );
};

export default AvailableMeals;
