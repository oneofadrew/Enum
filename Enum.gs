/*
 * Enum support - should really be it's own library
 */
class Enum {
  constructor(name, records=[], properties=[]) {
    //validations
    if (!name) throw new Error("An enum must have a name");
    if (!records || records.length === 0) throw new Error(`The enum ${name} must have some records`);
    for (let record of records) {
      if (record.length === 0) throw new Error(`Each record in enum ${name} must have a key`);
      if (properties.length > 0 && record.length < properties.length)  throw new Error(`Each property in enum ${name} must have a value`);
    }

    //set up
    this.name = name;
    this.properties = Object.freeze(properties);

    let enumMap = {};
    
    for (let record of records) {
      const key = record[0];
      let value = record.length === 1 ? record[0] : properties.length === 0 ? record[1] : record; //we assume the key is a property of the object
      enumMap[key] = Object.freeze(value);

      if (properties.length > 0) {
        //create an object for each key
        let obj = {};
        let values = enumMap[key];
        for (let i=0; i<properties.length; i++) {
          obj[properties[i]] = values[i];
          const capsProp = properties[i][0].toUpperCase() + properties[i].slice(1);
          obj[`get${capsProp}`] = () => {
            return values[i];
          }
        }
        //add the object to the object map
        enumMap[key] = Object.freeze(obj);
      }
    }
    
    this.enumMap = Object.freeze(enumMap);
    this.keys = Object.freeze(Object.keys(enumMap));
    this.values = Object.freeze(Object.values(enumMap))

  }

  getName() {
    return this.name;
  }
  getValue(key) {
    return this.enumMap[key];
  }
  getKeys() {
    return this.keys;
  }
  getValues() {
    return this.values;
  }
  getProperties() {
    return this.properties;
  }
}

function getEnumWithHeader(name, dataset) {
  if (dataset.length < 2) throw new Error(`The dataset for enum ${name} must have a header and some records.`)
  let properties = dataset[0];
  let records = dataset.slice(1);
  return getEnum(name, records, properties);
}

function getEnum(name, records, properties) {
  return Object.freeze(new Enum(name, records, properties));
}