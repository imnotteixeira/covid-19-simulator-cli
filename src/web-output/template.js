module.exports =  (title, initialState = {}, content = "") => `<!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="utf-8">
                  <title> ${title} </title>
                </head>
                <body>
                  <div class="content">
                     <div id="root">
                        ${content}
                     </div>
                  </div>
                  <script>
                  window.__STATE__ = ${JSON.stringify(initialState)}
               </script>
               <script src="main.js"></script>

                </body>
                `;
