Poda Me
=======

URL shortener for developers in a hurry.

This code is FOSS, used by "poda.me", a free, zero-tracking and unlimited URL shortener for everybody. Use this tool to generate URLs and share them with your colleagues and coworkers.

## Generate URL

Use the POST API to generate a shortened URL (of an original URL). Pass the `url` using the query-string (`?url=`).

### Request
```bash
curl -X POST https://poda.me?url=https://relisio.com
```

### Response
```json
{
  "url": "poda.me/bf15cd"
}
```

# License

The MIT License (MIT)
Copyright © 2022 <Studio 41 Software Design S.L.>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
