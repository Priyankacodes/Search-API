Search API

Api using Node.js and MongoDb

################################

Running the App

To install dependencies: npm install

To start server: npm start

To run test: npm test

To view deployed version query: https://search-api-83181.herokuapp.com/v1/providers

################################

Accepted parameters (in any sequenece)

Parameter - Data Type

max_discharges - Integer (>0)

min_discharges - Integer (>0)

max_average_covered_charges - Float (> 0)

min_average_covered_charges - Float (> 0)

max_average_medicare_payments - Float (> 0)

min_average_medicare_payments - Float (> 0)

state - String (abbreviation of state e.g: CA)

limit - Integer (> 0)

Note: Result will be limited to 5 records by default

################################



