import { useEffect } from "react";
import Card from "../UI/Card/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./mealItem/MealItem";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Sushi",
    description: "Finest fish and veggies",
    price: 22.99,
  },
  {
    id: "m2",
    name: "Schnitzel",
    description: "A german specialty!",
    price: 16.5,
  },
  {
    id: "m3",
    name: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 12.99,
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 18.99,
  },
];

const fetchMeals = async (url) => {
  const response = await fetch(url);
  try {
    const meals = await response.json();
    console.log(meals)
  } catch (error) {
    console.log(error);
  }
};

const AvailableMeals = (props) => {
  useEffect(() => {
    fetchMeals("https://dummy-ordering-app-default-rtdb.firebaseio.com/meals.json");
  }, []);
  const MealsList = DUMMY_MEALS.map((meal) => (
    <MealItem items={meal} key={meal.id} />
  ));
  return (
    <Card className={classes.meals}>
      <ul>{MealsList}</ul>
    </Card>
  );
};

export default AvailableMeals;
