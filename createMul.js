// Conection
const { MongoClient } = require ('mongodb');

async function main() {
  const uri = "mongodb+srv://StebanPls:Contrasena@cluster0.tkqdl.mongodb.net/?retryWrites=true&w=majority";

  const client = new MongoClient(uri, {useUnifiedTopology: true});

  try {
    await client.connect();

    // to see all list databases in the cluster
    /* await listDatabases(client); */

    // Create Multiple Listings
    await createMultipleListings(client, [
      {
          Name: "Black Widow",
          Alias: "Natalia Romanova",
          Enemy: "The Red Room",
          RomanticInterest: "None",
          Attribute: "Artificially-Enhanced Physiology"
      },
      {
          Name: "Ant-Man",
          Alias: "Scott Lang",
          Enemy: "Yellowjacket",
          RomanticInterest: "Peggy Rae",
          Attribute: "Supply of Pym Particles"
      }
    ]);

  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
    }
}

//main
main().catch(console.error);

//Function list databases
async function listDatabases(client) {
  const databasesList = await client.db().admin().listDatabases();

  console.log("Databases: ");
  databasesList.databases.forEach(db => {
    console.log(`- ${db.name}`);
  })
}

// Function create multpiple listings
async function createMultipleListings(client, newListings) {
  const result = await client.db("SuperheroGroups").collection("Avengers").insertMany(newListings);

  console.log(`${result.insertedCount} new listings created with the following id(s): `);
  console.log(result.insertedIds);
}