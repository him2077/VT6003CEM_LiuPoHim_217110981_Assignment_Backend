module.exports = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "/dog",
  "title": "Dog",
  "description": "An dog in the website",
  "type": "object",
  "properties": {
    "name": {
      "description": "The name of the dog",
      "type": "string"
    },
    "gender": {
      "description": "The gender of the dog",
      "type": "string"
    },
    "breed": {
      "description": "The breed of the dog",
      "type": "string"
    },
    "description": {
      "description": "Optional short description of the dog",
      "type": "string"
    },
    "imageURL": {
      "description": "URL for main image to show the dog",
      "type": "uri"
    },
    "userid": {
      "description": "User ID of the current owner of the dog",
      "type": "integer",
      "minimum": 0
    },
  },
  "required": ["name", "gender", "breed", "authorID"]
}
