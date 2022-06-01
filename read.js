// Conection
const { MongoClient } = require ('mongodb');

async function main() {
  const uri = "mongodb+srv://StebanPls:Contrasena@cluster0.tkqdl.mongodb.net/?retryWrites=true&w=majority";

  const client = new MongoClient(uri, {useUnifiedTopology: true});

  try {
    await client.connect();

    // To see all list databases in the cluster
    /* await listDatabases(client); */

    // Find One Listing
    await findOneListingByName(client, "Starfire");


    // Find multiple listings with different variables
    /* await findListingsWithMinimumBedroomsBathroomsAndMostRecentReviews(client, {
      minimumNumberOfBedrooms: 4,
      minimumNumberOfBathrooms: 2,
      maximumNumberOfResults: 5
    }); */

  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
    }
}

//main
main().catch(console.error);

// Function list databases
async function listDatabases(client) {
  const databasesList = await client.db().admin().listDatabases();

  console.log("Databases: ");
  databasesList.databases.forEach(db => {
    console.log(`- ${db.name}`);
  })
}


// Function find one listing
async function findOneListingByName(client, nameOfListing) {
  const result = await client.db("SuperheroGroups").collection("Titans").findOne({Name: nameOfListing});

  if (result) {
    console.log(`Found a listing in the collection with the name '${nameOfListing}'`);
    console.log(result);
  } else {
    console.log(`Nos listings in the collection with the name '${nameOfListing}'`);
  }
}