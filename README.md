# news-url
News url identification. An abstract module of my [newspaperjs](https://github.com/flickz/newspaperjs) repo.

## Installation
```
npm install --save news-url
```
## Validation Process
First, perform a few basic checks like making sure the format of the url is right, (scheme, domain, tld).

Prepare the url by removing query arguments but keeps argument if specified.

Checks the url path length, ensurses it is <= 1. e.g http://cnn.com/career.html, this will return false

Ensures the url isn't some static resource, check the file type.

Checks for bad domains like facebook.com, twitter.com. It returns false if the domain is bad. 

Then, search of a YYYY/MM/DD pattern in the url. News sites love to use this pattern, this is a very safe bet.
Separators can be [\.-/_]. Years can be 2 or 4 digits, must have proper digits 1900-2099. Months and days can be ambiguous 2 digit numbers, 
one is even optional. It automatically pass once date is detected in the url

Checks the url slug, most news url slug have  usualwordsly <= 4. The words could be seperated by a "-" or "_". It also ensures the domainname isn't present 
in the url slug. Incase that happens, it could mean a url like this http://cnn.com/jobs/cnn-is-hiring-new_interns. It returns false incase.

## API
News-url provides just a single public api for validation. 
```
const newsUrl = require('news-url');
```
### newsUrl.isValidNewsUrl(url, verbose=false);
By the default verbose is set to false. Setting it to true console.log validation result in details.

```
 let urls = [
    'http://www.cnn.com/2013/12/17/politics/senate-budget-deal/index.html?hpt=hp_t1',
    'http://www.huffingtonpost.com/akoshia-yoba/giving-the-gift-of-life-a_b_4421799.html',
    'http://www.cnn.com/interactive_legal.html',
    'http://www.cnn.com/feedback/',
    'http://shine.yahoo.com/ellen-good-news/won-8217-t-believe-colin-farrell-8217-surprise-190700409.html?vp=1',
    'http://facebook.com/profile/112121212/post_id/7327372232',
    'http://i.cdn.turner.com/cnn/.e/img/3.0/global/header/nav-arrow.gif',
    'http://www.hlntv.com/shows/jane-velez-mitchell/?hpt=hp_livenow',
    'http://edition.cnn.com/2013/12/19/world/europe/uk-soldier-killing-profiles/index.html',
    'http://cnn.com/trends',
    'http://flickz/entertainment/music/12/03/2015/dance-for-me-wizkid.mp3'
];

let validNewsUrls = urls.filter((url)=>newsUrl.isValidNewsUrl(url)==true);

console.log(validNewsUrls); 

// ['http://www.cnn.com/2013/12/17/politics/senate-budget-deal/index.html?hpt=hp_t1',
  'http://www.huffingtonpost.com/akoshia-yoba/giving-the-gift-of-life-a_b_4421799.html',
  'http://shine.yahoo.com/ellen-good-news/won-8217-t-believe-colin-farrell-8217-surprise-190700409.html?vp=1',
  'http://edition.cnn.com/2013/12/19/world/europe/uk-soldier-killing-profiles/index.html']
```
## Few use cases
- News aggregator app
- Any web scraping work.
