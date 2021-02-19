#TODOs
3. in delta page: disable accordion sections when required selections haven't been made yet.
4. DEBUGGING: for bad data states
5. enforce quality data in admin
6. bug: Caching issue? Menu not changing when someone is made admin
7. put career paths on top of data heirarchy, with the competencies duplicated underneath them
8. related to above: changing career path names requires changes in multiple parts of data arrays
9. Gap playlist per competency: the same for each career path: separate it out into a different interface
10. what can we do to make the admin interface a bit easier to use?

7. DEFER: (we don't need this if we do #5 ) adding users to orgs BEFORE they have logged in the first time (eg invitations)

1. add a messaging window (fixed to top, drops down then fades out)
2. "Submitting" modal (doesn't stop more entry) - maybe combine with messaging window?
6. DONE: easy: login not required, only for saving data, and for admins
9. DONE: easy: swith "the process" and "The people" in the triangle view (left/right sides)
5. DONE: easy: User can pick ANY org - no need to add them in the admin


# [PouchDB Express Server](https://pouchdb.com/) v2

**_Zero to PouchDB Express Server in less than a minute._** 

PouchDB is a NoSQL Database written in JavaScript. With glitch, _you can run pouchdb as an HTTP server_ by simply remixing this project. While not meant for production, running pouchdb server is perfect for small hobby projects or proof of concepts. For more info on technical restrictions - [https://glitch.com/faq#restrictions](https://glitch.com/faq#restrictions)

## Getting Started

1. Click **Remix this**
0. Click **Show** to display your new API url
0. Append `/_utils` to your API url to display your database server
0. Click on **Admin Party**
0. Add an administrator to secure your database

![screenshot](https://cdn.glitch.com/373e5a0b-7ef8-4b1d-a69e-2c7f5e12533d%2FScreen%20Shot%202017-08-08%20at%206.57.14%20AM.png?1502189884525)

## Learn More

- **server.js** defines an ExpressJS web server and a PoucbDB database server.
- The database is stored in the **.data** folder.
- Read the docs at [PouchDB.com](https://pouchdb.com/)

## Thanks

* PouchDB Team and Community [https://github.com/pouchdb](https://github.com/pouchdb)
* CouchDB Team and Community [http://couchdb.apache.org/](http://couchdb.apache.org/)
* [NodeJS](https://nodejs.org/en/)/[Express](https://expressjs.com/) community 
* [Glitch](https://glitch.com/) Team for this platform to share and learn

**This project was created with <3 from [JRS Coding School](http://jrscode.com)**


TODOS:

1.     Login/identity

1.     The ability for employers or law schools to input or choose which specific skills they would want to include under each of the three sides of the delta

2.     The ability for employers or law schools to then add a numerical value that corresponds with the skill-level they find desirable for each of those skills (doesn't have to be a number, it could be the sliding lever)

3.     A version of the shifting midpoint delta model that the law firms or law schools can use to better visualize the relative skill levels required in certain career paths.

4.     The ability to aggregate the data that we capture from those taking the assessment

