# @datagica/parse-social-handles

Parse common professional social network handles from a document:

+ Twitter
+ Skype
+ LinkedIn
+ Viadeo
+ Facebook

## Installation

    $ npm install --save @datagica/parse-social-handles

## Usage

```javascript
import parseSocialHandles from "@datagica/parse-social-handles";

parseSocialHandles("@Uber and @SpaceX decide to merge, announce a new automated space car for 2026").then(..).catch(..)
// will output:
[
  {
    "network": "Twitter",
    "username": "Uber",
    "url": "twitter.com/Uber"
  },
  {
    "network": "Twitter",
    "username": "SpaceX",
    "url": "twitter.com/SpaceX"
  }
]
```

## TODO

- more social networks
