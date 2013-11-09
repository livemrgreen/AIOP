AIOP
====

Projet AIOP 5A

## Authentification

Pour les requêtes qui nécessitent un utilisateur enregistré on utilise le paramètre `bearer_token` qui devra être passé à chaque appel.

Le seul moyen d'obtenir un token pour les utilisateurs enregistrés est de passer par un appel `signin` avec la bonne combinaison `login`+`password`.  
L'API renvoie alors le `bearer_token` correspondant.
