# initiation-backend
# API de Gestion de Produits (Express.js & MongoDB)

Une API RESTful simple pour gérer un inventaire de produits. Elle permet d'ajouter, consulter, modifier et supprimer des produits à l'aide de Node.js, Express.js et MongoDB.

## Fonctionnalités

- Récupérer la liste de tous les produits
- Récupérer un produit par son identifiant
- Ajouter un nouveau produit
- Modifier les informations d’un produit (hors `stockStatus`)
- Mettre à jour uniquement le `stockStatus`
- Supprimer un produit

## Technologies utilisées

- Node.js
- Express.js
- MongoDB (via Mongoose)
- dotenv

## Prise en main

### Pré-requis

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- Un outil de test d’API comme [Postman](https://www.postman.com/), ou l’extension REST Client pour VS Code

### Installation

1. Cloner le dépôt :

   
2. Installer les dépendances :

    ```bash
    npm install

    ```
    express
     mongoose 
     dotenv
     

3. Créer un fichier `.env` à la racine du projet et y ajouter :

    ```env
    MONGODB_URI=mongodb://localhost:27017/productsDB
    PORT=3000
    ```

4. Démarrer le serveur :

    ```bash
    node app.js
    ```

5. Le serveur tourne sur l’adresse :

    ```
    http://localhost:3000
    ```

---

## Références API (à utiliser avec Postman ou REST Client)

Voici des exemples d'appels que nous pouvons pour tester l'API.

--- 


###  Récupérer tous les produits

- **Méthode** : `GET`  
- **URL** : `http://localhost:3000/products`

**Réponse exemple** :

```json
[
  {
    "_id": "63f1a2345678abcd1234ef56",
    "productName": "Laptop pro",
    "price": 1200,
    "stockStatus": "en stock",
    "createdAt": "2025-07-28T10:00:00.000Z",
    "updatedAt": "2025-07-28T10:00:00.000Z"
  }
]


### ajouter un produit

POST http://localhost:3000/products
Content-Type: application/json

{
  "productName": "Smartphone",
  "price": 750,
  "stockStatus": "petite stock"
}

### Récupérer tous les produits
GET http://localhost:3000/products

### Récupérer un produit par ID
GET http://localhost:3000/products/68873b90bdecf8429e820acd

### Modifier le prix d’un produit
PATCH http://localhost:3000/products/68873b90bdecf8429e820acd
Content-Type: application/json

{
  "price": 552
}

### Modifier le stockStatus d’un produit
PATCH http://localhost:3000/products/68873b90bdecf8429e820acd/petite%20stock

### Supprimer un produit
DELETE http://localhost:3000/products/68873b90bdecf84
