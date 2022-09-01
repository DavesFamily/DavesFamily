const settings = {
  "name": "daves",
  "state": {
    "frontity": {
      "url": "http://wp.daves.family",
      "title": "Daves Family",
      "description": "Daves Family"
    }
  },
  "packages": [
    {
      "name": "@frontity/mars-theme",
      "state": {
        "theme": {
          "menu": [],
          "featured": {
            "showOnList": false,
            "showOnPost": false
          }
        }
      }
    },
    {
      "name": "@frontity/wp-source",
      "state": {
        "source": {
          "url": "http://wp.daves.family",
          "api": "http://wp.daves.family/wp-json",
          "homepage": "/react-home",
          "postsPage":"/",
          "reactHome":"/react-home/",
        }
      }
    },
    "@frontity/tiny-router",
    "@frontity/html2react"
  ]
};

export default settings;
