# url-shortener

Remember to start the Mongo daemon: 

` $ mongod`


To start:

` $ npm start`


To shorten a URL, send a POST request to domain/api/shorten with a URL in the JSON body. Example:

`localhost:3000/api/shorten` 
...with...
`{"URL": "http://super-duper-long-website-url.com/stuff-that-i-dont-want-to-type"}`

It will respond with a JSON with a shortened ID. Example:

`{"shortURLid": "23382848733"}`

To use it, send a GET request to your domain/r/shortURLid Examples:

`localhost:3000/go/23382848733`
`192.168.X.X:3000/go/23382848733`

And it will redirect to the URL.

To retrieve formation about the shortened link, send a GET request to domain/api/info/shortURLid. Examples:

`localhost:3000/api/info/23382848733`
`192.168.X.X:3000/api/info/23382848733`

And it will respond with information about the URL:

`{"originalURL": "http://super-duper-long...", "shortURL": "23382848733"}`



If you want to, you can change your host file (/etc/hosts) to get a shorter domain than localhost:3000 or 192.168.X.X:3000. 