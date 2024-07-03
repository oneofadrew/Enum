//enum test data
const name = "test"
const [key1, key2, key3] = ["key1", "key2", "key3"];
const [value1, value2, value3] = ["value1", "value2", "value3"];
const [valueA1, valueA2, valueA3] = ["valueA1", "valueA2", "valueA3"];
const [valueB1, valueB2, valueB3] = ["valueB1", "valueB2", "valueB3"];
const [valueC1, valueC2, valueC3] = ["valueC1", "valueC2", "valueC3"];
const [key, prop1, prop2, prop3] = ["key", "prop1", "prop2", "prop3"];
const record1 = [key1];
const record2 = [key2];
const record3 = [key3];
const tuple1 = [key1, value1];
const tuple2 = [key2, value2];
const tuple3 = [key3, value3];
const recordA = [key1, valueA1, valueA2, valueA3];
const recordB = [key2, valueB1, valueB2, valueB3];
const recordC = [key3, valueC1, valueC2, valueC3];
const keys = [key1,key2, key3];
const values = [value1, value2, value3];
const simpleRecords = [record1, record2, record3];
const tupleRecords = [tuple1, tuple2, tuple3];
const propertyRecords = [recordA, recordB, recordC];
const properties = [key, prop1, prop2, prop3];

function runTests() {
  let suite = getEnumSuite_();
  suite.run();
}

/**
 * Tests for Enums
 */
function getEnumSuite_() {
  let suite = Test.newTestSuite("Enum");
  suite.addTest(testGetEnum_);
  suite.addTest(testGetEnumUnhappyPath_);
  suite.addTest(testGetByKey_);
  suite.addTest(testGetObjectByKey_);
  suite.addTest(testGetKeys_);
  suite.addTest(testGetValues_);
  suite.addTest(testGetAllObjects_);
  suite.addTest(testGetProperties_);
  suite.addTest(testEnumImmuable_);
  suite.addTest(testGetEnumWithHeaders_);
  return suite;
}

function testGetEnum_() {
  const SimpleTestEnum = getEnum(name, simpleRecords);
  Test.isEqual(SimpleTestEnum.name, name);
  Test.isEqual(SimpleTestEnum.getName(), name);

  const TupleTestEnum = getEnum(name, tupleRecords);
  Test.isEqual(TupleTestEnum.name, name);
  Test.isEqual(TupleTestEnum.getName(), name);

  const ObjectTestEnum = getEnum(name, propertyRecords, properties);
  Test.isEqual(ObjectTestEnum.name, name);
  Test.isEqual(ObjectTestEnum.getName(), name);
}

function testGetEnumUnhappyPath_() {
  Test.willFail(()=>{getEnum(null, [["a"]])}, "An enum must have a name");
  Test.willFail(()=>{getEnum(undefined, [["a"]])}, "An enum must have a name");
  Test.willFail(()=>{getEnum("", [["a"]])}, "An enum must have a name");
  Test.willFail(()=>{getEnum("test", null)}, "The enum test must have some records");
  Test.willFail(()=>{getEnum("test", undefined)}, "The enum test must have some records");
  Test.willFail(()=>{getEnum("test", [])}, "The enum test must have some records");
  Test.willFail(()=>{getEnum("test", [[]])}, "Each record in enum test must have a key");
  Test.willFail(()=>{getEnum("test", [["a"]],["a","b"])}, "Each property in enum test must have a value");
}

function testGetByKey_() {
  const SimpleTestEnum = getEnum(name, simpleRecords);
  Test.isEqual(SimpleTestEnum.getValue(key1), key1);
  Test.isEqual(SimpleTestEnum.getValue(key2), key2);
  Test.isEqual(SimpleTestEnum.getValue(key3), key3);

  const TupleTestEnum = getEnum(name, tupleRecords);
  Test.isEqual(TupleTestEnum.getValue(key1), value1);
  Test.isEqual(TupleTestEnum.getValue(key2), value2);
  Test.isEqual(TupleTestEnum.getValue(key3), value3);
}

function testGetObjectByKey_() {
  const ObjectTestEnum = getEnum(name, propertyRecords, properties);
  
  const testObject1 = ObjectTestEnum.getValue(key1);
  Test.isEqual(testObject1.key, key1);
  Test.isEqual(testObject1.getKey(), key1);
  Test.isEqual(testObject1.prop1, valueA1);
  Test.isEqual(testObject1.getProp1(), valueA1);
  Test.isEqual(testObject1.prop2, valueA2);
  Test.isEqual(testObject1.getProp2(), valueA2);
  Test.isEqual(testObject1.prop3, valueA3);
  Test.isEqual(testObject1.getProp3(), valueA3);

  const testObject2 = ObjectTestEnum.getValue(key2);
  Test.isEqual(testObject2.key, key2);
  Test.isEqual(testObject2.getKey(), key2);
  Test.isEqual(testObject2.prop1, valueB1);
  Test.isEqual(testObject2.getProp1(), valueB1);
  Test.isEqual(testObject2.prop2, valueB2);
  Test.isEqual(testObject2.getProp2(), valueB2);
  Test.isEqual(testObject2.prop3, valueB3);
  Test.isEqual(testObject2.getProp3(), valueB3);

  const testObject3 = ObjectTestEnum.getValue(key3);
  Test.isEqual(testObject3.key, key3);
  Test.isEqual(testObject3.getKey(), key3);
  Test.isEqual(testObject3.prop1, valueC1);
  Test.isEqual(testObject3.getProp1(), valueC1);
  Test.isEqual(testObject3.prop2, valueC2);
  Test.isEqual(testObject3.getProp2(), valueC2);
  Test.isEqual(testObject3.prop3, valueC3);
  Test.isEqual(testObject3.getProp3(), valueC3);
}

