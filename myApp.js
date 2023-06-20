require('dotenv').config();
const mongoose = require("mongoose");
require('dotenv').config();



mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let Person;
const personSchema = new mongoose.Schema({
  name: {
    type: String
  },
  age: {
    type: Number
  },
  favoriteFoods: {
    type: [String]
  }
});
Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  function savePerson() {
    const person = new Person({
      name: "temitope",
      age: 37,
      favoriteFoods: ["yam", "rice"]
    });

    person.save(function(err, savedPerson) {
      if (err) {
        console.log(err);
        done(err); // Pass the error to the 'done' callback
      } else {
        console.log("Saved Person:", savedPerson);
        done(null, savedPerson); // Pass the saved person to the 'done' callback
      }
    });
  }

  savePerson();
};

// Example usage:
createAndSavePerson(function(err, savedPerson) {
  if (err) {
    console.log("Error:", err);
  } else {
    console.log("Saved Person:", savedPerson);
  }
});




const arrayOfPeople = [
  {
    name: "tope",
    age: 37,
    favoriteFoods: ["beans", "rice"]
  },{
    name:"tolu",
    age:26,
    favoriteFoods:["panCake","shawarma"]
  }
]
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople)
    .then((createdPeople) => {
      done(null, createdPeople);
    })
    .catch((error) => {
      done(error);
    });
};


const findPeopleByName = (personName, done) => {
  Person.find({ name: personName })
    .then((foundPeople) => {
      done(null, foundPeople);
    })
    .catch((error) => {
      done(error);
    });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (error, foundfood) => {
    if (error) {
      return done(error);
    }
    done(null, foundfood);
  });
};



const findPersonById = (personId, done) => {
  Person.findById({_id:personId}) .then((foundId) => {
    done(null, foundId);
  })
  .catch((error) => {
    done(error);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId)
    .then((foundPerson) => {
      foundPerson.favoriteFoods.push(foodToAdd);
      foundPerson.markModified("favoriteFoods");
      return foundPerson.save();
    })
    .then((updatedPerson) => {
      done(null, updatedPerson);
    })
    .catch((error) => {
      done(error);
    });
};


const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
    const updateOptions = { new: true };
    const update = { age: 20 };
  
    Person.findOneAndUpdate({ name: personName }, {age:ageToSet}, { new: true })
      .then((updatedPerson) => {
        done(null, updatedPerson);
      })
      .catch((error) => {
        done(error);
      });

};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId).then((removeId)=>[
    done(null,removeId)
  ]).catch((error)=>{
    done(error);
  })

};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

    const query = { name: { $in: nameToRemove } };
  
    Person.remove(query, (error, result) => {
      if (error) {
        done(error);
      } else {
        done(null, result);
      }
    });
  
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find()
  .where("favoriteFoods")
  .in([foodToSearch])       
  .skip()                   
  .sort({ name: 1 })
  .limit(2)
  .select({ age: 0 })
  .exec((error,querysorted)=>{
    if(error){
      done(error)
    }else{
      done(null,querysorted);
    }
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
