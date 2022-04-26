/*
****************************
**One time for computer use
****************************
1.crate heroku account 1 time
2.verify email  
3.install heroku cli
4.cmd-heroku login (any key enter)
*****************************
for each project one time
*****************************
1.check server.
2.heroku create
3.make sure :git add . git commit. git push
4.git push heroku main
5.go to heroku Dashboard>current Project>settings>Revel config vars
5.Copy paste config vars from your .env file.
6.Make sure you have whitelisted all ip address to access mongodb

****************************
**Update server with new changes
****************************
1.make changes
2.git add. git commit.git push
3.git push heroku main
****************************
**Connect server with client and deploy  
****************************
1.replace localhost by heroku link
2.npm run build
3.firebase deploy 
*/
