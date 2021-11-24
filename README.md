# CS492(G) Data Visualization
Repository for Design Studio of CS492(G), KAIST, 2021 Fall 


### Contributors
* [Sangkyung Kwak](https://github.com/Sang-kyung)
* [Jeongeon Park](https://github.com/jeongeonp)
* [Nabila Sindi](https://github.com/wulanfrom)


## About the Repository
### Structure
There are two main folders in this repository, **src** and **data-processing**.  
The **src** folder contains the code of the website and the **data-processing** folder is where the python codes we used to process the data are.

Inside the **src** folder, the components are divided in the **src/components** directory.
* [App.js](./src/App.js): Main JavaScript file where all the components are linked to
* [Overview.js](./src/components/Overview.js): Overview tab where the triangle graph is
* [Trend.js](./src/components/Trend.js): Trend tab where the change of data over the week is
* [Activities-lib.js](./src/components/Activities-lib.js): Activity Management tab where the bubble chart with elements are at
* [assets folder](./src/assets): The folder where all the processed data exists.

Inside the **data-processing** folder, there are Google colaboratory files we used to extract data stored in the assets folder.

### How to run?
Test our system [here](https://dataviz-team1.web.app/)!  

For development,
```
npm install
npm run start
```

For deployment,
```
npm install
npm run deploy
```
