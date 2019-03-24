import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super();
    this.state = {
      title: 'Recipe App',
      recipes: []
    }
  }

    // fetch('http://localhost:3000/api/recipes')
  // MAKE AJAX CALLS HERE
  componentDidMount() {
    console.log('component has mounted');
    var that = this;
    fetch('ec2-50-19-109-120.compute-1.amazonaws.com/api/recipes')
      .then(function(response) {
        response.text()
          .then(function(data){
            that.setState({
              recipes: data
            })
          })
      })
  }

  addRecipe(event) {
    var that = this;
    event.preventDefault();
    let recipe_data = {
      recipe_name: this.refs.recipe_name.value,
      recipe_ingredients: this.refs.recipe_ingredients.value,
      recipe_method: this.refs.recipe_method.value,
      recipe_id: ''
    };

    var request = new Request('ec2-50-19-109-120.compute-1.amazonaws.com/api/new-recipe', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(recipe_data)
    });

    fetch(request)
      .then(function(response) {
        let recipes = that.state.recipes;
          recipes.push(recipe_data);
          that.setState({
            recipes: recipes
        })
        response.json()
          .then(function(data) {
          })
      })
      .catch(function(err) {
        console.log(err);
      })
  }

  showPanel(event) {
    event.preventDefault();
    let panelContents = event.target.nextElementSibling;
    panelContents.classList.toggle('active');
  }

  render() {
    let title = this.state.title;
    let recipes = this.state.recipes;

    return (
      <div className="App">
        <div className="container">
          <h1>{title}</h1>
          <form ref="recipeForm">
            <input type="text" ref="recipe_name" placeholder="Recipe Name" />
            <input type="text" ref="recipe_ingredients" placeholder="Ingredients" />
            <input type="text" ref="recipe_method" placeholder="Method" />
            <button onClick={this.addRecipe.bind(this)}>Add Recipe</button>
          </form>
          { recipes.length ? 
            <h2>{recipes}</h2>
            // <ul>
            //   recipes.map(recipe => 
            //     <li key={recipe.id}>
            //       <button className="accordion" onClick={this.showPanel}>{recipe.name}</button>
            //       <div className="panel">
            //         <p class="ingredients">{recipe.ingredients}</p>
            //         <p class="method">{recipe.directions}</p>
            //       </div>
            //     </li>)
            //     </ul>
               : ''}
        </div>
      </div>
    );
  }
}

export default App;
