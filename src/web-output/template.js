module.exports =  (title, initialState = {}, content = "") => `<!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="utf-8">
                  <title>${title}</title>
                  <link rel="stylesheet" type="text/css" href="index.css">
                </head>
                <body>
                    <div id="root">
                        ${content}
                    </div>
                  <script>
                  window.__STATE__ = ${JSON.stringify(initialState)}
               </script>
               <script src="main.js"></script>

                </body>
                `;
