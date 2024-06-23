
Documentation du Projet
Vue d'ensemble

Ce projet est une application Node.js développée en TypeScript qui utilise Apollo Server pour la gestion de GraphQL. Elle intègre plusieurs fonctionnalités, y compris la gestion des utilisateurs, des publications, des commentaires, et des interactions (likes). En outre, elle interagit avec des APIs externes comme celle de Studio Ghibli.
Structure du Projet

    Gestion des Couleurs
        colors.ts : Ce fichier gère les couleurs utilisées dans l'application. Les couleurs sont définies de manière centralisée pour assurer la cohérence de la palette de couleurs à travers l'application.

    Contexte de l'Application
        context.ts : Configure le contexte de l'application, qui est partagé entre les différents résolveurs GraphQL. Ce contexte inclut notamment l'accès à la base de données.

    Point d'Entrée Principal
        index.ts : Point d'entrée principal de l'application. Ce fichier configure et démarre le serveur Apollo, en utilisant le schéma GraphQL et le contexte définis.

    Modèles de Données
        models.ts : Définit les modèles de données utilisés dans l'application, tels que Movie, Track, User, Post, Comment, et Like.

    Résolveurs GraphQL
        resolvers.ts : Contient les résolveurs pour le schéma GraphQL. Les résolveurs définissent comment les requêtes sont traitées et renvoient les données appropriées.

    Schéma GraphQL
        schema.ts : Définit le schéma GraphQL de l'application, y compris les types de données et les requêtes disponibles.

    Types TypeScript
        types.ts : Définit les types TypeScript pour les résolveurs GraphQL, assurant une vérification statique des types.

    Base de Données
        db.ts : Configure une base de données fictive pour stocker les données de l'application. Cette base de données est utilisée par les résolveurs pour répondre aux requêtes GraphQL.

    Intégrations d'APIs Externes
        GhibliAPI.ts : Intègre l'API de Studio Ghibli pour récupérer des informations sur les films.
        TrackAPI.ts : Gère l'intégration avec une API de suivi pour récupérer des informations sur les pistes.

    Authentification
        auth.ts : Gère l'authentification des utilisateurs, y compris la génération et la vérification de tokens JWT.

    Opérations CRUD
        createComment.ts : Gère la création de nouveaux commentaires.
        createLikePost.ts : Gère la création de likes sur les publications.
        createPost.ts : Gère la création de nouvelles publications.
        createUser.ts : Gère la création de nouveaux utilisateurs.
        deleteComment.ts : Gère la suppression des commentaires.
        deleteLikePost.ts : Gère la suppression des likes sur les publications.
        deletePost.ts : Gère la suppression des publications.
        signIn.ts : Gère la connexion des utilisateurs en vérifiant les informations d'identification et en générant des tokens JWT.
        updateComment.ts : Gère la mise à jour des commentaires.
        updatePost.ts : Gère la mise à jour des publications.

    Requêtes de Données
        getLikesByPost.ts : Récupère les likes associés à une publication spécifique.
        getPostById.ts : Récupère une publication spécifique par son identifiant.
        getPosts.ts : Récupère toutes les publications.
        getPostsByUser.ts : Récupère les publications créées par un utilisateur spécifique.