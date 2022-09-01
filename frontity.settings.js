const settings = {
  "name": "daves",
  "state": {
    "frontity": {
      "url": "https://daves.family/",
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
          "url": "https://daves.family",
          "api": "https://daves.family/wp-json",
          "homepage": "/home",
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
