# E-commerce
This is an E-commerce website known as Deliv (stands for delivery).

![Deliv home page](client/public/images/GithubImages/Home.png?raw=true "Title")

## Introduction
Deliv is a MERN Stack based platform.  
Created with the intention of Online Shopping

## Features
* SignUp and SignIn
* Cart for specific user
* Add to cart and delete from cart functionalities

## :construction_worker: How to run
First create a .env file just inside the server folder with the three variables  
> MONGO_URI = "connect to any database for eg. mongodb://127.0.0.1:27017/E-commerce"  
> PORT = 5000  
> JWT_SECRET = "Any secret string of your wish"

Now make sure your mongod is running

Now run the following commands from E-commerce folder in terminal

```sh
cd server
npm install
```

```sh
cd ../client
npm install
node ../server/data/insertdata_script.js
```

Press Ctrl + C to exit once insertdata_script runs

### Dev Mode
```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## :closed_book: License
Copyright &copy; developerayuva  
Made with love by [developerayuva](https://github.com/developerayuva) 🚀
