import { Characters } from "dh-marvel/components/accordion/accordion";
import { Character } from "dh-marvel/features/Types/character.types";

export const characters: Characters = {
    "available": 1,
    "collectionURI": "http://gateway.marvel.com/v1/public/comics/1308/characters",
    "items": [
        {
            "resourceURI": "http://gateway.marvel.com/v1/public/characters/1009610",
            "name": "Spider-Man (Peter Parker)"
        }
    ],
    "returned": 1
}

export const comics: Characters = {
    "available": 1,
    "collectionURI": "http://gateway.marvel.com/v1/public/comics/1308/characters",
    "items": [
        {
            "resourceURI": "http://gateway.marvel.com/v1/public/comics/1009610",
            "name": "Spider-Man (Peter Parker)"
        }
    ],
    "returned": 1
}

export const arrayCharacters: Character[] = [
  {
    id: 1011334,
    name: '3-D Man',
    description: '',
    modified: '2014-04-29T14:18:17-0400',
    thumbnail: {
      path: 'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784',
      extension: 'jpg'
    },
    resourceURI: 'http://gateway.marvel.com/v1/public/characters/1011334',
    comics: {
      available: 12,
      collectionURI: 'http://gateway.marvel.com/v1/public/characters/1011334/comics',
      items: [],
      returned: 12
    },
    series: {
      available: 3,
      collectionURI: 'http://gateway.marvel.com/v1/public/characters/1011334/series',
      items: [],
      returned: 3
    },
    stories: {
      available: 21,
      collectionURI: 'http://gateway.marvel.com/v1/public/characters/1011334/stories',
      items: [],
      returned: 20
    },
    events: {
      available: 1,
      collectionURI: 'http://gateway.marvel.com/v1/public/characters/1011334/events',
      items: [],
      returned: 1
    },
    urls: []
  },
  {
    id: 1017100,
    name: 'A-Bomb (HAS)',
    description: "Rick Jones has been Hulk's best bud since day one, but now he's more than a friend...he's a teammate! Transformed by a Gamma energy explosion, A-Bomb's thick, armored skin is just as strong and powerful as it is blue. And when he curls into action, he uses it like a giant bowling ball of destruction! ",
    modified: '2013-09-18T15:54:04-0400',
    thumbnail: {
      path: 'http://i.annihil.us/u/prod/marvel/i/mg/3/20/5232158de5b16',
      extension: 'jpg'
    },
    resourceURI: 'http://gateway.marvel.com/v1/public/characters/1017100',
    comics: {
      available: 4,
      collectionURI: 'http://gateway.marvel.com/v1/public/characters/1017100/comics',
      items: [],
      returned: 4
    },
    series: {
      available: 2,
      collectionURI: 'http://gateway.marvel.com/v1/public/characters/1017100/series',
      items: [],
      returned: 2
    },
    stories: {
      available: 7,
      collectionURI: 'http://gateway.marvel.com/v1/public/characters/1017100/stories',
      items: [],
      returned: 7
    },
    events: {
      available: 0,
      collectionURI: 'http://gateway.marvel.com/v1/public/characters/1017100/events',
      items: [],
      returned: 0
    },
    urls: []
  },
]