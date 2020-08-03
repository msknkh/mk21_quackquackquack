# sih_mk21_quackquackquack
Problem statement: 
PS Number: [MK21](https://www.sih.gov.in/sih2020PS/MTA=/U29mdHdhcmU=/QWxs/QWxs)
Organization: Department of Financial Services
Category: Software
Domain Bucket: Software - Mobile App development

Team members: All of us are in our Junior year & in COE branch
Team Leader: Muskan Khandelwal (2017UCO1596, muskankhandelwal369@gmail.com)
Ishaan Rawat (2017UCO1644, ishaan.rawat611@gmail.com)
Anish Jangra (2017UCO1654, jangra.anish11@gmail.com)
Divya Rawat (2017UCO1610, rawat.divya1000@gmail.com)
Mansi Joshi (2017UCO1576, mansij.co.17@nsit.net.in)
Shrey Jain (2017UCO1647, shrey.jain1107@gmail.com)


# <center> *Jan Dhan Darshak 2.0 - Money Mitra* </center>
The application is built using react-native. This framework provides a major advantage of code portability, i.e, the same repository can be used to build an android as well as iOS application.

# Instructions to Run

## Before You start
You will need to download Expo on your android device to use the application.

## Getting Started
1. Clone or download this repository on your local machine
2. Change directory in the repository
3. For entering the application directory `cd frontend`
3. Run `npm install` to install all the required packages automaticall
4. Run `expo start` to start the development server
5. Scan the QR code using Expo app from your device to run the application

## Scope for Improvement in the Jan Dhan Darshak App 
- It has a very unsmooth user experience, especially for people not well-versed with using smartphones
- Its a Data Dump:
  - Shows irrelevant data – ATMs 15 km away
  - Renders the content only after the fetch request has been completed, making the app very slow
  - No navigation feature – No point of seeing an ATM on the map if the app won’t tell how to reach to it
  - Static & inaccurate information – shows ATMs that are non-functional & no means to update that an ATM isn’t functional at a given point of time
- It’s more convenient to Google or any other search engine instead
- The challenge involves upgrading the application with more insights and features & seamless UX

## Re-imagining & Implementing the Existing Functions: 
- Nearby Financial Touchpoint
Users can select the type of FT they want to look for

- Feedback on only location of FT
Users can only provide feedback regarding the location of a FT

- List of multiple Nearby FTs
Users can select any combination of  FTs and all data is dumped on a map

## New Functionalities we’ve Added
- Multi language Support
The content of the app is supported in multiple languages (using the i18 library) to cater to a wider audience

- Request for opening more ATM
Users can now raise a request for opening a new ATM

- Navigation & Call to FTs
Users can now call & navigate to the  nearby FTs

- Speech-based Navigation
The user can click a text to make the app read it out loud

- The Policy System
A remote way to display all policies under the Financial Inclusion Initiative

- Collection and Sharing of Data
Non identifiable information, free of data protection regulations. No personal information is stored

- We Created a Scalable Backend
And used python & hosted it on cloud
