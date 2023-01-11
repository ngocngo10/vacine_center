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

## Web
- [Vaccine Center](http://datn-vaccine-center.website:8080/)


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
cd backend
npm install
cd frontend
npm install
```

### Run

```
# Run backend
cd backend
npm start
# Run frontend
npm run dev
```

## Accounts

```
Sample User Logins
admin@gmail.com (Admin)
Doantotnghiep@1
staff@gmail.com (Staff)
Doantotnghiep@1
ngothingocbk99@gmail.com (User)
Doantotnghiep@1
```
