# whatsapp_web site

a simple copy of whatsapp web site, the server is built with asp.net mvc and the frontend html-js

running the server is simple but you need to use the visual studio ide
1- clone or download the project
2- open it via the visual studio
3- open the pacage manger via tools -> NueGet-pakage maneger -> choose the pakage maneger
4- type Update-Datebase
5- now you can run the app

here is a short video of how to run the server and creat a new account: 
https://mega.nz/file/y1tnmaIa#KhXe4UQlz7Ao3k0balvJxFvFROD6CdZ_Rzm3JMQdd4w

the server link is: localhost:7154

now after you run the app you can creat an account via the register page then login and start using the app as normal
you can add contacts via the add button next to tha name, edit the contact, delete him and you can send, edit, delete messages 
a huge part was to check the api but since you didnt specify the way that you will check it here are tow ways that you can check that it is working

1- you can use the cilent side site after loging into your account  the app supports all the abilities working with contacts messages and real time messages to different servers

here is an example of using the cient side site
https://mega.nz/file/ftVmSbAQ#y61nbn_SVls-ohzJcG_SitAW95Yl81SGJwHHW13_CXw

2- you can use any api service that are online to check the server and since you need to authorize the user that is logged in we have put the token that was created 
with the jwt on the url after your loging in so you can take in then use it as you want
here is an example of using the api
https://mega.nz/file/2tVWkZII#Hsgjz9Y2K-aKoi2C47J9auEvpZ1YohQZDVRXaX-WjlM


Note: in the previos assignment we were 2 in the group and we didnt use react so we had to move our frontend from the previos assignment and use it here

code structure: 
first is the signin were we have a signcontroller wich use the jwt authintication method
after loging in you will be moved to the chat section along with the authorize token from the jwt
the chat page is controlled by the chat controller and the contacts api wich in turn use the UserService to read and wtite data from the site
and we use the SignalR method for sending notifications.
