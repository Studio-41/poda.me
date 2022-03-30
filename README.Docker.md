[Poda.Me](https://poda.me) Poda.me is a URL shortener.

If you are searching for a zero-tracking, API-oriented URL shortener, give Poda a try. Poda does not break any of the [GDPR rules](https://poda.me/b70dd8) and is [FOSS](https://github.com/Studio-41/poda.me).

<p align="center" width="100%">
    <img width="95%" src="https://repository-images.githubusercontent.com/475194584/d9d3d961-0c54-49da-afac-dfbef8639940">
</p>


# Demo time

```yml
version: '3.8'
services:
  poda:
    container_name: poda
    image: relisio/poda.me
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - 9000:9000
    environment:
      - PORT=9000
      - PROTOCOL=http
      - PUBLIC_HOST=localhost:9000
      - STORAGE_PATH=/usr/src/storage
    volumes:
      - ./storage:/usr/src/storage
```

# License

The MIT License (MIT)
Copyright © 2022 <Studio 41 Software Design S.L.>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
