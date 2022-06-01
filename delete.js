// Conection
const { MongoClient } = require ('mongodb');

async function main() {
  const uri = "mongodb+srv://StebanPls:Contrasena@cluster0.tkqdl.mongodb.net/?retryWrites=true&w=majority";

  const client = new MongoClient(uri, {useUnifiedTopology: true});

  try {
    await client.connect();

    // To see all list databases in the cluster
    /* await listDatabases(client); */


    // Delete a listing
    /* await deleteListingByName(client, "Cozy Cottage"); */

    // Delete a listing before a date
    await deleteListingsScrapedBeforeDate(client, new Date("2022-06-01"));

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


// Delete listings before date
async function deleteListingsScrapedBeforeDate(client, date) {
  const result = await client.db("SuperheroGroups").collection("Avengers").deleteMany({ "LastScraped": { $lt: date } });

  console.log(`${result.deletedCount} document(s) was/were deleted.`);
}