function testGetKeys_() {
  const SimpleTestEnum = getEnum(name, simpleRecords);
  Test.isEqual(SimpleTestEnum.keys, keys);
  Test.isEqual(SimpleTestEnum.getKeys(), keys);

  const TupleTestEnum = getEnum(name, tupleRecords);
  Test.isEqual(TupleTestEnum.keys, keys);
  Test.isEqual(TupleTestEnum.getKeys(), keys);
  
  const ObjectTestEnum = getEnum(name, propertyRecords, properties);
  Test.isEqual(ObjectTestEnum.keys, keys);
  Test.isEqual(ObjectTestEnum.getKeys(), keys);
}

function testGetValues_() {
  const SimpleTestEnum = getEnum(name, simpleRecords);
  Test.isEqual(SimpleTestEnum.values, keys);
  Test.isEqual(SimpleTestEnum.getValues(), keys);

  const TupleTestEnum = getEnum(name, tupleRecords);
  Test.isEqual(TupleTestEnum.values, values);
  Test.isEqual(TupleTestEnum.getValues(), values);
}

function testGetAllObjects_() {
  const ObjectTestEnum = getEnum(name, propertyRecords, properties);
  const [testObject1, testObject2, testObject3] =  ObjectTestEnum.getValues();
  Test.isEqual(testObject1.key, key1);
  Test.isEqual(testObject2.key, key2);
  Test.isEqual(testObject3.key, key3);
}

function testGetProperties_() {
  const ObjectTestEnum = getEnum(name, propertyRecords, properties);
  Test.isEqual(ObjectTestEnum.properties, properties);
  Test.isEqual(ObjectTestEnum.getProperties(), properties);
}

function testEnumImmuable_() {
  const SimpleTestEnum = getEnum(name, simpleRecords);
  const simpleEnumMap = SimpleTestEnum.enumMap;
  SimpleTestEnum.name = "new";
  SimpleTestEnum.keys = ["keys"];
  SimpleTestEnum.values = ["keys"];
  SimpleTestEnum.enumMap = {"new":"value"};
  Test.isEqual(SimpleTestEnum.name, name);
  Test.isEqual(SimpleTestEnum.keys, keys);
  Test.isEqual(SimpleTestEnum.values, keys);
  Test.isEqual(SimpleTestEnum.enumMap, simpleEnumMap);

  const TupleTestEnum = getEnum(name, tupleRecords);
  const tupleEnumMap = TupleTestEnum.enumMap;
  TupleTestEnum.name = "new"
  TupleTestEnum.keys = ["keys"];
  TupleTestEnum.values = ["keys"];
  TupleTestEnum.enumMap = {"new":"value"};
  Test.isEqual(TupleTestEnum.name, name);
  Test.isEqual(TupleTestEnum.keys, keys);
  Test.isEqual(TupleTestEnum.values, values);
  Test.isEqual(TupleTestEnum.enumMap, tupleEnumMap);
  
  const ObjectTestEnum = getEnum(name, propertyRecords, properties);
  const objectEnumMap = ObjectTestEnum.enumMap;
  const objectEnumValues = ObjectTestEnum.values;
  ObjectTestEnum.name = "new"
  ObjectTestEnum.keys = ["keys"];
  ObjectTestEnum.values = ["keys"];
  ObjectTestEnum.properties = ["properties"];
  ObjectTestEnum.enumMap = {"new":"value"};
  Test.isEqual(ObjectTestEnum.name, name);
  Test.isEqual(ObjectTestEnum.keys, keys);
  Test.isEqual(ObjectTestEnum.values, objectEnumValues);
  Test.isEqual(ObjectTestEnum.enumMap, objectEnumMap);
  
}

function testGetEnumWithHeaders_() {
  const testDataSet = [properties].concat(propertyRecords);
  const ObjectTestEnum = getEnumWithHeader(name, testDataSet);
  
  const testObject1 = ObjectTestEnum.getValue(key1);
  Test.isEqual(testObject1.key, key1);
  Test.isEqual(testObject1.getKey(), key1);
  Test.isEqual(testObject1.prop1, valueA1);
  Test.isEqual(testObject1.getProp1(), valueA1);
  Test.isEqual(testObject1.prop2, valueA2);
  Test.isEqual(testObject1.getProp2(), valueA2);
  Test.isEqual(testObject1.prop3, valueA3);
  Test.isEqual(testObject1.getProp3(), valueA3);

  const testObject2 = ObjectTestEnum.getValue(key2);
  Test.isEqual(testObject2.key, key2);
  Test.isEqual(testObject2.getKey(), key2);
  Test.isEqual(testObject2.prop1, valueB1);
  Test.isEqual(testObject2.getProp1(), valueB1);
  Test.isEqual(testObject2.prop2, valueB2);
  Test.isEqual(testObject2.getProp2(), valueB2);
  Test.isEqual(testObject2.prop3, valueB3);
  Test.isEqual(testObject2.getProp3(), valueB3);

  const testObject3 = ObjectTestEnum.getValue(key3);
  Test.isEqual(testObject3.key, key3);
  Test.isEqual(testObject3.getKey(), key3);
  Test.isEqual(testObject3.prop1, valueC1);
  Test.isEqual(testObject3.getProp1(), valueC1);
  Test.isEqual(testObject3.prop2, valueC2);
  Test.isEqual(testObject3.getProp2(), valueC2);
  Test.isEqual(testObject3.prop3, valueC3);
  Test.isEqual(testObject3.getProp3(), valueC3);
}