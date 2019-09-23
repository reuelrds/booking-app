# Lodgesy - A Booking App
**_(*Under Construction)_**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This App is a part of Android App Development Project created using [Angular](https://angular.io/) and [Ionic](https://ionicframework.com) Frameworks.  
This App allows users to book a room or offer their own place for booking, edit and view thier offers or bookings.


## The Design
---

**_The Auth Page_** -  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The App starts with a Login Page. This page let's user register or Login. A user must register to use the app.


**_The Places Page_** -   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The Places Page is the first page to be displayed after a user logs in. It has Two child pages, the **_Discover Page_** and the **_Offers Page_** which are displayed in tabs.


**_The Discover Page_** -  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The Discover Page let's users view the list of places which are available for booking. Tapping on an item lead's the user to the **_Place Detail Page_**.


**_The Place Detail Page_** -  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This page offers a user a short description, photos and price about the place that they tapped on the **_Discover Page_**. If the user wants to rent the place, he can click on the Book Button which brings up the booking modal (The modal is created by _create booking_ component in bookings folder).


**_The Offers Page_** -  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The Offers Page allows user to rent out his own places/ rooms to other people. A user can list out his place using the add (plus) icon located on the top right corner which brings up the **_New Offer Page_**. The Offers place also displays a list of current offerings by the user. Tapping on an offer leads to the **_Offer Bookings Page_**.


**_The Offer Bookings Page_** -  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This page allows a user to view the list of other users who have booked the current offering. This page also allows the user to edit the current offering by tapping on the edit button which leads to the **_Edit Offer Page_**


**_The New Offer Page_** -  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This page allows an user to list out a new place available for bookings by other users.


**_The Edit Offer Page_** -  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This page allows an user to edit the current offering.


**_The Bookings Page_** -  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This page allows a user to view the list of the places that he has booked. This page can be reached by opening the side menu and tapping on _Your Bookings_ option.  

&nbsp;  
**_TODO:_** &nbsp;Attach Design Prototype Images.


## To run Locally
---

Clone this Repository
```bash
> git clone https://github.com/reuelrds/booking-app
> cd booking-app
```

Install npm dependencies
```bash
> npm install
```

Start the Ionic application in a new Terminal from project root directory
```bash
> npm run start
```

Open the Developer Tools and Click on Toggle Device Toolbar. Select a device from the list of devices.  

**Note -** When Switching between IOS and Android Devices, after selecting a device make sure to refresh the browser. _(This will let ionic render the app with the native styling)_ 

### Building the App

```bash
> npm run build:android
```

This creates a folder called **_android_** in th project root. You can open this folder in Android Studio to install or generate the APK file.

**Note -** If you are facing any problems running the above npm scripts, install angular cli and ionic cli globally using `npm install -g @angular/cli` and `npm install -g ionic` respectively and run `ionic serve` to launch the app in a browser. To Build the app use `ng build --prod && ionic capacitor add android && ionic capacitor copy android` to create an Android Studio project which can be used to preivew the app on an emulator or a physical device and also generate the apk. 