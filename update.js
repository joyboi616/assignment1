// Conection
const { MongoClient } = require ('mongodb');

async function main() {
  const uri = "mongodb+srv://StebanPls:Contrasena@cluster0.tkqdl.mongodb.net/?retryWrites=true&w=majority";

  const client = new MongoClient(uri, {useUnifiedTopology: true});

  try {
    await client.connect();

    // To see all list databases in the cluster
    /* await listDatabases(client); */


    // Update a variable
    /* await updateListingByName(client, "Infinite Views", { bedrooms: 6, beds: 8 }); */

    // Upsert a variable
    await upsertListingByName(client, "Marvel Girl", { Name: "Phoenix", RomanticInterest: "Cyclops and Wolverine" });

    // Update multiple variable
    /* await updateAllListingsToHavePropertyType(client); */

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


// Upsert listings
async function upsertListingByName(client, nameOfListing, updatedListing) {
  const result = await client.db("SuperheroGroups").collection("X-Men").updateOne({ Name: nameOfListing }, { $set: updatedListing }, { upsert: true });
  console.log(`${result.matchedCount} document(s) matched the query criteria.`);

  if (result.upsertedCount > 0) {
      console.log(`One document was inserted with the id ${result.upsertedId._id}`);
  } else {
      console.log(`${result.modifiedCount} document(s) was/were updated.`);
  }
}