//port du server backend en 2000, à mettre aussi dans server (le .env est donc en 3000)
const db = {
    port: 2000,
  };
  
  //Variable global qui permet de rajouter le port (car dans la bdd il n'y a que le nom de l'image)

  const varGlobal = `http://localhost:${db.port}`; // https://nom_de_domaine:${db.port}
  export default varGlobal;
