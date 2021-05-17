function getEp(arg) {
    let newestEp = 0;
    return new Promise((resolve, reject) => {
        const https = require('https'); 
          const host = 'https://gogoanime.vc/'; 
          const searchhelp = 'search.html?keyword='; 
          console.log(arg);
          const query = `title="${arg}`; 
          const search = searchhelp.concat(arg); 
          const path = host.concat(search); 
          const userinputlength = arg.length;
  
          https.get(path, (resp) => {
              let data = '';
            
              // A chunk of data has been received.
              resp.on('data', (chunk) => {
                data += chunk;
              });
            
              // The whole response has been received. Print out the result.
              resp.on('end', () => {
                  if(data.includes("Sorry, Not found Anime with")) { 
                      reject(newestEp);
                  } 
            
                  const index = data.toLowerCase().search(query.toLowerCase());
                  const path2 = host.concat(data.substring(index-userinputlength-12, index-2));
                  
                  console.log(index, path2)
                  https.get(path2, (resp) => {
                      let data2 = '';
              
                      // A chunk of data has been received.
                      resp.on('data', (chunk) => {
                          data2 += chunk;
                      });
              
                      // The whole response has been received. Print out the result.
                      resp.on('end', () => { 
                          const index2 = data2.search('class="active"');
                          const activeeps = data2.substring(index2, index2+69);
                          const activestart = activeeps.search('ep_end');
                          const activeend = activeeps.search("'>");
                          const subsub = activeeps.substring(activestart, activeend);
                          const latestEp = subsub.replace(/\D/g, "");
                          
                          console.log(index2, latestEp); 
                          newestEp = latestEp;
                          resolve(newestEp);
                      });
              
                      }).on("error", (err) => {
                      console.log("Error: " + err.message);
                      });
              });
          }).on("error", (err) => { 
              console.log("Error: " + err.message);
          }); 
    });
  } 
  
  module.exports = {getEp};