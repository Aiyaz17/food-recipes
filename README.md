## **Introduction**

This is a documentation for a food recipe website that allows users to browse, create, edit, and delete recipes. Users can view a list of available recipes and click on a specific recipe to view its details such as ingredients, time duration required to make it, and steps to make it. Users can also create their own recipes, which can be visible publicly. They can edit and delete their recipes as well.

## **Installation**

1. Clone the project from the GitHub repository:

```
bashCopy code
git clone https://github.com/Aiyaz17/food-recipes.git

```

2. Install the necessary dependencies using npm in both folders server and client:

```bash

cd food-recipes/client
npm install

cd ../server
npm install
```

3. Set Env variables in server and client ".env" files:

4. Start the server :

```bash
npm start
```

5. Run the client:

```bash

npm run start
```

4. Open the web application in your browser:

```
bashCopy code
http://localhost:3000/

```

## **Usage**

1. Start by visiting the homepage of the application.
2. On the homepage, you can see a list of available recipes.
3. Click on a specific recipe to view its details, such as ingredients, time duration required to make it, and steps to make it.
4. To create your own recipe, click on the "Create Recipe" button and fill in the necessary details, such as recipe name, ingredients, time required, and steps to make it.
5. To edit or delete your own recipe, go to the recipe's detail page and click on the "Edit" or "Delete" button.
6. To search for a specific recipe, use the search bar at the top of the page.
7. To filter recipes by specific categories, use the filter dropdown at the top of the page.

## **Additional Information**

- The website allows users to add recipes with images.
- Users can sort recipes by name, time required, and category.
- Users can only edit or delete their own recipes.
- Users can add multiple categories to their recipes.
- Users can view other users' recipes, but cannot edit or delete them.
- The website uses MongoDB to store recipe information, including the recipe name, ingredients, time required, steps to make it, and image.
