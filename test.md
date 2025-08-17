generate these datas for me in json format on photos/images just use "/placeholder.svg and dispay number after or text"

1. main destination {example [tanzania,kenya,rwanda and so on]}

- title
- slogan
- overview
- photos
- facts {populationSize, bestTimeTogo, language, currency, and many more add}
- weather {description, list[title, description]}
- wildlifes -> [from wildlifes array]
- Faqs
- experiances -> [from experiances array]
- Camps -> [from camps array]
- SubDestinations -> [from subDestinations array]

2. SubDestinations {example [tarangire,masai mara, linyati,kafue and many more]}

- title
- overview
- Highlights
- photos
- whenToGo {description, list[title, description]}
- wildlifes -> [from wildlifes array]
- Faqs
- experiances -> [from experiances array]
- Camps -> [from camps array]
- location [long,lat]
- parentDestination {just id from main destination}

3. Experiances

- title
- overview
- photos
- location -> [destination -> subdestination]
- Camps -> [from camps array]
- Packages -> [from packages array]
- blogs -> [from blogs array]
- whyThisExperiance - {description, list[title, description]}

4. Tour Packages

- title
- overview
- photos
- category -> [from experiances array]
- type -> [from tourTypes array]
- locations [destination -> subdestination]
- itenaries [images,title,destination(one from subdestination),accommodation (one from camps), inclusion/exclusion]

5. tourTypes

- title
- overview
- photos
- inclusion
- exclusion
- Packages -> [from packages array]

6. camps

- title
- overview
- photos
- 3D
- highlights
- activities [image,title,description]
- facilities [name]
- animeties [title,image,description]. example {bar,swimingPool, and more}
- location -> {destination -> subdestination}
- experiances -> [from experiances array]
- packages -> [from packages array [itenaries]]

7. wildlifes

- images
- title
- description
