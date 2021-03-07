# node-sequelize

# commands for this project

npm install sequelize --save

npm install mysql2 --save

npm install sequelize-cli -g


sequelize init

sequelize migration:generate --name create_tweets_table

sequelize migration:generate --name create_users_table

sequelize db:migrate

