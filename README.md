# Topic

Building a website to manage vaccinations of the health center

## Technical

- ReactJS
- Redux
- Nodejs
- Express
- PostgresQSL
- AWS

## Features

- Sign up, Sign up
- Look up vaccine information
- Users book an appointment
- Users make appointments according to the time frame
- Users manage the appointment schedule of themselves and their family member
- Users view injection history of themselves and their family member
- Staffs manage the patient 's appointment schedule ( confirm, reject)
- Staffs manage patients on day ( creating screening profile, create injection profile)
- Staffs manage injection history for patients
- Admin quantity statistics
- Admin crud vaccines
- Admin crud categories of the vaccine
- Admin manage users
- Admin setting the appointment time frame
- Admin manage vaccine warehouse
- Users update their profile

## Features
- [Vaccine Center]([https://book-management-practice-js.herokuapp.com/](http://datn-vaccine-center.website:8080/)


## Usage

### Env Variables

Create a .env file in backend folder and add the following

```
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=db_example
SECRET_REFRESH_PAYLOAD=SECRET_REFRESH_PAYLOAD
SECRET_PAYLOAD=SECRET_PAYLOAD
JWT_REFRESH_TOKEN_KEY=JWT_REFRESH_TOKEN_KEY
JWT_TOKEN_KEY=JWT_TOKEN_KEY
S3_BUCKET=BUCKET_NAME
AWS_ACCESS_KEY_ID=AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY=AWS_SECRET_ACCESS_KEY
```

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```
# Run frontend (:3000) & backend (:5000)
npm run dev
# Run backend only
npm run server
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```

There is a Heroku postbuild script, so if you push to Heroku, no need to build manually for deployment to Heroku

### Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data

```
# Import data
npm run data:import
# Destroy data
npm run data:destroy
```

```
Sample User Logins
admin@gmail.com (Admin)
Doantotnghiep@1
staff@gmail.com (Staff)
Doantotnghiep@1
ngothingocbk99@gmail.com (User)
Doantotnghiep@1
```


## License

The MIT License

Copyright (c) 2020 Traversy Media https://traversymedia.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
