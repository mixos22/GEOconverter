import fs from 'fs';
import { parse } from 'json2csv';

const content = fs.readFileSync('./data/Buxoro.geojson');
const object = JSON.parse(content);

const features = object.features;
const result = [];

function getFeaturesWithBarrierProperty() {
    for (const feature of features) {
        const object = {};
        if (feature.geometry.type === 'Point' && feature?.properties?.barrier === 'gate' || feature?.properties?.barrier === 'lift_gate') {
            object.barrier = feature.properties.barrier;
            object.latitude = feature.geometry.coordinates[0];
            object.longitude = feature.geometry.coordinates[1];
            result.push(object);
        }
    }
    return result;
}

function getCSVString(array) {
    return parse(array);
}

function writeCSVFile(fileName, objectToBeWritten) {
    fs.writeFileSync(`./output/${fileName}.csv`, getCSVString(objectToBeWritten));
}

const featuresWithBarriers = getFeaturesWithBarrierProperty();

// Interface for Vasil:
writeCSVFile('features_point_type', featuresWithBarriers);