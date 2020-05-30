![image](doc/source/image/Hikoo_logo.png)
# HikooFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.9.

## Prerequisite
- node.js version 10+
- npm
- angular 7+
## Installation

### Step 1
Clone hikoo frontend code
```
$ git clone https://github.com/hikerthon/hikoo-frontend.git
```

### Step 2
Install package
```bash
$ npm install --no-save
```

### Step 3
Set proxy config in root project
```
{
  "/": {
    "target": "http://[ip]:[port]",
    "changeOrigin": true,
    "secure": false
  }
}
```

### Step 4
Set SocketIo config in app.module.ts
```
const config: SocketIoConfig = { url: 'http://[ip]:[port]', options: {} };
```

## Running the app

```bash
# development
$ npm run start

# production mode
$ npm run build && npm run start:prod
```

## License

  Nest is [MIT licensed](LICENSE).