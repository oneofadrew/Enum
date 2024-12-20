//---------------------------------------------------------------------------------------
// Copyright ⓒ 2024 Drew Harding
// All rights reserved.
//---------------------------------------------------------------------------------------
// Enum - a library for turn data tables into enumerable types
// Copyright ⓒ 2024 Drew Harding
// All rights reserved.
//
// Script ID: 1p7Mtk9crLiXX-HNrrSNEZWsuCb0L5BWFFUjUX8kmRw6iTrPBPkemo-S0
// GitHub Repo: https://github.com/oneofadrew/Enum
//---------------------------------------------------------------------------------------

/*
 * The Enum class. It provides an immutable encapsulation of a dataset in one of simple, tuple or complex object form.
 */
class Enum {
  constructor(name, records=[], properties=[], safe) {
    //validations
    if (!name) throw new Error("An enum must have a name");
    if (safe && (!records || records.length === 0)) throw new Error(`The enum ${name} must have some records`);
    for (let record of records) {
      if (record.length === 0) throw new Error(`Each record in enum ${name} must have a key`);
      if (properties.length > 0 && record.length < properties.length)  throw new Error(`Each property in enum ${name} must have a value`);
    }

    //set up
    this.name = Object.freeze(name);
    this.properties = Object.freeze(properties);

    let enumMap = {};
    
    //process each of the records in the dataset
    for (let record of records) {
      const key = record[0];
      let value = record.length === 1 ? record[0] : properties.length === 0 ? record[1] : record; //we assume the key is a property of the object

      //default to the value to the result
      enumMap[key] = Object.freeze(value);

      //if we have properties defined for the enum then we create an object for the record.
      if (properties.length > 0) {
        //create an object for each key
        let obj = {};
        for (let i=0; i<properties.length; i++) {
          obj[properties[i]] = record[i];
          const capsProp = properties[i][0].toUpperCase() + properties[i].slice(1);
          obj[`get${capsProp}`] = () => {
            return record[i];
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

/**
 * Create a new immutable Enum object using the first row of the dataset as a header of property names.
 * @param {string} name - the name of the enum.
 * @param {[[string]]} dataset - a two dimnensional array of the data for the enum, where the first row contains the properties.
 * @return {Enum} An Enum object that encapsulates the data provided
 */
function getEnumWithHeader(name, dataset, safe=true) {
  if (dataset.length < 2) throw new Error(`The dataset for enum ${name} must have a header and some records.`)
  let properties = dataset[0];
  let records = dataset.slice(1);
  return getEnum(name, records, properties, safe);
}
/**
 * Create a new immutable Enum object from a two dimensional array. If the array has one column then the keys are the same as the values.
 * If the dataset is an array of tuples then the enum will be a simple key/value set. If there are properties provided then the value
 * will be a complex object that uses the properties as keys for each of the corresponding positions in the enum. The first row in the
 * dataset is always the key.
 * @param {string} name - the name of the enum.
 * @param {[[string]]} dataset - a two dimnensional array of the data for the enum.
 * @param {[string]} properties - the list of keys for a complex enum type to map against columns of the dataset.
 * @return {Enum} An Enum object that encapsulates the data provided
 */
function getEnum(name, records, properties, safe=true) {
  return Object.freeze(new Enum(name, records, properties, safe));
}