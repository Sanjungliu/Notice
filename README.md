# Notice
Notice Application Documentation

Notice is an application to reporting the COVID-19 cases in Indonesia.

# Type of User
 1. User
    An User have to create an account first before create any report.
    After create an account, User can do:
        - Create COVID-19 cases report in their region.
        - Update cases report created by the User
        - Delete cases report created by the User
        - Update their Profile

2. Admin
    Admin have to create account too, before using this app.
    After create account, Admin can do:
        - See Statistic of all COVID-19 cases in Indonesia (34 region, combined from User's created cases and 3rd API COVID-19 data)
        - See Statistic with Map geolocation.
        - Update Profile 


# Endpoints
 - ("/register") 
    Create account for User and Admin
    All account created will stored in firestore database
    The requested parameter is:
        - Username
        - Email
        - Phone Number
        - Address
        - Region
        - User Status(Admin/User)

 - ("/login") 
    Logged into user's account
    All account created will stored in firestore database
    The requested parameter is:
        - Phone Number
        - OTP
    User should input the correct phone number to log into application.
    After validation of phone number in database, firebase will send the One Time Passcode by SMS to the registered phone number.

 - ("/OTP") 
    One Time Passcode(OTP) input page
    After User input the phone number in login endpoints, firebase will send the OTP and redirect to this page.
    User should correctly input received OTP into the input.
    If OTP correct, User will redirected to Dashboard page
    
 - ("/dashboard-user") 
    User dashboard
    In this Dashboard page, User have options to:
        - Create COVID-19 Report cases
        - See All Cases created by User
        - See Profile
        - Logout

 - ("/created-cases") 
    Page that contains all COVID-19 data created by the User

 - ("/create-new-case") 
    Form to create new COVID-19 case report
    This form receive parameter:
        - Name
        - Age
        - Address
        - Gender
        - Photo
    There is no region parameter, because User can only create new report in their region. So the region data automatically follow as User's region.

 - ("/update-case") 
    Form to update new COVID-19 case report
    This form receive parameter:
        - Name
        - Age
        - Address
        - Gender
        - Photo

 - ("/profile") 
    Profile page that provide User's data
    This page have parameter:
        - Username
        - Email
        - Phone Number
        - Is Admin
        - Region
    This page have "Edit Profile" button to update the Profile data

 - ("/profile-update") 
    Form to update User's Profile data
    This page have parameter:
        - Username
        - Email
        - Phone Number
        - Region
    All updated data will stored in firebase database

 - ("/dashboard-admin") 
    Admin dashboard page
    In this Dashboard page, Admin have options to:
        - See Statistic COVID-19 data from all regions in Indonesia
        - See Map of COVID-19 cases in Indonesia
        - See Profile
        - Logout
  
  - ("/statistic") 
    Statistic page
    In this page, Admin can see all COVID-19 cases data (combined from User's created data and 3rd API data) in table layout consists of 34 region in Indonesia

  - ("/map)
    Map page
    In this page, Admin can see all COVID-19 cases data (combined from User's created data and 3rd API data) in map layout, with colored marker as a COVID-19 case    severity.
    

# Additional Information
    - This application was developed in mobile version(browser), so the webpage layout will different with the mobile version.
    - Map page will more precise in webpage version.
    - Compressed Code Download Link =>  https://drive.google.com/file/d/1kdYxVtM5yrFOK0UdEpM12SxGORoNI-1v/view?usp=sharing
    - Deployed App Link => https://notice-c949c.web.app/
    - APK Download Link => https://drive.google.com/file/d/1Nu3fabO2zt4X-7XzaElUS2A8wRmk5cdQ/view?usp=sharing
