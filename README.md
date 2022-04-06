Poda Me
=======

URL shortener that does not break any of the [GDPR rules](https://poda.me/b70dd8).

This is FOSS, zero-tracking, cookieless and unlimited URL shortener for everybody.<br/>
Use it at [Poda.me](https://poda.me) if you like to, or run Poda as a self-hosted service using NodeJs or [Docker](https://hub.docker.com/r/relisio/poda.me).

<p align="center" width="100%">
    <img width="100%" src="https://poda.me/f8b0e5">
</p>

## Included functionalities</h2>

* `POST`: Create a shortened URL given a URL
* `GET`: Be redirected to the original URL
* *more are coming...*

## Run locally

### Using Node JS
1. clone repository `git clone https://github.com/Studio-41/poda.me.git`
2. change directory `cd poda.me`
3. run it (zero deps) `node .`
4. go to [http://localhost:3000/](http://localhost:3000/)

### Using Docker
Go to [docker hub](https://hub.docker.com/r/relisio/poda.me)

## Generate URL

Use the POST API to generate a shortened URL (of an original URL). Pass the `url` using the query-string (`?url=`).

### Request
```bash
curl -X POST "https://poda.me?url=https://relisio.com"
```

### Response
```json
{
  "url": "https://poda.me/bf15cd"
}
```

# License

The MIT License (MIT)
Copyright © 2022 <Studio 41 Software Design S.L.>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
