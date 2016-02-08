# @datagica/parse-social-handles

Parse common professional social network handles from a document:

+ twitter
+ skype
+ linkedin
+ viadeo

## Installation

    $ npm install --save @datagica/parse-social-handles

## Usage

```javascript
import parseSocialHandles from "@datagica/parse-social-handles";

parseSocialHandles(INPUT).then(result => {
  if (result == null) {
    console.log("not found");
  } else {
    console.log("found: ", result)
  }
}).catch(err => {
  console.log("invalid input data: "+err)
})
```

## Examples

```javascript
{
import parseSocialHandles from "@datagica/parse-social-handles";

parseSocialHandles("@Uber and @SpaceX decide to merge, announce a new automated space car for 2026").then(..).catch(..)
// will output:
[
  {
    "type": "twitter",
    "value": "Uber"
  },
  {
    "type": "twitter",
    "value": "SpaceX"
  }
]
```

## TODO

- more social networks
