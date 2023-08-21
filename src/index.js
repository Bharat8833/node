const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, './movieproject')));
app.use(express.static('uploads'));



async function main() {
   try {
      const routs = require('../routs/b');
      app.use(routs);


   } catch (e) {
       console.error(e);
   }
}

main()



app.listen(9191, "127.0.0.1", () => {
   console.log("listen port 9191");
})